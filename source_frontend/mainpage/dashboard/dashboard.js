// Check login status
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        location.href = '../../login/login.html';
    }
    // Initialize dashboard data
    updateDashboard();
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    location.href = '../../login/login.html';
}

// Sample data - would be replaced by API calls in production
const users = [
    { id: 1, name: "John Smith", email: "john@example.com", phone: "123-456-7890", status: "active", storageUsed: 7.8, storageLimit: 10, lastActive: "2025-03-14" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "234-567-8901", status: "active", storageUsed: 5.2, storageLimit: 10, lastActive: "2025-03-15" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "345-678-9012", status: "inactive", storageUsed: 2.5, storageLimit: 5, lastActive: "2025-03-01" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", phone: "456-789-0123", status: "active", storageUsed: 4.7, storageLimit: 10, lastActive: "2025-03-12" },
    { id: 5, name: "Robert Wilson", email: "robert@example.com", phone: "567-890-1234", status: "active", storageUsed: 9.1, storageLimit: 10, lastActive: "2025-03-15" }
];

function updateDashboard() {
    // Update stats
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === "active").length;
    const totalStorage = users.reduce((sum, user) => sum + user.storageUsed, 0).toFixed(1);
    const averageUsage = (users.reduce((sum, user) => sum + (user.storageUsed / user.storageLimit * 100), 0) / users.length).toFixed(1);
    
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('active-users').textContent = activeUsers;
    document.getElementById('total-storage').textContent = `${totalStorage} GB`;
    document.getElementById('average-usage').textContent = `${averageUsage}%`;
    
    // Populate user table
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="user-name">
                    <span class="avatar">${user.name.charAt(0)}</span>
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><span class="status ${user.status}">${user.status}</span></td>
            <td>
                <div class="storage-info">
                    <div class="storage-bar">
                        <div class="storage-fill" style="width: ${(user.storageUsed / user.storageLimit * 100)}%"></div>
                    </div>
                    <span>${user.storageUsed} / ${user.storageLimit} GB</span>
                </div>
            </td>
            <td>
                <button class="action-btn" onclick="viewUserDetails(${user.id})">
                    <i class="ri-eye-line"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Set initial user details (first user)
    viewUserDetails(1);
}

function viewUserDetails(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    document.getElementById('detail-user-name').textContent = user.name;
    document.getElementById('detail-user-email').textContent = user.email;
    document.getElementById('detail-storage-used').textContent = `${user.storageUsed} GB`;
    document.getElementById('detail-storage-limit').textContent = `${user.storageLimit} GB`;
    document.getElementById('detail-usage-percent').textContent = `${(user.storageUsed / user.storageLimit * 100).toFixed(1)}%`;
    document.getElementById('detail-last-active').textContent = user.lastActive;
    
    // Update circular progress
    const percentage = (user.storageUsed / user.storageLimit * 100);
    const circle = document.querySelector('.circular-progress .progress');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference - (percentage / 100) * circumference;
    document.querySelector('.circular-progress .percentage').textContent = `${percentage.toFixed(0)}%`;
    
    // Update all user rows to highlight selected
    document.querySelectorAll('#user-table-body tr').forEach(row => {
        row.classList.remove('selected');
    });
    
    document.querySelectorAll(`#user-table-body tr`).forEach((row, index) => {
        if (users[index].id === userId) {
            row.classList.add('selected');
        }
    });
}