// Auto redirect to dashboard after 10 seconds
let redirectTimer;
let timeLeft = 10;

function startRedirectTimer() {
    const timerElement = document.getElementById('redirectTimer');
    if (timerElement) {
        timerElement.textContent = timeLeft;
    }
    
    redirectTimer = setInterval(() => {
        timeLeft--;
        if (timerElement) {
            timerElement.textContent = timeLeft;
        }
        
        if (timeLeft <= 0) {
            clearInterval(redirectTimer);
            redirectToDashboard();
        }
    }, 1000);
}

function redirectToDashboard() {
    // In a real application, you would redirect to the dashboard
    // window.location.href = 'dashboard.html';
    
    // For demo, we'll just show an alert
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.style.opacity = '0.7';
    });
    
    setTimeout(() => {
        alert('Auto-redirecting to Dashboard...');
        // Reset for demo
        optionCards.forEach(card => {
            card.style.opacity = '1';
        });
        timeLeft = 10;
        startRedirectTimer();
    }, 500);
}

function extendSession() {
    // Simulate extending session
    clearInterval(redirectTimer);
    timeLeft = 30;
    startRedirectTimer();
    
    // Show notification
    showNotification('Session extended by 30 minutes');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1050';
    notification.innerHTML = `
        <i class="bi bi-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Add click effects to option cards
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start the redirect timer
    // Uncomment to enable auto-redirect
    // startRedirectTimer();
    
    // Add user greeting based on time of day
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    document.querySelector('.success-message h3').textContent = `${greeting}! Login Successful`;
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + 1: Go to Dashboard
    if (e.altKey && e.key === '1') {
        window.location.href = 'dashboard.html';
    }
    // Alt + 2: Search Applications
    else if (e.altKey && e.key === '2') {
        window.location.href = 'search.html';
    }
    // Alt + 3: Register New Account
    else if (e.altKey && e.key === '3') {
        window.location.href = 'register.html';
    }
    // Escape: Go back to login
    else if (e.key === 'Escape') {
        window.location.href = 'index.html';
    }
});