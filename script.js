// Initialize Lucide Icons
lucide.createIcons();

// --- Theme Management ---
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Check for saved theme
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
const links = document.querySelectorAll('a, button, input, textarea, .project-card');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Smooth cursor movement
    cursor.style.transform = `translate(${clientX - 16}px, ${clientY - 16}px)`;
    
    // Delayed follower effect
    setTimeout(() => {
        follower.style.transform = `translate(${clientX - 24}px, ${clientY - 24}px) scale(0.5)`;
    }, 50);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        follower.style.transform += ' scale(2.5)';
        follower.style.opacity = '0.3';
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        follower.style.opacity = '0.2';
    });
});

// --- Mousemove Parallax ---
const parallaxElements = document.querySelectorAll('.parallax-element');

function handleParallax(event) {
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 10;
        const x = (clientX - centerX) / speed;
        const y = (clientY - centerY) / speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
}

document.addEventListener('mousemove', handleParallax);

// --- Navbar Behavior ---
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add glass background on scroll
    if (currentScroll > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
    
    // Hide/Show on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// --- Scroll Progress Bar ---
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollBar.style.height = scrolled + "%";
});

// --- Motion.dev Animations ---
const { animate, inView, scroll } = Motion;

// 1. Reveal sections on scroll
inView("section", (info) => {
    animate(info.target, { opacity: [0, 1], y: [50, 0] }, { duration: 1, easing: [0.22, 1, 0.36, 1] });
});

// 2. Animated skill bars
inView(".skill-group", (info) => {
    const bars = info.target.querySelectorAll('.skill-bar');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        animate(bar, { width: ["0%", width] }, { duration: 1.5, easing: [0.65, 0, 0.35, 1], delay: 0.2 });
    });
});

// 3. Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 20;
        const yPercent = (y / rect.height - 0.5) * -20;
        
        card.style.transform = `perspective(1000px) rotateX(${yPercent}deg) rotateY(${xPercent}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// --- Mobile Menu ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMenu() {
    mobileMenu.style.transform = 'translateX(0)';
}

function closeMenu() {
    mobileMenu.style.transform = 'translateX(100%)';
}

mobileMenuBtn.addEventListener('click', openMenu);
closeMobileMenu.addEventListener('click', closeMenu);
mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));

// --- Hero Animation ---
animate("#hero h1", { opacity: [0, 1], y: [100, 0] }, { duration: 1, easing: [0.22, 1, 0.36, 1] });
animate("#hero p", { opacity: [0, 1], y: [30, 0] }, { duration: 1, delay: 0.5, easing: [0.22, 1, 0.36, 1] });
animate("#hero .flex", { opacity: [0, 1], y: [30, 0] }, { duration: 1, delay: 0.8, easing: [0.22, 1, 0.36, 1] });

// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
