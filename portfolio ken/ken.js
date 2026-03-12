const navbarToggle = document.querySelector('.navbar-toggle');
const navLinks = document.querySelector('.nav-links');
const allLinks = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('section'); // Renamed to avoid conflict

navbarToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});

// 1. Scroll-Spy (Active Link Highlighting)
window.addEventListener('scroll', () => {
    let currentSection = "";
    allSections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    allLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// 2. Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    if(modal) {
        const closeBtn = document.querySelector('.close-modal');
        const overlay = document.querySelector('.modal-overlay');

        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', () => {
                const title = item.getAttribute('data-title');
                const desc = item.getAttribute('data-desc');
                const tags = item.getAttribute('data-tags');
                const imgPath = item.querySelector('img').src;

                document.getElementById('modal-title').innerText = title;
                document.getElementById('modal-desc').innerText = desc;
                document.getElementById('modal-tags').innerText = tags;
                document.getElementById('modal-img').src = imgPath;

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        const hideModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', hideModal);
        overlay.addEventListener('click', hideModal);
    }
});

// 3. The Scroll Trigger (Intersection Observer)
const observerOptions = { threshold: 0.15 };

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target ONLY the lower sections (not the Hero)
const scrollSections = document.querySelectorAll('.about-section, .expertise-section, .work-section, .contact-section');
scrollSections.forEach(section => {
    sectionObserver.observe(section);
});