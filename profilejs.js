// Profile page JavaScript

// Profile menu toggle
const pfpButton = document.getElementById('pfpbut');
const pfpMenu = document.getElementById('pfpmenu');

if (pfpButton && pfpMenu) {
    pfpButton.addEventListener('click', (e) => {
        e.stopPropagation();
        pfpMenu.style.display = pfpMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!pfpButton.contains(e.target) && !pfpMenu.contains(e.target)) {
            pfpMenu.style.display = 'none';
        }
    });
}

// Search functionality
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        console.log('Search query:', e.target.value);
        // TODO: Implement search functionality
    });
}

// Profile action buttons
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.textContent.trim();
        console.log('Action clicked:', action);
        
        // Show toast notification
        showToast(`${action} clicked`);
    });
});

// Stat cards hover effect
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Show toast notification
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2500);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Profile page loaded');
    
    // Animate stat cards on load
    const stats = document.querySelectorAll('.stat-card');
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});