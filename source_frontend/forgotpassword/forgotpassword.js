// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form elements
    const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
    const emailInput = document.querySelector('input[placeholder="Email"]');
    const buttons = document.querySelectorAll('.forgotpassword-container button');
    
    // Add event listeners to the submit buttons
    buttons[0].addEventListener('click', function() {
        handlePhoneSubmit();
    });
    
    buttons[1].addEventListener('click', function() {
        handleEmailSubmit();
    });
    
    // Function to validate phone number
    function validatePhone(phone) {
        // Basic validation for phone number (10 digits)
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
    
    // Function to validate email
    function validateEmail(email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to handle phone submission
    function handlePhoneSubmit() {
        const phone = phoneInput.value.trim();
        
        if (!phone) {
            alert('Please enter your phone number');
            return;
        }
        
        if (!validatePhone(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        
        // If validation passes, send reset link via SMS
        sendResetRequest({phone: phone}, 'phone');
    }
    
    // Function to handle email submission
    function handleEmailSubmit() {
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // If validation passes, send reset link via email
        sendResetRequest({email: email}, 'email');
    }
    
    // Function to send reset request to the server
    function sendResetRequest(data, type) {
        // Display loading state
        const button = type === 'phone' ? buttons[0] : buttons[1];
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate API call with setTimeout (replace with actual fetch in production)
        setTimeout(function() {
            // Simulate successful response
            button.textContent = originalText;
            button.disabled = false;
            
            // Show success message
            if (type === 'phone') {
                alert('Password reset instructions sent to your phone number');
                phoneInput.value = '';
            } else {
                alert('Password reset instructions sent to your email');
                emailInput.value = '';
            }
        }, 1500);
    }
});