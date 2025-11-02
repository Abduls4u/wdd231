// Accessible responsive nav
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primary-nav');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  primaryNav.style.display = expanded ? 'none' : 'block';
  // update button label
  navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
});

// ensure keyboard users can toggle with Enter/Space
navToggle?.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navToggle.click();
  }
});
