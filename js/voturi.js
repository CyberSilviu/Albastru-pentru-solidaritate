/* ============================================================
   ALBASTRU PENTRU SOLIDARITATE — Sistemul de Votare
   Firebase Realtime Database · Voturi globale · Admin timp real
   ============================================================ */

/* ─── CONFIGURARE ─── */
const ADMIN_PASSWORD = 'albastru2025';

/* ─── FIREBASE CONFIG ─── */
const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyBslrCo1AHCcxDqFa6dETNlUgIhwc0jCqM',
  authDomain:        'albastru-47a5b.firebaseapp.com',
  databaseURL:       'https://albastru-47a5b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId:         'albastru-47a5b',
  storageBucket:     'albastru-47a5b.firebasestorage.app',
  messagingSenderId: '827203884337',
  appId:             '1:827203884337:web:60a086c7ef4280efcd0c10',
};

/* ─── FIREBASE STATE ─── */
let _db    = null;
const _cache = {};   // { storageKey: { workId: count } } — cache local, actualizat de Firebase

function fbInit() {
  if (typeof firebase === 'undefined') return;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.database();
  } catch (e) {
    console.warn('[Voturi] Firebase init failed, fallback to localStorage:', e);
  }
}

/* Ascultă în timp real voturile unui concurs */
function fbSubscribe(storageKey, onChange) {
  if (!_db) {
    onChange(_cache[storageKey] || {});
    return;
  }
  _db.ref('votes/' + storageKey).on('value', snap => {
    const votes = snap.val() || {};
    _cache[storageKey] = votes;
    onChange(votes);
  });
}

/* Incrementare atomică a unui vot */
function fbIncrement(storageKey, workId, onDone, onFail) {
  if (!_db) {
    _cache[storageKey] = _cache[storageKey] || {};
    _cache[storageKey][workId] = (_cache[storageKey][workId] || 0) + 1;
    onDone(_cache[storageKey][workId]);
    return;
  }
  _db.ref('votes/' + storageKey + '/' + workId)
    .transaction(n => (n || 0) + 1, (err, committed, snap) => {
      if (err || !committed) { onFail(err); return; }
      onDone(snap.val());
    });
}

/* ─── LOCAL STORAGE — doar pentru „a votat deja" ─── */
function getVoted(key) {
  try { return JSON.parse(localStorage.getItem(key + '_voted') || '[]'); } catch { return []; }
}
function saveVoted(key, arr) {
  localStorage.setItem(key + '_voted', JSON.stringify(arr));
}

/* ─── DATE LUCRĂRI — MESAJE ALBASTRE ─── */
const LUCRARI_MESAJE_ALBASTRE = [
  { id: 'ma01', titlu: 'Lumea mea albastră',          autor: 'Maria Ionescu',        clasa: 'Clasa VI A',   icon: '💙', bg: 'linear-gradient(135deg,#003B73,#0085C7)' },
  { id: 'ma02', titlu: 'Acceptă-mă așa cum sunt',     autor: 'Alexandru Popa',       clasa: 'Clasa VII B',  icon: '🤝', bg: 'linear-gradient(135deg,#0085C7,#60A3D9)' },
  { id: 'ma03', titlu: 'Altfel înseamnă special',      autor: 'Ioana Constantin',     clasa: 'Clasa V C',    icon: '⭐', bg: 'linear-gradient(135deg,#005fa3,#BDD5EA)' },
  { id: 'ma04', titlu: 'Culoarea solidarității',       autor: 'Mihai Dumitrescu',     clasa: 'Clasa VIII A', icon: '🎨', bg: 'linear-gradient(135deg,#001f3f,#60A3D9)' },
  { id: 'ma05', titlu: 'Prieteni în toate culorile',   autor: 'Ana-Maria Florescu',   clasa: 'Clasa VI B',   icon: '🌈', bg: 'linear-gradient(135deg,#003B73,#BDD5EA)' },
  { id: 'ma06', titlu: 'Incluziunea ne face mai bogați', autor: 'Radu Moldovan',      clasa: 'Clasa VII A',  icon: '🌟', bg: 'linear-gradient(135deg,#002855,#0085C7)' },
  { id: 'ma07', titlu: 'Înțelege, sprijină, include!', autor: 'Cristina Avram',       clasa: 'Clasa V B',    icon: '💫', bg: 'linear-gradient(135deg,#0085C7,#003B73)' },
  { id: 'ma08', titlu: 'Autismul nu e o barieră',      autor: 'Tudor Gheorghiu',      clasa: 'Clasa VIII B', icon: '🚀', bg: 'linear-gradient(135deg,#60A3D9,#001f3f)' },
  { id: 'ma09', titlu: 'Empatia construiește punți',   autor: 'Larisa Stoica',        clasa: 'Clasa VI C',   icon: '🌉', bg: 'linear-gradient(135deg,#003B73,#60A3D9)' },
  { id: 'ma10', titlu: 'Vopsim lumea în albastru',     autor: 'Vlad Matei',           clasa: 'Clasa VII C',  icon: '🦋', bg: 'linear-gradient(135deg,#0085C7,#BDD5EA)' },
];

