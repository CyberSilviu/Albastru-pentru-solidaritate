/* ============================================================
   ALBASTRU PENTRU SOLIDARITATE — Main JS
   Campania Națională de Conștientizare a Autismului
   Ediția a XIII-a, 2026 | Școala Gimnazială Specială Pașcani
   ============================================================ */

/* ─── CONȚINUT COMPLET ANUNȚURI ─── */
const ANUNT1_HTML = `
<p>💙 Lansăm Campania Națională de Conștientizare a Autismului „Albastru pentru Solidaritate" – ediția a XIII-a! 💙</p>
<p>Prin acest proiect ne propunem să promovăm, în școli și în comunități, înțelegerea, empatia și incluziunea copiilor cu autism.</p>
<p><strong>În cadrul campaniei vom desfășura:</strong></p>
<ul style="margin:0.5rem 0 1rem 1.5rem; line-height:1.9">
  <li>🔹 activități de informare pentru elevi și cadre didactice</li>
  <li>🔹 ateliere și discuții tematice</li>
  <li>🔹 concursuri (eseu, creație literară, bannere cu mesaje de solidaritate)</li>
  <li>🔹 momente dedicate susținerii incluziunii</li>
</ul>
<p>Autismul înseamnă diversitate, iar educația este primul pas spre o comunitate în care fiecare copil este sprijinit, valorizat și respectat.</p>
<p><strong>Inițiator și coordonator al proiectului:</strong><br>Școala Gimnazială Specială Pașcani</p>
<p><strong>Proiectul se desfășoară în parteneriat cu:</strong></p>
<ul style="margin:0.5rem 0 1rem 1.5rem; line-height:1.9">
  <li>📌 Inspectoratul Școlar Județean Iași</li>
  <li>📌 Asociația Zbor de fluturi</li>
  <li>📌 Acsinte Roxana Maria Cabinet de Psihologie</li>
  <li>📌 Foundation Ancora</li>
  <li>📌 Ancaar - filiala Iași</li>
  <li>📌 Centrul Județean de Resurse și Asistență Educațională Iași</li>
</ul>
<p>Vă invităm să fiți alături de noi, să distribuiți mesajul și să susțineți o comunitate în care fiecare copil are locul său. 💙</p>
<p style="color:var(--c-mid); font-size:0.88rem"><em>#AlbastruPentruSolidaritate #ConstientizareAutism #Incluziune #Educatie #Solidaritate</em></p>
`.trim();

const ANUNT2_HTML = `
<p>💙 Dragi părinți, frați și surori ai copiilor și tinerilor cu autism,</p>
<p>În cadrul Campaniei Naționale de Conștientizare a Autismului „Albastru pentru Solidaritate", ne dorim să aducem în lumină poveștile voastre — povești despre viața alături de o persoană cu autism, despre provocări și încercări, despre lacrimi și temeri, dar mai ales despre curaj, reușite, iubire și speranță.</p>
<p>Fiecare membru al familiei trăiește această experiență în mod diferit. Părinții poartă responsabilitatea drumului și a deciziilor, iar frații și surorile duc, uneori în tăcere, propriile emoții, întrebări și frământări.</p>
<p>Dacă simțiți că puteți și că este momentul potrivit, vă invităm să ne împărtășiți câteva gânduri din trăirea voastră.</p>
<p><strong>Vocea voastră poate deschide inimi, poate schimba mentalități și poate ajuta o comunitate întreagă să înțeleagă mai bine ce înseamnă, cu adevărat, autismul.</strong></p>
<p><strong>Puteți porni, dacă doriți, de la câteva întrebări precum:</strong></p>
<p>🔹 <strong>Pentru părinți:</strong></p>
<ul style="margin:0.5rem 0 1rem 1.5rem; line-height:1.9">
  <li>Ce vârstă are copilul tău?</li>
  <li>Cum ai trăit momentul aflării diagnosticului?</li>
  <li>Care a fost cea mai mare teamă a ta?</li>
  <li>Ce ți-ai fi dorit să auzi atunci?</li>
  <li>Ce pași ai făcut mai departe?</li>
  <li>Care sunt astăzi bucuriile și reușitele voastre?</li>
</ul>
<p>🔹 <strong>Pentru frați și surori:</strong></p>
<ul style="margin:0.5rem 0 1rem 1.5rem; line-height:1.9">
  <li>Cum ai înțeles și cum ai simțit diagnosticul?</li>
  <li>Care au fost provocările tale?</li>
  <li>Ce a fost cel mai greu pentru tine?</li>
  <li>Ce ai învățat din această experiență?</li>
  <li>Ce înseamnă pentru tine fratele sau sora ta astăzi?</li>
</ul>
<p>Mărturiile vor fi publicate pe site-ul proiectului pentru a informa și sensibiliza copiii și cadrele didactice din întreaga țară. Ele vor fi utilizate exclusiv în scop educativ, în cadrul campaniei, cu respectarea confidențialității și cu semnătura aleasă de fiecare participant (nume complet, prenume sau anonim).</p>
<p>Dacă doriți să ne împărtășiți povestea voastră, ne puteți scrie sau trimite un mesaj audio la:<br>✉️ <a href="mailto:albastrupentrusolidaritate@yahoo.com" style="color:var(--c-accent)">albastrupentrusolidaritate@yahoo.com</a></p>
<p>💙 Ne dorim ca vocile voastre să devină sprijin, încurajare și lumină pentru alte familii aflate la început de drum sau în momente dificile.<br>💙 Fiecare poveste contează. Fiecare voce poate aduce speranță.</p>
<p>Cu recunoștință,<br><strong>Echipa campaniei „Albastru pentru Solidaritate" 💙</strong></p>
`.trim();

