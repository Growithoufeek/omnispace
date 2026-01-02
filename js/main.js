// ============================================
// Signature High-End Interior Design Experience
// Motion, Transformation, Immersion
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    console.log('Mobile menu toggle:', mobileMenuToggle);
    console.log('Mobile menu:', mobileMenu);
    
    if (mobileMenuToggle && mobileMenu) {
        // Ensure menu is initially hidden
        mobileMenu.classList.remove('active');
        
        // Make sure toggle is visible on mobile
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'flex';
            mobileMenuToggle.style.visibility = 'visible';
        }
        
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            mobileMenu.classList.toggle('active');
            this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
            this.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
            console.log('Menu active:', mobileMenu.classList.contains('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.textContent = '☰';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Prevent body scroll when menu is open
        mobileMenuToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ============================================
    // SCROLL TO TOP BUTTON - MOBILE
    // ============================================
    
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300 && window.innerWidth <= 768) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // SCROLL-BASED ANIMATIONS
    // ============================================
    
    // IntersectionObserver for fade-in and slide-up animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation to improve performance
                // animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        animationObserver.observe(el);
    });

    // ============================================
    // PARALLAX SCROLLING
    // ============================================
    
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    function updateParallax() {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5; // Parallax speed
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Throttle parallax updates for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // BEFORE & AFTER TRANSFORMATIONS
    // ============================================
    
    const beforeAfterContainers = document.querySelectorAll('.before-after-container');
    
    beforeAfterContainers.forEach(container => {
        const beforeImg = container.querySelector('.before-after-image.before');
        const afterImg = container.querySelector('.before-after-image.after');
        
        // Enhanced hover interaction
        container.addEventListener('mouseenter', function() {
            this.classList.add('transforming');
        });
        
        container.addEventListener('mouseleave', function() {
            this.classList.remove('transforming');
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        container.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        });
        
        container.addEventListener('touchmove', function(e) {
            if (!touchStartX) return;
            
            const touchX = e.touches[0].clientX;
            const diff = touchStartX - touchX;
            const percentage = Math.min(Math.max(diff / container.offsetWidth, 0), 1);
            
            if (beforeImg && afterImg) {
                beforeImg.style.opacity = 1 - percentage;
                afterImg.style.opacity = percentage;
            }
        });
        
        container.addEventListener('touchend', function() {
            touchStartX = 0;
        });
    });

    // ============================================
    // ENHANCED CARD INTERACTIONS
    // ============================================
    
    const cards = document.querySelectorAll('.card, .service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });

    // ============================================
    // SMOOTH IMAGE LOADING
    // ============================================
    
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Disable animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-motion');
    }
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Throttle function for scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// Smooth reveal animation for elements
function revealElement(element, delay = 0) {
    setTimeout(() => {
        element.classList.add('visible');
    }, delay);
}
