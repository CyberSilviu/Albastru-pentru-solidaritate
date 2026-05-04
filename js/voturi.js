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
  /* ── Gimnaziu ── */
  {
    id: 'ma-g-01', titlu: 'Centru de Resurse', autor: 'Centru de Resurse',
    clasa: 'Centru de Resurse',
    scoala: 'I.P. Gimnaziul Ștefan cel Mare, Nisporeni, Republica Moldova',
    profesor: 'Bîtcă Veronica',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['Centru de resurse_I.P.Gimnaziul Ștefan cel Mare_Nisporeni_Republica Moldova_Bîtcă Veronica (1).jpg.jpeg'],
    icon: '💙', bg: 'linear-gradient(135deg,#003B73,#0085C7)'
  },
  {
    id: 'ma-g-02', titlu: 'Clasa a V-a A', autor: 'Clasa a V-a A',
    clasa: 'Clasa a V-a A',
    scoala: 'Școala Gimnazială Nr. 1, Hotar, Bihor',
    profesor: 'Gherlea Lenuța',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['V A_ŞCOALA GIMNAZIALĂ NR. 1_HOTAR_BIHOR_GHERLEA LENUŢA.jpg.jpeg'],
    icon: '🎨', bg: 'linear-gradient(135deg,#0085C7,#60A3D9)'
  },
  {
    id: 'ma-g-03', titlu: 'Clasa a V-a A', autor: 'Clasa a V-a A',
    clasa: 'Clasa a V-a A',
    scoala: 'Școala Gimnazială Uda, Iași',
    profesor: 'Pintilie Nicolae',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VA_Şcoala Gimnazialǎ Uda_Uda_Iași_Pintilie Nicolae.JPG.jpeg'],
    icon: '🌊', bg: 'linear-gradient(135deg,#005fa3,#BDD5EA)'
  },
  {
    id: 'ma-g-04', titlu: 'Clasa a V-a A', autor: 'Clasa a V-a A',
    clasa: 'Clasa a V-a A',
    scoala: 'Școala Gimnazială Elena Cuza, Iași',
    profesor: 'Lazorec Maria',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VA_Școala Gimnazială Elena Cuza_Iași_Iași_Lazorec Maria.jpg.jpeg'],
    icon: '⭐', bg: 'linear-gradient(135deg,#001f3f,#0085C7)'
  },
  {
    id: 'ma-g-05', titlu: 'Clasa a VI-a C', autor: 'Clasa a VI-a C',
    clasa: 'Clasa a VI-a C',
    scoala: 'Școala Gimnazială Gh. I. Brătianu, Iași',
    profesor: 'Iancu Gabriela',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VI C_ȘCOALA GIMNAZIALĂ GH. I. BRĂTIANU_IAȘI_IAȘI_IANCU GABRIELA.jpeg'],
    icon: '🌟', bg: 'linear-gradient(135deg,#003B73,#60A3D9)'
  },
  {
    id: 'ma-g-06', titlu: 'Clasa a VI-a C', autor: 'Clasa a VI-a C',
    clasa: 'Clasa a VI-a C',
    scoala: 'Școala Gimnazială Șerban Cioculescu, Găești, Dâmbovița',
    profesor: 'Diaconu Stela',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VI C_ȘCOALA GIMNAZIALĂ ȘERBAN CIOCULESCU _GĂEȘTI_DÂMBOVIȚA_DIACONU STELA.jpg.jpeg'],
    icon: '💫', bg: 'linear-gradient(135deg,#002855,#0085C7)'
  },
  {
    id: 'ma-g-07', titlu: 'Clasa a VI-a A', autor: 'Clasa a VI-a A',
    clasa: 'Clasa a VI-a A',
    scoala: 'Școala Profesională Tătăruși, Iași',
    profesor: 'Epure Oana',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VIA_Şcoala Profesionalǎ Tǎtǎruși_Tǎtǎruși_Iași_Epure Oana.JPG.jpeg'],
    icon: '🤝', bg: 'linear-gradient(135deg,#0077b6,#48cae4)'
  },
  {
    id: 'ma-g-08', titlu: 'Clasa a VII-a B', autor: 'Clasa a VII-a B',
    clasa: 'Clasa a VII-a B',
    scoala: 'Centrul Școlar pentru Educație Incluzivă Băbeni, Vâlcea',
    profesor: 'Chiosilă Bianca',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VII B_CENTRUL ȘCOLAR PENTRU EDUCAȚIE INCLUZIVĂ BĂBENI_BĂBENI_VÂLCEA_CHIOSILĂ BIANCA.jpeg'],
    icon: '🌈', bg: 'linear-gradient(135deg,#023e8a,#90e0ef)'
  },
  {
    id: 'ma-g-09', titlu: 'Clasa a VII-a A', autor: 'Clasa a VII-a A',
    clasa: 'Clasa a VII-a A',
    scoala: 'Școala Gimnazială nr. 1, Costești',
    profesor: 'Butnariu Geanina',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VIIA_Școala Gimnazială nr. 1_ Costești_Butnariu Geanina.jpg.jpeg'],
    icon: '🦋', bg: 'linear-gradient(135deg,#003B73,#BDD5EA)'
  },
  {
    id: 'ma-g-10', titlu: 'Clasa a VIII-a A', autor: 'Clasa a VIII-a A',
    clasa: 'Clasa a VIII-a A',
    scoala: 'Colegiul Național Alexandru Ioan Cuza, Galați',
    profesor: 'Vlad Alina Ramona',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VIIIA_Colegiul National Alexandru Ioan Cuza_Galati_Galati_Vlad Alina Ramona.jpeg'],
    icon: '🏆', bg: 'linear-gradient(135deg,#001f3f,#60A3D9)'
  },
  {
    id: 'ma-g-11', titlu: 'Clasa a VIII-a', autor: 'Clasa a VIII-a',
    clasa: 'Clasa a VIII-a',
    scoala: 'Școala Gimnazială Nr. 1, Santa Mare, Botoșani',
    profesor: 'Asavetei Lăcrămioara',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VIII_ȘcoalaGimnazialăNr.1_SantaMare_Botoșani_AsaveteiLăcrămioara.jpeg'],
    icon: '🌸', bg: 'linear-gradient(135deg,#0085C7,#003B73)'
  },
  {
    id: 'ma-g-12', titlu: 'Clasa a VII-a', autor: 'Clasa a VII-a',
    clasa: 'Clasa a VII-a',
    scoala: 'Școala Gimnazială Nr. 2, Tețchea, Bihor',
    profesor: 'Ilea Luminița Maria',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VII_ŞCOALA GIMNAZIALĂ NR. 2_ŢEŢCHEA_BIHOR_ILEA LUMINIŢA MARIA.jpg.jpeg'],
    icon: '🎯', bg: 'linear-gradient(135deg,#60A3D9,#001f3f)'
  },
  {
    id: 'ma-g-13', titlu: 'Clasa a VII-a', autor: 'Clasa a VII-a',
    clasa: 'Clasa a VII-a',
    scoala: 'Școala Gimnazială Vânători, Hârtoape, Iași',
    profesor: 'Chihaia Ramona Mihaela',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VII_Școala Gimnazială Vânători_Hârtoape_Iași_Chihaia Ramona Mihaela.JPG.jpeg'],
    icon: '🌿', bg: 'linear-gradient(135deg,#005fa3,#60A3D9)'
  },
  {
    id: 'ma-g-14', titlu: 'Clasa a VI-a', autor: 'Clasa a VI-a',
    clasa: 'Clasa a VI-a',
    scoala: 'Școala Gimnazială Sânmihaiu Român, Timiș',
    profesor: 'Boba Cristina Elena & Iuga Gabriela Tania',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['VI_Școala Gimnazială Sânmihaiu Român_Sânmihaiu Român_Timiș_Boba Cristina Elena_Iuga Gabriela Tania.jpg.jpeg'],
    icon: '🤗', bg: 'linear-gradient(135deg,#003B73,#0077b6)'
  },
  {
    id: 'ma-g-15', titlu: 'Clasa a V-a', autor: 'Clasa a V-a',
    clasa: 'Clasa a V-a',
    scoala: 'Școala Gimnazială Specială Huedin, Cluj',
    profesor: 'Abrudan Simona Rodica & Cernischi Adrian',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['V_Școala Gimnazială Specială Huedin_Cluj_Abrudan Simona Rodica_Cernischi Adrian .jpg.jpeg'],
    icon: '🌺', bg: 'linear-gradient(135deg,#0085C7,#002855)'
  },
  {
    id: 'ma-g-16', titlu: 'Clasa a VI-a A', autor: 'Clasa a VI-a A',
    clasa: 'Clasa a VI-a A',
    scoala: 'Centrul Școlar pentru Educație Incluzivă Târgu Neamț, Neamț',
    profesor: 'Cucoș Maria',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['aVI a A _Centrul Școlar pentru Educație Incluzivă Târgu Neamț_Târgu Neamț_Neamț_Cucoș Maria.jfif.jpeg'],
    icon: '💎', bg: 'linear-gradient(135deg,#001f3f,#48cae4)'
  },
  {
    id: 'ma-g-17', titlu: 'Clasa a VI-a B', autor: 'Clasa a VI-a B',
    clasa: 'Clasa a VI-a B',
    scoala: 'Centrul Școlar pentru Educație Incluzivă Târgu Neamț, Neamț',
    profesor: 'Popa Marcela',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['aVI a B _Centrul Școlar pentru Educație Incluzivă Târgu Neamț_Târgu Neamț_Neamț_Popa Marcela.jfif.jpeg'],
    icon: '🦚', bg: 'linear-gradient(135deg,#023e8a,#BDD5EA)'
  },
  {
    id: 'ma-g-18', titlu: 'Clasa a VII-a / a VIII-a', autor: 'Clasa a VII-a / a VIII-a',
    clasa: 'Clasa a VII-a / a VIII-a',
    scoala: 'Școala Gimnazială „Ștefan cel Mare și Sfânt" Dobrovăț, Iași',
    profesor: 'Dulcianu Andreea Cornelia',
    nivelGroup: 'G', nivelLabel: 'Gimnaziu',
    imgBase: '../mesaje_albastre/gimnaziu/',
    images: ['aVIIa_aVIII-a_Școala Gimnazială „Ștefan cel Mare și Sfânt" Dobrovăț_Dobrovăț_Iași_Dulcianu Andreea Cornelia.jpeg'],
    icon: '🌙', bg: 'linear-gradient(135deg,#003B73,#023e8a)'
  },
  /* ── Liceu ── */
  {
    id: 'ma-l-01', titlu: 'Clasa a IX-a A', autor: 'Clasa a IX-a A',
    clasa: 'Clasa a IX-a A',
    scoala: 'Liceul Tehnologic Ion Ionescu de la Brad, Horia, Neamț',
    profesor: 'Lenuța Enea',
    nivelGroup: 'L', nivelLabel: 'Liceu',
    imgBase: '../mesaje_albastre/liceu/',
    images: ['IX A_LICEUL TEHNOLOGIC ION IONESCU DE LA BRAD_Horia_Neamț_Lenuța Enea.jpg.jpeg'],
    icon: '🚀', bg: 'linear-gradient(135deg,#002855,#0085C7)'
  },
  {
    id: 'ma-l-02', titlu: 'Clasa a X-a B', autor: 'Clasa a X-a B',
    clasa: 'Clasa a X-a B',
    scoala: 'Colegiul Național Alexandru Ioan Cuza, Galați',
    profesor: 'Vlad Alina Ramona',
    nivelGroup: 'L', nivelLabel: 'Liceu',
    imgBase: '../mesaje_albastre/liceu/',
    images: ['XB_Colegiul National Alexandru Ioan Cuza_Galati_Galati_Vlad Alina Ramona.jpeg'],
    icon: '🏅', bg: 'linear-gradient(135deg,#001f3f,#0077b6)'
  },
  {
    id: 'ma-l-03', titlu: 'Clasa a XI-a A', autor: 'Clasa a XI-a A',
    clasa: 'Clasa a XI-a A',
    scoala: 'Colegiul Tehnic „Ion Holban", Iași',
    profesor: 'Hriscu Cristina',
    nivelGroup: 'L', nivelLabel: 'Liceu',
    imgBase: '../mesaje_albastre/liceu/',
    images: ['XIA_Colegiul Tehnic „Ion Holban"_Iași_Iași_Hriscu Cristina.jpeg'],
    icon: '✨', bg: 'linear-gradient(135deg,#0085C7,#023e8a)'
  },
  {
    id: 'ma-l-04', titlu: 'Clasa a IX-a C', autor: 'Clasa a IX-a C',
    clasa: 'Clasa a IX-a C',
    scoala: 'Liceul Tehnologic de Transporturi și de Construcții, Iași',
    profesor: 'Cernahuz Iuliana-Camelia',
    nivelGroup: 'L', nivelLabel: 'Liceu',
    imgBase: '../mesaje_albastre/liceu/',
    images: ['a IX-a C_Liceul Tehnologic de Transporturi și de Construcții_Iași_Iași_Cernahuz Iuliana-Camelia.jpg.jpeg'],
    icon: '🎭', bg: 'linear-gradient(135deg,#005fa3,#BDD5EA)'
  },
  {
    id: 'ma-l-05', titlu: 'Clasa a XIII-a A', autor: 'Clasa a XIII-a A',
    clasa: 'Clasa a XIII-a A',
    scoala: 'Liceul Tehnologic de Transporturi și de Construcții, Iași',
    profesor: 'Dogaru Camelia-Sorina',
    nivelGroup: 'L', nivelLabel: 'Liceu',
    imgBase: '../mesaje_albastre/liceu/',
    images: ['a XIII-a A_Liceul Tehnologic de Transporturi și de Construcții_Iași_Iași_Dogaru Camelia-Sorina.jpeg'],
    icon: '🌠', bg: 'linear-gradient(135deg,#60A3D9,#002855)'
  },
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

