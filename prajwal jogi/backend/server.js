const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const POSTS_FILE = path.join(__dirname, 'posts.json');

app.use(cors());
app.use(express.json());

if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify([], null, 2));
}

const readPosts = () => {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writePosts = (posts) => {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
};

app.get('/api/posts', (req, res) => {
  try {
    const posts = readPosts();
    res.json({
      posts: posts,
      totalCount: posts.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content || title.trim() === '' || content.trim() === '') {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    timestamp: new Date().toISOString()
  };

  try {
    const posts = readPosts();
    posts.unshift(newPost);
    writePosts(posts);
    
    res.status(201).json({
      post: newPost,
      totalCount: posts.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
