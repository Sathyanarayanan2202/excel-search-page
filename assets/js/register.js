// Toggle password visibility for both password fields
document.getElementById('togglePassword1').addEventListener('click', function() {
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

document.getElementById('togglePassword2').addEventListener('click', function() {
    const passwordInput = document.getElementById('c-pwd');
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
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const role = document.getElementById('role').value;
    const username = document.getElementById('uname').value.trim();
    const fullname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const department = document.getElementById('course').value;
    const password = document.getElementById('pwd').value;
    const confirmPassword = document.getElementById('c-pwd').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation checks
    if (!role) {
        alert('Please select your role');
        document.getElementById('role').focus();
        return;
    }
    
    if (!username) {
        alert('Please enter a username');
        document.getElementById('uname').focus();
        return;
    }
    
    if (!fullname) {
        alert('Please enter your full name');
        document.getElementById('fname').focus();
        return;
    }
    
    if (!email) {
        alert('Please enter your email address');
        document.getElementById('email').focus();
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('email').focus();
        return;
    }
    
    if (!gender) {
        alert('Please select your gender');
        return;
    }
    
    if (!department) {
        alert('Please select your department');
        document.getElementById('course').focus();
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        document.getElementById('pwd').focus();
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        document.getElementById('c-pwd').focus();
        return;
    }
    
    if (!terms) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        document.getElementById('terms').focus();
        return;
    }
    
    // Simulate registration process
    const registerBtn = document.querySelector('.btn-register');
    const originalText = registerBtn.innerHTML;
    
    registerBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Creating Account...';
    registerBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Registration successful! Welcome ${fullname}. Please check your email to verify your account.`);
        registerBtn.innerHTML = originalText;
        registerBtn.disabled = false;
        
        // In a real application, you would redirect to login or dashboard here
        // window.location.href = 'index.html';
    }, 2000);
});

// Add focus effect to inputs
const inputs = document.querySelectorAll('.form-control, .form-select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.classList.remove('focused');
    });
});

// Real-time password match validation
const passwordInput = document.getElementById('pwd');
const confirmPasswordInput = document.getElementById('c-pwd');

function validatePasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (password && confirmPassword) {
        if (password === confirmPassword) {
            confirmPasswordInput.style.borderColor = '#28a745';
        } else {
            confirmPasswordInput.style.borderColor = '#dc3545';
        }
    } else {
        confirmPasswordInput.style.borderColor = '#e9ecef';
    }
}

passwordInput.addEventListener('input', validatePasswordMatch);
confirmPasswordInput.addEventListener('input', validatePasswordMatch);
