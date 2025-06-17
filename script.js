
// Mobile Navigation Toggle
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

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Modal Functions
function openModal() {
    document.getElementById('registrationModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('registrationModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('registrationModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Close button functionality
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

});


// Google Maps Function
function openGoogleMaps() {
    const address = 'Dribble Klub, Aamwala,Dehradun Uttarakhand 248001'; // Replace with your actual address
    const encodedAddress = encodeURIComponent(address);
    const mapsURL = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsURL, '_blank');
}

// Contact WhatsApp Function
function openContactWhatsApp() {
    const phoneNumber = '+919900559606'; // Replace with your organization's WhatsApp number
    const message = 'Hi! I would like to get in touch regarding DribbleKlub services. Please provide more information about your facilities and booking process.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Team Registration Form
const teamRegistrationForm = document.getElementById('teamRegistrationForm');
if (teamRegistrationForm) {
    teamRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const teamData = {
            teamName: formData.get('teamName'),
            captainName: formData.get('captainName'),
            phoneNumber: formData.get('phoneNumber'),
            email: formData.get('email'),
            sport: formData.get('sport'),
            players: formData.get('players')
        };
        
        // Simulate form submission
        showNotification('Team registered successfully! Welcome to TurfPro!', 'success');
        
        // Reset form
        this.reset();
        
        // Add team to leaderboard (simulation)
        addTeamToLeaderboard(teamData.teamName);
    });
}

// Team Search Functionality
function searchTeam() {
    const searchInput = document.getElementById('teamSearch');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showNotification('Please enter a team name to search', 'warning');
        return;
    }
    
    // Simulate search results
    const mockTeams = {
        'thunder bolts': {
            gamesPlayed: 28,
            wins: 24,
            losses: 4,
            winRate: '85.7%',
            points: 2850,
            rank: 1
        },
        'fire eagles': {
            gamesPlayed: 25,
            wins: 20,
            losses: 5,
            winRate: '80.0%',
            points: 2720,
            rank: 2
        },
        'storm riders': {
            gamesPlayed: 23,
            wins: 18,
            losses: 5,
            winRate: '78.3%',
            points: 2650,
            rank: 3
        }
    };
    
    const team = mockTeams[searchTerm];
    
    if (team) {
        displayTeamStats(searchTerm, team);
        showNotification('Team found!', 'success');
    } else {
        showNotification('Team not found. Please check the spelling and try again.', 'error');
    }
}

// Display team statistics
function displayTeamStats(teamName, stats) {
    const statsContainer = document.querySelector('.stats-grid');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat-card">
                <h4>${teamName.charAt(0).toUpperCase() + teamName.slice(1)}</h4>
                <div class="stat-item">
                    <span class="stat-label">Rank:</span>
                    <span class="stat-value">#${stats.rank}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Games Played:</span>
                    <span class="stat-value">${stats.gamesPlayed}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Wins:</span>
                    <span class="stat-value">${stats.wins}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Losses:</span>
                    <span class="stat-value">${stats.losses}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Win Rate:</span>
                    <span class="stat-value">${stats.winRate}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Points:</span>
                    <span class="stat-value">${stats.points}</span>
                </div>
            </div>
        `;
    }
}

// Add team to leaderboard
function addTeamToLeaderboard(teamName) {
    const leaderboardList = document.querySelector('.leaderboard-list');
    if (leaderboardList) {
        const newTeam = document.createElement('div');
        newTeam.className = 'team-rank';
        newTeam.innerHTML = `
            <span class="rank">6</span>
            <span class="team-name">${teamName}</span>
            <span class="points">1000</span>
        `;
        leaderboardList.appendChild(newTeam);
    }
}

// Notification system
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

// Gallery auto-scroll pause on hover
const galleryTrack = document.querySelector('.gallery-track');
if (galleryTrack) {
    galleryTrack.addEventListener('mouseenter', () => {
        galleryTrack.style.animationPlayState = 'paused';
    });
    
    galleryTrack.addEventListener('mouseleave', () => {
        galleryTrack.style.animationPlayState = 'running';
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Booking button functionality
document.querySelectorAll('.pricing-card .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const cardHeader = this.closest('.pricing-card').querySelector('.card-header h3');
        const planName = cardHeader.textContent;
        showNotification(`Redirecting to booking for ${planName}...`, 'info');
        
        // Here you would typically redirect to a booking page
        setTimeout(() => {
            showNotification('Booking system integration coming soon!', 'warning');
        }, 1500);
    });
});

// Enter key support for team search
document.getElementById('teamSearch')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchTeam();
    }
});

// Form validation enhancements
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ff6b35';
        } else {
            this.style.borderColor = '#333333';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(255, 107, 53)' && this.value.trim()) {
            this.style.borderColor = '#00ff88';
        }
    });
});

console.log('TurfPro website loaded successfully!');
