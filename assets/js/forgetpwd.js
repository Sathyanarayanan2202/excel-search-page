// Form validation and submission
document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    
    // Basic validation
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('email').focus();
        return;
    }
    
    // Simulate sending reset link
    const resetBtn = document.querySelector('.btn-reset');
    const originalText = resetBtn.innerHTML;
    
    resetBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Reset Link...';
    resetBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        document.getElementById('successMessage').classList.add('show');
        
        // Reset button text
        resetBtn.innerHTML = originalText;
        resetBtn.disabled = false;
        
        // Scroll to success message
        document.getElementById('successMessage').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
        
        // Reset form
        document.getElementById('forgotForm').reset();
    }, 1500);
});

// Resend link functionality
document.getElementById('resendLink').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    
    if (!email) {
        alert('Please enter your email address first');
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
    
    // Simulate resending
    const successMessage = document.getElementById('successMessage');
    const originalHTML = successMessage.innerHTML;
    
    successMessage.innerHTML = `
        <div class="text-center">
            <span class="spinner-border spinner-border-sm me-2 text-primary" role="status" aria-hidden="true"></span>
            <span>Resending reset link...</span>
        </div>
    `;
    
    setTimeout(() => {
        successMessage.innerHTML = originalHTML;
        
        // Update success message for resend
        const h5 = successMessage.querySelector('h5');
        const p = successMessage.querySelector('p');
        
        h5.textContent = 'Reset Link Resent!';
        p.innerHTML = `We've sent another password reset link to <strong>${email}</strong>.`;
        
        // Reattach event listener for resend link
        document.getElementById('resendLink').addEventListener('click', arguments.callee);
        
        // Show temporary success animation
        successMessage.style.backgroundColor = '#d1ecf1';
        successMessage.style.borderColor = '#bee5eb';
        successMessage.style.color = '#0c5460';
        
        setTimeout(() => {
            successMessage.style.backgroundColor = '#d4edda';
            successMessage.style.borderColor = '#c3e6cb';
            successMessage.style.color = '#155724';
        }, 1000);
    }, 1000);
});

// Add focus effect to input
const emailInput = document.getElementById('email');
emailInput.addEventListener('focus', function() {
    this.parentElement.parentElement.classList.add('focused');
});

emailInput.addEventListener('blur', function() {
    this.parentElement.parentElement.classList.remove('focused');
});

// Pre-fill email from URL parameter (if provided)
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Check if email parameter exists in URL
const emailParam = getParameterByName('email');
if (emailParam) {
    document.getElementById('email').value = emailParam;
}