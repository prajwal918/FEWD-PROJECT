const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const POSTS_FILE = path.join(__dirname, 'posts.json');

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

const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.url === '/api/posts' && req.method === 'GET') {
    try {
      const posts = readPosts();
      sendResponse(res, 200, {
        posts: posts,
        totalCount: posts.length
      });
    } catch (error) {
      sendResponse(res, 500, { error: 'Failed to retrieve posts' });
    }
  } else if (req.url === '/api/posts' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { title, content } = JSON.parse(body);

        if (!title || !content || title.trim() === '' || content.trim() === '') {
          return sendResponse(res, 400, { error: 'Title and content are required' });
        }

        const newPost = {
          id: Date.now(),
          title: title.trim(),
          content: content.trim(),
          timestamp: new Date().toISOString(),
          comments: []
        };

        const posts = readPosts();
        posts.unshift(newPost);
        writePosts(posts);
        
        sendResponse(res, 201, {
          post: newPost,
          totalCount: posts.length
        });
      } catch (error) {
        sendResponse(res, 500, { error: 'Failed to save post' });
      }
    });
  } else if (req.url.startsWith('/api/posts/') && req.url.endsWith('/comments') && req.method === 'POST') {
    const postId = req.url.split('/')[3];
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { author, text } = JSON.parse(body);

        if (!text || text.trim() === '') {
          return sendResponse(res, 400, { error: 'Comment text is required' });
        }

        const posts = readPosts();
        const postIndex = posts.findIndex(p => p.id == postId);

        if (postIndex === -1) {
          return sendResponse(res, 404, { error: 'Post not found' });
        }

        const newComment = {
          id: Date.now(),
          author: author || 'Anonymous',
          text: text.trim(),
          time: 'just now',
          timestamp: new Date().toISOString()
        };

        if (!posts[postIndex].comments) {
          posts[postIndex].comments = [];
        }

        posts[postIndex].comments.unshift(newComment);
        writePosts(posts);
        
        sendResponse(res, 201, {
          comment: newComment,
          post: posts[postIndex]
        });
      } catch (error) {
        sendResponse(res, 500, { error: 'Failed to save comment' });
      }
    });
  } else {
    sendResponse(res, 404, { error: 'Not found' });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