/* ─── ANUNȚURI ─── */
const ANUNTURI_DATA = [
  {
    id: 6,
    titlu: 'Ne împărtășiți povestea voastră? — Invitație pentru familiile copiilor cu autism',
    rezumat: '💙 Dragi părinți, frați și surori ai copiilor și tinerilor cu autism — vă invităm să ne împărtășiți câteva gânduri din trăirea voastră. Vocea voastră poate deschide inimi și poate ajuta alte familii aflate la început de drum.',
    text: ANUNT2_HTML,
    imagine: 'imagini/anunt2.jpg',
    data: '4 Martie 2026',
    nou: true
  },
  {
    id: 5,
    titlu: 'Lansăm Campania Națională de Conștientizare a Autismului „Albastru pentru Solidaritate" – ediția a XIII-a!',
    rezumat: 'Prin acest proiect ne propunem să promovăm, în școli și în comunități, înțelegerea, empatia și incluziunea copiilor cu autism. Proiect inițiat de Școala Gimnazială Specială Pașcani, în parteneriat cu ISJ Iași, Asociația Zbor de fluturi, Fundația Ancora și alți parteneri.',
    text: ANUNT1_HTML,
    imagine: 'imagini/anunt1.jpg',
    data: '3 Martie 2026',
    nou: true
  },
  {
    id: 1,
    titlu: 'Deschisă înscrierea pentru Concursul Național „Mesaje Albastre" 2026',
    text: 'Concursul de bannere „Mesaje Albastre" este deschis! Realizați un banner cu mesaje de solidaritate și incluziune pentru persoanele cu TSA și trimiteți-l până pe 20 aprilie 2026. Detalii complete pe pagina concursului.',
    data: '1 Martie 2026',
    nou: true
  },
  {
    id: 2,
    titlu: 'Seminar Național „Autism: Diagnoză, Comunicare și Incluziune"',
    text: 'Înregistrați-vă la seminarul național dedicat cadrelor didactice, specialiștilor și părinților copiilor cu TSA. Locul desfășurării: Școala Gimnazială Specială Pașcani + online. Link de înscriere disponibil pe site.',
    data: '20 Februarie 2026',
    nou: true
  },
  {
    id: 3,
    titlu: 'Marșul Solidarității — 2 Aprilie 2026, ora 10:30',
    text: 'Pe 2 Aprilie 2026, de Ziua Internațională de Conștientizare a Autismului, vă invităm la Marșul Solidarității, Funda Umană și Flash Mob. Startul în Pașcani, de la Școala Gimnazială Specială, ora 10:30. Toți suntem bineveniți!',
    data: '10 Februarie 2026',
    nou: true
  },
  {
    id: 4,
    titlu: 'Peste 50 de școli partenere la ediția a XIII-a',
    text: 'Suntem bucuroși să anunțăm că ediția 2026 a campaniei „Albastru pentru Solidaritate" reunește deja peste 50 de unități de învățământ din 15 județe. Vă mulțumim pentru implicare!',
    data: '1 Februarie 2026',
    nou: false
  }
];

