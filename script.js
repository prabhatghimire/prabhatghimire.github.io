document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true' ? false : true;
      toggle.setAttribute('aria-expanded', expanded);
      links.classList.toggle('open');
      document.body.style.overflow = expanded ? 'hidden' : '';
    });

    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contact-form');

  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function validateField(input, errorEl, message) {
      const value = input.value.trim();
      if (!value) {
        errorEl.textContent = message;
        input.classList.add('error');
        return false;
      }
      errorEl.textContent = '';
      input.classList.remove('error');
      return true;
    }

    function validateEmail(input, errorEl) {
      const value = input.value.trim();
      if (!value) {
        errorEl.textContent = 'Email is required';
        input.classList.add('error');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorEl.textContent = 'Please enter a valid email';
        input.classList.add('error');
        return false;
      }
      errorEl.textContent = '';
      input.classList.remove('error');
      return true;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, 'Name is required');
      const isEmailValid = validateEmail(emailInput, emailError);
      const isMessageValid = validateField(messageInput, messageError, 'Message is required');

      if (isNameValid && isEmailValid && isMessageValid) {
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = 'Message sent!';
          btn.style.background = 'var(--clr-success)';
          btn.style.borderColor = 'var(--clr-success)';

          form.reset();

          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
            btn.style.borderColor = '';
          }, 3000);
        }, 800);
      }
    });

    [nameInput, emailInput, messageInput].forEach((input, i) => {
      const errors = [nameError, emailError, messageError];
      input.addEventListener('blur', () => {
        if (i === 1) {
          if (input.value.trim()) validateEmail(input, errors[i]);
        } else {
          if (input.value.trim()) validateField(input, errors[i], `${input.placeholder || 'This field'} is required`);
        }
      });
    });
  }

  /* ---------- Nav scroll shadow ---------- */
  const nav = document.querySelector('.nav');

  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.3)' : '';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ---------- Active nav link ---------- */
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.style.color = link.getAttribute('href') === `#${id}`
                ? 'var(--clr-text)'
                : '';
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach(s => observer.observe(s));
  }
});
