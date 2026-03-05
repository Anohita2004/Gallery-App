import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../styles/Posts.css';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editCaption, setEditCaption] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setMessage('Error loading posts');
        }
    };

    React.useEffect(() => {
        fetchPosts();
    }, []);

    // Delete Post Function
    const deletePost = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/delete-post/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
            setMessage('Post deleted successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting post:', error);
            setMessage('Error deleting post: ' + (error.response?.data?.error || error.message));
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    // Start Edit Function
    const startEdit = (post) => {
        setEditingPostId(post._id);
        setEditTitle(post.title);
        setEditCaption(post.caption);
        setMessage('');
    };

    // Cancel Edit Function
    const cancelEdit = () => {
        setEditingPostId(null);
        setEditTitle('');
        setEditCaption('');
        setMessage('');
    };

    // Update Post Function
    const updatePost = async (postId) => {
        if (!editTitle.trim() || !editCaption.trim()) {
            setMessage('Title and caption cannot be empty');
            return;
        }

        setLoading(true);
        try {
            await axios.patch(`http://localhost:3000/update-post/${postId}`, {
                title: editTitle,
                caption: editCaption
            });

            // Update the post in the list
            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, title: editTitle, caption: editCaption }
                    : post
            ));

            setEditingPostId(null);
            setEditTitle('');
            setEditCaption('');
            setMessage('Post updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating post:', error);
            setMessage('Error updating post: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="posts-container">
            <h2>All Posts</h2>
            {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
            
            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <img src={post.image} alt={post.title} className='post-image' />
                        <div className="post-content">
                            {editingPostId === post._id ? (
                                // Edit Form
                                <div className="edit-form">
                                    <h3>Edit Post</h3>
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder="Enter title"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Caption:</label>
                                        <textarea
                                            value={editCaption}
                                            onChange={(e) => setEditCaption(e.target.value)}
                                            placeholder="Enter caption"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="edit-buttons">
                                        <button 
                                            onClick={() => updatePost(post._id)} 
                                            className="btn btn-save"
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button 
                                            onClick={cancelEdit} 
                                            className="btn btn-cancel"
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Display Mode
                                <>
                                    <h3>{post.title}</h3>
                                    <p>{post.caption}</p>
                                    <div className="post-actions">
                                        <button
                                            onClick={() => startEdit(post)}
                                            className="btn btn-edit"
                                            disabled={loading}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => deletePost(post._id)}
                                            className="btn btn-delete"
                                            disabled={loading}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;   