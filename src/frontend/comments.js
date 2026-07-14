document.addEventListener('DOMContentLoaded', async () => {
  const pfpButton = document.getElementById('pfpbut');
  if (pfpButton) {
    pfpButton.addEventListener('click', () => {
      window.location.href = 'userprofile.html';
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');
  
  if (!postId) {
    console.error('No post ID found');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    const posts = data.posts || data;
    const post = posts.find(p => p.id == postId);
    
    if (!post) {
      console.error('Post not found');
      return;
    }

    document.querySelector('.post-container h2').textContent = post.title;
    document.querySelector('.post-content p:not(.post-author)').textContent = post.content;
    
    if (!post.comments) {
      post.comments = [];
    }
    
    loadComments(post.comments);
    
    const submitBtn = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    
    submitBtn.addEventListener('click', async () => {
      const commentText = commentInput.value.trim();
      
      if (commentText === '') {
        alert('Please write a comment');
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            author: 'Anonymous',
            text: commentText
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to post comment');
        }
        
        const data = await response.json();
        const updatedPost = data.post;
        
        commentInput.value = '';
        
        loadComments(updatedPost.comments);
      } catch (error) {
        console.error('Error posting comment:', error);
        alert('Failed to post comment');
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
});

function loadComments(comments) {
  const commentsList = document.getElementById('comments-list');
  
  if (comments.length === 0) {
    commentsList.innerHTML = '<p style="text-align: center; color: #888;">No comments yet. Be the first to comment!</p>';
    return;
  }
  
  commentsList.innerHTML = '';
  
  comments.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    
    const commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    
    const author = document.createElement('span');
    author.className = 'comment-author';
    author.textContent = comment.author;
    
    const time = document.createElement('span');
    time.className = 'comment-time';
    time.textContent = comment.time;
    
    commentHeader.appendChild(author);
    commentHeader.appendChild(time);
    
    const text = document.createElement('p');
    text.className = 'comment-text';
    text.textContent = comment.text;
    
    const actions = document.createElement('div');
    actions.className = 'comment-actions';
    
    const likeBtn = document.createElement('button');
    likeBtn.className = 'comment-btn';
    likeBtn.textContent = 'Like';
    
    const replyBtn = document.createElement('button');
    replyBtn.className = 'comment-btn';
    replyBtn.textContent = 'Reply';
    
    const reportBtn = document.createElement('button');
    reportBtn.className = 'comment-btn';
    reportBtn.textContent = 'Report';
    
    actions.appendChild(likeBtn);
    actions.appendChild(replyBtn);
    actions.appendChild(reportBtn);
    
    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(text);
    commentDiv.appendChild(actions);
    
    commentsList.appendChild(commentDiv);
  });
}
