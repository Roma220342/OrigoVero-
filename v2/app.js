// OrigoVero passport v2 — full-screen menu, report form states.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Current section ---------- */
  const lineY = 120;
  const passed = (ids) => {
    let current = ids[0];
    for (const id of ids) {
      const el = id === 'top' ? null : document.getElementById(id);
      if (id === 'top' || (el && el.getBoundingClientRect().top <= lineY)) current = id;
    }
    return current;
  };

  /* ---------- Menu ---------- */
  const menu = $('#menu');
  const openBtn = $('#menu-open');
  const closeBtn = $('#menu-close');
  const items = $$('.menu__item');
  const menuIds = items.map((a) => a.dataset.target);
  const markMenu = () => {
    const now = passed(menuIds);
    items.forEach((a) => a.setAttribute('aria-current', a.dataset.target === now ? 'true' : 'false'));
  };
  openBtn.addEventListener('click', () => {
    markMenu();
    menu.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
  });
  const closeMenu = () => { if (menu.open) menu.close(); };
  closeBtn.addEventListener('click', closeMenu);
  menu.addEventListener('close', () => openBtn.setAttribute('aria-expanded', 'false'));
  items.forEach((a) => a.addEventListener('click', closeMenu));

  /* ---------- Report form ---------- */
  const form = $('#report-form');
  const send = $('#send');
  const status = $('#form-status');
  const emailField = $('#email-field');
  const email = $('#email');
  const emailError = $('#email-error');

  const validEmail = (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); // optional field
  const setInvalid = (bad) => {
    emailField.classList.toggle('is-invalid', bad);
    emailError.hidden = !bad;
    email.setAttribute('aria-invalid', bad ? 'true' : 'false');
  };
  email.addEventListener('input', () => {
    if (emailField.classList.contains('is-invalid') && validEmail(email.value.trim())) setInvalid(false);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validEmail(email.value.trim())) { setInvalid(true); email.focus(); return; }
    setInvalid(false);
    // No backend in this demo: the request is simulated.
    send.textContent = 'Sending…';
    send.setAttribute('aria-busy', 'true');
    status.textContent = '';
    setTimeout(() => {
      send.textContent = 'Send to the brand';
      send.removeAttribute('aria-busy');
      status.textContent = 'Sent. Thank you, the brand will see this.';
      form.reset();
    }, 900);
  });
})();
