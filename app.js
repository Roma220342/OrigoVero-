// OrigoVero passport — behaviour: full-screen menu, current-section marker, report form states.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Menu ---------- */
  const menu = $('#menu');
  const openBtn = $('#menu-open');
  const closeBtn = $('#menu-close');
  const items = $$('.menu__item');
  const sectionIds = items.map((a) => a.dataset.target);

  // Current section = the last one whose top has passed just under the sticky bar.
  const currentSection = () => {
    const line = 64 + 24;
    let current = 'top';
    for (const id of sectionIds) {
      if (id === 'top') continue;
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line + 72) current = id;
    }
    return current;
  };
  const markCurrent = () => {
    const now = currentSection();
    items.forEach((a) => a.setAttribute('aria-current', a.dataset.target === now ? 'true' : 'false'));
  };

  openBtn.addEventListener('click', () => {
    markCurrent();
    menu.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
  });
  const closeMenu = () => { if (menu.open) menu.close(); };
  closeBtn.addEventListener('click', closeMenu);
  menu.addEventListener('close', () => openBtn.setAttribute('aria-expanded', 'false'));
  items.forEach((a) => a.addEventListener('click', closeMenu)); // default navigation then scrolls to the section

  /* ---------- Report form ---------- */
  const form = $('#report-form');
  const send = $('#send');
  const status = $('#form-status');
  const emailField = $('#email-field');
  const email = $('#email');
  const emailError = $('#email-error');
  const details = $('#details');
  const reason = $('#reason');

  const autosize = (el) => { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; };
  details.addEventListener('input', () => autosize(details));

  [details, email, reason].forEach((el) =>
    el.addEventListener('input', () => el.classList.toggle('is-filled', el.value.trim() !== '')));
  reason.addEventListener('change', () => reason.classList.add('is-filled'));

  const validEmail = (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); // optional field
  const setInvalid = (bad) => {
    emailField.classList.toggle('is-invalid', bad);
    emailError.hidden = !bad;
    email.setAttribute('aria-invalid', bad ? 'true' : 'false');
  };
  email.addEventListener('input', () => { if (emailField.classList.contains('is-invalid') && validEmail(email.value.trim())) setInvalid(false); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validEmail(email.value.trim())) { setInvalid(true); email.focus(); return; }
    setInvalid(false);
    // Loading state. There is no backend in this demo: the request is simulated.
    send.textContent = 'Sending…';
    send.setAttribute('aria-busy', 'true');
    status.textContent = '';
    window.setTimeout(() => {
      send.textContent = 'Send to the brand';
      send.removeAttribute('aria-busy');
      status.textContent = 'Sent. Thank you, the brand will see this.';
      form.reset();
      [details, email, reason].forEach((el) => el.classList.remove('is-filled'));
      autosize(details);
    }, 900);
  });
})();
