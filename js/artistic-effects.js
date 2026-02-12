/**
 * Portfolio Website - Minimal Effects
 * Custom JS for minimal interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize minimal effects
  initMinimalHoverEffects();
  initMinimalScrollEffects();
  initPreloader();
});

/**
 * Minimal Hover Effects
 */
function initMinimalHoverEffects() {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.classList.add('minimal-button-effect');
  });
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.project-card, .testimonial-card, .contact-card, .detail-item, .skill-item');
  cards.forEach(card => {
    card.classList.add('minimal-hover');
  });
  
  // Add highlight effect to nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.add('minimal-highlight');
  });
}

/**
 * Minimal Scroll Effects
 */
function initMinimalScrollEffects() {
  // Add scroll reveal to elements
  const revealElements = document.querySelectorAll('.section-header, .skill-item, .project-card, .testimonial-card, .timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  revealElements.forEach(element => {
    element.classList.add('minimal-reveal');
    observer.observe(element);
  });
}

/**
 * Preloader Animation
 */
function initPreloader() {
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('preloader-hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });
}
