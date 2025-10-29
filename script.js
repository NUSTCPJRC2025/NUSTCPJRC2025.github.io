// Countdown Timer for Event
function updateCountdown() {
    const eventDate = new Date('November 17, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            <div class="grid grid-cols-4 gap-2 text-center">
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${days}</div>
                    <div class="text-xs uppercase">Days</div>
                </div>
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${hours}</div>
                    <div class="text-xs uppercase">Hours</div>
                </div>
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${minutes}</div>
                    <div class="text-xs uppercase">Minutes</div>
                </div>
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${seconds}</div>
                    <div class="text-xs uppercase">Seconds</div>
                </div>
            </div>
        `;
    } else {
        const message = 'Event has started!';
        document.getElementById('countdown').innerHTML = '<div class="text-xl font-bold">Event Started!</div>';
        announceToScreenReader(message, 'assertive');
    }
}

setInterval(updateCountdown, 1000);

// Smooth Scrolling for Anchor Links
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

// Sticky Navigation
const stickyNav = document.getElementById('sticky-nav');
const header = document.querySelector('.header-section');
let headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > headerHeight) {
        stickyNav.classList.add('scrolled');
    } else {
        stickyNav.classList.remove('scrolled');
    }
});

// Active Navigation Link Highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('#course-info, #payment, #schedule, #lecturers');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for sticky nav
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Call once on page load

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300';
backToTopBtn.style.display = 'none';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
        setTimeout(() => backToTopBtn.classList.remove('opacity-0'), 10);
    } else {
        backToTopBtn.classList.add('opacity-0');
        setTimeout(() => backToTopBtn.style.display = 'none', 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lazy Loading for Images
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

images.forEach(img => imageObserver.observe(img));

// Accessibility Enhancements
document.addEventListener('keydown', function(e) {
    // Escape key handling for modals (if any)
    if (e.key === 'Escape') {
        const openMenus = document.querySelectorAll('[aria-expanded="true"]');
        openMenus.forEach(menu => {
            menu.setAttribute('aria-expanded', 'false');
        });
    }
});

// Enhanced Focus Management
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTabKey(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    element.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return function() {
        element.removeEventListener('keydown', handleTabKey);
    };
}

// Announce dynamic content changes to screen readers
function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for important buttons
    const registerBtn = document.querySelector('a[href*="forms.office.com"]');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.innerHTML = '<span>Opening Registration...</span>';

            // Remove loading state after a delay
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = '<span>Register Now</span><svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>';
            }, 3000);
        });
    }

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.querySelectorAll('.btn-enhanced');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add smooth reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe cards for animation
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});