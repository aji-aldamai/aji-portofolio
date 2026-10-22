// 1. Teks mengetik di hero
const roles = ['Graphic Design & Blender 3D Designer', 'Apparel & Screen Printing', 'Brand & Social Media Design'];
const typed = document.getElementById('typed');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) typed.textContent = roles[0];
else {
  let r = 0, i = 0, del = false;
  (function tick() {
    const t = roles[r];
    typed.textContent = t.slice(0, i);
    if (!del && i === t.length) { del = true; return setTimeout(tick, 1800); }
    if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 30 : 70);
  })();
}

// 2. Menu navbar: pill hijau berpindah sesuai section yang sedang dilihat
const links = document.querySelectorAll('.nav [data-link]');
const nav = document.getElementById('nav');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    links.forEach(l => l.classList.toggle('active', l.dataset.link === id));
    // di section hijau (projects), pill berubah jadi gelap agar tetap terbaca
    links.forEach(l => l.classList.toggle('on-green', id === 'projects'));
  });
}, { threshold: 0.5 });
document.querySelectorAll('section').forEach(s => io.observe(s));
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 80), { passive: true });

// 3. Kartu proyek miring mengikuti kursor
if (!reduce) document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const b = card.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - .5;
    const y = (e.clientY - b.top) / b.height - .5;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// 4. Klik kanan/tahan tidak perlu; klik + Alt pada kontak = salin username
const toast = document.getElementById('toast');
document.querySelectorAll('.socials a').forEach(a => {
  a.addEventListener('click', e => {
    if (!e.altKey) return;
    e.preventDefault();
    navigator.clipboard?.writeText(a.textContent.trim());
    toast.textContent = 'Tersalin: ' + a.textContent.trim();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  });
});
