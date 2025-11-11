document.addEventListener('DOMContentLoaded', async () => {
  const pfpButton = document.getElementById('pfpbut');
  if (pfpButton) {
    pfpButton.addEventListener('click', () => {
      window.location.href = 'userprofile.html';
    });
  }

  await updateStats();
});

async function updateStats() {
  try {
    const response = await fetch('http://localhost:3000/api/posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    const posts = data.posts || data;
    
    const totalPosts = posts.length;
    let totalComments = 0;
    
    posts.forEach(post => {
      if (post.comments && Array.isArray(post.comments)) {
        totalComments += post.comments.length;
      }
    });
    
    const postsStat = document.querySelector('.stat-card:nth-child(3) .stat-value');
    const commentsStat = document.querySelector('.stat-card:nth-child(4) .stat-value');
    
    if (postsStat) {
      animateValue(postsStat, 0, totalPosts, 1000);
    }
    
    if (commentsStat) {
      animateValue(commentsStat, 0, totalComments, 1000);
    }
    
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
}

function animateValue(element, start, end, duration) {
  const startTime = Date.now();
  const range = end - start;
  
  function update() {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + range * progress);
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  update();
}