/* ─── DATE LUCRĂRI — POVESTEA UNUI PRIETEN SPECIAL ─── */
const LUCRARI_PRIETEN_SPECIAL = [
  /* ── Clasa a V-a ── */
  {
    id: 'ps-v-03', titlu: 'Buga Patricia', autor: 'Buga Patricia',
    clasa: 'Clasa a V-a', clasaGroup: 'V', clasaLabel: 'Clasa a V-a',
    scoala: 'Școala Profesională Petricani, Neamț',
    icon: '📖', bg: 'linear-gradient(135deg,#003B73,#0085C7)',
    folderPath: 'V/3',
    images: ['Buga PatriciaV Sc.Prof.Petricani_Neamț_Nechifor Marius Catalin.docx.jpg']
  },
  {
    id: 'ps-v-09', titlu: 'Dulcianu Anisia', autor: 'Dulcianu Anisia',
    clasa: 'Clasa a V-a B', clasaGroup: 'V', clasaLabel: 'Clasa a V-a',
    scoala: 'Școala Gimnazială Nicolae Iorga, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#003B73,#0085C7)',
    folderPath: 'V/9',
    images: ['DulcianuAnisia_VB_Școala Gimnaziala Nicolae Iorga_Iasi_Tarniceriu Daniela.jpg']
  },
  {
    id: 'ps-v-20', titlu: 'Zaharia Smaranda', autor: 'Zaharia Smaranda',
    clasa: 'Clasa a V-a B', clasaGroup: 'V', clasaLabel: 'Clasa a V-a',
    scoala: 'Școala Gimnazială Nicolae Iorga, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#003B73,#0085C7)',
    folderPath: 'V/20',
    images: [
      'ZahariaSmaranda_VB_Școala Gimnazială Nicolae Iorga_Iași_Daniela Olga Traniceriu_Page_1.jpg',
      'ZahariaSmaranda_VB_Școala Gimnazială Nicolae Iorga_Iași_Daniela Olga Traniceriu_Page_2.jpg'
    ]
  },
  /* ── Clasa a VI-a ── */
  {
    id: 'ps-vi-02', titlu: 'Bechi Karina', autor: 'Bechi Karina',
    clasa: 'Clasa a VI-a A', clasaGroup: 'VI', clasaLabel: 'Clasa a VI-a',
    scoala: 'Liceul Tehnologic Special, Dej, Cluj',
    icon: '📖', bg: 'linear-gradient(135deg,#0085C7,#48cae4)',
    folderPath: 'VI/2',
    images: ['Bechikarina_VI A_LiceulTehnologicSpecial_Dej_Cluj_DanSimona.jpg']
  },
  {
    id: 'ps-vi-07', titlu: 'Cotfase Sabina', autor: 'Cotfase Sabina',
    clasa: 'Clasa a VI-a', clasaGroup: 'VI', clasaLabel: 'Clasa a VI-a',
    scoala: 'Școala Profesională Petricani, Neamț',
    icon: '📖', bg: 'linear-gradient(135deg,#0085C7,#48cae4)',
    folderPath: 'VI/7',
    images: ['Cotfase Sabina_VI Sc.Prof_Petricani_Neamț__Nechifor Marius Catalin.jpg']
  },
  {
    id: 'ps-vi-08', titlu: 'Damian Eva Maria', autor: 'Damian Eva Maria',
    clasa: 'Clasa a VI-a A', clasaGroup: 'VI', clasaLabel: 'Clasa a VI-a',
    scoala: 'Școala Gimnazială Gheorghe I. Brătianu, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#0085C7,#48cae4)',
    folderPath: 'VI/8',
    images: [
      'DAMIAN EVA MARIA_VIA_ȘCOALA GIMNAZIALĂ GHEORGHE I. BRĂTIANU_IAȘI_IAȘI_OJICĂ SIMONA MARIA_Page_1.jpg',
      'DAMIAN EVA MARIA_VIA_ȘCOALA GIMNAZIALĂ GHEORGHE I. BRĂTIANU_IAȘI_IAȘI_OJICĂ SIMONA MARIA_Page_2.jpg'
    ]
  },
  {
    id: 'ps-vi-16', titlu: 'Podariu Antonia-Gabriela', autor: 'Podariu Antonia-Gabriela',
    clasa: 'Clasa a VI-a A', clasaGroup: 'VI', clasaLabel: 'Clasa a VI-a',
    scoala: 'Liceul Ștefan D. Luchian, Ștefănești, Botoșani',
    icon: '📖', bg: 'linear-gradient(135deg,#0085C7,#48cae4)',
    folderPath: 'VI/16',
    images: ['PODARIU ANTONIA-GABRIELA_CL. a VI-a A_LICEUL ȘTEFAN D. LUCHIAN_ ȘTEFĂNEȘTI-jud.BOTOȘANI_ .PROF.coord.Aruști Florentina-Crenguța.jfif.jpeg']
  },
  {
    id: 'ps-vi-18', titlu: 'Popa Anais Marie', autor: 'Popa Anais Marie',
    clasa: 'Clasa a VI-a', clasaGroup: 'VI', clasaLabel: 'Clasa a VI-a',
    scoala: 'Școala Gimnazială „Constantin Platon", Bacău',
    icon: '📖', bg: 'linear-gradient(135deg,#0085C7,#48cae4)',
    folderPath: 'VI/18',
    images: [
      'POPA ANAIS MARIE_CLASA VI_ȘCOALA GIMNAZIALĂ „CONSTANTIN PLATON„ BACĂU_BACĂU_PROF. NECULCEA MARIA-MANUELA (1) (1)_Page_1.jpg',
      'POPA ANAIS MARIE_CLASA VI_ȘCOALA GIMNAZIALĂ „CONSTANTIN PLATON„ BACĂU_BACĂU_PROF. NECULCEA MARIA-MANUELA (1) (1)_Page_2.jpg'
    ]
  },
  /* ── Clasa a VII-a ── */
  {
    id: 'ps-vii-01', titlu: 'Afrăsinei Alessi Elena', autor: 'Afrăsinei Alessi Elena',
    clasa: 'Clasa a VII-a A', clasaGroup: 'VII', clasaLabel: 'Clasa a VII-a',
    scoala: 'Școala Gimnazială Gheorghe I. Brătianu, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#023e8a,#90e0ef)',
    folderPath: 'VII/1',
    images: [
      'AFRĂSINEI ALESSI ELENA_VIIA_ȘCOALA GIMNAZIALĂ GHEORGHE I. BRĂTIANU_IAȘI_IAȘI_MELINTE ROXANA ELENA_Page_1.jpg',
      'AFRĂSINEI ALESSI ELENA_VIIA_ȘCOALA GIMNAZIALĂ GHEORGHE I. BRĂTIANU_IAȘI_IAȘI_MELINTE ROXANA ELENA_Page_2.jpg'
    ]
  },
  {
    id: 'ps-vii-06', titlu: 'Ciocoiu Emilia', autor: 'Ciocoiu Emilia',
    clasa: 'Clasa a VII-a', clasaGroup: 'VII', clasaLabel: 'Clasa a VII-a',
    scoala: 'Școala Profesională Petricani, Neamț',
    icon: '📖', bg: 'linear-gradient(135deg,#023e8a,#90e0ef)',
    folderPath: 'VII/6',
    images: ['Ciocoiu EmiliaVII_Sc.prpf.Petricani_Nechifor Elena.jpg']
  },
  {
    id: 'ps-vii-12', titlu: 'Negrea Ana Maria', autor: 'Negrea Ana Maria',
    clasa: 'Clasa a VII-a', clasaGroup: 'VII', clasaLabel: 'Clasa a VII-a',
    scoala: 'Școala Gimnazială Nr. 27, Timișoara',
    icon: '📖', bg: 'linear-gradient(135deg,#023e8a,#90e0ef)',
    folderPath: 'VII/12',
    images: ['Negrea Ana Maria_VII_SCOALA GIMNAZIALĂ NR 27_TIMISOARA_TIMIS_VARDARIE FOTESCU MIHAELA.docx.jpg']
  },
  {
    id: 'ps-vii-15', titlu: 'Pitirim Adrian', autor: 'Pitirim Adrian',
    clasa: 'Clasa a VII-a C', clasaGroup: 'VII', clasaLabel: 'Clasa a VII-a',
    scoala: 'Școala Gimnazială Șerban Cioculescu, Găești, Dâmbovița',
    icon: '📖', bg: 'linear-gradient(135deg,#023e8a,#90e0ef)',
    folderPath: 'VII/15',
    images: [
      'PITIRIM ADRIAN_cls a VII a C_Școala Gimnazială Șerban Cioculescu _Găești_Dâmbovița_ Diaconu Stela_Page_1.jpg',
      'PITIRIM ADRIAN_cls a VII a C_Școala Gimnazială Șerban Cioculescu _Găești_Dâmbovița_ Diaconu Stela_Page_2.jpg'
    ]
  },
  /* ── Clasa a VIII-a ── */
  {
    id: 'ps-viii-05', titlu: 'Ciocoiu Alexandra', autor: 'Ciocoiu Alexandra',
    clasa: 'Clasa a VIII-a', clasaGroup: 'VIII', clasaLabel: 'Clasa a VIII-a',
    scoala: 'Școala Gimnazială Târpești, Neamț',
    icon: '📖', bg: 'linear-gradient(135deg,#0077b6,#00b4d8)',
    folderPath: 'VIII/5',
    images: ['Ciocoiu Alexandra_VIII_Sc. Gimnazială Târpești_Neamț_Nechifor Elena.jpg']
  },
  {
    id: 'ps-viii-10', titlu: 'Farcaș Ana', autor: 'Farcaș Ana',
    clasa: 'Clasa a VIII-a', clasaGroup: 'VIII', clasaLabel: 'Clasa a VIII-a',
    scoala: 'Școala Gimnazială Mădârjac, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#0077b6,#00b4d8)',
    folderPath: 'VIII/10',
    images: [
      'FarcasAna_VIII_Școala Gimnazială Mădârjac_Mădârjac_Iași_Aftanase Alina_Page_1.jpg',
      'FarcasAna_VIII_Școala Gimnazială Mădârjac_Mădârjac_Iași_Aftanase Alina_Page_2.jpg'
    ]
  },
  {
    id: 'ps-viii-13', titlu: 'Nistor Sofia Alexandra', autor: 'Nistor Sofia Alexandra',
    clasa: 'Clasa a VIII-a A', clasaGroup: 'VIII', clasaLabel: 'Clasa a VIII-a',
    scoala: 'Colegiul Național Alexandru Ioan Cuza, Galați',
    icon: '📖', bg: 'linear-gradient(135deg,#0077b6,#00b4d8)',
    folderPath: 'VIII/13',
    images: ['Nistor Sofia Alexandra_VIIIA_Colegiul National Alexandru Ioan Cuza_Galati_Galati_Vlad Alina Ramona.jpg']
  },
  {
    id: 'ps-viii-17', titlu: 'Pop Mara', autor: 'Pop Mara',
    clasa: 'Clasa a VIII-a', clasaGroup: 'VIII', clasaLabel: 'Clasa a VIII-a',
    scoala: 'Școala Gimnazială Nr. 27, Timișoara',
    icon: '📖', bg: 'linear-gradient(135deg,#0077b6,#00b4d8)',
    folderPath: 'VIII/17',
    images: [
      'POP_MARA_VIII_ȘCOALA GIMNAZIALA NR 27_TIMIȘOARA_TIMIȘ_VARADRIE FOTESCU MIHAELA.docx_Page_1.jpg',
      'POP_MARA_VIII_ȘCOALA GIMNAZIALA NR 27_TIMIȘOARA_TIMIȘ_VARADRIE FOTESCU MIHAELA.docx_Page_2.jpg'
    ]
  },
  /* ── Clasa a IX-a ── */
  {
    id: 'ps-ix-11', titlu: 'Lupu George', autor: 'Lupu George',
    clasa: 'Clasa a IX-a C', clasaGroup: 'IX', clasaLabel: 'Clasa a IX-a',
    scoala: 'Liceul Tehnologic de Transporturi și de Construcții, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#001f3f,#0085C7)',
    folderPath: 'IX/11',
    images: [
      'Lupu George_a IX-a C_Liceul Tehnologic de Transporturi si de Constructii_Iasi_Iasi_Cernahuz Iuliana-Camelia.doc_Page_1.jpg',
      'Lupu George_a IX-a C_Liceul Tehnologic de Transporturi si de Constructii_Iasi_Iasi_Cernahuz Iuliana-Camelia.doc_Page_2.jpg',
      'Lupu George_a IX-a C_Liceul Tehnologic de Transporturi si de Constructii_Iasi_Iasi_Cernahuz Iuliana-Camelia.doc_Page_3.jpg',
      'Lupu George_a IX-a C_Liceul Tehnologic de Transporturi si de Constructii_Iasi_Iasi_Cernahuz Iuliana-Camelia.doc_Page_4.jpg'
    ]
  },
  /* ── Clasa a X-a ── */
  {
    id: 'ps-x-14', titlu: 'Pața Daria Ecaterina', autor: 'Pața Daria Ecaterina',
    clasa: 'Clasa a X-a C', clasaGroup: 'X', clasaLabel: 'Clasa a X-a',
    scoala: 'Colegiul Tehnic Gheorghe Asachi, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#003B73,#60A3D9)',
    folderPath: 'X/14',
    images: [
      'Pața Daria Ecaterina _clasa a X a C_Colegiul tehnic Gheorghe Asachi _Iași _ Leonte Mariana Liliana.docx_Page_1.jpg',
      'Pața Daria Ecaterina _clasa a X a C_Colegiul tehnic Gheorghe Asachi _Iași _ Leonte Mariana Liliana.docx_Page_2.jpg'
    ]
  },
  /* ── Clasa a XI-a ── */
  {
    id: 'ps-xi-19', titlu: 'Vulpe Alexandru', autor: 'Vulpe Alexandru',
    clasa: 'Clasa a XI-a A', clasaGroup: 'XI', clasaLabel: 'Clasa a XI-a',
    scoala: 'Liceul Tehnologic Carol I, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#005fa3,#BDD5EA)',
    folderPath: 'XI/19',
    images: [
      'VulpeAlexandru_XIA_Liceul Tehnologic Carol I_Iași_Iași_Humelnicu Cezar Daniel_Page_1.jpg',
      'VulpeAlexandru_XIA_Liceul Tehnologic Carol I_Iași_Iași_Humelnicu Cezar Daniel_Page_2.jpg'
    ]
  },
  /* ── Clasa a XIII-a ── */
  {
    id: 'ps-xiii-04', titlu: 'Buzincu Roxana', autor: 'Buzincu Roxana',
    clasa: 'Clasa a XIII-a A', clasaGroup: 'XIII', clasaLabel: 'Clasa a XIII-a',
    scoala: 'Liceul Tehnologic de Transporturi și de Construcții, Iași',
    icon: '📖', bg: 'linear-gradient(135deg,#60A3D9,#003B73)',
    folderPath: 'XIII/4',
    images: [
      'Buzincu Roxana_a XIII-a A_Liceul Tehnologic de Transporturi și de Construcții_Iași_Iași_Dogaru Camelia-Sorina.docx_Page_1.jpg',
      'Buzincu Roxana_a XIII-a A_Liceul Tehnologic de Transporturi și de Construcții_Iași_Iași_Dogaru Camelia-Sorina.docx_Page_2.jpg'
    ]
  },
];

