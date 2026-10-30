const WHATSAPP = '556235742375';

const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Links de WhatsApp com mensagem pronta
document.querySelectorAll('[data-wa], [data-wa-model]').forEach((el) => {
  if (el.dataset.wa) el.href = waLink(el.dataset.wa);
  el.target = '_blank';
  el.rel = 'noopener';
});

// Cores dos modelos: troca a foto e leva a cor escolhida para a mensagem do WhatsApp
document.querySelectorAll('[data-model]').forEach((card) => {
  const img = card.querySelector('[data-model-img]');
  const thumb = document.querySelector(`[aria-controls="${card.id}"] img`);
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
    if (thumb) thumb.src = btn.dataset.src;
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

// Vitrine: escolha do modelo pelas miniaturas, setas do teclado ou deslizando a foto no celular
document.querySelectorAll('[data-showcase]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const show = (i, focus = false) => {
    i = (i + tabs.length) % tabs.length;
    tabs.forEach((t, j) => {
      const on = j === i;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (on && panel.hidden) {
        panel.hidden = false;
        panel.classList.remove('is-entering');
        void panel.offsetWidth;
        panel.classList.add('is-entering');
      } else if (!on) {
        panel.hidden = true;
      }
    });
    if (focus) tabs[i].focus();
  };
  const current = () => tabs.findIndex((t) => t.classList.contains('is-active'));

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1, true); }
    });
  });

  root.querySelectorAll('.panel__media').forEach((media) => {
    let x0 = null;
    media.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    media.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) show(current() + (dx < 0 ? 1 : -1));
    });
  });
});
