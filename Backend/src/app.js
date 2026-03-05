const express = require('express');
const postModel = require('./models/post.model');
const multer = require('multer');
const { uploadImage } = require('./services/ImageKit.service');

const app = express();
app.use(express.json());

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



module.exports = app;