/* ─── HELPERS UI ─── */
const HEART_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;vertical-align:middle"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

function initRevealObs() {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
}

/* Actualizează doar cifrele de vot (fără a reface DOM-ul cardurilor) */
function updateVoteDisplays(lucrari, votes) {
  lucrari.forEach(l => {
    const el = document.getElementById('count-' + l.id);
    if (el) el.innerHTML = HEART_SVG + ' ' + (votes[l.id] || 0) + ' voturi';
  });
}

/* ─── VOTE HANDLER (global) ─── */
window.doVote = function(storageKey, workId) {
  const btn     = document.getElementById('vote-' + workId);
  const countEl = document.getElementById('count-' + workId);
  if (!btn || !countEl) return;

  const voted = getVoted(storageKey);
  if (voted.includes(workId)) {
    btn.textContent = '✓ Ai votat deja';
    btn.disabled = true;
    return;
  }

  /* Feedback imediat */
  btn.textContent = '⏳';
  btn.disabled = true;

  /* Marchează în localStorage (anti-dublu-click) */
  voted.push(workId);
  saveVoted(storageKey, voted);

  fbIncrement(storageKey, workId,
    newCount => {
      countEl.innerHTML = HEART_SVG + ' ' + newCount + ' voturi';
      btn.textContent = '✓ Votat!';
      btn.classList.add('voted');
    },
    err => {
      /* Rollback dacă Firebase eșuează */
      const idx = voted.indexOf(workId);
      if (idx > -1) voted.splice(idx, 1);
      saveVoted(storageKey, voted);
      btn.textContent = '❤ Votează';
      btn.disabled = false;
      console.error('[Voturi] Firebase write error:', err);
    }
  );
};

