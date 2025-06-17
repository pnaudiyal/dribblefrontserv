
// Admin Login Functionality
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        // Simple authentication (in production, use proper authentication)
        if (username === 'admin' && password === 'dribble123') {
            adminLogin.style.display = 'none';
            adminDashboard.style.display = 'block';
            showNotification('Login successful! Welcome to admin panel.', 'success');
        } else {
            showNotification('Invalid credentials. Try admin/dribble123', 'error');
        }
    });
}

// Admin Tab Functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName + 'Tab').style.display = 'block';
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Admin Logout
function adminLogout() {
    adminLogin.style.display = 'block';
    adminDashboard.style.display = 'none';
    document.getElementById('adminLoginForm').reset();
    showNotification('Logged out successfully.', 'info');
}

// Match Result Form
const matchResultForm = document.getElementById('matchResultForm');
if (matchResultForm) {
    matchResultForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const matchData = {
            date: formData.get('matchDate'),
            time: formData.get('matchTime'),
            team1: formData.get('team1'),
            team2: formData.get('team2'),
            team1Score: formData.get('team1Score'),
            team2Score: formData.get('team2Score'),
            sport: formData.get('matchSport'),
            notes: formData.get('matchNotes')
        };
        
        // Validate teams are different
        if (matchData.team1 === matchData.team2) {
            showNotification('Please select different teams for the match.', 'error');
            return;
        }
        
        // Simulate saving match result
        console.log('Match Result:', matchData);
        showNotification('Match result added successfully!', 'success');
        
        // Reset form
        this.reset();
        
        // Here you would typically send the data to a backend server
        updateLeaderboard(matchData);
    });
}

// Update leaderboard based on match result
function updateLeaderboard(matchData) {
    const team1Score = parseInt(matchData.team1Score);
    const team2Score = parseInt(matchData.team2Score);
    
    let winner, loser;
    
    if (team1Score > team2Score) {
        winner = matchData.team1;
        loser = matchData.team2;
    } else if (team2Score > team1Score) {
        winner = matchData.team2;
        loser = matchData.team1;
    } else {
        // It's a draw - both teams get points but no win/loss
        showNotification(`Match between ${matchData.team1} and ${matchData.team2} ended in a draw.`, 'info');
        return;
    }
    
    showNotification(`${winner} defeated ${loser} ${Math.max(team1Score, team2Score)}-${Math.min(team1Score, team2Score)}`, 'success');
}

// Team Management Functions
function editTeam(teamName) {
    showNotification(`Edit functionality for ${teamName} coming soon!`, 'info');
}

function deleteTeam(teamName) {
    if (confirm(`Are you sure you want to delete ${teamName}?`)) {
        showNotification(`${teamName} would be deleted (demo mode)`, 'warning');
    }
}

// Notification system (reuse from main script)
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6b35' : type === 'warning' ? '#ffa500' : '#007bff'};
        color: ${type === 'success' || type === 'warning' ? '#000' : '#fff'};
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 20px;
                cursor: pointer;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Mobile Navigation Toggle (reuse from main script)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

console.log('Admin panel loaded successfully!');
