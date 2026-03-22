// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTop = document.getElementById('scrollToTop');
    const contactForm = document.getElementById('contactForm');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form validation and submission
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
        const errorElement = field.nextElementSibling;
        errorElement.textContent = message;
        field.style.borderColor = 'var(--error-color)';
    }

    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        formFields.forEach(field => {
            field.style.borderColor = 'var(--border-color)';
        });
        
        hideFormMessage();
    }

    function showFormMessage(type, message) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
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
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll(
        '.section-title, .about-text p, .gallery-item, .highlight-card, .contact-info, .contact-form'
    );

    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Gallery lightbox functionality (optional enhancement)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Simple lightbox functionality could be added here
            // For now, we'll just add a click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Add hover effect to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Initialize page
    updateActiveNavLink();
});

// Additional utility functions
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
