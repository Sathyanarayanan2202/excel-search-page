// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('pwd');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
});

// Form validation and submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('uname').value.trim();
    const password = document.getElementById('pwd').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!username) {
        alert('Please enter your username or email');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Simulate login process
    const loginBtn = document.querySelector('.btn-login');
    const originalText = loginBtn.innerHTML;
    
    loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Signing in...';
    loginBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Login successful! Welcome, ${username}`);
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
        
        // In a real application, you would redirect or update the UI here
        // window.location.href = 'dashboard.html';
    }, 1500);
});

// Google login button handler
document.getElementById('googleLogin').addEventListener('click', function() {
    const googleBtn = this;
    const originalText = googleBtn.innerHTML;
    
    googleBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Connecting to Google...';
    googleBtn.disabled = true;
    
    // Simulate Google OAuth process
    setTimeout(() => {
        alert('Redirecting to Google for authentication...');
        googleBtn.innerHTML = originalText;
        googleBtn.disabled = false;
        
        // In a real application, you would redirect to Google OAuth here
        // window.location.href = 'https://accounts.google.com/o/oauth2/auth?...';
    }, 1000);
});

// Add focus effect to inputs
const inputs = document.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.parentElement.classList.remove('focused');
    });
});