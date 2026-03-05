import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setMessage('Please select an image to upload');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('image', image);
        try {
            const response = await axios.post('http://localhost:3000/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage(response.data.message);
            setTitle('');
            setCaption('');
            setImage(null);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error creating post');
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Caption:</label>

                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
                </div>
                <button type="submit">Create Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreatePost;