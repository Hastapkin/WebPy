// Check login status
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        location.href = '../../login/login.html';
    }
    // Initialize dashboard data
    updateDashboard();
    
    // Add active class handler for menu items
    setupMenuHighlighting();
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
    
    // If we're on the dashboard page
    if (currentPath.includes('dashboard.html') || currentPath.endsWith('/dashboard/')) {
        document.querySelector('a[href="dashboard.html"]').classList.add('active');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    location.href = '../../login/login.html';
}
// Sample user data
const sampleUsers = [
    {
        id: "USR001",
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        status: "active",
        joinDate: "2023-05-12",
        storageUsed: 3.5,
        storageLimit: 10
    },
    {
        id: "USR002",
        name: "Emily Johnson",
        email: "emily.j@example.com",
        phone: "+1 (555) 234-5678",
        status: "active",
        joinDate: "2023-06-03",
        storageUsed: 7.8,
        storageLimit: 10
    },
    {
        id: "USR003",
        name: "Michael Brown",
        email: "michael.b@example.com",
        phone: "+1 (555) 345-6789",
        status: "inactive",
        joinDate: "2023-04-20",
        storageUsed: 1.2,
        storageLimit: 5
    },
    {
        id: "USR004",
        name: "Sarah Davis",
        email: "sarah.d@example.com",
        phone: "+1 (555) 456-7890",
        status: "active",
        joinDate: "2023-07-15",
        storageUsed: 2.3,
        storageLimit: 10
    },
    {
        id: "USR005",
        name: "Robert Wilson",
        email: "robert.w@example.com",
        phone: "+1 (555) 567-8901",
        status: "active",
        joinDate: "2023-08-22",
        storageUsed: 8.1,
        storageLimit: 10
    },
    {
        id: "USR006",
        name: "Jennifer Martinez",
        email: "jennifer.m@example.com",
        phone: "+1 (555) 678-9012",
        status: "inactive",
        joinDate: "2023-03-05",
        storageUsed: 0.9,
        storageLimit: 5
    },
    {
        id: "USR007",
        name: "David Thompson",
        email: "david.t@example.com",
        phone: "+1 (555) 789-0123",
        status: "active",
        joinDate: "2023-09-10",
        storageUsed: 4.7,
        storageLimit: 15
    },
    {
        id: "USR008",
        name: "Lisa Garcia",
        email: "lisa.g@example.com",
        phone: "+1 (555) 890-1234",
        status: "active",
        joinDate: "2023-10-18",
        storageUsed: 12.1,
        storageLimit: 15
    },
    {
        id: "USR009",
        name: "Daniel Rodriguez",
        email: "daniel.r@example.com",
        phone: "+1 (555) 901-2345",
        status: "inactive",
        joinDate: "2023-02-27",
        storageUsed: 2.8,
        storageLimit: 10
    },
    {
        id: "USR010",
        name: "Michelle Lee",
        email: "michelle.l@example.com",
        phone: "+1 (555) 012-3456",
        status: "active",
        joinDate: "2023-11-05",
        storageUsed: 6.3,
        storageLimit: 10
    }
];

// Set up data in localStorage if it doesn't exist
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(sampleUsers));
}

// Global variables for pagination
let currentPage = 1;
const rowsPerPage = 5;
let filteredUsers = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    
    // Set up form submissions
    document.getElementById('addUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addUser();
    });
    
    document.getElementById('editUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveUserChanges();
    });
});

// Load and display users with pagination
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Apply filters
    applyFilters(users);
    
    // Update pagination
    updatePagination();
    
    // Display current page
    displayUsers();
}

// Apply filters to the user list
function applyFilters(users) {
    const statusFilter = document.getElementById('statusFilter').value;
    const storageFilter = document.getElementById('storageFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredUsers = users.filter(user => {
        // Status filter
        if (statusFilter !== 'all' && user.status !== statusFilter) {
            return false;
        }
        
        // Storage filter
        const storagePercentage = (user.storageUsed / user.storageLimit) * 100;
        if (storageFilter === 'high' && storagePercentage <= 75) {
            return false;
        } else if (storageFilter === 'medium' && (storagePercentage < 25 || storagePercentage > 75)) {
            return false;
        } else if (storageFilter === 'low' && storagePercentage >= 25) {
            return false;
        }
        
        // Search filter
        if (searchTerm) {
            return (
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.phone.toLowerCase().includes(searchTerm) ||
                user.id.toLowerCase().includes(searchTerm)
            );
        }
        
        return true;
    });
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    
    // Adjust current page if needed
    if (currentPage > totalPages) {
        currentPage = totalPages === 0 ? 1 : totalPages;
    }
    
    // Update page info
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages === 0 ? 1 : totalPages}`;
    
    // Enable/disable pagination buttons
    document.getElementById('prevBtn').disabled = currentPage <= 1;
    document.getElementById('nextBtn').disabled = currentPage >= totalPages;
}

// Display users for the current page
function displayUsers() {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);
    
    if (currentUsers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="8" style="text-align: center;">No users found</td>
        `;
        tableBody.appendChild(row);
        return;
    }
    
    currentUsers.forEach(user => {
        const storagePercentage = (user.storageUsed / user.storageLimit) * 100;
        const initials = user.name.split(' ').map(name => name.charAt(0)).join('');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>
                <div class="user-name">
                    <div class="avatar">${initials}</div>
                    ${user.name}
                </div>
            </td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><span class="status ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td>${formatDate(user.joinDate)}</td>
            <td>
                <div class="storage-info">
                    <div class="storage-bar">
                        <div class="storage-fill" style="width: ${storagePercentage}%"></div>
                    </div>
                    <small>${user.storageUsed}GB / ${user.storageLimit}GB (${Math.round(storagePercentage)}%)</small>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="showEditUserModal('${user.id}')">
                        <i class="ri-pencil-line"></i>
                    </button>
                    <button class="action-btn delete" onclick="confirmDeleteUser('${user.id}')">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Format date to MM/DD/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

// Go to previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayUsers();
        updatePagination();
    }
}

// Go to next page
function nextPage() {
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayUsers();
        updatePagination();
    }
}

// Filter users
function filterUsers() {
    currentPage = 1; // Reset to first page when filtering
    loadUsers();
}

// Search users
function searchUsers() {
    currentPage = 1; // Reset to first page when searching
    loadUsers();
}

// Add new user
function addUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Generate a new user ID
    const lastId = users.length > 0 ? parseInt(users[users.length - 1].id.substring(3)) : 0;
    const newId = `USR${String(lastId + 1).padStart(3, '0')}`;
    
    const newUser = {
        id: newId,
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        status: document.getElementById('userStatus').value,
        joinDate: new Date().toISOString().slice(0, 10),
        storageUsed: 0,
        storageLimit: parseInt(document.getElementById('userStorage').value)
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    closeAddUserModal();
    loadUsers();
    
    // Show confirmation
    alert(`User ${newUser.name} added successfully!`);
}

// Show the add user modal
function showAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

// Close the add user modal
function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
    document.getElementById('addUserForm').reset();
}

// Show the edit user modal
function showEditUserModal(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === userId);
    
    if (user) {
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editUserName').value = user.name;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserPhone').value = user.phone;
        document.getElementById('editUserStatus').value = user.status;
        document.getElementById('editUserStorage').value = user.storageLimit;
        
        document.getElementById('editUserModal').style.display = 'block';
    }
}

// Close the edit user modal
function closeEditUserModal() {
    document.getElementById('editUserModal').style.display = 'none';
    document.getElementById('editUserForm').reset();
}

// Save user changes
function saveUserChanges() {
    const userId = document.getElementById('editUserId').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find the user by ID
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
        // Update user data
        users[userIndex].name = document.getElementById('editUserName').value;
        users[userIndex].email = document.getElementById('editUserEmail').value;
        users[userIndex].phone = document.getElementById('editUserPhone').value;
        users[userIndex].status = document.getElementById('editUserStatus').value;
        users[userIndex].storageLimit = parseInt(document.getElementById('editUserStorage').value);
        
        // Save changes
        localStorage.setItem('users', JSON.stringify(users));
        
        // Close modal and refresh
        closeEditUserModal();
        loadUsers();
        
        // Show confirmation
        alert(`User ${users[userIndex].name} updated successfully!`);
    }
}

// Show delete confirmation
function confirmDeleteUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === userId);
    
    if (user) {
        document.getElementById('confirmationMessage').textContent = `Are you sure you want to delete user "${user.name}"?`;
        
        // Set up confirm action button
        const confirmBtn = document.getElementById('confirmAction');
        confirmBtn.onclick = function() {
            deleteUser(userId);
            closeConfirmationModal();
        };
        
        document.getElementById('confirmationModal').style.display = 'block';
    }
}

// Close the confirmation modal
function closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

// Delete user
function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find the user to delete
    const userIndex = users.findIndex(user => user.id === userId);
    const userName = users[userIndex].name;
    
    // Remove the user
    users = users.filter(user => user.id !== userId);
    
    // Save the updated list
    localStorage.setItem('users', JSON.stringify(users));
    
    // Refresh the user list
    loadUsers();
    
    // Show confirmation
    alert(`User ${userName} deleted successfully!`);
}