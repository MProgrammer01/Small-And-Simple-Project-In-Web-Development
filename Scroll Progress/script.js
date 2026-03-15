// Get elements
const progressBar = document.getElementById('progressBar');
const readingTime = document.getElementById('readingTime');
const completeBtn = document.getElementById('completeBtn');
const contentSections = document.querySelectorAll('.content');

// Update progress bar on scroll
function updateProgressBar() {
    const windowHeight = window.innerHeight;
    
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    
    const scrolled = window.scrollY;
    
    const progress = (scrolled / documentHeight) * 100;
    
    // Ensure progress is between 0-100
    const progressPercent = Math.min(Math.max(Math.floor(progress), 0), 100);
    
    progressBar.style.width = progressPercent + '%';
    
    // Update reading percentage
    readingTime.textContent = progressPercent + '%';
    
    // Show complete button when reached 100%
    if (progressPercent >= 99) {
        completeBtn.classList.add('show');
        document.querySelector('.reading-time').style.display = 'none';
    } else {
        completeBtn.classList.remove('show');
        document.querySelector('.reading-time').style.display = 'flex';
    }
}


// Complete button click handler
completeBtn.addEventListener('click', function() {
    // Add success animation
    this.innerHTML = '<i class="checkmark">✓</i> Completed!';
    this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Confetti effect (simple)
    createConfetti();
    
    // Optional: scroll to top
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Reset after scroll
        setTimeout(() => {
            this.innerHTML = '<i class="checkmark">✓</i> Complete';
            this.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
        }, 1000);
    }, 1500);
});

// Simple confetti effect
function createConfetti() {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: ${window.innerHeight / 2}px;
            left: ${window.innerWidth - 100}px;
            opacity: 1;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);
        
        // Animate confetti
        const tx = (Math.random() - 0.5) * 300;
        const ty = -Math.random() * 300 - 100;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translate(${tx}px, ${ty}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            confetti.remove();
        };
    }
}


// Update progress on scroll
window.addEventListener('scroll', updateProgressBar);

// Initialize on load
window.addEventListener('load', () => {
    updateProgressBar();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space or Down arrow to scroll down
    if (e.code === 'Space' || e.code === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
    
    // Up arrow to scroll up
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({
            top: -window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
    
    // Home key to go to top
    if (e.code === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // End key to go to bottom
    if (e.code === 'End') {
        e.preventDefault();
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
});
