const express = require('express');
const postModel = require('./models/post.model');
const multer = require('multer');
const { uploadImage } = require('./services/ImageKit.service');

const app = express();

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Create a post
app.post('/create-post', upload.single('image'), async(req,res)=>{
    try {
        const data = req.body;
        
        if (!req.file) {
            return res.status(400).json({
                message : "Image file is required"
            });
        }

        // Upload image to ImageKit and get URL
        const imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
        
        const post = await postModel.create({
            title : data.title,
            caption : data.caption,
            image : imageUrl
        });
        
        res.status(201).json({
            message : "Post created successfully",
            post: post
        })
    } catch(error) {
        res.status(500).json({
            message : "Error creating post",
            error: error.message
        })
    }
})
// Fetching all posts
app.get('/posts',async(req,res)=>{
    const posts = await postModel.find();
    res.status(200).json({
        message : "Posts fetched successfully",
        posts: posts
    })
})
// Deleting a post
app.delete('/delete-post/:id',async(req,res)=>{
    const id = req.params.id;
    await postModel.findOneAndDelete({
        _id :id
    }).then(()=>{
        res.status(200).json({
            message : "Post deleted successfully"
        })
    })

})
//Updating a post
app.patch('/update-post/:id', async(req,res)=>{
    try {
        console.log('PATCH request received');
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Raw body:', req.body);
        console.log('Request method:', req.method);
        console.log('Request URL:', req.url);

        const id = req.params.id;
        const { caption, title } = req.body || {};

        console.log('Request body:', req.body);
        console.log('Caption:', caption, 'Title:', title);

        if (!caption && !title) {
            console.log('No caption or title provided in body:', JSON.stringify(req.body));
            return res.status(400).json({
                message: "At least one field (caption or title) must be provided",
                receivedBody: req.body
            });
        }

        const updateData = {};
        if (caption !== undefined) updateData.caption = caption;
        if (title !== undefined) updateData.title = title;

        console.log('Updating post with data:', updateData);

        await postModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        res.status(200).json({
            message: "Post updated successfully"
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({
            message: "Error updating post",
            error: error.message
        });
    }
})


module.exports = app;