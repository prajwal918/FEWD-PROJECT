document.addEventListener('DOMContentLoaded', () => {
  const pfpButton = document.getElementById('pfpbut');
  if (pfpButton) {
    pfpButton.addEventListener('click', () => {
      window.location.href = 'userprofile.html';
    });
  }
  
  const form = document.querySelector('form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const titleInput = document.querySelector('input[type="text"]');
      const contentInput = document.querySelector('textarea');
      
      const title = titleInput?.value || '';
      const content = contentInput?.value || '';
      
      if (!title.trim() || !content.trim()) {
        alert('Please fill in both title and content');
        return;
      }
      
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            content: content
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert('Post created successfully!');
          titleInput.value = '';
          contentInput.value = '';
          window.location.href = 'home.html';
        } else {
          alert(`Error: ${data.error || 'Failed to create post'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server. Make sure the backend is running.');
      }
    });
  }
});
