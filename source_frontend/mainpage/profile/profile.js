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

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Profile edit functionality
    const editProfileBtn = document.querySelector('.profile-actions .btn.primary');
    const saveChangesBtn = document.querySelector('.profile-footer .btn.primary');
    const cancelBtn = document.querySelector('.profile-footer .btn.secondary');
    const infoItems = document.querySelectorAll('.info-item p');
    const profileName = document.querySelector('.profile-info h2');
    const profileEmail = document.querySelector('.profile-info p:nth-of-type(2)');
    const profilePhone = document.querySelector('.profile-info p:nth-of-type(3)');
    
    // Original values storage
    let originalValues = {};
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    
    // Change password button
    const changePasswordBtn = document.querySelector('.security-action .btn.secondary');
    
    // Make fields editable
    editProfileBtn.addEventListener('click', function() {
        // Store original values before editing
        originalValues.name = profileName.textContent;
        originalValues.email = profileEmail.textContent.replace('osas@osas.com', '').trim();
        originalValues.phone = profilePhone.textContent.replace('+1 (555) 123-4567', '').trim();
        
        infoItems.forEach(item => {
            const originalText = item.textContent;
            originalValues[item.previousElementSibling.textContent] = originalText;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalText;
            input.className = 'edit-input';
            input.style.width = '100%';
            input.style.padding = '8px';
            input.style.border = '1px solid #ddd';
            input.style.borderRadius = '4px';
            
            item.parentNode.replaceChild(input, item);
        });
        
        saveChangesBtn.style.display = 'inline-flex';
        cancelBtn.style.display = 'inline-flex';
        editProfileBtn.style.display = 'none';
    });
    
    // Cancel edits
    cancelBtn.addEventListener('click', function() {
        // Revert to original values
        const inputs = document.querySelectorAll('.edit-input');
        
        inputs.forEach(input => {
            const label = input.previousElementSibling.textContent;
            const p = document.createElement('p');
            p.textContent = originalValues[label];
            
            input.parentNode.replaceChild(p, input);
        });
        
        profileName.textContent = originalValues.name;
        
        saveChangesBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        editProfileBtn.style.display = 'inline-flex';
    });
    
    // Save changes
    saveChangesBtn.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.edit-input');
        const newValues = {};
        
        // Save new values
        inputs.forEach(input => {
            const label = input.previousElementSibling.textContent;
            newValues[label] = input.value;
            
            const p = document.createElement('p');
            p.textContent = input.value;
            
            input.parentNode.replaceChild(p, input);
        });
        
        // Update profile header if name or contact info changed
        if (newValues['Full Name']) {
            profileName.textContent = newValues['Full Name'];
        }
        if (newValues['Email']) {
            profileEmail.innerHTML = '<i class="ri-mail-line"></i> ' + newValues['Email'];
        }
        if (newValues['Phone']) {
            profilePhone.innerHTML = '<i class="ri-phone-line"></i> ' + newValues['Phone'];
        }
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
        
        saveChangesBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        editProfileBtn.style.display = 'inline-flex';
    });
    
    // Toggle switches functionality
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.id.split('-')[0];
            const status = this.checked ? 'enabled' : 'disabled';
            
            showNotification(`${formatSettingName(setting)} ${status} successfully!`, 'info');
        });
    });
    
    // Change password
    changePasswordBtn.addEventListener('click', function() {
        // Create a modal for password change
        const modal = createPasswordModal();
        document.body.appendChild(modal);
        
        // Show the modal
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.password-modal-content').style.transform = 'translateY(0)';
        }, 10);
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            showNotification(`Search functionality would be implemented here for: "${this.value}"`, 'info');
            this.value = '';
        }
    });
});

// Helper function to format setting names
function formatSettingName(setting) {
    switch(setting) {
        case 'tfa':
            return 'Two-factor authentication';
        case 'email':
            return 'Email notifications';
        case 'alerts':
            return 'System alerts';
        case 'reports':
            return 'User activity reports';
        default:
            return setting;
    }
}

// Create notification element
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        color: 'white',
        fontSize: '14px'
    });
    
    // Set color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#34c759';
            break;
        case 'error':
            notification.style.backgroundColor = '#ff3b30';
            break;
        case 'info':
        default:
            notification.style.backgroundColor = '#007aff';
            break;
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Create password change modal
function createPasswordModal() {
    const modal = document.createElement('div');
    modal.className = 'password-modal';
    
    // Style the modal overlay
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    modal.innerHTML = `
        <div class="password-modal-content" style="
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            width: 400px;
            max-width: 90%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        ">
            <h3 style="margin-top:0;color:#333;margin-bottom:20px;">Change Password</h3>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;font-size:14px;color:#777;margin-bottom:5px;">Current Password</label>
                <input type="password" id="current-password" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:4px;">
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;font-size:14px;color:#777;margin-bottom:5px;">New Password</label>
                <input type="password" id="new-password" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:4px;">
            </div>
            
            <div style="margin-bottom:20px;">
                <label style="display:block;font-size:14px;color:#777;margin-bottom:5px;">Confirm New Password</label>
                <input type="password" id="confirm-password" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:4px;">
            </div>
            
            <div style="display:flex;justify-content:flex-end;gap:10px;">
                <button id="cancel-password" style="padding:8px 16px;background:#f0f0f0;color:#333;border:none;border-radius:4px;cursor:pointer;">Cancel</button>
                <button id="save-password" style="padding:8px 16px;background:#034000;color:white;border:none;border-radius:4px;cursor:pointer;">Save Changes</button>
            </div>
        </div>
    `;
    
    // Add event listeners after appending to DOM
    setTimeout(() => {
        // Close modal on cancel
        const cancelBtn = document.getElementById('cancel-password');
        cancelBtn.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // Close modal on clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Save password
        const saveBtn = document.getElementById('save-password');
        saveBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Simple validation
            if (!currentPassword || !newPassword || !confirmPassword) {
                showNotification('All fields are required', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            // Close modal
            closeModal(modal);
            
            // Show success message
            showNotification('Password changed successfully!', 'success');
        });
    }, 10);
    
    return modal;
}

// Close modal
function closeModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.password-modal-content').style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        if (modal.parentNode) {
            document.body.removeChild(modal);
        }
    }, 300);
}