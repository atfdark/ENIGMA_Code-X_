// Simple animation for feature cards on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const featureCards = document.querySelectorAll('.feature-card');
            
            function checkScroll() {
                featureCards.forEach(card => {
                    const cardPosition = card.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (cardPosition < screenPosition) {
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                    }
                });
            }
            
            // Initialize opacity for animation
            featureCards.forEach(card => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            window.addEventListener('scroll', checkScroll);
            checkScroll(); // Check on initial load
        });

// Modal functionality
const modal = document.getElementById('demo-modal');
const watchDemoBtn = document.getElementById('watch-demo-btn');
const closeBtn = document.querySelector('.close-btn');

watchDemoBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});