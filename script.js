const WHATSAPP = '556235742375';

const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Links de WhatsApp com mensagem pronta
document.querySelectorAll('[data-wa], [data-wa-model]').forEach((el) => {
  if (el.dataset.wa) el.href = waLink(el.dataset.wa);
  el.target = '_blank';
  el.rel = 'noopener';
});

// Cores dos modelos: troca a foto e leva a cor escolhida para a mensagem do WhatsApp
document.querySelectorAll('.card[data-model]').forEach((card) => {
  const img = card.querySelector('.card__media img');
  const label = card.querySelector('.swatches__label');
  const link = card.querySelector('[data-wa-model]');
  const model = card.dataset.model;
  const select = (btn) => {
    card.querySelectorAll('.swatch').forEach((s) => {
      s.classList.toggle('is-active', s === btn);
      s.setAttribute('aria-pressed', String(s === btn));
    });
    const color = btn.dataset.color;
    label.textContent = color;
    link.href = waLink(`Olá! Quero saber mais sobre o purificador ${model} na cor ${color.toLowerCase()}.`);
    if (img.getAttribute('src') === btn.dataset.src) return;
    img.classList.add('is-swapping');
    const next = new Image();
    next.onload = () => {
      img.src = btn.dataset.src;
      img.width = next.naturalWidth;
      img.height = next.naturalHeight;
      img.alt = `Purificador ${model} ${color.toLowerCase()}`;
      img.classList.remove('is-swapping');
    };
    next.src = btn.dataset.src;
  };
  card.querySelectorAll('.swatch').forEach((s) => {
    s.setAttribute('aria-label', s.dataset.color);
    s.addEventListener('click', () => select(s));
  });
  select(card.querySelector('.swatch.is-active'));
});

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Sombra no topo ao rolar
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Revelação ao rolar
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Carrossel: arrastar com o mouse e setas
document.querySelectorAll('[data-carousel]').forEach((root) => {
  const track = root.querySelector('.carousel__track');
  const step = () => track.querySelector('.card').offsetWidth + 24;

  root.querySelectorAll('.arrow').forEach((btn) => {
    btn.addEventListener('click', () => track.scrollBy({ left: step() * Number(btn.dataset.dir), behavior: 'smooth' }));
  });

  let startX = 0, startLeft = 0, moved = false, down = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
    if (moved) track.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    if (!moved) return;
    track.classList.remove('is-dragging');
    const s = step();
    track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: 'smooth' });
  });
});
