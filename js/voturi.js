/* ============================================================
   ALBASTRU PENTRU SOLIDARITATE — Sistemul de Votare
   LocalStorage · JSON Export · Admin Panel
   ============================================================ */

/* ─── CONFIGURARE ─── */
const ADMIN_PASSWORD = 'albastru2025';  // ← schimbați parola aici

/* ─── DATE LUCRĂRI ─── */
const LUCRARI_MESAJE_ALBASTRE = [
  { id: 'ma01', titlu: 'Lumea mea albastră', autor: 'Maria Ionescu',        clasa: 'Clasa VI A', icon: '💙', bg: 'linear-gradient(135deg, #003B73, #0085C7)' },
  { id: 'ma02', titlu: 'Acceptă-mă așa cum sunt', autor: 'Alexandru Popa', clasa: 'Clasa VII B', icon: '🤝', bg: 'linear-gradient(135deg, #0085C7, #60A3D9)' },
  { id: 'ma03', titlu: 'Altfel înseamnă special', autor: 'Ioana Constantin', clasa: 'Clasa V C', icon: '⭐', bg: 'linear-gradient(135deg, #005fa3, #BDD5EA)' },
  { id: 'ma04', titlu: 'Culoarea solidarității', autor: 'Mihai Dumitrescu', clasa: 'Clasa VIII A', icon: '🎨', bg: 'linear-gradient(135deg, #001f3f, #60A3D9)' },
  { id: 'ma05', titlu: 'Prieteni în toate culorile', autor: 'Ana-Maria Florescu', clasa: 'Clasa VI B', icon: '🌈', bg: 'linear-gradient(135deg, #003B73, #BDD5EA)' },
  { id: 'ma06', titlu: 'Incluziunea ne face mai bogați', autor: 'Radu Moldovan', clasa: 'Clasa VII A', icon: '🌟', bg: 'linear-gradient(135deg, #002855, #0085C7)' },
  { id: 'ma07', titlu: 'Înțelege, sprijină, include!', autor: 'Cristina Avram', clasa: 'Clasa V B', icon: '💫', bg: 'linear-gradient(135deg, #0085C7, #003B73)' },
  { id: 'ma08', titlu: 'Autismul nu e o barieră', autor: 'Tudor Gheorghiu',  clasa: 'Clasa VIII B', icon: '🚀', bg: 'linear-gradient(135deg, #60A3D9, #001f3f)' },
  { id: 'ma09', titlu: 'Empatia construiește punți', autor: 'Larisa Stoica', clasa: 'Clasa VI C', icon: '🌉', bg: 'linear-gradient(135deg, #003B73, #60A3D9)' },
  { id: 'ma10', titlu: 'Vopsim lumea în albastru', autor: 'Vlad Matei',     clasa: 'Clasa VII C', icon: '🦋', bg: 'linear-gradient(135deg, #0085C7, #BDD5EA)' },
];

const LUCRARI_PRIETEN_SPECIAL = [
  { id: 'ps01', titlu: 'Prietenul meu Andrei', autor: 'Elena Marin',         clasa: 'Clasa V A',   icon: '💙', bg: 'linear-gradient(135deg, #003B73, #60A3D9)' },
  { id: 'ps02', titlu: 'Lumea lui Soare', autor: 'Andrei Niculescu',          clasa: 'Clasa VI A',  icon: '☀️', bg: 'linear-gradient(135deg, #0085C7, #48cae4)' },
  { id: 'ps03', titlu: 'Mintea care vede altfel', autor: 'Simona Petre',      clasa: 'Clasa V C',   icon: '🧠', bg: 'linear-gradient(135deg, #023e8a, #90e0ef)' },
  { id: 'ps04', titlu: 'Colegul meu special', autor: 'George Ionescu',        clasa: 'Clasa VII B', icon: '🤗', bg: 'linear-gradient(135deg, #BDD5EA, #003B73)' },
  { id: 'ps05', titlu: 'Tăcerea are și ea un glas', autor: 'Denisa Constantin', clasa: 'Clasa VI C', icon: '🕊️', bg: 'linear-gradient(135deg, #0077b6, #00b4d8)' },
  { id: 'ps06', titlu: 'Prietenul care vede culorile', autor: 'Marius Aldea', clasa: 'Clasa V B',   icon: '🌈', bg: 'linear-gradient(135deg, #023e8a, #60A3D9)' },
  { id: 'ps07', titlu: 'Înțelegând lumea lui Matei', autor: 'Raluca Stan',    clasa: 'Clasa VIII A', icon: '🌟', bg: 'linear-gradient(135deg, #001f3f, #0085C7)' },
  { id: 'ps08', titlu: 'Povestea fundei albastre', autor: 'Florin Oprea',     clasa: 'Clasa VII A', icon: '🎗️', bg: 'linear-gradient(135deg, #003B73, #48cae4)' },
];

/* ─── LOCAL STORAGE HELPERS ─── */
function getVotes(key) {
  try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
}
function saveVotes(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}
function getVoted(key) {
  try { return JSON.parse(localStorage.getItem(key + '_voted') || '[]'); } catch { return []; }
}
function saveVoted(key, arr) {
  localStorage.setItem(key + '_voted', JSON.stringify(arr));
}

