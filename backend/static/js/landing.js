document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('demo-modal');
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

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
});
