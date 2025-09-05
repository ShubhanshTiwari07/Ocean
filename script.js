/**
 * WAVEGUARDIAN - OCEAN SAFETY WEBSITE
 * JavaScript for handling all interactive elements
 */

// =============================================
// UTILITY FUNCTIONS
// =============================================

// DOM ready utility
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Smooth scrolling utility
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// =============================================
// LOGIN PAGE FUNCTIONALITY
// =============================================

function initLoginPage() {
    // Password toggle functionality
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            // Update icon (you can replace this with actual icon toggle)
            const icon = passwordToggle.querySelector('.eye-icon');
            if (icon) {
                icon.innerHTML = isPassword ? 
                    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>' :
                    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
            }
        });
    }
    
    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Basic validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Signing in...';
            submitButton.disabled = true;
            
            // Simulate login process
            setTimeout(() => {
                showNotification('Login successful! Redirecting...', 'success');
                
                // Redirect to home page after successful login
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }, 1500);
        });
    }
    
    // Social login buttons
    const twitterLogin = document.getElementById('twitterLogin');
    const instagramLogin = document.getElementById('instagramLogin');
    
    if (twitterLogin) {
        twitterLogin.addEventListener('click', function() {
            showNotification('Twitter login not implemented in demo', 'info');
        });
    }
    
    if (instagramLogin) {
        instagramLogin.addEventListener('click', function() {
            showNotification('Instagram login not implemented in demo', 'info');
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =============================================
// NAVIGATION FUNCTIONALITY
// =============================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    const pageMap = {
        'home': 'home.html',
        'explore': 'explore.html',
        'login': 'login.html',
        'alerts': '#',
        'settings': '#'
    };
    
    const url = pageMap[page];
    
    if (url && url !== '#') {
        // Add page transition effect
        document.body.style.opacity = '0.8';
        document.body.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            window.location.href = url;
        }, 200);
    } else {
        showNotification(`${page} page not implemented in demo`, 'info');
    }
}

// =============================================
// HOME PAGE FUNCTIONALITY
// =============================================

function initHomePage() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // In a real app, this would filter hazard data
            console.log('Searching for:', query);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showNotification(`Searching for: ${query}`, 'info');
                    // In a real app, this would perform the search
                }
            }
        });
    }
    
    // Hazard item interactions
    const hazardItems = document.querySelectorAll('.hazard-item');
    hazardItems.forEach(item => {
        item.addEventListener('click', function() {
            const hazardType = this.querySelector('h4').textContent;
            showNotification(`Opening details for: ${hazardType}`, 'info');
            // In a real app, this would show detailed hazard information
        });
    });
    
    // Social media buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Social media integration not implemented in demo', 'info');
        });
    });
    
    // Auto-refresh hazard feed (simulate real-time updates)
    setInterval(() => {
        updateHazardFeedTimestamps();
    }, 60000); // Update every minute
}

function updateHazardFeedTimestamps() {
    const timeElements = document.querySelectorAll('.hazard-item .time');
    timeElements.forEach(element => {
        let currentTime = element.textContent;
        let match = currentTime.match(/(\d+) mins ago/);
        
        if (match) {
            let minutes = parseInt(match[1]) + 1;
            element.textContent = `${minutes} mins ago`;
        }
    });
}

// =============================================
// EXPLORE PAGE FUNCTIONALITY
// =============================================

function initExplorePage() {
    // Search functionality (same as home page)
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            console.log('Searching for:', query);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showNotification(`Searching for: ${query}`, 'info');
                }
            }
        });
    }
    
    // Get Started button
    const getStartedBtn = document.querySelector('.hero-text .btn-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            showNotification('Welcome to WaveGuardian! 🌊', 'success');
            // Scroll to insights section
            const insightsSection = document.querySelector('.insights-section');
            if (insightsSection) {
                smoothScrollTo(insightsSection);
            }
        });
    }
    
    // Insight card interactions
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            showNotification(`Viewing detailed ${cardTitle} information`, 'info');
            // In a real app, this would show detailed insight data
        });
    });
    
    // Animate UV progress circle
    animateUVProgress();
    
    // Update tide data periodically
    setInterval(() => {
        updateTideData();
    }, 300000); // Update every 5 minutes
}

function animateUVProgress() {
    const progressCircle = document.querySelector('.progress-ring circle:last-child');
    if (progressCircle) {
        const circumference = 2 * Math.PI * 40; // radius = 40
        const uvValue = 8; // Current UV value
        const maxUV = 12; // Maximum UV scale
        const progress = (uvValue / maxUV) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference - progress;
        
        // Animate the progress
        setTimeout(() => {
            progressCircle.style.transition = 'stroke-dashoffset 1s ease-out';
            progressCircle.style.strokeDashoffset = circumference - progress;
        }, 500);
    }
}

function updateTideData() {
    // In a real app, this would fetch updated tide data from an API
    console.log('Updating tide data...');
}

// =============================================
// GENERAL INTERACTIVE FEATURES
// =============================================

