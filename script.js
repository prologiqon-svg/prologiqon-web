const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
menu?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('form-note').textContent =
    'Toto je zatiaľ ukážkový formulár. Pred zverejnením ho treba prepojiť s e-mailom, aby sa dopyty skutočne odosielali.';
});
