/* ============================================
   SKYTECH LANDING PAGE - JAVASCRIPT
   Smooth animations, scroll effects, interactivity
   ============================================ */

// ---- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in-on-scroll class
document.querySelectorAll('.service-card, .skill-category, .project-card').forEach(el => {
  observer.observe(el);
});

// ---- SMOOTH SCROLL OFFSET FOR FIXED NAV ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = target.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ---- NAVBAR BACKGROUND ON SCROLL ----
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  
  if (lastScrollY > 50) {
    navbar.style.background = 'rgba(11, 15, 26, 0.9)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'rgba(11, 15, 26, 0.7)';
  }
});

// ---- PARALLAX EFFECT ON HERO GLOWS ----
const heroGlow = document.querySelector('.hero-glow');
const heroGlow2 = document.querySelector('.hero-glow-2');

if (heroGlow && heroGlow2) {
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    heroGlow.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    heroGlow2.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
  });
}

// ---- PAGE LOAD ANIMATION ----
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ---- BUTTON RIPPLE EFFECT ----
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ---- FORM VALIDATION (IF NEEDED FOR FUTURE) ----
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form handling logic here
    console.log('Form submitted');
  });
}

// ---- LAZY LOAD IMAGES (FUTURE USE) ----
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ---- MOBILE MENU TOGGLE (FOR FUTURE EXPANSION) ----
const createMobileMenu = () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  
  // Can be expanded for mobile menu functionality
};

// ---- PERFORMANCE: DEBOUNCE SCROLL EVENTS ----
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedScroll = debounce(() => {
  // Optimized scroll handler
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ---- DARK MODE TOGGLE (OPTIONAL FEATURE) ----
// Uncomment to enable light mode toggle
/*
const toggleDarkMode = () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('darkMode', !document.body.classList.contains('light-mode'));
};

// Check for saved preference
if (localStorage.getItem('darkMode') === 'false') {
  document.body.classList.add('light-mode');
}
*/

// ---- ACCESSIBILITY: FOCUS MANAGEMENT ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Handle escape key for modals (when added)
  }
});

// ---- CONSOLE MESSAGE (EASTER EGG) ----
console.log('%cWelcome to SkyTech! 🚀', 'font-size: 16px; color: #4da3ff; font-weight: bold;');
console.log('%cBuilt with precision and security.', 'color: #38bdf8;');
