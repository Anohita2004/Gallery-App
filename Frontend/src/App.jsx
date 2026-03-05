import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Posts from './pages/Posts';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>📸 Image Postcard Gallery</h1>
        </header>
        <nav className="app-nav">
          <a href="/">Home</a>
          <a href="/create-post">Create Post</a>
          <a href="/posts">View Posts</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Image Postcard Gallery</h2>
      <p>Create beautiful postcard-sized image cards and share them with the world!</p>
      <div className="home-actions">
        <a href="/create-post" className="action-button">Create a New Post</a>
        <a href="/posts" className="action-button">View All Posts</a>
      </div>
    </div>
  );
}

export default App;