function initGeneralFeatures() {
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Initialize smooth scrolling for internal links
    initSmoothScrolling();
    
    // Add hover effects to cards
    initCardHoverEffects();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
}

function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .btn-social, .nav-item');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation to CSS if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .insight-card, .hazard-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initKeyboardNavigation() {
    // Add keyboard support for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-item, .hazard-item, .insight-card');
    
    interactiveElements.forEach(element => {
        // Make elements focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event listeners
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// =============================================
// PAGE DETECTION AND INITIALIZATION
// =============================================

function detectPageAndInit() {
    const body = document.body;
    
    // Initialize general features for all pages
    initGeneralFeatures();
    
    // Page-specific initialization
    if (body.classList.contains('login-page')) {
        initLoginPage();
    } else if (body.classList.contains('home-page')) {
        initHomePage();
        initNavigation();
    } else if (body.classList.contains('explore-page')) {
        initExplorePage();
        initNavigation();
    }
    
    // Add page load animation
    body.style.opacity = '0';
    body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        body.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        body.style.opacity = '1';
        body.style.transform = 'translateY(0)';
    }, 100);
}

// =============================================
// INITIALIZE APPLICATION
// =============================================

ready(detectPageAndInit);

// =============================================
// GLOBAL ERROR HANDLING
// =============================================

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('An error occurred. Please try again.', 'error');
});

// =============================================
// EXPORT FOR TESTING (if needed)
// =============================================

// For testing purposes, expose some functions globally
window.WaveGuardian = {
    showNotification,
    navigateToPage,
    smoothScrollTo
}; 


/*---------------------------------------------------------------*/ 
// Ocean Sentinel - Interactive JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeInteractivity();
    initializeAnimations();
});

// Navigation Management
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Mobile menu toggle (for future implementation)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
}

// Interactive Elements
function initializeInteractivity() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');
            
            // Here you could add logic to show/hide content based on tab
            const tabType = this.textContent.toLowerCase();
            console.log(`Switched to ${tabType} tab`);
        });
    });
    
    // Explore button functionality
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate opening map (you could redirect or show modal)
            showNotification('Loading interactive map...', 'info');
        });
    }
    
    // Image card interactions
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.image-title').textContent;
            showNotification(`Loading ${title} imagery...`, 'info');
            
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px)';
            }, 200);
        });
    });
    
    // Device status interactions
    const deviceItems = document.querySelectorAll('.device-item');
    deviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const deviceName = this.querySelector('.device-name').textContent;
            const deviceId = this.querySelector('.device-id').textContent;
            showNotification(`${deviceName} details (${deviceId})`, 'info');
        });
    });
    
    // Risk indicator interactions
    const riskItems = document.querySelectorAll('.risk-item');
    riskItems.forEach(item => {
        item.addEventListener('click', function() {
            const riskName = this.querySelector('.risk-name').textContent;
            const riskLevel = this.querySelector('.risk-level').textContent;
            showNotification(`${riskName}: ${riskLevel}`, 'warning');
        });
    });
}

// Animation and Visual Effects
function initializeAnimations() {
    // Animate parameter values on load
    const paramValues = document.querySelectorAll('.param-value');
    paramValues.forEach(value => {
        animateValue(value, 0, parseFloat(value.textContent), 1500);
    });
    
    // Animate visualization values
    const vizValues = document.querySelectorAll('.viz-value');
    vizValues.forEach(value => {
        const numericValue = parseFloat(value.textContent);
        if (!isNaN(numericValue)) {
            animateValue(value, 0, numericValue, 2000);
        }
    });
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card-section, .image-card, .viz-card, .risk-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility Functions
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const unit = originalText.replace(/[\d.-]/g, '');
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        element.textContent = current.toFixed(1) + unit;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = originalText; // Restore original formatting
        }
    }
    
    requestAnimationFrame(updateValue);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'info' ? '#00d4aa' : '#ffa726',
        color: type === 'info' ? '#000' : '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('mobile-open');
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.nav-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                // Simulate search results
                console.log(`Searching for: ${query}`);
                showNotification(`Searching for "${query}"...`, 'info');
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = e.target.value;
                if (query.trim()) {
                    showNotification(`Search results for "${query}"`, 'info');
                }
            }
        });
    }
}

// Real-time data simulation
function simulateRealTimeData() {
    const statusDots = document.querySelectorAll('.status-dot');
    const timelineDots = document.querySelectorAll('.timeline-dot.active');
    
    // Pulse animation for status indicators
    setInterval(() => {
        statusDots.forEach(dot => {
            dot.style.animation = 'none';
            setTimeout(() => {
                dot.style.animation = 'pulse 2s infinite';
            }, 10);
        });
    }, 5000);
    
    // Update timeline periodically
    setInterval(() => {
        timelineDots.forEach(dot => {
            dot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 200);
        });
    }, 8000);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    simulateRealTimeData();
    
    // Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeInteractivity,
        initializeAnimations,
        showNotification
    };
}