# Post Creation & Storage Backend

## Quick Start

1. **Start the server:**
   ```bash
   npm start
   ```
   Or:
   ```bash
   node server.js
   ```

2. **Server will run on:** http://localhost:3000

## API Endpoints

### GET /api/posts
Returns all posts in JSON format (newest first)

### POST /api/posts
Creates a new post

**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Post content here"
}
```

**Success Response (201):**
```json
{
  "id": 1699999999999,
  "title": "Post Title",
  "content": "Post content here",
  "timestamp": "2025-11-11T00:00:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Title and content are required"
}
```

## How to Use

1. Start the backend server (this directory)
2. Open `postcreation.html` in your browser
3. Fill out the form and click "publish."
4. Open `home.html` to see your posts displayed

## File Structure

```
backend/
├── server.js       # Express server
├── posts.json      # Data storage
└── package.json    # Dependencies
```

## Frontend Integration

- **postcreation.js** - Handles form submission via fetch API
- **home.js** - Fetches and displays posts dynamically
