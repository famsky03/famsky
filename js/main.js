/* ==========  js/main.js  ========== */
document.addEventListener('DOMContentLoaded', () => {
  /* ── DOM QUERY ────────────────────────────────── */
  const mobileMenuBtn  = document.getElementById('mobile-menu-button');
  const mobileMenu     = document.getElementById('mobile-menu');
  const darkToggleBtn  = document.getElementById('dark-mode-toggle');
  const darkIcon       = document.getElementById('dark-icon');
  const lightIcon      = document.getElementById('light-icon');
  const toggleExpBtn   = document.getElementById('toggle-experience');
  const expItems       = document.querySelectorAll('.experience-item:nth-child(n+2)');
  const typingEl       = document.getElementById('typing-text');
  const contactForm    = document.querySelector('#contact form');

  /* ── MOBILE MENU ──────────────────────────────── */
  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('active');
  });

  /* ── DARK MODE ────────────────────────────────── */
  function applyDark(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    darkIcon.classList.toggle('hidden',  isDark);
    lightIcon.classList.toggle('hidden', !isDark);
  }

  // initial state (saved or system preference)
  const initialDark =
      localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') &&
       window.matchMedia('(prefers-color-scheme: dark)').matches);
  applyDark(initialDark);

  darkToggleBtn?.addEventListener('click', () => {
    const nowDark = !document.documentElement.classList.contains('dark');
    applyDark(nowDark);
    localStorage.setItem('darkMode', nowDark);
  });

  /* ── EXPERIENCE TOGGLE ────────────────────────── */
  toggleExpBtn?.addEventListener('click', () => {
    const showAll = toggleExpBtn.textContent === 'Show All';
    expItems.forEach(i => i.style.display = showAll ? 'block' : 'none');
    toggleExpBtn.textContent = showAll ? 'Show Less' : 'Show All';
  });

  /* ── SMOOTH SCROLL NAV ───────────────────────── */
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('active');
      }
    });
  });

  /* ── FORM VALIDATION ──────────────────────────── */
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name)        return alert('Please enter your name');
    if (!email.includes('@'))
                      return alert('Please enter a valid email');
    if (!message)     return alert('Please enter your message');

    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });

  /* ── SCROLL ANIMATION ─────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(sec => observer.observe(sec));

  /* ── TYPING EFFECT ────────────────────────────── */
  if (typingEl) {
    const words = ['Desain Grafis', 'Video Editor'];
    let idx = 0, char = 0, deleting = false;

    function loop() {
      const word = words[idx];
      typingEl.textContent = word.slice(0, char);

      if (!deleting && char++ === word.length) {
        deleting = true;
        setTimeout(loop, 1500);
      } else if (deleting && char-- === 0) {
        deleting = false;
        idx = (idx + 1) % words.length;
        setTimeout(loop, 300);
      } else {
        setTimeout(loop, deleting ? 50 : 100);
      }
    }
    loop();
  }
});