/* ─── GALLERY NAVIGATION ─── */
window.galPrev = function(id) {
  const g = document.getElementById('gal-' + id);
  if (!g) return;
  const imgs = g.querySelectorAll('img');
  const ctr  = document.getElementById('gctr-' + id);
  let idx = parseInt(g.dataset.idx);
  imgs[idx].classList.remove('active');
  idx = (idx - 1 + imgs.length) % imgs.length;
  imgs[idx].classList.add('active');
  g.dataset.idx = idx;
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + imgs.length;
};

window.galNext = function(id) {
  const g = document.getElementById('gal-' + id);
  if (!g) return;
  const imgs = g.querySelectorAll('img');
  const ctr  = document.getElementById('gctr-' + id);
  let idx = parseInt(g.dataset.idx);
  imgs[idx].classList.remove('active');
  idx = (idx + 1) % imgs.length;
  imgs[idx].classList.add('active');
  g.dataset.idx = idx;
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + imgs.length;
};

/* ─── RENDER MESAJE ALBASTRE (icon-based) ─── */
function renderWorks(containerId, storageKey, lucrari) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const voted = getVoted(storageKey);

  /* Randare imediată cu 0 voturi (Firebase va actualiza în câteva ms) */
  container.innerHTML = lucrari.map(l => {
    const hasVoted = voted.includes(l.id);
    return `
    <article class="work-card reveal" data-id="${l.id}">
      <div class="work-artwork" style="background:${l.bg}">
        <span style="font-size:3.5rem;text-shadow:0 2px 12px rgba(0,0,0,0.3)">${l.icon}</span>
        <span class="work-artwork-label">${l.clasa}</span>
      </div>
      <div class="work-info">
        <h3 class="work-title">${l.titlu}</h3>
        <p class="work-author">✍️ ${l.autor}</p>
        <p class="work-class">${l.clasa}</p>
      </div>
      <div class="work-footer">
        <span class="vote-count" id="count-${l.id}">${HEART_SVG} — voturi</span>
        <button class="vote-btn${hasVoted ? ' voted' : ''}" id="vote-${l.id}"
          ${hasVoted ? 'disabled' : ''}
          onclick="doVote('${storageKey}','${l.id}')">
          ${hasVoted ? '✓ Ai votat' : '❤ Votează'}
        </button>
      </div>
    </article>`;
  }).join('');

  /* Actualizare în timp real din Firebase */
  fbSubscribe(storageKey, votes => updateVoteDisplays(lucrari, votes));

  setTimeout(() => {
    if (window.initReveal) initReveal();
    else initRevealObs();
  }, 50);
}

