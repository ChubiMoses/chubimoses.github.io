document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links and highlight active link on click
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just a placeholder
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .project-card, .community-stat');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    

    
    // Add animation to stats counters
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Handle different formats
            if (obj.textContent.includes('$')) {
                obj.textContent = '$' + value + 'M+';
            } else if (obj.textContent.includes('%')) {
                obj.textContent = value + '%';
            } else if (obj.textContent.includes('/')) {
                obj.textContent = '24/7';
            } else {
                obj.textContent = value + 'K+';
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when they come into view
                if (entry.target.classList.contains('stats')) {
                    const statValues = entry.target.querySelectorAll('.stat-item h2');
                    statValues.forEach(stat => {
                        let endValue;
                        if (stat.textContent.includes('$')) {
                            endValue = 50; // $50M+
                        } else if (stat.textContent.includes('%')) {
                            endValue = 99.9; // 99.9%
                        } else if (stat.textContent.includes('/')) {
                            endValue = 24; // 24/7
                        } else {
                            endValue = 100; // 100K+
                        }
                        animateValue(stat, 0, endValue, 2000);
                    });
                }
                
                // Add fade-in animation to sections
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe stats section specifically for counter animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});