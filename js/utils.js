/**
 * Shared Utilities - Common functions for Ruby Hues Designs
 * Eliminates JavaScript function duplication across the site
 */

// Form Validation Utilities
const FormUtils = {
    /**
     * Validate email address format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate form with required fields
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
            
            // Email validation
            if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
                this.showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });
        
        return isValid;
    },

    /**
     * Show field error message
     */
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.style.borderColor = '#e74c3c';
        field.parentNode.appendChild(errorDiv);
    },

    /**
     * Clear field error message
     */
    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    },

    /**
     * Generic form submission handler
     */
    async submitForm(formData, options = {}) {
        const {
            loadingText = 'Sending...',
            successMessage = 'Thank you! Your message has been sent.',
            errorMessage = 'Sorry, there was an error. Please try again.',
            onSuccess = null,
            onError = null
        } = options;

        const form = formData.form;
        const submitBtn = form.querySelector('button[type="submit"], .submit-btn');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = loadingText;
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual implementation)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success handling
            if (onSuccess) {
                onSuccess(successMessage);
            } else {
                UIUtils.showMessage(successMessage, 'success');
            }
            
            form.reset();
            
        } catch (error) {
            // Error handling
            if (onError) {
                onError(errorMessage);
            } else {
                UIUtils.showMessage(errorMessage, 'error');
            }
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
};

// UI Utilities
const UIUtils = {
    /**
     * Show message to user
     */
    showMessage(message, type = 'info', duration = 5000) {
        // Try to find existing message containers first
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        
        if (type === 'success' && successElement) {
            this.displayMessage(successElement, message, duration);
        } else if (type === 'error' && errorElement) {
            this.displayMessage(errorElement, message, duration);
        } else {
            // Create temporary message if no containers exist
            this.createTemporaryMessage(message, type, duration);
        }
    },

    /**
     * Display message in existing element
     */
    displayMessage(element, message, duration) {
        // Hide other messages
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        if (successElement) successElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';

        // Update and show the message
        const messageP = element.querySelector('p');
        if (messageP) {
            messageP.textContent = message;
        }
        element.style.display = 'block';

        // Auto-hide after duration
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    },

    /**
     * Create temporary message when no containers exist
     */
    createTemporaryMessage(message, type, duration) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `temp-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the temporary message
        Object.assign(messageDiv.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem',
            borderRadius: '4px',
            color: 'white',
            backgroundColor: type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: '9999',
            maxWidth: '300px'
        });

        document.body.appendChild(messageDiv);

        // Auto-remove after duration
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, duration);
    },

    /**
     * Debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element, offset = 0) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = element.offsetTop - navbarHeight - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return rect.top <= windowHeight - threshold && rect.bottom >= threshold;
    }
};

// Animation Utilities
const AnimationUtils = {
    /**
     * Fade in element
     */
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = Math.min(progress, 1);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    /**
     * Fade out element
     */
    fadeOut(element, duration = 300) {
        let start = null;
        const initialOpacity = parseFloat(element.style.opacity) || 1;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = initialOpacity * (1 - Math.min(progress, 1));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// Performance Utilities
const PerformanceUtils = {
    /**
     * Lazy load images
     */
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    },

    /**
     * Preload images
     */
    preloadImages(imageUrls) {
        return Promise.all(
            imageUrls.map(url => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = url;
                });
            })
        );
    }
};

// Export utilities for global use
window.FormUtils = FormUtils;
window.UIUtils = UIUtils;
window.AnimationUtils = AnimationUtils;
window.PerformanceUtils = PerformanceUtils;

// Also create a combined Utils object for convenience
window.Utils = {
    Form: FormUtils,
    UI: UIUtils,
    Animation: AnimationUtils,
    Performance: PerformanceUtils
};
