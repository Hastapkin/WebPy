// Function to validate the login credentials
function validateLogin() {
    // Get the values of the username and password input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    // Check if the entered username and password match the predefined values
    if ((username === 'admin' ) && password === 'admin') {
        // If the credentials are correct, set the login status in localStorage and redirect to the dashboard
        localStorage.setItem('isLoggedIn', 'true');
        location.href = '../mainpage/dashboard/dashboard.html'; // Corrected path to the dashboard.html file
    } else {
        // If the credentials are incorrect, display an error message
        errorMessage.textContent = 'Wrong username/password';
    }
}
// Function to check if the user is already logged in
window.onload = function() {
    // If the user is logged in, redirect to the dashboard
    if (localStorage.getItem('isLoggedIn') === 'true') {
        location.href = '../mainpage/dashboard/dashboard.html'; // Corrected path to the dashboard.html file
    }
}