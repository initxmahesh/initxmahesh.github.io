/**
 * Portfolio Website - Main JavaScript
 * Handles all interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
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
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Timeline animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemVisible = 150;
            
            if (itemTop < window.innerHeight - itemVisible) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', animateTimeline);
    animateTimeline();

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Testimonials slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    // Create dots
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
        testimonialDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Show testimonial
    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Go to specific testimonial
    function goToTestimonial(index) {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    }

    // Next testimonial
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    // Previous testimonial
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    // Event listeners for testimonial navigation
    nextButton.addEventListener('click', nextTestimonial);
    prevButton.addEventListener('click', prevTestimonial);

    // Auto slide testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });

    // Initialize testimonials
    showTestimonial(currentTestimonial);

    // Skill hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'flex';
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
            }, 100);
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 300);
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For demonstration, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add CSS class for elements with animations
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('reveal-on-scroll');
    });
    
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.classList.add('reveal-on-scroll');
    });
    
    document.querySelectorAll('.project-card').forEach(project => {
        project.classList.add('reveal-on-scroll');
    });
    
    document.querySelectorAll('.about-content > div').forEach(content => {
        content.classList.add('reveal-on-scroll');
    });
});

// Additional CSS for mobile responsiveness
window.addEventListener('resize', function() {
    adjustLayout();
});

function adjustLayout() {
    const width = window.innerWidth;
    
    // Adjust navigation for mobile
    if (width < 768) {
        document.querySelector('.nav-menu').classList.add('mobile');
    } else {
        document.querySelector('.nav-menu').classList.remove('mobile');
        document.querySelector('.nav-menu').classList.remove('active');
        document.getElementById('menu-toggle').classList.remove('active');
    }
}

// Initialize layout adjustments
adjustLayout();
