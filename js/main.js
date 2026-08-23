/* ================================================
   Barrio Energy - Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        // Close menu on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Fade-in on scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.service-card, .property-card, .team-card, .news-card, .about-text, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // Joy — AI travel agent, with the other agent cards (not leadership)
    const teamGrid = document.getElementById('teamGrid');
    if (teamGrid && ![...teamGrid.querySelectorAll('.team-card-name h3')].some(h => h.textContent.trim() === 'Joy')) {
        const member = {
            name: 'Joy',
            role: 'Travel Agent',
            bio: 'Finds deals, books trips, watches calendars, and learns how Ivan actually likes to travel.',
            fullBio: 'Joy is Barrio Energy\u2019s travel agent. She hunts flights, hotels, and the itinerary around them, then books when Ivan says go. She watches calendars so trips fit real life, not a fantasy week, and she keeps a running read on preferences: home airports, cabin, layover tolerance, hotel style, who is traveling, and what \u201cgood enough\u201d looks like on a given trip. She is the one who shows two or three real options with the tradeoffs attached, not a pile of tabs. Tech and site work she hands to Dev or CMO.',
            image: 'images/joy.png'
        };
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
                <div class="team-card-header">
                    <div class="avatar-wrap">
                        <img src="${member.image}" alt="${member.name}" loading="lazy">
                    </div>
                </div>
                <div class="team-card-body">
                    <div class="team-card-name">
                        <h3>${member.name}</h3>
                        <span class="ai-badge">AI</span>
                    </div>
                    <div class="team-card-role">${member.role}</div>
                    <p class="team-card-bio">${member.bio}</p>
                    <div class="team-card-cta">
                        <span>Read full bio</span>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </div>
                </div>
            `;
        card.addEventListener('click', () => {
            const modal = document.getElementById('bioModal');
            const avatar = document.getElementById('modalAvatar');
            const info = document.getElementById('modalInfo');
            const body = document.getElementById('modalBody');
            if (!modal || !avatar || !info || !body) return;
            avatar.innerHTML = `<img src="${member.image}" alt="${member.name}">`;
            info.innerHTML = `
                <h2>${member.name}</h2>
                <p class="modal-role">${member.role}</p>
                <span class="modal-agent-badge">AI Agent</span>
            `;
            body.innerHTML = member.fullBio.split('\n\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        teamGrid.appendChild(card);
        observer.observe(card);
    }

});

// --- Newsletter Subscribe Handler ---
function handleFooterSubscribe(e) {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('.footer-subscribe-email');
    const successMsg = form.parentElement.querySelector('.footer-subscribe-success');
    const email = emailInput.value.trim();

    if (!email) return false;

    // Disable button while submitting
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '...';
    btn.disabled = true;

    fetch('https://api.barrioenergy.com/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'email=' + encodeURIComponent(email)
            + '&website=' + encodeURIComponent((form.querySelector('[name="website"]')||{}).value || '')
            + '&ts=' + (window.__blTs || '')
    })
    .then(res => res.json())
    .then(data => {
        form.style.display = 'none';
        if (successMsg) {
            successMsg.style.display = 'block';
            if (data.status === 'exists') {
                successMsg.querySelector('p').textContent = "You're already subscribed!";
            } else if (data.message) {
                successMsg.querySelector('p').textContent = data.message;
            }
        }
    })
    .catch(() => {
        btn.textContent = 'Try again';
        btn.disabled = false;
    });

    return false;
}
