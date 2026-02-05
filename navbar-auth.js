// Navbar Authentication State Handler
// This script updates the navbar based on login state

/**
 * Get user initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials (max 2 characters)
 */
function getUserInitials(name) {
    if (!name) return 'U';
    
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

/**
 * Get random color for user avatar
 * @returns {string} - Color class (color-1 to color-10)
 */
function getRandomAvatarColor() {
    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9', 'color-10'];
    const savedColor = localStorage.getItem('userAvatarColor');
    
    if (savedColor) {
        return savedColor;
    }
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    localStorage.setItem('userAvatarColor', randomColor);
    return randomColor;
}

/**
 * Update navbar user icon based on authentication state
 */
function updateNavbarUser() {
    const userContainer = document.querySelector('.user-icon-container');
    if (!userContainer) {
        console.warn('User icon container not found');
        return;
    }

    const userLink = userContainer.querySelector('.user-link');
    if (!userLink) {
        console.warn('User link not found');
        return;
    }

    // Check if API is available
    if (typeof API === 'undefined') {
        console.error('API not loaded yet');
        return;
    }

    console.log('Checking authentication status...');
    console.log('Is authenticated:', API.isAuthenticated());
    console.log('Access token:', API.getToken());
    console.log('User data:', API.getUser());

    if (API.isAuthenticated()) {
        // User is logged in - show avatar
        const user = API.getUser();
        console.log('User is logged in:', user);
        const initials = getUserInitials(user?.name || 'User');
        const colorClass = getRandomAvatarColor();

        userLink.innerHTML = `
            <div class="user-avatar ${colorClass}">${initials}</div>
        `;
        
        // Update link to go to profile/dashboard instead of login
        userLink.href = API.isAdmin() ? 'admin-dashboard.html' : '#';
        
        // Add dropdown menu for logged-in users
        userLink.addEventListener('click', function(e) {
            if (!API.isAdmin()) {
                e.preventDefault();
                showUserMenu(e);
            }
        });
    } else {
        // User is logged out - show outline icon
        console.log('User is NOT logged in - showing outline icon');
        // User is logged out - show outline icon
        userLink.innerHTML = `
            <div class="user-icon-outline">
                <i class="fa fa-user"></i>
            </div>
        `;
        userLink.href = 'login.html';
    }
}

/**
 * Show user menu (dropdown)
 * @param {Event} e - Click event
 */
function showUserMenu(e) {
    // Remove existing menu if present
    const existingMenu = document.querySelector('.user-dropdown-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }

    const user = API.getUser();
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'user-dropdown-menu';
    menu.innerHTML = `
        <div class="user-dropdown-header">
            <strong>${user?.name || 'User'}</strong>
            <small>${user?.email || ''}</small>
        </div>
        <div class="user-dropdown-divider"></div>
        <a href="#" class="user-dropdown-item" onclick="handleLogout(event)">
            <i class="fa fa-sign-out"></i> Logout
        </a>
    `;

    // Position menu
    const userContainer = document.querySelector('.user-icon-container');
    userContainer.style.position = 'relative';
    userContainer.appendChild(menu);

    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!userContainer.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

/**
 * Handle user logout
 * @param {Event} e - Click event
 */
async function handleLogout(e) {
    e.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        try {
            await API.logout();
            // Redirect to home page
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            // Still redirect even if API call fails
            window.location.href = 'index.html';
        }
    }
}

// Add styles for dropdown menu
const style = document.createElement('style');
style.textContent = `
    .user-dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.5rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 200px;
        z-index: 1000;
        overflow: hidden;
    }

    .user-dropdown-header {
        padding: 1rem;
        background: var(--bg-light);
        border-bottom: 1px solid #eee;
    }

    .user-dropdown-header strong {
        display: block;
        color: var(--text-dark);
        margin-bottom: 0.25rem;
    }

    .user-dropdown-header small {
        display: block;
        color: var(--text-light);
        font-size: 0.85rem;
    }

    .user-dropdown-divider {
        height: 1px;
        background: #eee;
    }

    .user-dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: var(--text-dark);
        text-decoration: none;
        transition: background 0.3s ease;
    }

    .user-dropdown-item:hover {
        background: var(--bg-light);
    }

    .user-dropdown-item i {
        font-size: 1rem;
        color: var(--text-light);
    }
`;
document.head.appendChild(style);

// Update navbar on page load - wait for API to be ready
function initNavbar() {
    if (typeof API !== 'undefined') {
        updateNavbarUser();
    } else {
        // API not loaded yet, try again in a moment
        console.log('Waiting for API to load...');
        setTimeout(initNavbar, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}

// Make functions globally available
window.updateNavbarUser = updateNavbarUser;
window.handleLogout = handleLogout;