/* ─── LIGHTBOX ─── */
let _lbImages = [];
let _lbIdx    = 0;

function initLightbox() {
  if (document.getElementById('ps-lightbox')) return;

  const style = document.createElement('style');
  style.textContent = `
    #ps-lightbox {
      position:fixed;inset:0;z-index:9999;
      background:rgba(0,12,30,0.96);
      display:none;align-items:center;justify-content:center;
      padding:56px 70px 48px;
    }
    #ps-lightbox img {
      max-height:calc(100vh - 112px);max-width:calc(100vw - 148px);
      object-fit:contain;border-radius:4px;
      box-shadow:0 8px 60px rgba(0,0,0,0.7);
      user-select:none;display:block;
    }
    .lb-btn {
      position:absolute;background:rgba(255,255,255,0.1);
      border:1px solid rgba(255,255,255,0.22);color:white;
      border-radius:50%;width:52px;height:52px;font-size:2rem;
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;transition:background 0.2s;z-index:2;line-height:1;
    }
    .lb-btn:hover{background:rgba(0,133,199,0.65);border-color:rgba(0,133,199,0.8);}
    #lb-close{top:14px;right:14px;font-size:1.4rem;width:44px;height:44px;}
    #lb-prev {left:12px;top:50%;transform:translateY(-50%);}
    #lb-next {right:12px;top:50%;transform:translateY(-50%);}
    #lb-counter{
      position:absolute;bottom:14px;left:50%;transform:translateX(-50%);
      background:rgba(0,0,0,0.55);color:white;
      font-size:0.8rem;font-weight:700;padding:4px 14px;border-radius:20px;white-space:nowrap;
    }
    #lb-caption{
      position:absolute;bottom:40px;left:50%;transform:translateX(-50%);
      color:rgba(255,255,255,0.72);font-size:0.78rem;text-align:center;white-space:nowrap;
    }
    #lb-bg{position:absolute;inset:0;cursor:pointer;}
    @media(max-width:600px){
      #ps-lightbox{padding:50px 8px 42px;}
      #ps-lightbox img{max-width:100%;max-height:calc(100vh - 100px);}
      #lb-prev{left:4px;}#lb-next{right:4px;}
    }
  `;
  document.head.appendChild(style);

  const lb = document.createElement('div');
  lb.id = 'ps-lightbox';
  lb.innerHTML = `
    <div id="lb-bg"></div>
    <button class="lb-btn" id="lb-close" aria-label="Închide">&#x2715;</button>
    <button class="lb-btn" id="lb-prev"  aria-label="Pagina anterioară">&#8249;</button>
    <img id="lb-img" src="" alt="Lucrare concurs">
    <button class="lb-btn" id="lb-next"  aria-label="Pagina următoare">&#8250;</button>
    <div id="lb-counter"></div>
    <div id="lb-caption"></div>
  `;
  document.body.appendChild(lb);

  document.getElementById('lb-close').addEventListener('click', lbClose);
  document.getElementById('lb-bg').addEventListener('click',    lbClose);
  document.getElementById('lb-prev').addEventListener('click',  lbPrev);
  document.getElementById('lb-next').addEventListener('click',  lbNext);

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('ps-lightbox');
    if (!lb || lb.style.display === 'none') return;
    if (e.key === 'Escape')     { e.preventDefault(); lbClose(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); lbPrev();  }
    if (e.key === 'ArrowRight') { e.preventDefault(); lbNext();  }
  });
}

