// Check login status
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        location.href = '../../login/login.html';
    }
    // Initialize user data
    loadUsers();
    
    // Add active class handler for menu items
    setupMenuHighlighting();
    
    // Set up form submit handlers
    document.getElementById('addUserForm').addEventListener('submit', handleAddUser);
    document.getElementById('editUserForm').addEventListener('submit', handleEditUser);
}

// Setup menu highlighting
function setupMenuHighlighting() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current page menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.includes(href)) {
            item.classList.add('active');
        }
    });
    
    // If we're on the users page
    if (currentPath.includes('users.html') || currentPath.endsWith('/users/')) {
        document.querySelector('a[href="users.html"]').classList.add('active');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    location.href = '../../login/login.html';
}

// Sample data - would be replaced by API calls in production
const allUsers = [
    { 
        id: 1, 
        name: "John Doe", 
        email: "john.doe@gmail.com", 
        phone: "123-456-7890", 
        status: "active", 
        joinDate: "2024-10-15",
        storageUsed: 7.8, 
        storageLimit: 10 
    },
    { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane.smith@gmail.com", 
        phone: "234-567-8901", 
        status: "active", 
        joinDate: "2024-11-20",
        storageUsed: 5.2, 
        storageLimit: 10 
    },
    { 
        id: 3, 
        name: "Robert Johnson", 
        email: "robert.j@gmail.com", 
        phone: "345-678-9012", 
        status: "inactive", 
        joinDate: "2024-08-05",
        storageUsed: 2.5, 
        storageLimit: 5 
    },
    { 
        id: 4, 
        name: "Emily Davis", 
        email: "emily.davis@gmail.com", 
        phone: "456-789-0123", 
        status: "active", 
        joinDate: "2025-01-10",
        storageUsed: 3.9,
        storageLimit: 5
    }
];