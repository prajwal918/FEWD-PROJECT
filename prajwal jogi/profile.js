document.addEventListener('DOMContentLoaded', () => {
  const pfpButton = document.getElementById('pfpbut');
  if (pfpButton) {
    pfpButton.addEventListener('click', () => {
      window.location.href = 'userprofile.html';
    });
  }
});
