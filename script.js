// Smooth animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach(element => {
            const speed = element.dataset.speed;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add glow effect to pink light based on scroll
    const pinkGlow = document.querySelector('.pink-glow');
    
    window.addEventListener('scroll', () => {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const opacity = Math.max(0.3, 0.8 - scrollPercent);
        pinkGlow.style.opacity = opacity;
    });

    // Remove the typing effect for the hero title since it's causing issues
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }

    // Function to update experience dates
    function updateExperienceDates() {
        const currentDate = new Date();
        const options = { 
            year: 'numeric', 
            month: 'short'
        };

        // Format current date
        const currentDateFormatted = currentDate.toLocaleDateString('es', options);

        // Get the first experience date element
        const currentExperienceDate = document.querySelector('.experience-meta span:first-child');
        if (currentExperienceDate) {
            currentExperienceDate.textContent = `${currentDateFormatted} - actualidad`;
        }

        // Calculate duration
        const startDate = new Date('2024-06-01');
        const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                          (currentDate.getMonth() - startDate.getMonth());
        
        // Update duration if more than 1 month
        if (monthsDiff > 0) {
            const years = Math.floor(monthsDiff / 12);
            const months = monthsDiff % 12;
            let duration = '';
            
            if (years > 0) {
                duration += `${years} ${years === 1 ? 'Año' : 'Años'}`;
                if (months > 0) duration += ' y ';
            }
            if (months > 0) {
                duration += `${months} ${months === 1 ? 'Mes' : 'Meses'}`;
            }
            
            currentExperienceDate.textContent += ` · ${duration}`;
        }
    }

    // Call function when page loads
    updateExperienceDates();
    // Update date every day
    setInterval(updateExperienceDates, 24 * 60 * 60 * 1000);
});

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function copyEmail() {
    const emailInput = document.getElementById('emailInput');
    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    
    emailInput.select();
    document.execCommand('copy');
    
    // Visual feedback
    copyText.textContent = '¡Copiado!';
    copyIcon.style.transform = 'translateY(-2px)';
    
    setTimeout(() => {
        copyText.textContent = 'Copiar';
        copyIcon.style.transform = '';
    }, 2000);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// Enhance floating elements
const createFloatingElement = () => {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = (Math.random() * 5 + 10) + 's';
    document.querySelector('.floating-elements').appendChild(element);
    
    // Remove element after animation
    element.addEventListener('animationend', () => {
        element.remove();
    });
};

// Create new floating elements periodically
setInterval(createFloatingElement, 3000);

// Initial floating elements
for(let i = 0; i < 5; i++) {
    createFloatingElement();
}

// Enhanced parallax effect for pink glow
window.addEventListener('mousemove', (e) => {
    const pinkGlow = document.querySelector('.pink-glow');
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    pinkGlow.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;
});

// Add cursor trail effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: rgba(255, 0, 128, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: fadeTrail 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
});

// Add fade trail animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeTrail {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);