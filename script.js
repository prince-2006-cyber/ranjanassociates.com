// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu after click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Scroll reveal on view
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counter for stats
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count) + '+';
                setTimeout(updateCount, 30);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCount();
    });
}

// Trigger counter animation when section is in view
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            animateCounter();
        }
    }
});

// Rotating hero text
const rotatingWords = ['Dream Home', 'Dream Property', 'Perfect Villa', 'Luxury Estate'];
const rotatingEl = document.getElementById('heroRotating');
if (rotatingEl) {
    let wordIndex = 0;
    setInterval(() => {
        rotatingEl.style.opacity = '0';
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % rotatingWords.length;
            rotatingEl.textContent = rotatingWords[wordIndex];
            rotatingEl.style.opacity = '1';
        }, 300);
    }, 2500);
    rotatingEl.style.transition = 'opacity 0.3s ease';
}

// Floating hero particles
const particlesContainer = document.getElementById('heroParticles');
if (particlesContainer) {
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('span');
        p.classList.add('hero-particle');
        const size = Math.random() * 6 + 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = (Math.random() * 6 + 6) + 's';
        particlesContainer.appendChild(p);
    }
}

// Navbar background + scroll progress + back to top
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const y = window.scrollY;

    if (navbar) {
        navbar.style.boxShadow = y > 50 ? '0 2px 20px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(102, 126, 234, 0.1)';
    }

    if (scrollProgress) {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = (winScroll / height) * 100 + '%';
    }

    if (backToTop) {
        backToTop.classList.toggle('show', y > 400);
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Active nav link based on section in view
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(102, 126, 234, 0.1)';
    }
});

// Property modal
const modal = document.getElementById('propertyModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalLocation = document.getElementById('modalLocation');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.property-card');
        if (card && modal) {
            modalTitle.textContent = card.querySelector('h3').textContent;
            modalLocation.textContent = card.querySelector('.property-location').textContent.trim();
            modalDescription.textContent = card.querySelector('.property-description').textContent;
            modalPrice.textContent = card.querySelector('.property-price').textContent;
            modal.classList.add('show');
        }
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('show'));
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });
}

// Lazy loading animation for property cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.property-card').forEach(card => {
    observer.observe(card);
});

// CTA button functionality
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        const target = document.querySelector('#properties');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
}

console.log('Ranjan Associates Website Loaded Successfully!');

