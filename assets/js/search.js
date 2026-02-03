// Sample data for demonstration
const sampleData = [
    {
        id: 1,
        name: "Sathya Narayanan",
        username: "Sathya",
        email: "sathya123@gmail.com",
        role: "student",
        department: "B.Sc CS",
        gender: "Male",
        applicationNo: "APP-1023",
        fullName: "Sathya Narayanan",
        registrationDate: "2024-01-15",
        status: "Active"
    },
    {
        id: 2,
        name: "Priya Sharma",
        username: "PriyaS",
        email: "priya.sharma@example.com",
        role: "teacher",
        department: "B.E CSE",
        gender: "Female",
        applicationNo: "APP-1024",
        fullName: "Priya Sharma",
        registrationDate: "2024-01-10",
        status: "Active"
    },
    {
        id: 3,
        name: "Rahul Verma",
        username: "RahulV",
        email: "rahul.verma@example.com",
        role: "student",
        department: "B.E ECE",
        gender: "Male",
        applicationNo: "APP-1025",
        fullName: "Rahul Verma",
        registrationDate: "2024-01-05",
        status: "Pending"
    },
    {
        id: 4,
        name: "Anjali Patel",
        username: "AnjaliP",
        email: "anjali.patel@example.com",
        role: "student",
        department: "BCA",
        gender: "Female",
        applicationNo: "APP-1026",
        fullName: "Anjali Patel",
        registrationDate: "2024-01-20",
        status: "Active"
    },
    {
        id: 5,
        name: "Rajesh Kumar",
        username: "RajeshK",
        email: "rajesh.kumar@example.com",
        role: "teacher",
        department: "B.Sc CS",
        gender: "Male",
        applicationNo: "APP-1027",
        fullName: "Rajesh Kumar",
        registrationDate: "2023-12-15",
        status: "Active"
    }
];

// Current state
let currentPage = 1;
const resultsPerPage = 3;
let currentResults = [];
let expandedRow = null;
let sessionStartTime = new Date();

// DOM elements
const searchForm = document.getElementById('searchForm');
const resultsBody = document.getElementById('resultsBody');
const emptyState = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');
const paginationContainer = document.getElementById('paginationContainer');
const pagination = document.getElementById('pagination');
const pageInfo = document.getElementById('pageInfo');
const logoutModal = document.getElementById('logoutModal');
const confirmLogoutBtn = document.getElementById('confirmLogout');
const userNameDisplay = document.getElementById('userNameDisplay');
const currentUserName = document.getElementById('currentUserName');
const currentUserEmail = document.getElementById('currentUserEmail');
const sessionTime = document.getElementById('sessionTime');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set user information (in a real app, this would come from auth system)
    const currentUser = {
        name: "Admin User",
        email: "admin@example.com",
        role: "Administrator"
    };
    
    userNameDisplay.textContent = currentUser.name;
    currentUserName.textContent = currentUser.name;
    currentUserEmail.textContent = currentUser.email;
    
    // Update session time
    updateSessionTime();
    setInterval(updateSessionTime, 60000); // Update every minute
    
    // Perform initial search with no filters
    performSearch();
    
    // Add event listener for form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        currentPage = 1;
        performSearch();
    });
    
    // Logout confirmation
    confirmLogoutBtn.addEventListener('click', function() {
        logoutUser();
    });
    
    // User profile button
    document.getElementById('userProfileBtn').addEventListener('click', function() {
        showUserProfile();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+L or Cmd+L for logout
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            const modal = new bootstrap.Modal(logoutModal);
            modal.show();
        }
        
        // Escape to close details
        if (e.key === 'Escape' && expandedRow) {
            toggleDetails(expandedRow);
        }
    });
});

// Update session time display
function updateSessionTime() {
    const now = new Date();
    const diffMs = now - sessionStartTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
        sessionTime.textContent = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
        sessionTime.textContent = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
        sessionTime.textContent = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
        sessionTime.textContent = 'Just now';
    }
}

// Perform search based on form values
function performSearch() {
    const role = document.getElementById('role').value;
    const username = document.getElementById('uname').value.toLowerCase().trim();
    
    // Filter sample data based on search criteria
    currentResults = sampleData.filter(item => {
        let matches = true;
        
        // Filter by role
        if (role && item.role !== role) {
            matches = false;
        }
        
        // Filter by username
        if (username && !item.username.toLowerCase().includes(username) && 
            !item.name.toLowerCase().includes(username)) {
            matches = false;
        }
        
        return matches;
    });
    
    // Update UI
    updateResults();
}

