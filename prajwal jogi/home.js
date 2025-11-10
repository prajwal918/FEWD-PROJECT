document.addEventListener('DOMContentLoaded', async () => {
  const pfpButton = document.getElementById('pfpbut');
  if (pfpButton) {
    pfpButton.addEventListener('click', () => {
      window.location.href = 'userprofile.html';
    });
  }
  
  const feedContainer = document.getElementById('feedContainer');
  
  if (!feedContainer) {
    console.error('Feed container not found');
    return;
  }
  
  feedContainer.innerHTML = '<p style="text-align: center; color: #888;">Loading posts...</p>';
  
  try {
    const response = await fetch('http://localhost:3000/api/posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    const posts = data.posts || data;
    
    feedContainer.innerHTML = '';
    
    if (posts.length === 0) {
      feedContainer.innerHTML = '<p style="text-align: center; color: #666;">No posts yet. Create the first one!</p>';
      return;
    }
    
    posts.forEach(post => {
      const postElement = createPostElement(post);
      feedContainer.appendChild(postElement);
    });
    
  } catch (error) {
    console.error('Error:', error);
    feedContainer.innerHTML = '<p style="text-align: center; color: #ff0000;">Failed to load posts. Make sure the backend server is running on http://localhost:3000</p>';
  }
});

function createPostElement(post) {
  const article = document.createElement('article');
  article.className = 'post-card';
  
  const header = document.createElement('div');
  header.className = 'post-header';
  
  const avatar = document.createElement('div');
  avatar.className = 'post-avatar';
  avatar.textContent = 'ME';
  
  const meta = document.createElement('div');
  meta.className = 'post-meta';
  
  const username = document.createElement('div');
  username.className = 'post-username';
  username.textContent = post.title;
  
  const timestamp = document.createElement('div');
  timestamp.className = 'post-timestamp';
  const date = new Date(post.timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) {
    timestamp.textContent = diffMins <= 1 ? 'just now' : `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    timestamp.textContent = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else {
    timestamp.textContent = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  }
  
  meta.appendChild(username);
  meta.appendChild(timestamp);
  header.appendChild(avatar);
  header.appendChild(meta);
  
  const content = document.createElement('div');
  content.className = 'post-content';
  content.textContent = post.content;
  
  const actions = document.createElement('div');
  actions.className = 'post-actions';
  
  const likeBtn = createActionButton('♡', '0');
  const commentBtn = createActionButton('⎙', '0');
  const shareBtn = createActionButton('⌲', '0');
  
  actions.appendChild(likeBtn);
  actions.appendChild(commentBtn);
  actions.appendChild(shareBtn);
  
  article.appendChild(header);
  article.appendChild(content);
  article.appendChild(actions);
  
  return article;
}

function createActionButton(icon, count) {
  const btn = document.createElement('button');
  btn.className = 'action-btn';
  
  const iconSpan = document.createElement('span');
  iconSpan.className = 'action-icon';
  iconSpan.textContent = icon;
  
  const countSpan = document.createElement('span');
  countSpan.textContent = count;
  
  btn.appendChild(iconSpan);
  btn.appendChild(countSpan);
  
  return btn;
}
