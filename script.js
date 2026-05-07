// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.visibility = 'hidden'; }, 500);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.mobile-menu-toggle');
const closeMenu = document.querySelector('.close-menu');

menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('portfolio-theme') === 'light') {
    body.classList.replace('dark-theme', 'light-theme');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('portfolio-theme', 'light');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('portfolio-theme', 'dark');
    }
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const roles = ["BCA Student", "Frontend Developer", "Future Software Engineer", "UI Enthusiast"];
let roleIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    if (!isDeleting && charIndex === currentRole.length) { isDeleting = true; typeSpeed = 2000; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typeSpeed = 500; }
    setTimeout(type, typeSpeed);
}
type();

// Scroll Reveal Animation
function reveal() {
    document.querySelectorAll('.reveal').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 150) {
            element.classList.add('active');

            if (element.classList.contains('skill-card')) {
                const bar = element.querySelector('.progress');
                if (bar) bar.style.width = bar.getAttribute('data-width');
            }

            if (element.classList.contains('about-text')) {
                document.querySelectorAll('.stat-number').forEach(num => {
                    const target = +num.getAttribute('data-target');
                    if (+num.innerText === 0) {
                        const updateCount = () => {
                            const val = +num.innerText;
                            if (val < target) { num.innerText = Math.ceil(val + 0.1); setTimeout(updateCount, 100); }
                            else { num.innerText = target + "+"; }
                        };
                        updateCount();
                    }
                });
            }
        }
    });
}
window.addEventListener('scroll', reveal);
reveal();

// Active Nav Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 150) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
});

// Scroll Top Button
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) { scrollTop.style.display = 'flex'; scrollTop.style.opacity = '1'; }
    else { scrollTop.style.opacity = '0'; setTimeout(() => { if (scrollTop.style.opacity === '0') scrollTop.style.display = 'none'; }, 300); }
});
scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Sending...';
        setTimeout(() => {
            btn.innerHTML = 'Message Sent! ✓';
            contactForm.reset();
            setTimeout(() => { btn.disabled = false; btn.innerHTML = originalHTML; }, 3000);
        }, 1500);
    });
}

// Social Icon Hover Animation
document.querySelectorAll('.social-icon, .social-circle').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const svg = item.querySelector('svg');
        if (svg) svg.style.transform = 'scale(1.2) rotate(10deg)';
    });
    item.addEventListener('mouseleave', () => {
        const svg = item.querySelector('svg');
        if (svg) svg.style.transform = 'scale(1) rotate(0)';
    });
});