// Update results table and pagination
function updateResults() {
    // Clear previous results
    resultsBody.innerHTML = '';
    pagination.innerHTML = '';
    
    // Calculate pagination
    const totalResults = currentResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + resultsPerPage, totalResults);
    const pageResults = currentResults.slice(startIndex, endIndex);
    
    // Update result count
    resultCount.textContent = `${totalResults} result${totalResults !== 1 ? 's' : ''} found`;
    
    // Show/hide empty state
    if (totalResults === 0) {
        emptyState.style.display = 'block';
        paginationContainer.style.display = 'none';
        return;
    } else {
        emptyState.style.display = 'none';
        paginationContainer.style.display = 'flex';
    }
    
    // Update page info
    pageInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${totalResults}`;
    
    // Generate table rows
    pageResults.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'result-row';
        row.dataset.id = item.id;
        
        // Status badge based on role
        const statusClass = item.role === 'student' ? 'status-student' : 'status-teacher';
        const statusText = item.role.charAt(0).toUpperCase() + item.role.slice(1);
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${item.department}</td>
            <td>${item.gender}</td>
            <td>
                <button class="btn-view" onclick="toggleDetails(${item.id})" id="viewBtn-${item.id}">
                    <i class="bi bi-eye"></i> View
                </button>
            </td>
        `;
        
        resultsBody.appendChild(row);
        
        // Create details row (initially hidden)
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'details-row';
        detailsRow.id = `details-${item.id}`;
        detailsRow.style.display = 'none';
        
        detailsRow.innerHTML = `
            <td colspan="7">
                <div class="details-container">
                    <div class="details-grid">
                        <div class="detail-item">
                            <div class="detail-label">Full Name</div>
                            <div class="detail-value">${item.fullName}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Username</div>
                            <div class="detail-value">${item.username}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Email</div>
                            <div class="detail-value">${item.email}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Role</div>
                            <div class="detail-value">${statusText}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Department</div>
                            <div class="detail-value">${item.department}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Gender</div>
                            <div class="detail-value">${item.gender}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Application No.</div>
                            <div class="detail-value">${item.applicationNo}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Registration Date</div>
                            <div class="detail-value">${item.registrationDate}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Status</div>
                            <div class="detail-value">${item.status}</div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-sm btn-outline-primary me-2">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-success me-2">
                            <i class="bi bi-check-circle"></i> Approve
                        </button>
                        <button class="btn btn-sm btn-outline-danger">
                            <i class="bi bi-x-circle"></i> Reject
                        </button>
                    </div>
                </div>
            </td>
        `;
        
        resultsBody.appendChild(detailsRow);
    });
    
    // Generate pagination
    if (totalPages > 1) {
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        `;
        pagination.appendChild(prevLi);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${currentPage === i ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
            pagination.appendChild(li);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        `;
        pagination.appendChild(nextLi);
    }
}

// Toggle details view
function toggleDetails(id) {
    const detailsRow = document.getElementById(`details-${id}`);
    const viewBtn = document.getElementById(`viewBtn-${id}`);
    
    // Close previously expanded row
    if (expandedRow && expandedRow !== id) {
        const prevDetailsRow = document.getElementById(`details-${expandedRow}`);
        const prevViewBtn = document.getElementById(`viewBtn-${expandedRow}`);
        
        if (prevDetailsRow) {
            prevDetailsRow.style.display = 'none';
        }
        
        if (prevViewBtn) {
            prevViewBtn.innerHTML = '<i class="bi bi-eye"></i> View';
            prevViewBtn.classList.remove('active');
        }
    }
    
    // Toggle current row
    if (detailsRow.style.display === 'none') {
        detailsRow.style.display = '';
        viewBtn.innerHTML = '<i class="bi bi-eye-slash"></i> Hide';
        viewBtn.classList.add('active');
        expandedRow = id;
        
        // Scroll to details if needed
        detailsRow.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    } else {
        detailsRow.style.display = 'none';
        viewBtn.innerHTML = '<i class="bi bi-eye"></i> View';
        viewBtn.classList.remove('active');
        expandedRow = null;
    }
}

// Change page
function changePage(page) {
    if (page < 1 || page > Math.ceil(currentResults.length / resultsPerPage)) {
        return;
    }
    
    currentPage = page;
    updateResults();
    
    // Scroll to top of results
    document.querySelector('.result-container').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Clear search form
function clearSearch() {
    document.getElementById('role').value = '';
    document.getElementById('uname').value = '';
    currentPage = 1;
    performSearch();
    showNotification('Search filters cleared');
}

// Refresh results
function refreshResults() {
    performSearch();
    showNotification('Results refreshed');
}

// Export results to CSV
function exportToCSV() {
    if (currentResults.length === 0) {
        alert('No data to export');
        return;
    }
    
    // Create CSV content
    const headers = ['Name', 'Username', 'Email', 'Role', 'Department', 'Gender', 'Application No.', 'Status'];
    const csvRows = [
        headers.join(','),
        ...currentResults.map(item => [
            `"${item.name}"`,
            `"${item.username}"`,
            `"${item.email}"`,
            `"${item.role}"`,
            `"${item.department}"`,
            `"${item.gender}"`,
            `"${item.applicationNo}"`,
            `"${item.status}"`
        ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('Export completed successfully');
}

// Logout user
function logoutUser() {
    // Show loading state
    confirmLogoutBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Logging out...';
    confirmLogoutBtn.disabled = true;
    
    // Simulate logout process
    setTimeout(() => {
        // Close modal
        const modal = bootstrap.Modal.getInstance(logoutModal);
        modal.hide();
        
        // Show logout success message
        showNotification('Successfully logged out. Redirecting to login page...', 'success');
        
        // Redirect to login page after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1000);
}

// Show user profile
function showUserProfile() {
    showNotification('User profile feature coming soon!', 'info');
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1050';
    notification.style.minWidth = '300px';
    
    const icon = type === 'success' ? 'bi-check-circle' : 
                type === 'info' ? 'bi-info-circle' : 
                'bi-exclamation-triangle';
    
    notification.innerHTML = `
        <i class="bi ${icon} me-2"></i>
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