/* ─── VOTE HANDLER ─── */
function handleVote(storageKey, workId, countEl, btn) {
  const votes  = getVotes(storageKey);
  const voted  = getVoted(storageKey);

  if (voted.includes(workId)) {
    // Already voted — show message
    btn.textContent = '✓ Ai votat deja';
    btn.disabled = true;
    return;
  }

  // Register vote
  votes[workId] = (votes[workId] || 0) + 1;
  voted.push(workId);
  saveVotes(storageKey, votes);
  saveVoted(storageKey, voted);

  // Update UI
  countEl.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;vertical-align:middle"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> ${votes[workId]} voturi`;
  btn.textContent = '✓ Votat!';
  btn.classList.add('voted');
  btn.disabled = true;

  // Celebrate
  btn.style.animation = 'none';
  btn.offsetHeight; // reflow
  btn.style.animation = '';
}

/* ─── RENDER WORKS GRID ─── */
function renderWorks(containerId, storageKey, lucrari) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const votes = getVotes(storageKey);
  const voted = getVoted(storageKey);

  container.innerHTML = lucrari.map(l => {
    const voteCount = votes[l.id] || 0;
    const hasVoted  = voted.includes(l.id);
    return `
    <article class="work-card reveal" data-id="${l.id}">
      <div class="work-artwork" style="background: ${l.bg}">
        <span style="font-size:3.5rem; text-shadow:0 2px 12px rgba(0,0,0,0.3)">${l.icon}</span>
        <span class="work-artwork-label">${l.clasa}</span>
      </div>
      <div class="work-info">
        <h3 class="work-title">${l.titlu}</h3>
        <p class="work-author">✍️ ${l.autor}</p>
        <p class="work-class">${l.clasa}</p>
      </div>
      <div class="work-footer">
        <span class="vote-count" id="count-${l.id}">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;vertical-align:middle"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          ${voteCount} voturi
        </span>
        <button class="vote-btn ${hasVoted ? 'voted' : ''}" id="vote-${l.id}"
          ${hasVoted ? 'disabled' : ''}
          onclick="doVote('${storageKey}','${l.id}')">
          ${hasVoted ? '✓ Ai votat' : '❤ Votează'}
        </button>
      </div>
    </article>`;
  }).join('');

  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.transitionDelay = (Array.from(document.querySelectorAll('.reveal')).indexOf(el) % 4) * 0.08 + 's';
    });
    if (window.initReveal) initReveal();
    else {
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }), { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }
  }, 50);
}

/* Global vote dispatcher (called from inline onclick) */
window.doVote = function(storageKey, workId) {
  const btn      = document.getElementById('vote-' + workId);
  const countEl  = document.getElementById('count-' + workId);
  if (btn && countEl) handleVote(storageKey, workId, countEl, btn);
};

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

  function showPanel() {
    lockScreen.style.display = 'none';
    panel.style.display = 'block';
    renderAdminTable();
  }

  function renderAdminTable() {
    const votes = getVotes(storageKey);
    const sorted = [...lucrari].map(l => ({
      ...l, count: votes[l.id] || 0
    })).sort((a, b) => b.count - a.count);

    const total = sorted.reduce((s, l) => s + l.count, 0);
    if (countDisplay) countDisplay.textContent = total;

    tableBody.innerHTML = sorted.map((l, i) => {
      const rank = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      const pct  = total > 0 ? Math.round((l.count / total) * 100) : 0;
      return `
      <tr>
        <td><span class="admin-rank ${rank}">${i + 1}</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:40px;height:40px;border-radius:8px;background:${l.bg};display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">${l.icon}</div>
            <div>
              <strong style="color:var(--c-dark)">${l.titlu}</strong>
              <div style="font-size:0.8rem;color:var(--t-soft)">${l.autor} · ${l.clasa}</div>
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
    const votes = getVotes(storageKey);
    const data  = lucrari.map(l => ({
      id:     l.id,
      titlu:  l.titlu,
      autor:  l.autor,
      clasa:  l.clasa,
      voturi: votes[l.id] || 0
    })).sort((a, b) => b.voturi - a.voturi);

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = storageKey.replace('votes_', 'voturi_') + '.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Refresh button
  const refreshBtn = document.getElementById('refreshBtn');
  refreshBtn && refreshBtn.addEventListener('click', renderAdminTable);

  // Reset votes (dangerous — requires confirmation)
  const resetBtn = document.getElementById('resetBtn');
  resetBtn && resetBtn.addEventListener('click', () => {
    if (confirm('ATENȚIE: Această acțiune va șterge TOATE voturile! Ești sigur?')) {
      saveVotes(storageKey, {});
      saveVoted(storageKey, []);
      renderAdminTable();
      alert('Voturile au fost resetate.');
    }
  });
}

/* ─── AUTO INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  const adminLock = document.getElementById('adminLock');

  if (adminLock) {
    // Admin page — init only the relevant competition
    const storageKey = adminLock.dataset.storage || 'votes_ma';
    if (storageKey === 'votes_ma') initAdmin('votes_ma', LUCRARI_MESAJE_ALBASTRE);
    if (storageKey === 'votes_ps') initAdmin('votes_ps', LUCRARI_PRIETEN_SPECIAL);
  } else {
    // Public voting pages — render grids (safe: functions return early if container not found)
    renderWorks('worksGridMA', 'votes_ma', LUCRARI_MESAJE_ALBASTRE);
    renderWorks('worksGridPS', 'votes_ps', LUCRARI_PRIETEN_SPECIAL);
  }
});
