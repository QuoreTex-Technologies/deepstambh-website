// ============ MOBILE NAVIGATION ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
});

// ============ LANGUAGE TOGGLE ============
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('deepstambh-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('deepstambh-lang', lang);

    // Update toggle buttons
    document.querySelector('.lang-en').classList.toggle('active', lang === 'en');
    document.querySelector('.lang-mr').classList.toggle('active', lang === 'mr');

    // Update html lang attribute
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';

    // Switch all translatable elements
    document.querySelectorAll('[data-en][data-mr]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });
}

// Initialize language
setLanguage(currentLang);

// Toggle click handlers
if (langToggle) {
    langToggle.querySelector('.lang-en').addEventListener('click', () => setLanguage('en'));
    langToggle.querySelector('.lang-mr').addEventListener('click', () => setLanguage('mr'));
}

// ============ FADE-IN ANIMATIONS ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.stat-card, .about-card, .mission-card, .donate-card, .contact-card, .gallery-item, .media-card, .team-card, .advisor-card').forEach(el => {
    observer.observe(el);
});

// ============ COUNT-UP ANIMATION ============
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            document.querySelectorAll('.stat-number[data-count]').forEach(el => {
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = target >= 100 ? '+' : '+';
                const duration = 2000;
                const steps = 60;
                const stepTime = duration / steps;
                let current = 0;
                const increment = target / steps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current) + suffix;
                }, stepTime);
            });
        }
    });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                link.style.color = '#1A535C';
                link.style.fontWeight = '600';
            } else {
                link.style.color = '';
                link.style.fontWeight = '';
            }
        }
    });
});

// ============ BACK TO TOP ============
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ GALLERY LIGHTBOX ============
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
    }
});

// ============ PAGE ENTRANCE ============
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
