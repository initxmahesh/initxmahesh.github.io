/**
 * Contact Form Functionality
 * Handles form submission, validation, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.querySelector('.form-response');
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const newsletter = document.getElementById('newsletter').checked;
            
            // Basic validation
            if (!name || !email || !message) {
                showFormResponse('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormResponse('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            simulateFormSubmission(name, email, subject, message, newsletter);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form response message
    function showFormResponse(message, type) {
        formResponse.textContent = message;
        formResponse.className = 'form-response ' + type;
        formResponse.style.display = 'block';
        
        // Scroll to response
        formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide response after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 5000);
        }
    }
    
    // Simulate form submission (replace with actual AJAX call to your backend)
    function simulateFormSubmission(name, email, subject, message, newsletter) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showFormResponse('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 1500);
    }
    
    // Input animations
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Add focus class on input focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class on input blur
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add smooth scrolling for contact links
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const contactSection = document.getElementById('contact');
            
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Focus on name input after scrolling
                setTimeout(() => {
                    document.getElementById('name').focus();
                }, 1000);
            }
        });
    });
    
    // Initialize map placeholder (replace with actual map initialization)
    initMapPlaceholder();
    
    function initMapPlaceholder() {
        const mapPlaceholder = document.querySelector('.map-placeholder');
        
        if (mapPlaceholder) {
            // Add animation to map placeholder
            mapPlaceholder.innerHTML = `
                <i class="fas fa-map-marked-alt pulse"></i>
                <p>Interactive Map</p>
                <p class="map-note">Click "Get Directions" to view on Google Maps</p>
            `;
        }
    }
});
