// Main JavaScript for Shelby's Art Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initGalleryFiltering();
    initLightbox();
    initContactForm();
    initNewsletterForm();
    initScrollAnimations();
    initSmoothScroll();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
        bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '1';
            bars[2].style.transform = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '1';
            bars[2].style.transform = '';
        }
    });
}

// Gallery Filtering System
function initGalleryFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    // Add fade in animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Lightbox Functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryImages = document.querySelectorAll('.gallery-image');

    if (!lightbox) return;

    let currentImageIndex = 0;
    let imageData = [];

    // Collect image data
    galleryImages.forEach((img, index) => {
        const item = img.closest('.gallery-item');
        const info = item.querySelector('.gallery-info');
        
        imageData.push({
            src: img.src,
            alt: img.alt,
            title: info ? info.querySelector('h3').textContent : '',
            description: info ? info.querySelectorAll('p')[0].textContent : ''
        });

        // Add click event to open lightbox
        img.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (imageData.length === 0) return;
        
        const data = imageData[currentImageIndex];
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxTitle.textContent = data.title;
        lightboxDescription.textContent = data.description;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade in animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageData.length;
        const data = imageData[currentImageIndex];
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxTitle.textContent = data.title;
        lightboxDescription.textContent = data.description;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageData.length) % imageData.length;
        const data = imageData[currentImageIndex];
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxTitle.textContent = data.title;
        lightboxDescription.textContent = data.description;
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showMessage(errorMessage, 'Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(errorMessage, 'Please enter a valid email address.');
            return;
        }

        // Simulate form submission (replace with actual form handling)
        submitContactForm({ name, email, subject, message });
    });

    function submitContactForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual implementation)
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // For demo purposes, always show success
            // In real implementation, handle the actual form submission here
            showMessage(successMessage, 'Thank you for your message! I\'ll get back to you within 2-3 business days.');
            contactForm.reset();
        }, 2000);
    }

    function showMessage(messageElement, text) {
        // Hide other messages
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';

        // Show the specified message
        if (messageElement) {
            if (text) {
                messageElement.querySelector('p').textContent = text;
            }
            messageElement.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        const button = newsletterForm.querySelector('button');

        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show loading state
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;

        // Simulate subscription (replace with actual implementation)
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            emailInput.value = '';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add scroll reveal to various elements
    const revealElements = document.querySelectorAll(`
        .featured-item,
        .gallery-item,
        .approach-item,
        .faq-item,
        .contact-method,
        .about-text,
        .story-text,
        .technique-item
    `);

    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight : 0;
                
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Image Loading Optimization
function initImageLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading class
                img.classList.add('loading');
                
                // Create new image to preload
                const newImg = new Image();
                newImg.onload = function() {
                    img.src = this.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                newImg.src = img.dataset.src || img.src;
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Form Validation Utilities
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
        
        // Email validation
        if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.style.borderColor = '#e74c3c';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Performance Optimization: Debounce Function
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

// Initialize image loading when DOM is ready
document.addEventListener('DOMContentLoaded', initImageLoading);

// Console greeting (optional)
console.log('🎨 Welcome to Shelby\'s Art Website! Built with love and attention to detail.');

// Export functions for potential use in other scripts
window.ShelbyArt = {
    initMobileNavigation,
    initGalleryFiltering,
    initLightbox,
    initContactForm,
    initNewsletterForm,
    initScrollAnimations,
    validateForm
};