/* ─── ANUNTURI ADMIN — generate automat din panoul admin ─── */
const ANUNTURI_ADMIN = [];
/* ─── END ANUNTURI ADMIN ─── */

/* ─── PATH RESOLUTION ─── */
function getRoot() {
  const ph = document.getElementById('nav-placeholder');
  const depth = parseInt(ph ? ph.dataset.depth || '0' : '0');
  return depth > 0 ? Array(depth).fill('..').join('/') + '/' : '';
}

/* ─── GENERATE NAVBAR ─── */
function buildNavbar(root) {
  return `
<nav class="navbar transparent" id="navbar">
  <div class="container nav-inner">
    <a href="${root}index.html" class="nav-brand">
      <div class="nav-logo-circle">
        <svg viewBox="0 0 32 32" fill="white"><ellipse cx="16" cy="15" rx="10" ry="10" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="1"/><circle cx="12" cy="13" r="2" fill="white"/><circle cx="20" cy="13" r="2" fill="white"/><path d="M12 19 Q16 22.5 20 19" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
      </div>
      <div class="nav-brand-text">
        <span class="nav-brand-title">Albastru pentru</span>
        <span class="nav-brand-sub">Solidaritate</span>
      </div>
    </a>

    <ul class="nav-menu" id="navMenu">
      <li class="nav-item"><a href="${root}index.html" class="nav-link">Acasă</a></li>
      <li class="nav-item"><a href="${root}despre.html" class="nav-link">Despre Proiect</a></li>

      <li class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle">
          Activități de Informare
          <svg viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 6 5-6z"/></svg>
        </a>
        <ul class="dropdown-menu dd-managed" id="dropActivitati">
          <li><a href="${root}activitati/activitate1.html">Lumea Albastră – Informare &amp; Reflecție</a></li>
          <li><a href="${root}activitati/activitate2.html">Marșul Solidarității &amp; Flash Mob</a></li>
          <li><a href="${root}activitati/activitate3.html">Seminar Național – Autism</a></li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle">
          Concursuri și Votare
          <svg viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 6 5-6z"/></svg>
        </a>
        <ul class="dropdown-menu dd-managed" id="dropConcursuri">
          <li><a href="${root}concursuri/mesaje-albastre-detalii.html">🔵 Mesaje Albastre — Detalii</a></li>
          <li><a href="${root}concursuri/mesaje-albastre-voturi.html">❤ Mesaje Albastre — Votează</a></li>
          <li style="border-top:1px solid rgba(96,163,217,0.15);margin-top:4px;padding-top:4px"><a href="${root}concursuri/prieten-special-detalii.html">🐾 Prieten Special — Detalii</a></li>
          <li><a href="${root}concursuri/prieten-special-voturi.html">❤ Prieten Special — Votează</a></li>
        </ul>
      </li>

      <li class="nav-item"><a href="${root}galerie.html" class="nav-link">Galerie Foto</a></li>
      <li class="nav-item"><a href="${root}resurse.html" class="nav-link">Resurse și Materiale</a></li>
      <li class="nav-item">
        <a href="${root}anunturi.html" class="nav-link nav-anunturi">
          Anunțuri
          <span class="anunt-badge" id="anuntBadge" style="display:none">NOU</span>
        </a>
      </li>
    </ul>

    <button class="nav-hamburger" id="navToggle" aria-label="Meniu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;
}

/* ─── GENERATE FOOTER ─── */
function buildFooter(root) {
  return `
<footer class="footer">
  <div class="footer-wave-top">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80Z" fill="#001426"/>
    </svg>
  </div>
  <div class="container footer-inner">
    <div class="footer-col">
      <h4>Parteneri &amp; Sprijin</h4>
      <p>Proiectul este realizat cu sprijinul ISJ Iași, asociațiilor de profil și al comunităților locale din toată țara.</p>
      <div class="footer-links mt-2">
        <a href="${root}parteneri.html">Toți partenerii</a>
        <a href="${root}participanti.html">Școli participante</a>
        <a href="${root}resurse.html">Resurse educative</a>
      </div>
    </div>
    <div class="footer-col footer-center">
      <div class="footer-logo-big">
        <svg viewBox="0 0 32 32" fill="white"><ellipse cx="16" cy="15" rx="10" ry="10" fill="rgba(255,255,255,0.25)" stroke="white" stroke-width="1"/><circle cx="12" cy="13" r="2" fill="white"/><circle cx="20" cy="13" r="2" fill="white"/><path d="M12 19 Q16 22.5 20 19" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
      </div>
      <h4>Albastru pentru Solidaritate</h4>
      <p>Campania Națională de Conștientizare a Autismului<br>Ediția a XIII-a, 2026</p>
      <p style="font-size:0.8rem; margin-top:0.5rem; opacity:0.7">Inițiator: Școala Gimnazială Specială Pașcani</p>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <span>albastrupentrusolidaritate@yahoo.com</span>
      </div>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        <span>Prof. Oana Plaiu: 0742 751 682</span>
      </div>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        <span>Prof. Nedelcu Gabriela: 0722 231 252</span>
      </div>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
        <span>Str. Gării nr. 157, Pașcani, jud. Iași</span>
      </div>
      <div class="footer-links mt-2">
        <a href="${root}contact.html">Formular de contact</a>
        <a href="${root}anunturi.html">Anunțuri</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p>© 2026 Albastru pentru Solidaritate — Campania Națională de Conștientizare a Autismului, Ediția a XIII-a | <a href="${root}contact.html">Contact</a> | Școala Gimnazială Specială Pașcani</p>
    </div>
  </div>
</footer>`;
}

/* ─── ANNOUNCEMENTS BADGE ─── */
function checkAnnouncements() {
  const hasNew = getAllAnunturi().some(a => a.nou);
  const badge = document.getElementById('anuntBadge');
  if (badge && hasNew) badge.style.display = 'inline-flex';
}

/* ─── NAVBAR SCROLL BEHAVIOR ─── */
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('solid'); nav.classList.remove('transparent');
    } else {
      nav.classList.remove('solid'); nav.classList.add('transparent');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── JS DROPDOWN — fixes hover gap issue ─── */
function initDropdowns() {
  if (window.innerWidth <= 768) return;

  let closeTimer = null;

  function openMenu(menu) {
    clearTimeout(closeTimer);
    // Close sibling menus (same level)
    const parent = menu.parentElement;
    parent.parentElement.querySelectorAll(':scope > li > .dropdown-menu.dd-open').forEach(m => {
      if (m !== menu) m.classList.remove('dd-open');
    });
    menu.classList.add('dd-open');
    const navItem = menu.closest('.nav-item');
    if (navItem) navItem.classList.add('dd-active');
  }

  function scheduleClose(menu, delay) {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      menu.classList.remove('dd-open');
      const navItem = menu.closest('.nav-item');
      if (navItem) {
        const stillOpen = navItem.querySelector('.dropdown-menu.dd-open, .dropdown-submenu.dd-open');
        if (!stillOpen) navItem.classList.remove('dd-active');
      }
    }, delay || 140);
  }

  // Level 1 dropdowns
  document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    const menu = item.querySelector(':scope > .dropdown-menu');
    if (!menu) return;
    item.addEventListener('mouseenter', () => openMenu(menu));
    item.addEventListener('mouseleave', () => scheduleClose(menu, 140));
    menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    menu.addEventListener('mouseleave', () => scheduleClose(menu, 140));
  });

  // Level 2 sub-dropdowns
  document.querySelectorAll('.dropdown-sub').forEach(sub => {
    const submenu = sub.querySelector(':scope > .dropdown-submenu');
    if (!submenu) return;
    sub.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      // Close sibling submenus
      sub.parentElement.querySelectorAll('.dropdown-submenu.dd-open').forEach(m => {
        if (m !== submenu) m.classList.remove('dd-open');
      });
      submenu.classList.add('dd-open');
    });
    sub.addEventListener('mouseleave', () => scheduleClose(submenu, 140));
    submenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    submenu.addEventListener('mouseleave', () => scheduleClose(submenu, 140));
  });

  // Click outside closes all
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item.dropdown')) {
      clearTimeout(closeTimer);
      document.querySelectorAll('.dd-open').forEach(m => m.classList.remove('dd-open'));
      document.querySelectorAll('.dd-active').forEach(m => m.classList.remove('dd-active'));
    }
  });
}

/* ─── MOBILE HAMBURGER ─── */
function initHamburger() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close menu when clicking a real link (not dropdown toggles)
  menu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Dropdown toggles on mobile — expand/collapse inline
  menu.querySelectorAll('.dropdown-toggle').forEach(dtoggle => {
    dtoggle.addEventListener('click', e => {
      if (window.innerWidth > 768) return;
      e.preventDefault();
      const navItem = dtoggle.closest('.nav-item');
      const submenu = navItem ? navItem.querySelector('.dropdown-menu') : null;
      if (!submenu) return;
      const isOpen = submenu.classList.toggle('open');
      navItem.classList.toggle('mob-open', isOpen);
      // Close sibling dropdowns
      menu.querySelectorAll('.nav-item').forEach(item => {
        if (item !== navItem) {
          item.querySelector('.dropdown-menu')?.classList.remove('open');
          item.classList.remove('mob-open');
        }
      });
    });
  });
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    io.observe(el);
  });
}
window.initReveal = initReveal;

/* ─── HERO BUBBLES ─── */
function initBubbles() {
  const container = document.querySelector('.hero-bubbles');
  if (!container) return;
  for (let i = 0; i < 14; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 60 + 20;
    Object.assign(b.style, {
      width: size + 'px', height: size + 'px',
      left: Math.random() * 100 + '%',
      bottom: -size + 'px',
      animationDuration: (Math.random() * 14 + 8) + 's',
      animationDelay: (Math.random() * 6) + 's',
    });
    container.appendChild(b);
  }
}

/* ─── LIGHTBOX ─── */
let lbItems = [], lbCurrent = 0;
function initLightbox() {
  const items = document.querySelectorAll('[data-lightbox]');
  if (!items.length) return;
  lbItems = Array.from(items);
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  function openLb(idx) {
    lbCurrent = idx;
    const item  = lbItems[idx];
    const src   = item.dataset.lightbox;
    const cap   = item.dataset.caption || '';
    const inner = lb.querySelector('.lightbox-inner');
    const oldEl = inner.querySelector('img, .lb-placeholder');
    if (oldEl) oldEl.remove();
    const capEl = lb.querySelector('.lb-caption');
    if (capEl) capEl.textContent = cap;

    if (src && src !== '#') {
      const img = document.createElement('img');
      img.src = src; img.alt = cap;
      inner.prepend(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'lb-placeholder';
      ph.style.background = item.dataset.bg || 'var(--grad-hero)';
      ph.innerHTML = '<span style="font-size:4rem">' + (item.dataset.icon || '💙') + '</span>';
      inner.prepend(ph);
    }
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() { lb.classList.remove('active'); document.body.style.overflow = ''; }

  items.forEach((item, i) => item.addEventListener('click', () => openLb(i)));
  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.querySelector('.lb-prev').addEventListener('click', () => openLb((lbCurrent - 1 + lbItems.length) % lbItems.length));
  lb.querySelector('.lb-next').addEventListener('click', () => openLb((lbCurrent + 1) % lbItems.length));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft')  openLb((lbCurrent - 1 + lbItems.length) % lbItems.length);
    if (e.key === 'ArrowRight') openLb((lbCurrent + 1) % lbItems.length);
  });
}

/* ─── GET ALL ANNOUNCEMENTS (ANUNTURI_ADMIN din fișier + hardcoded) ─── */
function getAllAnunturi() {
  // ANUNTURI_ADMIN e populat din admin panel prin File System API
  // Fallback la localStorage pentru browsere unde fișierul nu a fost conectat încă
  let extra = ANUNTURI_ADMIN.length ? [] :
    (() => { try { return JSON.parse(localStorage.getItem('admin_anunturi') || '[]'); } catch { return []; } })();
  return [...ANUNTURI_ADMIN, ...extra, ...ANUNTURI_DATA];
}

/* ─── RENDER ANNOUNCEMENTS ─── */
function renderAnunturiPage() {
  const container = document.getElementById('anunturiList');
  if (!container) return;
  const all = getAllAnunturi();
  const root = getRoot();
  if (!all.length) {
    container.innerHTML = '<p style="text-align:center;color:var(--t-soft);padding:3rem">Nu există anunțuri momentan.</p>';
    return;
  }
  container.innerHTML = all.map(a => {
    const previewText = a.rezumat || (a.text.length > 180 ? a.text.slice(0, 177) + '...' : a.text);
    const hasFull = !!(a.rezumat || a.text.length > 180);
    const imgHtml = a.imagine
      ? `<img src="${root}${a.imagine}" alt="${a.titlu}" style="width:100%; border-radius:var(--radius-md); margin-bottom:1.25rem; display:block; max-height:480px; object-fit:cover">`
      : '';
    return `
    <div class="anunt-card ${a.nou ? 'new' : ''} reveal" style="cursor:default">
      ${a.nou ? '<span class="anunt-nou-tag">● NOU</span>' : ''}
      <div class="anunt-date">${a.data}</div>
      <h3>${a.titlu}</h3>
      ${imgHtml}
      <p class="anunt-preview">${previewText}</p>
      ${hasFull ? `<div class="anunt-full" style="display:none">${a.text}</div>
      <button class="anunt-toggle btn btn-light btn-sm" onclick="toggleAnunt(this)" style="margin-top:0.75rem">Citește mai mult ↓</button>` : ''}
    </div>`;
  }).join('');
  setTimeout(initReveal, 100);
}

window.toggleAnunt = function(btn) {
  const card = btn.closest('.anunt-card');
  const preview = card.querySelector('.anunt-preview');
  const full    = card.querySelector('.anunt-full');
  const isOpen  = full.style.display !== 'none';
  preview.style.display = isOpen ? '' : 'none';
  full.style.display    = isOpen ? 'none' : '';
  btn.textContent = isOpen ? 'Citește mai mult ↓' : 'Restrânge ↑';
};

/* ─── CONTACT FORM ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    if (success) {
      success.style.display = 'block';
      form.reset();
      setTimeout(() => success.style.display = 'none', 5000);
    }
  });
}

/* ─── COUNTER ANIMATION ─── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = parseInt(el.dataset.count);
      const step = end / (1800 / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, end);
        el.textContent = Math.floor(current).toLocaleString('ro-RO');
        if (current >= end) clearInterval(timer);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}

/* ─── ACTIVE LINK ─── */
function setActiveLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const linkFile = href.split('/').pop();
    const pathFile = path.split('/').pop();
    if (linkFile && pathFile && linkFile === pathFile && linkFile !== '') {
      link.classList.add('active');
    }
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  const root = getRoot();

  const navPh = document.getElementById('nav-placeholder');
  if (navPh) { navPh.innerHTML = buildNavbar(root); navPh.style.display = 'contents'; }

  const footPh = document.getElementById('footer-placeholder');
  if (footPh) { footPh.innerHTML = buildFooter(root); }

  initNavbarScroll();
  initDropdowns();
  initHamburger();
  checkAnnouncements();
  initReveal();
  initBubbles();
  initLightbox();
  setActiveLink();
  renderAnunturiPage();
  initContactForm();
  initCounters();

  if (window.scrollY > 60) {
    const nav = document.getElementById('navbar');
    if (nav) { nav.classList.add('solid'); nav.classList.remove('transparent'); }
  }
});

window.ANUNTURI_DATA = ANUNTURI_DATA;
