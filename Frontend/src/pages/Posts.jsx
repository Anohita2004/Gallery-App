import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../styles/Posts.css';

function Posts() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    React.useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="posts-container">
            <h2>All Posts</h2>
            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <img src={post.image} alt={post.title} className='post-image' />
                        <div className="post-content">
                            <h3>{post.title}</h3>
                            <p>{post.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;   