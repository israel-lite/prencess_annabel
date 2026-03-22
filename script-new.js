// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Gallery Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            const formMessage = document.getElementById('formMessage');
            
            // Reset previous errors
            clearFormErrors();
            
            // Validate form
            let isValid = true;
            
            if (name.length < 2) {
                showFormError('name', 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            if (!isValidEmail(email)) {
                showFormError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (message.length < 10) {
                showFormError('message', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message (in a real application, this would send the data to a server)
                showFormMessage('success', 'Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                
                // Log the form data (for demonstration purposes)
                console.log('Form submitted:', { name, email, message });
            }
        });
    }

    // Form validation helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const label = field.nextElementSibling;
        
        // Create error element if it doesn't exist
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.style.borderColor = '#f44336';
        label.style.color = '#f44336';
    }

    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
        const labels = document.querySelectorAll('.form-group label');
        
        errorElements.forEach(element => {
            element.remove();
        });
        
        formFields.forEach(field => {
            field.style.borderColor = '';
        });
        
        labels.forEach(label => {
            label.style.color = '';
        });
        
        hideFormMessage();
    }

    function showFormMessage(type, message) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            hideFormMessage();
        }, 5000);
    }

    function hideFormMessage() {
        const formMessage = document.getElementById('formMessage');
        formMessage.style.display = 'none';
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for gallery items
                if (entry.target.classList.contains('gallery-item')) {
                    const galleryItems = document.querySelectorAll('.gallery-item');
                    const index = Array.from(galleryItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll(
        '.section-title, .section-divider, .about-image, .about-text, .lead, .about-text p, .stat, .gallery-item, .timeline-item, .contact-method, .contact-form-wrapper'
    );

    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Gallery hover effects
    const galleryImages = document.querySelectorAll('.gallery-item');
    
    galleryImages.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Smooth reveal animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(timelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Initialize page
    updateActiveNavLink();

    // Add smooth reveal for stats
    const stats = document.querySelectorAll('.stat');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(stats).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    stats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease-out';
        statsObserver.observe(stat);
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(function() {
    // Scroll-based optimizations can go here
}, 10);

window.addEventListener('scroll', optimizedScroll);