/* ─── RENDER PRIETEN SPECIAL (imagini + secțiuni pe clase) ─── */
function renderWorksByClass(containerId, storageKey, lucrari) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const voted    = getVoted(storageKey);
  const groupOrder = [];
  const groups   = {};

  lucrari.forEach(l => {
    if (!groups[l.clasaGroup]) {
      groups[l.clasaGroup] = { label: l.clasaLabel, works: [] };
      groupOrder.push(l.clasaGroup);
    }
    groups[l.clasaGroup].works.push(l);
  });

  container.innerHTML = groupOrder.map(key => {
    const { label, works } = groups[key];
    return `
    <div class="ps-class-section">
      <div class="ps-class-header">
        <span class="ps-class-badge">${label}</span>
        <span class="ps-class-count">${works.length} ${works.length === 1 ? 'lucrare' : 'lucrări'}</span>
      </div>
      <div class="works-grid">
        ${works.map(l => buildPSCard(l, voted, storageKey)).join('')}
      </div>
    </div>`;
  }).join('');

  fbSubscribe(storageKey, votes => updateVoteDisplays(lucrari, votes));

  setTimeout(() => {
    if (window.initReveal) initReveal();
    else initRevealObs();
  }, 50);
}

function buildPSCard(l, voted, storageKey) {
  const hasVoted = voted.includes(l.id);
  const base     = '../prietenul_special/' + l.folderPath + '/';

  let artworkHtml;
  if (l.images.length === 1) {
    artworkHtml = `
    <div class="work-artwork ps-gallery-single">
      <img src="${base}${encodeURIComponent(l.images[0])}" alt="${l.autor}" loading="lazy">
    </div>`;
  } else {
    const slides = l.images.map((img, i) =>
      `<img src="${base}${encodeURIComponent(img)}" alt="${l.autor} — pagina ${i + 1}" loading="lazy" class="${i === 0 ? 'active' : ''}">`
    ).join('');
    artworkHtml = `
    <div class="work-artwork ps-gallery" id="gal-${l.id}" data-idx="0">
      ${slides}
      <div class="ps-gallery-nav">
        <button onclick="galPrev('${l.id}')" aria-label="Pagina anterioară">&#8249;</button>
        <span class="ps-gallery-counter" id="gctr-${l.id}">1 / ${l.images.length}</span>
        <button onclick="galNext('${l.id}')" aria-label="Pagina următoare">&#8250;</button>
      </div>
    </div>`;
  }

  return `
  <article class="work-card reveal" data-id="${l.id}">
    ${artworkHtml}
    <div class="work-info">
      <h3 class="work-title">${l.autor}</h3>
      <p class="work-author" style="color:var(--c-mid);font-weight:700">${l.clasa}</p>
      <p style="font-size:0.76rem;color:var(--t-soft);margin-top:3px;line-height:1.45">${l.scoala}</p>
    </div>
    <div class="work-footer">
      <span class="vote-count" id="count-${l.id}">${HEART_SVG} — voturi</span>
      <button class="vote-btn${hasVoted ? ' voted' : ''}" id="vote-${l.id}"
        ${hasVoted ? 'disabled' : ''}
        onclick="doVote('${storageKey}','${l.id}')">
        ${hasVoted ? '✓ Ai votat' : '❤ Votează'}
      </button>
    </div>
  </article>`;
}