function lbRefresh() {
  document.getElementById('lb-img').src = _lbImages[_lbIdx];
  const many = _lbImages.length > 1;
  document.getElementById('lb-counter').textContent = many ? (_lbIdx + 1) + ' / ' + _lbImages.length : '';
  document.getElementById('lb-prev').style.display  = many ? 'flex' : 'none';
  document.getElementById('lb-next').style.display  = many ? 'flex' : 'none';
  document.getElementById('ps-lightbox').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function lbClose() {
  const lb = document.getElementById('ps-lightbox');
  if (lb) lb.style.display = 'none';
  document.body.style.overflow = '';
}

function lbPrev() {
  _lbIdx = (_lbIdx - 1 + _lbImages.length) % _lbImages.length;
  lbRefresh();
}

function lbNext() {
  _lbIdx = (_lbIdx + 1) % _lbImages.length;
  lbRefresh();
}

window.lbOpenWork = function(workId, imgIdx) {
  initLightbox();
  const work = LUCRARI_PRIETEN_SPECIAL.find(l => l.id === workId)
            || LUCRARI_MESAJE_ALBASTRE.find(l => l.id === workId);
  if (!work) return;
  const base = work.imgBase || ('../prietenul_special/' + work.folderPath + '/');
  _lbImages  = work.images.map(img => base + encodeURIComponent(img));
  _lbIdx     = imgIdx || 0;
  const cap  = document.getElementById('lb-caption');
  if (cap) {
    const parts = [];
    if (work.autor) parts.push(work.autor);
    if (work.clasa && work.clasa !== work.autor) parts.push(work.clasa);
    if (work.scoala) parts.push(work.scoala);
    if (work.profesor) parts.push('prof. ' + work.profesor);
    cap.textContent = parts.join(' · ');
  }
  lbRefresh();
};

/* ─── BUILD CARD (imagine + galerie + vot) ─── */
function buildImageCard(l, voted, storageKey) {
  const hasVoted = voted.includes(l.id);
  const base     = l.imgBase || ('../prietenul_special/' + l.folderPath + '/');
  const label    = l.autor || l.clasa;

  let artworkHtml;
  if (!l.images || l.images.length === 0) {
    artworkHtml = `
    <div class="work-artwork" style="background:${l.bg};display:flex;align-items:center;justify-content:center">
      <span style="font-size:3.5rem;text-shadow:0 2px 12px rgba(0,0,0,0.3)">${l.icon}</span>
    </div>`;
  } else if (l.images.length === 1) {
    artworkHtml = `
    <div class="work-artwork ps-gallery-single" onclick="lbOpenWork('${l.id}',0)" title="Click pentru a mări">
      <img src="${base}${encodeURIComponent(l.images[0])}" alt="${label}" loading="lazy">
      <span class="ps-zoom-hint">🔍</span>
    </div>`;
  } else {
    const slides = l.images.map((img, i) =>
      `<img src="${base}${encodeURIComponent(img)}" alt="${label} — pagina ${i + 1}" loading="lazy" class="${i === 0 ? 'active' : ''}" onclick="lbOpenWork('${l.id}',${i})">`
    ).join('');
    artworkHtml = `
    <div class="work-artwork ps-gallery" id="gal-${l.id}" data-idx="0">
      ${slides}
      <span class="ps-zoom-hint">🔍</span>
      <div class="ps-gallery-nav">
        <button onclick="galPrev('${l.id}');event.stopPropagation()" aria-label="Pagina anterioară">&#8249;</button>
        <span class="ps-gallery-counter" id="gctr-${l.id}">1 / ${l.images.length}</span>
        <button onclick="galNext('${l.id}');event.stopPropagation()" aria-label="Pagina următoare">&#8250;</button>
      </div>
    </div>`;
  }

  const lbBtn = (l.images && l.images.length > 0)
    ? `<button class="lb-open-btn" onclick="lbOpenWork('${l.id}',0)">🔍 Citește lucrarea</button>`
    : '';

  const clasaLine = (l.clasa && l.clasa !== l.autor)
    ? `<p class="work-author" style="color:var(--c-mid);font-weight:700">${l.clasa}</p>`
    : '';

  const scoalaLine = l.scoala
    ? `<p style="font-size:0.76rem;color:var(--t-soft);margin-top:3px;line-height:1.45">${l.scoala}</p>`
    : '';

  const profLine = l.profesor
    ? `<p style="font-size:0.72rem;color:var(--c-mid);margin-top:2px">prof. ${l.profesor}</p>`
    : '';

  return `
  <article class="work-card reveal" data-id="${l.id}">
    ${artworkHtml}
    ${lbBtn}
    <div class="work-info">
      <h3 class="work-title">${label}</h3>
      ${clasaLine}
      ${scoalaLine}
      ${profLine}
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

/* ─── RENDER GRUPAT (imagini + secțiuni) ─── */
function renderWorksByGroup(containerId, storageKey, lucrari, groupField, labelField) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const voted      = getVoted(storageKey);
  const groupOrder = [];
  const groups     = {};

  lucrari.forEach(l => {
    const key = l[groupField];
    if (!groups[key]) {
      groups[key] = { label: l[labelField], works: [] };
      groupOrder.push(key);
    }
    groups[key].works.push(l);
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
        ${works.map(l => buildImageCard(l, voted, storageKey)).join('')}
      </div>
    </div>`;
  }).join('');

  fbSubscribe(storageKey, votes => updateVoteDisplays(lucrari, votes));
  initLightbox();

  setTimeout(() => {
    if (window.initReveal) initReveal();
    else initRevealObs();
  }, 50);
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
      const imgBase   = l.imgBase || (l.folderPath ? `../prietenul_special/${l.folderPath}/` : null);
      const thumbHtml = (l.images && l.images.length > 0 && imgBase)
        ? `<img src="${imgBase}${encodeURIComponent(l.images[0])}" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:8px;flex-shrink:0;">`
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
    renderWorksByGroup('maGroupsContainer', 'votes_ma', LUCRARI_MESAJE_ALBASTRE, 'nivelGroup', 'nivelLabel');
    renderWorksByGroup('psClassesContainer', 'votes_ps', LUCRARI_PRIETEN_SPECIAL, 'clasaGroup', 'clasaLabel');
  }
});