/* ─── ADMIN PANEL ─── */
function initAdmin(storageKey, lucrari) {
  const lockScreen  = document.getElementById('adminLock');
  const panel       = document.getElementById('adminPanel');
  const pwdForm     = document.getElementById('adminPwdForm');
  const pwdInput    = document.getElementById('adminPassword');
  const pwdError    = document.getElementById('pwdError');
  const exportBtn   = document.getElementById('exportBtn');
  const tableBody   = document.getElementById('adminTableBody');
  const countDisplay= document.getElementById('totalVotes');

  if (!lockScreen) return;

  const renderAdminTable = function(votes) {
    const sorted = [...lucrari]
      .map(l => ({ ...l, count: votes[l.id] || 0 }))
      .sort((a, b) => b.count - a.count);

    const total = sorted.reduce((s, l) => s + l.count, 0);
    if (countDisplay) countDisplay.textContent = total;

    const lupd = document.getElementById('lastUpdate');
    if (lupd) lupd.textContent = new Date().toLocaleString('ro-RO');

    tableBody.innerHTML = sorted.map((l, i) => {
      const rank = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      const pct  = total > 0 ? Math.round((l.count / total) * 100) : 0;
      const thumbHtml = (l.images && l.images.length > 0 && l.folderPath)
        ? `<img src="../prietenul_special/${l.folderPath}/${encodeURIComponent(l.images[0])}" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:8px;flex-shrink:0;">`
        : `<div style="width:40px;height:40px;border-radius:8px;background:${l.bg};display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">${l.icon}</div>`;
      return `
      <tr>
        <td><span class="admin-rank ${rank}">${i + 1}</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:12px">
            ${thumbHtml}
            <div>
              <strong style="color:var(--c-dark)">${l.titlu}</strong>
              <div style="font-size:0.8rem;color:var(--t-soft)">${l.autor} · ${l.clasa}</div>
              ${l.scoala ? `<div style="font-size:0.74rem;color:var(--c-mid)">${l.scoala}</div>` : ''}
            </div>
          </div>
        </td>
        <td>
          <strong style="font-size:1.2rem;color:var(--c-dark)">${l.count}</strong>
          <div style="background:#eef4fc;border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:var(--grad-primary)"></div>
          </div>
          <small style="color:var(--t-soft)">${pct}%</small>
        </td>
        <td><span class="admin-badge">${l.id}</span></td>
      </tr>`;
    }).join('');
  };

  function showPanel() {
    lockScreen.style.display = 'none';
    panel.style.display      = 'block';

    /* Ascultă Firebase în timp real */
    fbSubscribe(storageKey, votes => {
      renderAdminTable(votes);
      /* Apelează callback-ul top3 înregistrat de pagina HTML */
      const cb = window._adminCallbacks && window._adminCallbacks[storageKey];
      if (cb) cb(votes);
    });
  }

  pwdForm && pwdForm.addEventListener('submit', e => {
    e.preventDefault();
    if (pwdInput.value === ADMIN_PASSWORD) {
      showPanel();
    } else {
      pwdError.style.display = 'block';
      pwdInput.value = '';
      pwdInput.focus();
    }
  });

  exportBtn && exportBtn.addEventListener('click', () => {
    const votes = _cache[storageKey] || {};
    const data  = lucrari.map(l => ({
      id:     l.id,
      titlu:  l.titlu,
      autor:  l.autor,
      clasa:  l.clasa,
      scoala: l.scoala || '',
      voturi: votes[l.id] || 0
    })).sort((a, b) => b.voturi - a.voturi);

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = storageKey.replace('votes_', 'voturi_') + '.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  const refreshBtn = document.getElementById('refreshBtn');
  refreshBtn && refreshBtn.addEventListener('click', () => {
    if (_db) {
      _db.ref('votes/' + storageKey).once('value').then(snap => {
        const votes = snap.val() || {};
        _cache[storageKey] = votes;
        renderAdminTable(votes);
        const cb = window._adminCallbacks && window._adminCallbacks[storageKey];
        if (cb) cb(votes);
      });
    } else {
      renderAdminTable(_cache[storageKey] || {});
    }
  });

  const resetBtn = document.getElementById('resetBtn');
  resetBtn && resetBtn.addEventListener('click', () => {
    if (confirm('ATENȚIE: Această acțiune șterge TOATE voturile din Firebase! Nu poate fi anulată. Ești sigur?')) {
      if (_db) {
        _db.ref('votes/' + storageKey).remove()
          .then(() => alert('Voturile au fost resetate în Firebase.'))
          .catch(err => alert('Eroare Firebase: ' + err.message));
      } else {
        _cache[storageKey] = {};
        renderAdminTable({});
        alert('Voturile au fost resetate (mod offline).');
      }
    }
  });
}

/* ─── INIT ─── */
fbInit();

document.addEventListener('DOMContentLoaded', () => {
  const adminLock = document.getElementById('adminLock');

  if (adminLock) {
    const storageKey = adminLock.dataset.storage || 'votes_ma';
    if (storageKey === 'votes_ma') initAdmin('votes_ma', LUCRARI_MESAJE_ALBASTRE);
    if (storageKey === 'votes_ps') initAdmin('votes_ps', LUCRARI_PRIETEN_SPECIAL);
  } else {
    renderWorks('worksGridMA', 'votes_ma', LUCRARI_MESAJE_ALBASTRE);
    renderWorksByClass('psClassesContainer', 'votes_ps', LUCRARI_PRIETEN_SPECIAL);
  }
});
