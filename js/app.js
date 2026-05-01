// ─── ERROR LOGGING ───────────────────────────────────────────────────────────

const _errorLog = [];
function _logError(context, error) {
  const entry = { time: new Date().toISOString(), context, msg: error?.message || String(error) };
  _errorLog.push(entry);
  if (_errorLog.length > 50) _errorLog.shift();
}
window.addEventListener('error', function (e) {
  _logError('global', e.message + ' at ' + (e.filename || '') + ':' + (e.lineno || ''));
});
window.addEventListener('unhandledrejection', function (e) {
  _logError('promise', e.reason);
});
// Call getErrorLog() in browser console to inspect recent errors
function getErrorLog() { return [..._errorLog]; }

// ─── SAFE LOCALSTORAGE HELPERS ────────────────────────────────────────────────

function _lsGet(key) {
  try { return localStorage.getItem(key); } catch (e) { _logError('lsGet:' + key, e); return null; }
}
function _lsSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { _logError('lsSet:' + key, e); }
}
function _lsRemove(key) {
  try { localStorage.removeItem(key); } catch (e) { _logError('lsRemove:' + key, e); }
}

// ─── ACTIVE SENTENCES (overrideable by localStorage) ─────────────────────────

let sentences = [...defaultSentences];

// ─── TAB SWITCHING ───────────────────────────────────────────────────────────

function switchTab(id) {
  // Auto-save sentence edits when leaving Bewerken tab
  const current = document.querySelector('.tab-btn.active');
  if (current && current.dataset.tab === 'bewerken' && id !== 'bewerken') {
    _autoSaveEdits();
  }
  const dropdownTabs = ['dehet', 'ontkenning'];
  const isDropdownTab = dropdownTabs.includes(id);
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.classList.contains('tab-btn--dropdown')) {
      b.classList.toggle('active', isDropdownTab);
    } else {
      b.classList.toggle('active', b.dataset.tab === id);
    }
  });
  document.querySelectorAll('.tab-dropdown-item').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + id));
  if (id === 'home')         renderHome();
  if (id === 'oefening')     { loadSentence(); renderUnitBar('oefening'); }
  if (id === 'bewerken')     { renderEditTable(); renderFlagsSection(); }
  if (id === 'woordenschat') { renderVocab(); renderUnitBar('woordenschat'); }
  if (id === 'werkwoorden')  renderUnitBar('werkwoorden');
  if (id === 'dehet')        renderUnitBar('dehet');
  if (id === 'grammatica')   { renderGrammarContent(); renderUnitBar('grammatica'); }
  if (id === 'leerplan')     renderLessonPlan();
  if (id === 'ontkenning')   _initNegExercises();
  if (id === 'lezen')        { openReadingLibrary(); setTimeout(function() {
    var vw = document.documentElement.clientWidth;
    document.querySelectorAll('#panel-lezen .card-body, #panel-lezen .reading-text, #panel-lezen .reading-toolbar, #panel-lezen .reading-section').forEach(function(el) {
      el.style.setProperty('overflow-x', 'hidden', 'important');
      el.style.setProperty('max-width', '100%', 'important');
      el.style.setProperty('word-break', 'break-word', 'important');
      el.style.setProperty('overflow-wrap', 'break-word', 'important');
    });
  }, 50); }
  if (id === 'mijnwoorden')  renderMijnWoorden();
}

function toggleTabDropdown(e) {
  e.stopPropagation();
  const dd = e.currentTarget.closest('.tab-dropdown');
  dd.classList.toggle('open');
}
function closeTabDropdown() {
  document.querySelectorAll('.tab-dropdown').forEach(d => d.classList.remove('open'));
}
document.addEventListener('click', closeTabDropdown);

function _setStat(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderHome() {
  _setStat('home-sentences', sentences.length);
  const due = getDueSentences().length;
  _setStat('home-due', due);

  // "Ga verder" bar — show last unit position if available, otherwise sentence prompt
  const continueBar = document.getElementById('home-continue-bar');
  if (continueBar) {
    if (lastStudyPosition && lastStudyPosition.unit) {
      const allUnits = _allUnits();
      const lu = allUnits.find(u => u.unit === lastStudyPosition.unit);
      if (lu) {
        const nextTab = _firstIncompleteTab(lu) || lastStudyPosition.tab;
        const stepLabel = _STEP_LABELS[_TAB_TO_TYPE[nextTab]] || nextTab;
        const allDone = !_firstIncompleteTab(lu);
        const nextUnit = allDone ? _getNextUnit(lu.unit) : null;
        const lvClass = lu.level.toLowerCase();
        let actionBtns;
        if (allDone && nextUnit) {
          const nuTab = _firstIncompleteTab(nextUnit) || 'grammatica';
          actionBtns = `<button class="btn btn-primary home-continue-btn" onclick="setActiveUnit(${nextUnit.unit}); switchTab('${nuTab}')">Start Unit ${nextUnit.unit}: ${nextUnit.title} →</button>`;
        } else if (allDone) {
          actionBtns = `<button class="btn btn-secondary home-continue-btn" onclick="switchTab('leerplan')">Alle units afgerond! →</button>`;
        } else {
          actionBtns = `<button class="btn btn-primary home-continue-btn" onclick="setActiveUnit(${lu.unit}); switchTab('${nextTab}')">Continue ${stepLabel} →</button>`;
        }
        continueBar.innerHTML = `<div class="home-continue home-continue--unit">
          <div class="home-continue-unit-info">
            <span class="home-continue-label">Doorgaan</span>
            <span class="badge badge-${lvClass}">${lu.level} · Unit ${lu.unit}</span>
            <span class="home-continue-unit-title">${lu.title}</span>
            <span class="home-continue-step">${allDone ? (nextUnit ? '✓ Done! Next: Unit ' + nextUnit.unit : '✓ All done!') : 'Next: ' + stepLabel}</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${actionBtns}
            <button class="btn btn-secondary home-continue-btn" onclick="switchTab('leerplan')">Leerplan</button>
          </div>
        </div>`;
      }
    } else {
      const s = activeSentences[exIdx];
      if (s) {
        continueBar.innerHTML = `<div class="home-continue">
          <span class="home-continue-label">Ga verder</span>
          <span class="home-continue-sentence">${s.en}</span>
          <span class="badge badge-${s.level.toLowerCase()}">${s.level}</span>
          <button class="btn btn-primary home-continue-btn" onclick="switchTab('oefening')">Doorgaan →</button>
        </div>`;
      } else {
        continueBar.innerHTML = `<div class="home-continue home-continue--empty">
          <span>Kies een unit in het leerplan om te beginnen</span>
          <button class="btn btn-primary home-continue-btn" onclick="switchTab('leerplan')">Leerplan →</button>
        </div>`;
      }
    }
  }

  // Card stats
  const practiced = Object.keys(sentenceStats).length;
  const errors    = sentences.filter(s => { const st = sentenceStats[s.nl]; return st && st.w > st.c; }).length;
  const statParts = [practiced + ' geoefend'];
  if (due > 0) statParts.push(due + ' te herhalen');
  if (errors > 0) statParts.push(errors + ' fouten');
  _setStat('home-stat-oefening', statParts.join(' · '));

  _setStat('home-stat-werkwoorden', (typeof verbs !== 'undefined' ? verbs.length : 0) + ' werkwoorden');
  _setStat('home-stat-dehet', dhCorrect + ' correct · ' + dhWrong + ' fout');
  _setStat('home-stat-woordenschat', (typeof vocabulary !== 'undefined' ? vocabulary.length : 0) + ' woorden');
  if (typeof grammarTopicsData !== 'undefined') {
    const total = grammarTopicsData.length;
    const read = grammarTopicsData.filter(t => grammarReadData[t.id]).length;
    const errCount = _totalGrammarErrors();
    let grammarStat = read + '/' + total + ' geleerd';
    if (errCount > 0) grammarStat += ' · ' + errCount + ' fout';
    _setStat('home-stat-grammatica', grammarStat);
  }
  _setStat('home-stat-leerplan', '4 niveaus · 18 units');
  _setStat('home-stat-zinnen', sentences.length + ' zinnen totaal');
  const flagCount = Object.values(sentenceFlags).filter(f => f.starred).length;
  const editStat = sentences.length + ' zinnen' + (flagCount ? ' · ' + flagCount + ' gemarkeerd' : '');
  _setStat('home-stat-bewerken', editStat);

  // Lezen card
  if (typeof readingTexts !== 'undefined' && readingTexts.length) {
    const todayText = readingTexts[getDailyReadingIndex()];
    const readToday = (_readingHistory().byId[todayText.id] || []).includes(_todayKey());
    const pill = document.getElementById('home-lezen-pill');
    if (pill) {
      pill.textContent = readToday ? '✓ Gelezen' : 'Vandaag';
      pill.className = 'home-card-pill ' + (readToday ? 'home-card-pill--done' : 'home-card-pill--new');
    }
    const desc = document.getElementById('home-lezen-desc');
    if (desc) desc.textContent = (todayText.topicEmoji || '') + ' ' + todayText.title;
    _setStat('home-stat-lezen', todayText.level + ' · ≈ ' + todayText.readMinutes + ' min');
  }
}

function _mergeGrammarMeta(nl, level, en) {
  // Try to keep stype/srule from current sentences or defaultSentences
  const existing = sentences.find(s => s.nl === nl)
    || defaultSentences.find(s => s.nl === nl);
  return existing
    ? { nl, en, level, stype: existing.stype, srule: existing.srule, gtopic: existing.gtopic }
    : { nl, en, level };
}

function _autoSaveEdits() {
  const rows = document.querySelectorAll('#edit-tbody tr');
  if (!rows.length) return;
  const updated = [];
  rows.forEach(row => {
    const nl    = row.querySelector('[data-field="nl"]')?.value.trim();
    const en    = row.querySelector('[data-field="en"]')?.value.trim();
    const level = row.querySelector('[data-field="level"]')?.value;
    if (nl && en) updated.push(_mergeGrammarMeta(nl, level, en));
  });
  if (updated.length) {
    sentences = updated;
    _lsSet(SENTENCES_KEY, JSON.stringify(sentences));
    rebuildActive();
    renderSentences('all');
    updateSentenceCount();
  }
}

// ─── VOCABULARY ───────────────────────────────────────────────────────────────

let vocabLevel = 'all';
let vocabTopic = 'all';
let vocabUnitTopics = null; // null = no unit filter, array of topic strings when unit is active
let vocabUnitLevel = null;  // null or level string (e.g. 'A1') when unit is active

const topicLabels = {
  begroeting: 'Begroeting', familie: 'Familie', eten: 'Eten & drinken',
  huis: 'Huis', vervoer: 'Vervoer', weer: 'Weer', werkwoorden: 'Werkwoorden',
  dagelijks: 'Dagelijks leven', werk: 'Werk', gezondheid: 'Gezondheid',
  winkelen: 'Winkelen', bijvoeglijk: 'Bijvoeglijk nw.', geld: 'Geld & bank',
  verbindingswoorden: 'Verbindingswoorden', wonen: 'Wonen', reizen: 'Reizen',
  milieu: 'Milieu', samenleving: 'Samenleving', economie: 'Economie',
  politiek: 'Politiek', technologie: 'Technologie', abstract: 'Abstract',
  kleuren: 'Kleuren', lichaam: 'Lichaam', kleding: 'Kleding',
  vraagwoorden: 'Vraagwoorden', tijd: 'Tijd', dieren: 'Dieren',
  onderwijs: 'Onderwijs', hobby: 'Hobby & sport', natuur: 'Natuur',
  communicatie: 'Communicatie', persoonlijkheid: 'Persoonlijkheid',
  gevoelens: 'Gevoelens', media: 'Media & nieuws',
  academisch: 'Academisch', uitdrukkingen: 'Uitdrukkingen',
  // C1 / C2 topics
  filosofie: 'Filosofie & ethiek', schrijven: 'Schrijven & retorica',
  verbinders: 'Verbinders', taal: 'Taal & literatuur',
  idiomen: 'Idiomen', formeel: 'Formeel register',
  karakter: 'Karakter', relaties: 'Relaties',
  // extra topic aliases used in data
  recht: 'Recht', wetenschap: 'Wetenschap',
  psychologie: 'Psychologie', toerisme: 'Toerisme',
  woordfamilie: 'Woordfamilies', collocaties: 'Collocaties',
  architectuur: 'Architectuur', landbouw: 'Landbouw',
  bijwoord: 'Bijwoorden', cultuur: 'Kunst & cultuur',
  sport: 'Sport', financiën: 'Financiën',
  voorzetsels: 'Voorzetsels',
};

function filterVocab() { renderVocab(); }

function _getVocabList() {
  const query = (document.getElementById('vocab-search')?.value || '').toLowerCase();
  return vocabulary.filter(w => {
    if (vocabUnitTopics) {
      if (w.level !== vocabUnitLevel) return false;
      if (!vocabUnitTopics.includes(w.topic)) return false;
    } else {
      if (vocabLevel !== 'all' && w.level !== vocabLevel) return false;
      if (vocabTopic !== 'all' && w.topic !== vocabTopic) return false;
    }
    if (query && !w.nl.toLowerCase().includes(query) && !w.en.toLowerCase().includes(query)) return false;
    return true;
  });
}

function _vocabCardHtml(w, hidden) {
  return `
    <div class="vocab-card" onclick="this.classList.toggle('revealed')">
      <div class="vocab-top">
        <span class="vocab-word">${w.nl}</span>
        <span class="badge badge-${w.level.toLowerCase()}">${w.level}</span>
      </div>
      <div class="vocab-meta">
        <span class="vocab-type">${w.type}</span>
        <span class="vocab-topic-tag">${topicLabels[w.topic] || w.topic}</span>
      </div>
      <div class="vocab-translation ${hidden ? 'hidden-translation' : ''}">${w.en}</div>
    </div>`;
}

function renderVocab() {
  const hidden = document.getElementById('vocab-hide-cb')?.checked;
  const list = _getVocabList();

  document.getElementById('vocab-count-badge').textContent = list.length + ' woorden';

  const practiceBtn = document.getElementById('vocab-practice-btn');
  if (practiceBtn) practiceBtn.style.display = (vocabUnitTopics && list.length > 0) ? '' : 'none';

  const grid = document.getElementById('vocab-grid');

  if (!vocabUnitTopics && vocabTopic === 'all') {
    const groups = {};
    list.forEach(w => { if (!groups[w.topic]) groups[w.topic] = []; groups[w.topic].push(w); });
    const sortedTopics = Object.keys(groups).sort((a, b) =>
      (topicLabels[a] || a).localeCompare(topicLabels[b] || b, 'nl'));
    grid.className = 'vocab-grouped';
    grid.innerHTML = sortedTopics.map(topic => {
      const words = groups[topic].slice().sort((a, b) => a.nl.localeCompare(b.nl, 'nl'));
      return `
        <div class="vocab-section">
          <div class="vocab-section-header">
            ${topicLabels[topic] || topic}
            <span class="vocab-section-count">${words.length}</span>
          </div>
          <div class="vocab-grid-inner">${words.map(w => _vocabCardHtml(w, hidden)).join('')}</div>
        </div>`;
    }).join('');
  } else {
    grid.className = 'vocab-grid';
    grid.innerHTML = list.map(w => _vocabCardHtml(w, hidden)).join('');
  }

  renderTopicFilters();
  if (vocabUnitTopics) renderUnitBar('woordenschat');
}

function renderTopicFilters() {
  const wrap = document.getElementById('vocab-topic-filters');
  if (vocabUnitTopics) { wrap.innerHTML = ''; return; }
  const filtered = vocabulary.filter(w => vocabLevel === 'all' || w.level === vocabLevel);
  const countByTopic = {};
  filtered.forEach(w => { countByTopic[w.topic] = (countByTopic[w.topic] || 0) + 1; });
  const topics = Object.keys(countByTopic).sort((a, b) =>
    (topicLabels[a] || a).localeCompare(topicLabels[b] || b, 'nl'));
  const totalCount = filtered.length;
  wrap.innerHTML =
    `<button class="filter-btn ${vocabTopic==='all'?'active':''}" onclick="setVocabTopic('all',this)">Alle thema's <span class="vf-count">${totalCount}</span></button>` +
    topics.map(t =>
      `<button class="filter-btn ${vocabTopic===t?'active':''}" data-vtopic="${t}" onclick="setVocabTopic('${t}',this)">${topicLabels[t]||t} <span class="vf-count">${countByTopic[t]}</span></button>`
    ).join('');
}

function setVocabLevel(level, btn) {
  vocabLevel = level;
  vocabTopic = 'all';
  document.querySelectorAll('#vocab-level-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderVocab();
}

function setVocabTopic(topic, btn) {
  vocabTopic = topic;
  document.querySelectorAll('#vocab-topic-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderVocab();
}

// ─── SENTENCE EXERCISE ───────────────────────────────────────────────────────

// ─── UNIT PROGRESS ────────────────────────────────────────────────────────────

const UNIT_PROGRESS_KEY = 'schrijfcoach_unit_progress';
let unitProgress = {};

function _loadUnitProgress() {
  try {
    const s = _lsGet(UNIT_PROGRESS_KEY);
    if (s) unitProgress = JSON.parse(s);
  } catch(e) { unitProgress = {}; }
}

function _saveUnitProgress() {
  _lsSet(UNIT_PROGRESS_KEY, JSON.stringify(unitProgress));
}

function _ensureUP(n) {
  if (!unitProgress[n]) unitProgress[n] = { vocab: false, dehet: false, sentences: false, werkwoorden: false };
}

function markUnitExercise(unitNum, type, done) {
  _ensureUP(unitNum);
  unitProgress[unitNum][type] = (done !== false);
  _saveUnitProgress();
  renderAllUnitBars();
  // Refresh leerplan if visible
  if (document.getElementById('panel-leerplan')?.classList.contains('active')) renderLessonPlan();
}

function resetUnitProgress(unitNum) {
  unitProgress[unitNum] = { vocab: false, dehet: false, sentences: false, werkwoorden: false };
  _saveUnitProgress();
  renderAllUnitBars();
  if (document.getElementById('panel-leerplan')?.classList.contains('active')) renderLessonPlan();
}

const STATS_KEY = 'schrijfcoach_stats';
const FLAGS_KEY = 'schrijfcoach_flags';
const GRAMMAR_READ_KEY = 'schrijfcoach_grammar_read';
const LAST_POSITION_KEY = 'schrijfcoach_last_position';
const READING_HISTORY_KEY = 'schrijfcoach_reading_history';
const READING_EPOCH = Date.UTC(2025, 0, 1);
let sentenceStats = {};     // key: s.nl → { c: correct, w: wrong }
let grammarReadData = {};   // key: topicId → true
let lastStudyPosition = null; // { unit: N, tab: 'grammatica', timestamp: ms }

function _saveLastPosition(unitNum, tab) {
  lastStudyPosition = { unit: unitNum, tab, timestamp: Date.now() };
  _lsSet(LAST_POSITION_KEY, JSON.stringify(lastStudyPosition));
}
let sentenceFlags = {};   // key: s.nl → { starred: bool, comment: string }
let exMode = 'all';       // 'all' | 'errors' | 'spaced'
let exLevel = 'all';      // 'all' | 'A1' | 'A2' | 'B1' | 'B2'
let exGrammar = 'all';    // 'all' | grammar key
let activeSentences = [];

// Maps grammar filter key → predicate (checks gtopic first, then stype)
const exGrammarMap = {
  niet:       s => s.gtopic === 'niet',
  geen:       s => s.gtopic === 'geen',
  inversie:   s => s.gtopic === 'inversie' || (s.stype || '').toLowerCase().includes('inversie'),
  vraagzin:   s => s.gtopic === 'vraagzin' || ['WH-vraagzin','Ja/nee-vraagzin'].includes(s.stype),
  bijzin:     s => s.gtopic === 'bijzin'   || ['Bijzin + hoofdzin','Hoofdzin + bijzin'].includes(s.stype),
  gebiedende: s => s.gtopic === 'gebiedende' || (s.stype || '').startsWith('Gebiedende'),
  tijden:     s => s.gtopic === 'tijden'   || s.stype === 'Hoofdzin (vtt)',
  omte:       s => s.gtopic === 'omte'     || (s.stype || '').includes('om…te'),
  passief:    s => s.gtopic === 'passief'  || s.stype === 'Lijdende vorm',
};

function _buildPool() {
  let pool = [...sentences];
  if (exLevel !== 'all')   pool = pool.filter(s => s.level === exLevel);
  if (exGrammar !== 'all' && exGrammarMap[exGrammar]) pool = pool.filter(exGrammarMap[exGrammar]);
  return pool;
}

function filterExLevel(level, btn) {
  document.querySelectorAll('#ex-level-filter .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  exLevel = level;
  rebuildActive();
  exIdx = 0; // start at first unanswered in new pool
  loadSentence();
}

function filterExGrammar(grammar, btn) {
  document.querySelectorAll('#ex-grammar-filter .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  exGrammar = grammar;
  rebuildActive();
  exIdx = 0;
  loadSentence();
}

function rebuildActive() {
  const pool = _buildPool();
  if (exMode === 'errors') {
    activeSentences = pool.filter(s => { const st = sentenceStats[s.nl]; return st && st.w > st.c; });
  } else if (exMode === 'spaced') {
    activeSentences = getDueSentences().filter(s =>
      (exLevel === 'all' || s.level === exLevel) &&
      (exGrammar === 'all' || !exGrammarMap[exGrammar] || exGrammarMap[exGrammar](s))
    );
    if (activeSentences.length === 0) activeSentences = pool;
  } else {
    // Only unanswered sentences — counter and "resterend" will always match
    const unanswered = pool.filter(s => { const st = sentenceStats[s.nl]; return !st || (st.c + st.w) === 0; });
    activeSentences = unanswered.length > 0 ? unanswered : pool; // fallback to full pool if all done
  }
  updateModeLabel();
}

function updateModeLabel() {
  const el = document.getElementById('ex-mode-count');
  if (!el) return;
  if (exMode === 'errors') {
    el.textContent = activeSentences.length
      ? activeSentences.length + ' zin(nen) met meer fouten dan goed'
      : 'Geen fouten gevonden — alle zinnen worden geoefend';
  } else if (exMode === 'spaced') {
    el.textContent = activeSentences.length + ' zinnen te herhalen';
  } else {
    el.textContent = activeSentences.length + ' zinnen';
  }
}

function setExMode(mode) {
  exMode = mode;
  document.querySelectorAll('.ex-mode-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === mode));
  rebuildActive();
  if (activeSentences.length === 0) activeSentences = [...sentences];
  exIdx = 0; exScore = 0;
  loadSentence();
}

let exIdx = 0, exScore = 0, exAnswered = false;
let exInputMode = 'type';  // 'type' | 'tiles'
let tilePool = [], tileBuilt = [];

function normalize(s) {
  return s.trim().toLowerCase().replace(/[.,!?]/g, '');
}

// ── Hint ──────────────────────────────────────────────────────────────────────

function populateHint(s) {
  const body = document.getElementById('ex-hint-body');
  if (s && !s.stype) {
    const match = defaultSentences.find(d => d.nl === s.nl);
    if (match) s = match;
  }
  if (!s || !s.stype) {
    body.innerHTML = '<em style="color:var(--text-muted);font-size:0.8rem">Geen grammaticatip voor deze zin.</em>';
    return;
  }

  const rule = grammarRulesData.find(r => r.stype === s.stype);

  // Pattern + names row
  let html = `
    <div class="hint-header">
      <span class="hint-stype-badge">${s.stype}</span>
      <span class="hint-stype-en">${stypeEN[s.stype] || s.stype}</span>
    </div>`;

  if (s.srule) {
    html += `<div class="hint-rule">${s.srule}</div>`;
  }

  if (rule) {
    // Pattern formula
    html += `<div class="hint-pattern">${rule.pattern}</div>`;

    // Sentence slots — position name only, no explanation
    if (rule.slots && rule.slots.length) {
      html += `<div class="hint-slots">`;
      rule.slots.forEach(sl => {
        html += `<div class="hint-slot hint-slot-${sl.color}">
          <div class="hint-slot-pos">${sl.pos}</div>
          <div class="hint-slot-body">
            <div class="hint-slot-label">🇳🇱 ${sl.label} &nbsp;·&nbsp; 🇬🇧 ${sl.en}</div>
          </div>
        </div>`;
      });
      html += `</div>`;
    }
  }

  body.innerHTML = html;
}

function toggleExHint(btn) {
  const body = document.getElementById('ex-hint-body');
  const open = body.classList.toggle('open');
  btn.querySelector('.ex-hint-arrow').style.transform = open ? 'rotate(180deg)' : '';
}

// ── Input mode ────────────────────────────────────────────────────────────────

function setInputMode(mode) {
  exInputMode = mode;
  document.querySelectorAll('.input-mode-row .ex-mode-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.imode === mode));
  // Show/hide sections
  document.getElementById('type-section').style.display  = (mode === 'type' || mode === 'listen' || mode === 'translate') ? '' : 'none';
  document.getElementById('tile-section').style.display  = mode === 'tiles' ? '' : 'none';
  const fillSection = document.getElementById('fillblank-section');
  if (fillSection) fillSection.style.display = mode === 'fillblank' ? '' : 'none';
  const hintWrap  = document.getElementById('letter-hint-wrap');
  if (hintWrap)   hintWrap.style.display    = (mode === 'type' || mode === 'translate') ? '' : 'none';
  if (!exAnswered) {
    const s = activeSentences[exIdx];
    if (!s) return;
    updatePromptDisplay(s);
    if (mode === 'tiles')     loadTiles(s);
    if (mode === 'fillblank') loadFillBlank(s);
  }
}

// ── Tiles ─────────────────────────────────────────────────────────────────────

function loadTiles(s) {
  tileBuilt = [];
  tilePool  = s.nl.split(' ')
    .map(w => w.replace(/[.,!?]+$/, ''))
    .filter(Boolean)
    .sort(() => Math.random() - 0.5);
  renderTiles();
}

function renderTiles() {
  document.getElementById('tile-built').innerHTML =
    tileBuilt.length
      ? tileBuilt.map((w, i) => `<button class="tile tile-built" onclick="removeTile(${i})">${w}</button>`).join('')
      : '<span class="tile-placeholder">Klik woorden om de zin te maken…</span>';
  document.getElementById('tile-pool').innerHTML =
    tilePool.map((w, i) => `<button class="tile tile-pool" onclick="selectTile(${i})">${w}</button>`).join('');
}

function selectTile(i) {
  if (exAnswered) return;
  tileBuilt.push(tilePool[i]);
  tilePool.splice(i, 1);
  renderTiles();
}

function removeTile(i) {
  if (exAnswered) return;
  tilePool.push(tileBuilt[i]);
  tileBuilt.splice(i, 1);
  renderTiles();
}

function disableTiles() {
  document.querySelectorAll('.tile').forEach(t => t.disabled = true);
}

// ── Sentence loading ──────────────────────────────────────────────────────────

// ── Star / flag functions ──────────────────────────────────────────────────────
let _currentSentenceFilter = 'all';

function _saveFlags() {
  _lsSet(FLAGS_KEY, JSON.stringify(sentenceFlags));
}

function _refreshFlaggedViews() {
  renderSentences(_currentSentenceFilter);
  renderFlagsSection();
}

function _updateStarBtn() {
  const s = activeSentences[exIdx];
  if (!s) return;
  const flag = sentenceFlags[s.nl];
  const btn  = document.getElementById('ex-star-btn');
  const wrap = document.getElementById('ex-comment-wrap');
  const inp  = document.getElementById('ex-comment-input');
  if (!btn) return;
  if (flag?.starred) {
    btn.classList.add('starred');
    wrap.style.display = '';
    inp.value = flag.comment || '';
  } else {
    btn.classList.remove('starred');
    wrap.style.display = 'none';
    inp.value = '';
  }
}

function toggleStarSentence() {
  const s = activeSentences[exIdx];
  if (!s) return;
  if (sentenceFlags[s.nl]?.starred) {
    delete sentenceFlags[s.nl];
  } else {
    sentenceFlags[s.nl] = { starred: true, comment: '' };
  }
  _saveFlags();
  _updateStarBtn();
  _refreshFlaggedViews();
}

function saveStarComment() {
  const s = activeSentences[exIdx];
  if (!s) return;
  const comment = document.getElementById('ex-comment-input').value.trim();
  if (!sentenceFlags[s.nl]) sentenceFlags[s.nl] = { starred: true };
  sentenceFlags[s.nl].comment = comment;
  _saveFlags();
  _refreshFlaggedViews();
  showToast('✓ Opmerking opgeslagen');
}

function deleteStarComment() {
  const s = activeSentences[exIdx];
  if (!s || !sentenceFlags[s.nl]) return;
  sentenceFlags[s.nl].comment = '';
  document.getElementById('ex-comment-input').value = '';
  _saveFlags();
  _refreshFlaggedViews();
  showToast('Opmerking verwijderd');
}

// ── Alle zinnen — inline comment editing ────────────────────────────────────
function openInlineCommentEditor(btn, nl) {
  const row = btn.closest('tr');
  const commentDiv = row.querySelector('.sentence-comment, .sentence-add-comment');
  const current = sentenceFlags[nl]?.comment || '';
  commentDiv.outerHTML = `
    <div class="sentence-comment sentence-comment--editing">
      <textarea class="inline-comment-ta" rows="2">${escapeHtml(current)}</textarea>
      <div class="inline-comment-btns">
        <button class="btn btn-primary btn-sm" onclick="saveInlineComment(${JSON.stringify(nl)}, this)">Opslaan</button>
        <button class="btn btn-secondary btn-sm" onclick="renderSentences(_currentSentenceFilter)">Annuleren</button>
      </div>
    </div>`;
  row.querySelector('.inline-comment-ta').focus();
}

function saveInlineComment(nl, btn) {
  const comment = btn.closest('.sentence-comment--editing').querySelector('textarea').value.trim();
  if (!sentenceFlags[nl]) sentenceFlags[nl] = { starred: true };
  sentenceFlags[nl].comment = comment;
  _saveFlags();
  renderFlagsSection();
  renderSentences(_currentSentenceFilter);
}

function deleteCommentOnly(nl) {
  if (sentenceFlags[nl]) sentenceFlags[nl].comment = '';
  _saveFlags();
  renderFlagsSection();
  renderSentences(_currentSentenceFilter);
}

// ── Bewerken — flags section ─────────────────────────────────────────────────
function renderFlagsSection() {
  const body  = document.getElementById('flags-body');
  const badge = document.getElementById('flags-count-badge');
  if (!body) return;
  const flagged = sentences.filter(s => sentenceFlags[s.nl]?.starred);
  if (badge) badge.textContent = flagged.length + ' gemarkeerd';
  if (flagged.length === 0) {
    body.innerHTML = '<p style="color:var(--text-muted);font-size:0.83rem">Geen vragen gemarkeerd. Gebruik de ⭐ knop tijdens het oefenen om een zin te markeren.</p>';
    return;
  }
  body.innerHTML = flagged.map(s => `
    <div class="flag-item">
      <div class="flag-item-header">
        <span class="badge badge-${s.level.toLowerCase()}">${s.level}</span>
        <span class="flag-nl">${escapeHtml(s.nl)}</span>
        <span class="flag-en">${escapeHtml(s.en)}</span>
      </div>
      <div class="flag-item-comment">
        <textarea class="flag-comment-ta" rows="2" placeholder="Schrijf hier je vraag of opmerking...">${escapeHtml(sentenceFlags[s.nl]?.comment || '')}</textarea>
        <div class="flag-item-actions">
          <button class="btn btn-primary btn-sm" onclick="saveFlagComment(${JSON.stringify(s.nl)}, this)">Opslaan</button>
          <button class="btn btn-secondary btn-sm" onclick="deleteFlagEntry(${JSON.stringify(s.nl)})">Verwijder markering</button>
        </div>
      </div>
    </div>`).join('');
}

function saveFlagComment(nl, btn) {
  const ta = btn.closest('.flag-item').querySelector('.flag-comment-ta');
  if (!sentenceFlags[nl]) sentenceFlags[nl] = { starred: true };
  sentenceFlags[nl].comment = ta.value.trim();
  _saveFlags();
  renderSentences(_currentSentenceFilter);
  showToast('✓ Opmerking opgeslagen');
}

function deleteFlagEntry(nl) {
  delete sentenceFlags[nl];
  _saveFlags();
  renderFlagsSection();
  renderSentences(_currentSentenceFilter);
  showToast('Markering verwijderd');
}

function loadSentence() {
  if (exIdx >= activeSentences.length) { showCongrats(); return; }
  const s = activeSentences[exIdx];
  updatePromptDisplay(s);
  document.getElementById('ex-badge').textContent = s.level;
  document.getElementById('ex-badge').className = 'badge badge-' + s.level.toLowerCase();
  document.getElementById('ex-counter').textContent = (exIdx + 1) + ' / ' + activeSentences.length;
  document.getElementById('ex-progress').style.width = ((exIdx + 1) / activeSentences.length * 100) + '%';
  _updateAccountability();
  // Reset type input
  document.getElementById('ex-input').value = '';
  document.getElementById('ex-input').className = 'exercise-input';
  document.getElementById('ex-input').disabled = false;
  // Reset hint
  const hintBody = document.getElementById('ex-hint-body');
  hintBody.classList.remove('open');
  const hintArrow = document.querySelector('.ex-hint-arrow');
  if (hintArrow) hintArrow.style.transform = '';
  populateHint(s);
  resetLetterHint();
  // Reset check buttons
  document.getElementById('ex-check-btn').style.display       = '';
  document.getElementById('ex-check-btn-tiles').style.display = '';
  const fillCheckBtn = document.getElementById('ex-check-btn-fillblank');
  if (fillCheckBtn) fillCheckBtn.style.display = '';
  document.getElementById('ex-next-btn').style.display = 'none';
  const retryBtnLoad = document.getElementById('ex-retry-btn');
  if (retryBtnLoad) retryBtnLoad.style.display = 'none';
  document.getElementById('ex-btn-row').style.display  = '';
  document.getElementById('ex-congrats').classList.remove('show');
  hideFeedback();
  exAnswered = false;
  // Load tiles if in tile mode
  if (exInputMode === 'tiles') loadTiles(s);
  if (exInputMode === 'fillblank') loadFillBlank(s);
  setTimeout(() => { if (exInputMode === 'type' || exInputMode === 'listen' || exInputMode === 'translate') document.getElementById('ex-input').focus(); }, 50);
  _updateStarBtn();
}

function checkAnswer() {
  if (exAnswered) return;
  const s = activeSentences[exIdx];
  let val, correct, correctAnswer;
  if (exInputMode === 'tiles') {
    val = tileBuilt.join(' ');
    correct = normalize(val) === normalize(s.nl);
    correctAnswer = s.nl;
  } else if (exInputMode === 'fillblank') {
    val = document.getElementById('fillblank-input')?.value || '';
    correct = normalize(val) === normalize(blankWord);
    correctAnswer = blankWord;
  } else if (exInputMode === 'translate') {
    val = document.getElementById('ex-input').value;
    correct = normalize(val) === normalize(s.en);
    correctAnswer = s.en;
  } else { // type or listen
    val = document.getElementById('ex-input').value;
    correct = normalize(val) === normalize(s.nl);
    correctAnswer = s.nl;
  }
  exAnswered = true;
  // Visual
  if (exInputMode === 'tiles') {
    disableTiles();
    document.getElementById('ex-check-btn-tiles').style.display = 'none';
  } else if (exInputMode === 'fillblank') {
    const fi = document.getElementById('fillblank-input');
    if (fi) { fi.className = 'exercise-input ' + (correct ? 'correct' : 'incorrect'); fi.disabled = true; }
    const fb = document.getElementById('ex-check-btn-fillblank');
    if (fb) fb.style.display = 'none';
  } else {
    const input = document.getElementById('ex-input');
    input.className = 'exercise-input ' + (correct ? 'correct' : 'incorrect');
    input.disabled = true;
    document.getElementById('ex-check-btn').style.display = 'none';
  }
  document.getElementById('ex-next-btn').style.display = '';
  const retryBtn = document.getElementById('ex-retry-btn');
  if (retryBtn) retryBtn.style.display = correct ? 'none' : '';
  showFeedback(correct, correctAnswer);
  if (correct) exScore++;
  document.getElementById('ex-score-label').textContent = exScore + ' goed';
  // Record stats
  if (!sentenceStats[s.nl]) sentenceStats[s.nl] = { c: 0, w: 0 };
  if (correct) sentenceStats[s.nl].c++; else sentenceStats[s.nl].w++;
  _lsSet(STATS_KEY, JSON.stringify(sentenceStats));
  // Auto-save position so refresh resumes here
  _autoSaveIdx();
  updateSRS(s.nl, correct);
  // In listen mode: reveal the sentence after answering
  if (exInputMode === 'listen') {
    const prompt = document.getElementById('ex-prompt');
    if (prompt) { prompt.textContent = s.nl; prompt.style.display = ''; }
  }
}

function showFeedback(correct, answer) {
  const box = document.getElementById('ex-feedback');
  if (correct) {
    box.className = 'feedback-box show success';
    box.innerHTML = '✓ Correct! <span class="answer">' + answer + '</span>';
  } else {
    box.className = 'feedback-box show error';
    box.innerHTML = '✗ Niet helemaal. Het juiste antwoord: <span class="answer">' + answer + '</span>';
  }
}

function hideFeedback() {
  document.getElementById('ex-feedback').className = 'feedback-box';
}

function nextSentence() { exIdx++; _autoSaveIdx(); loadSentence(); }

function retrySentence() { loadSentence(); }

function skipSentence() {
  if (!exAnswered) {
    exAnswered = true;
    const s = activeSentences[exIdx];
    let correctAnswer;
    if (exInputMode === 'tiles') {
      disableTiles();
      document.getElementById('ex-check-btn-tiles').style.display = 'none';
      correctAnswer = s.nl;
    } else if (exInputMode === 'fillblank') {
      const fi = document.getElementById('fillblank-input');
      if (fi) fi.disabled = true;
      const fb = document.getElementById('ex-check-btn-fillblank');
      if (fb) fb.style.display = 'none';
      correctAnswer = blankWord;
    } else if (exInputMode === 'translate') {
      document.getElementById('ex-input').disabled = true;
      document.getElementById('ex-check-btn').style.display = 'none';
      correctAnswer = s.en;
    } else {
      document.getElementById('ex-input').disabled = true;
      document.getElementById('ex-check-btn').style.display = 'none';
      correctAnswer = s.nl;
    }
    document.getElementById('ex-next-btn').style.display = '';
    showFeedback(false, correctAnswer);
    if (!sentenceStats[s.nl]) sentenceStats[s.nl] = { c: 0, w: 0 };
    sentenceStats[s.nl].w++;
    _lsSet(STATS_KEY, JSON.stringify(sentenceStats));
  }
}

function showCongrats() {
  document.getElementById('ex-btn-row').style.display = 'none';
  document.getElementById('ex-feedback').className = 'feedback-box';
  const panel = document.getElementById('ex-congrats');
  panel.classList.add('show');
  panel.querySelector('.congrats-sub').textContent =
    'Je hebt ' + exScore + ' van de ' + activeSentences.length + ' zinnen goed!';
  // Show "Next step" or "Next unit" button
  const nextBtn = document.getElementById('ex-congrats-next-btn');
  if (nextBtn) {
    const next = activeUnit ? _nextStepInfo('oefening') : null;
    if (next) {
      nextBtn.style.display = '';
      nextBtn.textContent = 'Next: ' + next.label + ' →';
      nextBtn.onclick = function() { _goNextUnitStep('oefening'); };
    } else if (activeUnit) {
      const _nu = _getNextUnit(activeUnit.unit);
      if (_nu) {
        nextBtn.style.display = '';
        nextBtn.textContent = '✓ Done → Start Unit ' + _nu.unit + ' →';
        nextBtn.onclick = function() { setActiveUnit(_nu.unit); switchTab(_firstIncompleteTab(_nu) || 'grammatica'); };
      } else {
        nextBtn.style.display = 'none';
      }
    } else {
      nextBtn.style.display = 'none';
    }
  }
}

function restartExercise() {
  exIdx = 0; exScore = 0;
  // Force full pool (including already-answered) for this session
  activeSentences = _buildPool();
  updateModeLabel();
  loadSentence();
}

function resetStats() {
  if (!confirm('Wil je alle oefenstatistieken wissen?')) return;
  sentenceStats = {};
  _lsRemove(STATS_KEY);
  showToast('Statistieken gewist');
}

document.getElementById('ex-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && (exInputMode === 'type' || exInputMode === 'listen' || exInputMode === 'translate')) { if (!exAnswered) checkAnswer(); else nextSentence(); }
});

document.getElementById('fillblank-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && exInputMode === 'fillblank') { if (!exAnswered) checkAnswer(); else nextSentence(); }
});

// ─── SENTENCE LIST ────────────────────────────────────────────────────────────

const stypeEN = {
  'Hoofdzin':                 'Main clause — verb always in 2nd position',
  'Hoofdzin + inversie':      'Main clause with inversion — adverb/phrase first, then verb → subject',
  'Hoofdzin + bijzin':        'Main + subordinate clause — verb moves to end of subordinate clause',
  'Bijzin + hoofdzin':        'Subordinate + main clause — verb at end of sub-clause, then inversion in main',
  'Samengestelde zin':        'Compound sentence — two main clauses joined by a conjunction (en, maar, of)',
  'Hoofdzin + om…te':         'Main clause + om…te infinitive — expresses purpose or goal',
  'Hoofdzin (vtt)':           'Present perfect — hebben/zijn + past participle at the end',
  'WH-vraagzin':              'WH-question — question word → verb → subject → rest',
  'Ja/nee-vraagzin':          'Yes/no question — verb comes first, subject second',
  'Gebiedende wijs':          'Imperative — use the verb stem, no subject needed',
  'Gebiedende wijs + bijzin': 'Imperative + subordinate clause — command followed by a condition or reason',
  'Vaste uitdrukking':        'Fixed expression / set phrase',
};

// ─── SPACED REPETITION (SRS) ──────────────────────────────────────────────────

const SRS_KEY = 'schrijfcoach_srs';
let srsData = {};

function initSRS() {
  const raw = _lsGet(SRS_KEY);
  if (raw) { try { srsData = JSON.parse(raw); } catch(e) {} }
  updateDueBadge();
}

function getDueSentences() {
  const now = new Date().toISOString();
  return sentences.filter(s => {
    const entry = srsData[s.nl];
    if (!entry) return true; // never reviewed
    return entry.nextReview <= now;
  });
}

function updateSRS(nl, correct) {
  if (!srsData[nl]) srsData[nl] = { interval: 1, nextReview: new Date().toISOString() };
  const entry = srsData[nl];
  if (correct) {
    entry.interval = Math.min(entry.interval * 2, 30);
  } else {
    entry.interval = 1;
  }
  const next = new Date(Date.now() + entry.interval * 86400000);
  entry.nextReview = next.toISOString();
  _lsSet(SRS_KEY, JSON.stringify(srsData));
  updateDueBadge();
}

function updateDueBadge() {
  const due = getDueSentences();
  const badge = document.getElementById('due-badge');
  if (!badge) return;
  if (due.length > 0) {
    badge.textContent = due.length;
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }
}


// ─── LETTER HINT ──────────────────────────────────────────────────────────────

let letterHintCount = 0;

function resetLetterHint() {
  letterHintCount = 0;
  const el = document.getElementById('letter-hint-text');
  if (el) { el.textContent = ''; el.classList.remove('visible'); }
}

function showLetterHint() {
  const s = activeSentences[exIdx];
  if (!s || exAnswered) return;
  letterHintCount++;
  const hinted = s.nl.split(' ').map(w => {
    const clean = w.replace(/[.,!?]+$/, '');
    const punct = w.slice(clean.length);
    if (letterHintCount >= clean.length) return w;
    return clean.slice(0, letterHintCount) + '·'.repeat(Math.max(0, clean.length - letterHintCount)) + punct;
  }).join(' ');
  const el = document.getElementById('letter-hint-text');
  if (el) { el.textContent = hinted; el.classList.add('visible'); }
}

// ─── FILL-IN-THE-BLANK ────────────────────────────────────────────────────────

let blankWord = '';

function loadFillBlank(s) {
  const skipWords = new Set(['een','het','dat','van','met','voor','naar','over','maar','want','ook','al','nog','wel']);
  const words = s.nl.split(' ').map(w => w.replace(/[.,!?]+$/, ''));
  const candidates = words.filter(w => w.length >= 4 && !skipWords.has(w.toLowerCase()));
  const pick = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : (words.find(w => w.length >= 3) || words[0]);
  blankWord = pick;
  const sentenceEl = document.getElementById('fillblank-sentence');
  if (sentenceEl) {
    const escaped = s.nl.replace(new RegExp('(?<![a-zA-Z])' + pick.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '(?![a-zA-Z])'), `<span class="fillblank-blank">${'_'.repeat(pick.length)}</span>`);
    sentenceEl.innerHTML = escaped;
  }
  const input = document.getElementById('fillblank-input');
  if (input) { input.value = ''; input.disabled = false; input.className = 'exercise-input'; }
  const btn = document.getElementById('ex-check-btn-fillblank');
  if (btn) btn.style.display = '';
}

// ─── PROMPT DISPLAY ───────────────────────────────────────────────────────────

function updatePromptDisplay(s) {
  const dir    = document.getElementById('ex-direction');
  const prompt = document.getElementById('ex-prompt');
  if (!s || !dir || !prompt) return;
  if (exInputMode === 'translate') {
    dir.textContent    = 'Vertaal naar het Engels';
    prompt.textContent = s.nl;
    prompt.style.display = '';
  } else if (exInputMode === 'listen') {
    dir.textContent      = 'Schrijf wat je hoort';
    prompt.style.display = 'none';
  } else {
    dir.textContent    = 'Vertaal naar het Nederlands';
    prompt.textContent = s.en;
    prompt.style.display = '';
  }

  // Show sentence type badge
  const full = resolveGrammar(s);
  const stypeRow   = document.getElementById('ex-stype-row');
  const stypeBadge = document.getElementById('ex-stype-badge');
  const stypeEn    = document.getElementById('ex-stype-en');
  if (stypeRow && stypeBadge && stypeEn && full.stype) {
    stypeBadge.textContent = full.stype;
    stypeBadge.className = 'stype-badge stype-' + full.stype.toLowerCase().replace(/[^a-z]/g, '-');
    stypeEn.textContent  = stypeEN[full.stype] || '';
    stypeRow.style.display = '';
  } else if (stypeRow) {
    stypeRow.style.display = 'none';
  }
}

// ─── GRAMMAR RULES DATA ───────────────────────────────────────────────────────

const grammarRulesData = [
  {
    stype: 'Hoofdzin', en: 'Main clause',
    pattern: 'Pos. 1 → Pos. 2 → Middenveld → Eindpositie',
    nlExpl: 'Het werkwoord staat ALTIJD op de tweede positie. Het onderwerp staat normaal op de eerste positie.',
    enExpl: 'The verb is ALWAYS in position 2. The subject normally comes first.',
    tip: 'Positie 2 is ALTIJD voor het (vervoegd) werkwoord — zonder uitzondering!',
    conjunctions: [],
    slots: [
      { pos: '1', color: 'pos1', label: 'Onderwerp', en: 'Subject', desc: 'Wie of wat doet de actie?', examples: 'Ik · Jan · De kinderen · Het boek' },
      { pos: '2', color: 'pos2', label: 'Werkwoord', en: 'Conjugated verb', desc: 'Vervoegd naar persoon + tijd. Nooit verplaatsen!', examples: 'ga · werkt · eten · heeft' },
      { pos: 'M', color: 'posm', label: 'Middenveld  (T → M → P)', en: 'Middle field  (Time → Manner → Place)', desc: 'Volgorde: Tijd (wanneer?) → Manier (hoe?) → Plaats (waar?) → Lijdend voorwerp (wat?)', examples: 'morgen (T) · snel (M) · naar school (P) · een boek (obj.)' },
      { pos: 'E', color: 'pose', label: 'Eindpositie', en: 'End field', desc: 'Scheidbaar werkwoorddeel, infinitief, of deelwoord.', examples: 'op (scheidbaar) · kopen (inf.) · gekocht (deelwoord)' },
    ],
    wordOrder: [
      { slot: 'Tijd (T)', q: 'Wanneer?', ex: 'morgen, gisteren, elke dag, om 9 uur' },
      { slot: 'Manier (M)', q: 'Hoe?', ex: 'snel, graag, samen, goed' },
      { slot: 'Plaats (P)', q: 'Waar?', ex: 'thuis, in Amsterdam, naar school' },
      { slot: 'Object', q: 'Wat / wie?', ex: 'een boek, hem, de brief' },
    ],
  },
  {
    stype: 'Hoofdzin + inversie', en: 'Inversion',
    pattern: 'Bijwoord/Tijd → Werkwoord → Onderwerp → Middenveld → Eindpositie',
    nlExpl: 'Als de zin NIET begint met het onderwerp, wisselen werkwoord en onderwerp van positie. Positie 2 blijft altijd het werkwoord.',
    enExpl: 'When anything other than the subject starts the sentence, verb and subject swap. Position 2 always stays the verb.',
    tip: 'Beginwoord ≠ onderwerp? → werkwoord op pos. 2, dan pas het onderwerp!',
    conjunctions: [],
    slots: [
      { pos: '1', color: 'pos1', label: 'Voorveld (NIET het onderwerp)', en: 'Front field (NOT the subject)', desc: 'Tijdsbepaling, bijwoord, bijzin, of object dat je wil benadrukken.', examples: 'Morgen · Daar · Op maandag · Snel' },
      { pos: '2', color: 'pos2', label: 'Werkwoord', en: 'Conjugated verb', desc: 'Staat nog steeds op positie 2 — altijd!', examples: 'ga · werkt · ben · heeft' },
      { pos: '3', color: 'pos3', label: 'Onderwerp', en: 'Subject', desc: 'Schuift op naar positie 3 door inversie.', examples: 'ik · hij · de trein · we' },
      { pos: 'M', color: 'posm', label: 'Middenveld  (T → M → P)', en: 'Middle field  (Time → Manner → Place)', desc: 'Rest van de zin in T-M-P volgorde.', examples: 'snel · naar huis · een koffie' },
      { pos: 'E', color: 'pose', label: 'Eindpositie', en: 'End field', desc: 'Infinitief, deelwoord of scheidbaar deel.', examples: 'fietsen · gegeten · op' },
    ],
    wordOrder: [
      { slot: 'Voorveld', q: 'Wat benadrukt je?', ex: 'Morgen, Daar, Elke dag, Gisteren' },
      { slot: 'Werkwoord', q: 'Positie 2 (altijd!)', ex: 'gaat, werkt, is, heeft' },
      { slot: 'Onderwerp', q: 'Wie?', ex: 'ik, hij, de leraar' },
    ],
  },
  {
    stype: 'Hoofdzin + bijzin', en: 'Main clause + subordinate clause',
    pattern: '[Hoofdzin] + Voegwoord + Onderwerp + Middenveld + Werkwoord(en)',
    nlExpl: 'De bijzin begint met een onderschikkend voegwoord. In de bijzin staat het WERKWOORD aan het EINDE.',
    enExpl: 'The subordinate clause starts with a subordinating conjunction. The verb(s) move to the END of the clause.',
    tip: 'Bijzin = alles normaal BEHALVE: werkwoord gaat naar het einde!',
    conjunctions: ['omdat', 'dat', 'als', 'terwijl', 'hoewel', 'nadat', 'zodat', 'toen', 'of', 'totdat'],
    slots: [
      { pos: 'HZ', color: 'pos1', label: 'Hoofdzin', en: 'Main clause', desc: 'Normale woordvolgorde (S-V-O).', examples: 'Ik weet · Hij zegt · We begrijpen' },
      { pos: 'VW', color: 'posvw', label: 'Voegwoord', en: 'Conjunction', desc: 'Leidt de bijzin in. Signaal: werkwoord gaat naar einde!', examples: 'omdat · dat · als · hoewel · terwijl' },
      { pos: 'O', color: 'pos3', label: 'Onderwerp bijzin', en: 'Subject of subclause', desc: 'Het onderwerp van de bijzin.', examples: 'hij · ik · de trein · het weer' },
      { pos: 'M', color: 'posm', label: 'Middenveld  (T → M → P → Obj.)', en: 'Middle field', desc: 'Tijdsbepaling, manier, plaats, object — in T-M-P volgorde.', examples: 'morgen (T) · snel (M) · naar school (P) · haar (obj.)' },
      { pos: 'E', color: 'pose', label: 'Werkwoord(en) aan het einde', en: 'Verb(s) at the end', desc: 'Bij meerdere werkwoorden: hulpww. + infinitief / deelwoord. Volgorde: deelwoord vóór hulpwerkwoord.', examples: 'werkt · gegeten heeft · kan komen' },
    ],
    wordOrder: [
      { slot: 'Voegwoorden', q: 'Onderschikkend', ex: 'omdat, dat, als, terwijl, hoewel, nadat, zodat, toen' },
      { slot: 'Einde bijzin', q: 'Werkwoordvolgorde', ex: 'enkelvoud: "werkt" | vtt: "heeft gewerkt" | modaal: "kan werken"' },
    ],
  },
  {
    stype: 'Bijzin + hoofdzin', en: 'Subordinate clause first → inversion',
    pattern: '[Voegwoord + Onderwerp + Middenveld + Werkwoord], → Werkwoord + Onderwerp + Rest',
    nlExpl: 'Als de bijzin vóór de hoofdzin staat, telt de hele bijzin als positie 1. Daarna komt direct het werkwoord van de hoofdzin (inversie).',
    enExpl: 'When the subordinate clause leads, it occupies position 1. The main clause verb must immediately follow (inversion).',
    tip: 'De bijzin = positie 1 als blok → daarna werkwoord → dan onderwerp!',
    conjunctions: ['omdat', 'als', 'terwijl', 'hoewel', 'toen', 'nadat', 'zodra'],
    slots: [
      { pos: '1', color: 'posvw', label: 'Bijzin (= heel blok op pos. 1)', en: 'Subordinate clause (= position 1 block)', desc: 'De hele bijzin functioneert als positie 1. Interne volgorde: Vgw. + S + TMP + Werkwoord(einde).', examples: 'Omdat hij ziek is · Als het regent · Toen ik aankwam' },
      { pos: '2', color: 'pos2', label: 'Werkwoord hoofdzin', en: 'Main clause verb (pos. 2)', desc: 'Komt DIRECT na de bijzin — inversie!', examples: 'ga · is · werkt · moet' },
      { pos: '3', color: 'pos3', label: 'Onderwerp hoofdzin', en: 'Main clause subject', desc: 'Komt na het werkwoord door inversie.', examples: 'ik · hij · de leraar · we' },
      { pos: 'M', color: 'posm', label: 'Rest hoofdzin', en: 'Rest of main clause', desc: 'Normaal T-M-P-Object volgorde.', examples: 'thuis · snel · een koffie' },
    ],
    wordOrder: [],
  },
  {
    stype: 'Samengestelde zin', en: 'Compound sentence',
    pattern: '[Hoofdzin 1] + nevenschikkend voegwoord + [Hoofdzin 2]',
    nlExpl: 'Twee of meer hoofdzinnen verbonden met een nevenschikkend voegwoord. Beide zinnen behouden hun eigen normale woordvolgorde.',
    enExpl: 'Two or more main clauses joined with a coordinating conjunction. Each clause keeps its own normal word order.',
    tip: '"En, maar, of, want, dus, toch, nog" → woordvolgorde verandert NIET!',
    conjunctions: ['en', 'maar', 'of', 'want', 'dus', 'toch', 'noch', 'nog'],
    slots: [
      { pos: 'HZ1', color: 'pos1', label: 'Hoofdzin 1', en: 'Main clause 1', desc: 'Gewone S-V-O volgorde.', examples: 'Ik werk hard' },
      { pos: 'VW', color: 'posvw', label: 'Nevenschikkend voegwoord', en: 'Coordinating conjunction', desc: 'Verbindt de twee zinnen. Verandert de woordvolgorde NIET.', examples: 'en · maar · of · want · dus' },
      { pos: 'HZ2', color: 'pos1', label: 'Hoofdzin 2', en: 'Main clause 2', desc: 'Ook gewone S-V-O volgorde — geen inversie!', examples: 'ik ben moe' },
    ],
    wordOrder: [
      { slot: 'Nevenschikkend', q: 'Geen inversie na:', ex: 'en, maar, of, want, dus, toch' },
      { slot: 'Onderschikkend', q: 'WEL inversie na bijzin:', ex: 'omdat, dat, als, terwijl → werkwoord naar einde' },
    ],
  },
  {
    stype: 'WH-vraagzin', en: 'WH-question',
    pattern: 'Vraagwoord → Werkwoord → Onderwerp → Middenveld → Eindpositie?',
    nlExpl: 'Begint altijd met een vraagwoord. Het werkwoord staat op positie 2, het onderwerp schuift naar positie 3.',
    enExpl: 'Always starts with a question word. Verb is in position 2, subject shifts to position 3.',
    tip: 'Vraagwoord telt als positie 1 → altijd inversie!',
    conjunctions: ['wie', 'wat', 'waar', 'wanneer', 'waarom', 'hoe', 'welk/welke', 'hoeveel', 'waarmee', 'waarover'],
    slots: [
      { pos: '1', color: 'posvw', label: 'Vraagwoord', en: 'Question word', desc: 'Staat altijd voorop. Welk vraagwoord gebruik je?', examples: 'Wie · Wat · Waar · Wanneer · Waarom · Hoe · Hoeveel' },
      { pos: '2', color: 'pos2', label: 'Werkwoord', en: 'Conjugated verb (pos. 2)', desc: 'Direct na het vraagwoord — inversie.', examples: 'ga · is · werkt · heb' },
      { pos: '3', color: 'pos3', label: 'Onderwerp', en: 'Subject', desc: 'Na het werkwoord door inversie.', examples: 'jij · u · hij · de trein' },
      { pos: 'M', color: 'posm', label: 'Middenveld  (T → M → P → Obj.)', en: 'Middle field', desc: 'T-M-P volgorde plus objecten.', examples: 'morgen · snel · naar Amsterdam · dit' },
      { pos: 'E', color: 'pose', label: 'Eindpositie', en: 'End field', desc: 'Infinitief, deelwoord, of scheidbaar deel.', examples: 'kopen · gedaan · op' },
    ],
    wordOrder: [
      { slot: 'Wie?', q: 'Persoon (subject)', ex: 'Wie werkt hier?' },
      { slot: 'Wat?', q: 'Ding / actie (object)', ex: 'Wat eet jij?' },
      { slot: 'Waar?', q: 'Plaats', ex: 'Waar woon jij?' },
      { slot: 'Wanneer?', q: 'Tijd', ex: 'Wanneer kom je?' },
      { slot: 'Waarom?', q: 'Reden', ex: 'Waarom leer je Nederlands?' },
      { slot: 'Hoe?', q: 'Manier', ex: 'Hoe gaat het?' },
    ],
  },
  {
    stype: 'Ja/nee-vraagzin', en: 'Yes/no question',
    pattern: 'Werkwoord → Onderwerp → Middenveld → Eindpositie?',
    nlExpl: 'Het werkwoord staat op positie 1. Er is geen vraagwoord. Het antwoord is ja of nee.',
    enExpl: 'The verb comes first (position 1). No question word. The answer is yes or no.',
    tip: 'Werkwoord op positie 1 = ja/nee-vraag. Geen vraagwoord nodig!',
    conjunctions: [],
    slots: [
      { pos: '1', color: 'pos2', label: 'Werkwoord', en: 'Conjugated verb (pos. 1!)', desc: 'Staat op positie 1 — niet het onderwerp!', examples: 'Werk · Is · Heb · Gaat · Kan' },
      { pos: '2', color: 'pos3', label: 'Onderwerp', en: 'Subject', desc: 'Direct na het werkwoord.', examples: 'jij · u · hij · jullie' },
      { pos: 'M', color: 'posm', label: 'Middenveld  (T → M → P → Obj.)', en: 'Middle field', desc: 'T-M-P volgorde.', examples: 'morgen · snel · in Amsterdam · het boek' },
      { pos: 'E', color: 'pose', label: 'Eindpositie', en: 'End field', desc: 'Infinitief, deelwoord, of scheidbaar deel.', examples: 'kopen · gedaan · op' },
    ],
    wordOrder: [],
  },
  {
    stype: 'Hoofdzin (vtt)', en: 'Present perfect (voltooid tegenwoordige tijd)',
    pattern: 'Onderwerp → hebben/zijn → Middenveld → Voltooid deelwoord',
    nlExpl: 'Hulpwerkwoord (hebben of zijn) staat op positie 2. Het voltooid deelwoord staat ALTIJD aan het einde.',
    enExpl: 'Auxiliary verb (hebben or zijn) is in position 2. The past participle always goes to the END.',
    tip: 'Zijn: beweging/verandering (gaan, komen, worden). Hebben: de rest.',
    conjunctions: [],
    slots: [
      { pos: '1', color: 'pos1', label: 'Onderwerp', en: 'Subject', desc: 'Wie of wat?', examples: 'Ik · Jan · De kinderen' },
      { pos: '2', color: 'pos2', label: 'Hulpwerkwoord: hebben / zijn', en: 'Auxiliary verb: hebben / zijn', desc: 'Kies: zijn (beweging/verandering) of hebben (de rest).', examples: 'heb · heeft · hebben · ben · is · zijn' },
      { pos: 'M', color: 'posm', label: 'Middenveld  (T → M → P → Obj.)', en: 'Middle field', desc: 'Tijdsbepaling, manier, plaats, indirect/direct object.', examples: 'gisteren · snel · naar school · hem' },
      { pos: 'E', color: 'pose', label: 'Voltooid deelwoord', en: 'Past participle (end!)', desc: 'Vorming: ge- + stam + -t/d (regelmatig) of onregelmatig. Staat ALTIJD aan het einde.', examples: 'gewerkt · gegeten · gedaan · gezien · gekomen' },
    ],
    wordOrder: [
      { slot: 'hebben', q: 'Meeste werkwoorden', ex: 'eten → gegeten, werken → gewerkt, kopen → gekocht' },
      { slot: 'zijn', q: 'Beweging / verandering', ex: 'gaan → gegaan, komen → gekomen, worden → geworden' },
      { slot: 'Deelwoord', q: 'Regelmatig: ge- + stam + t/d', ex: 'werk → gewerkt | leer → geleerd | koop → gekocht' },
    ],
  },
  {
    stype: 'Gebiedende wijs', en: 'Imperative (command)',
    pattern: 'Werkwoordstam! (geen onderwerp)',
    nlExpl: 'Gebruik alleen de werkwoordstam (infinitief minus -en). Er is geen persoonlijk voornaamwoord. Voor beleefdheid: voeg "u" toe na de stam.',
    enExpl: 'Use only the verb stem (infinitive minus -en). No pronoun needed. For politeness: add "u" after the stem.',
    tip: 'Stam = infinitief − "en". Let op: "jij/je" na stam geeft beleefde vorm.',
    conjunctions: [],
    slots: [
      { pos: '1', color: 'pos2', label: 'Werkwoordstam', en: 'Verb stem', desc: 'Infinitief − "-en". Dit is het enige verplichte deel.', examples: 'Kom! · Werk! · Eet! · Schrijf! · Ga!' },
      { pos: 'M', color: 'posm', label: 'Middenveld (optioneel)', en: 'Middle field (optional)', desc: 'Object, tijdsbepaling, plaatsbepaling.', examples: 'snel · hier · dit boek · naar huis' },
      { pos: 'E', color: 'pose', label: 'Scheidbaar deel (optioneel)', en: 'Separable part (optional)', desc: 'Het scheidbare voorzetsel gaat naar het einde.', examples: 'Zet je computer uit! → "uit" naar einde' },
    ],
    wordOrder: [
      { slot: 'Informeel', q: 'Stam alleen', ex: 'Kom! · Werk! · Eet!' },
      { slot: 'Beleefd', q: 'Stam + u', ex: 'Kom u binnen. · Neemt u plaats.' },
      { slot: 'Meervoud', q: 'Stam + t', ex: 'Werkt! · Luistert!' },
    ],
  },
  {
    stype: 'Hoofdzin + om…te', en: 'Purpose clause (om…te infinitive)',
    pattern: 'Hoofdzin + , + om + Middenveld + te + Infinitief',
    nlExpl: '"Om…te" drukt doel of bedoeling uit ("in order to"). De infinitief staat aan het EINDE, na "te".',
    enExpl: '"Om…te" expresses purpose ("in order to"). The infinitive always comes at the END, after "te".',
    tip: '"Om…te" = "in order to". Object/adverbs komen tussen "om" en "te … infinitief".',
    conjunctions: ['om…te'],
    slots: [
      { pos: 'HZ', color: 'pos1', label: 'Hoofdzin', en: 'Main clause', desc: 'Normale hoofdzin (S-V-O/rest).', examples: 'Ik studeer · Hij werkt hard · We sparen' },
      { pos: 'OM', color: 'posvw', label: 'om', en: '"om" (opener)', desc: 'Leidt de doelzin in. Staat direct na de hoofdzin.', examples: 'om' },
      { pos: 'M', color: 'posm', label: 'Object / bijwoord', en: 'Object / adverb', desc: 'Wat? Waar? Hoe? — staat tussen "om" en "te + infinitief".', examples: 'Nederlands · geld · beter · meer' },
      { pos: 'E', color: 'pose', label: 'te + Infinitief', en: 'te + Infinitive (end!)', desc: 'Het werkwoord staat als infinitief na "te" aan het einde.', examples: 'te leren · te kopen · te verbeteren · te worden' },
    ],
    wordOrder: [
      { slot: 'Structuur', q: 'Opbouw', ex: 'Ik studeer Nederlands [om] [goed] [te spreken].' },
      { slot: 'Ontkenning', q: 'Niet voor te', ex: 'om NIET te vergeten · om NOOIT te laat te komen' },
    ],
  },
];

// ─── CONJUGATION REFERENCE DATA ───────────────────────────────────────────────

const conjugationData = {
  stemRule: {
    title: 'Stap 1 — De stam vinden (Finding the stem)',
    steps: [
      { nl: 'Neem de infinitief (de basisvorm)', en: 'Take the infinitive (base form)', ex: 'werken, lopen, maken' },
      { nl: 'Verwijder "-en" aan het einde', en: 'Remove "-en" from the end', ex: 'werk-, loop-, maak-' },
      { nl: 'Controleer: eindigt de stam op twee medeklinkers? Schrijf er maar één.', en: 'Check: does the stem end in a double consonant? Write only one.', ex: 'lopen → loop → lop (niet lopp)' },
      { nl: 'Controleer: korte klinker + medeklinker → verdubbel de medeklinker NIET in de stam', en: 'Short vowel + consonant → do NOT double the consonant in the stem', ex: 'zitten → zit (stam)' },
      { nl: 'v/f wissel: als de infinitief een v of z heeft, gebruik f of s in de stam', en: 'v/f switch: infinitives with v or z use f or s in the stem', ex: 'leven → leef · reizen → reis' },
    ],
  },
  presentTense: {
    title: 'Tegenwoordige tijd (Present tense — OTT)',
    rows: [
      { pronoun: 'ik',        rule: '= stam',          tip: 'Alleen de stam, nooit +t',          ex: 'ik werk · ik loop · ik maak' },
      { pronoun: 'jij / je',  rule: '= stam + t',      tip: 'LET OP: "jij" na werkwoord → geen t! (Werk jij?)', ex: 'jij werkt · maar: Werk jij?' },
      { pronoun: 'hij / zij / het', rule: '= stam + t', tip: 'Altijd stam + t',                 ex: 'hij werkt · zij maakt · het loopt' },
      { pronoun: 'wij / we',  rule: '= infinitief',    tip: 'Zelfde als de infinitief',          ex: 'wij werken · we maken' },
      { pronoun: 'jullie',    rule: '= infinitief',    tip: 'Zelfde als de infinitief',          ex: 'jullie werken · jullie lopen' },
      { pronoun: 'zij / ze (mv.)', rule: '= infinitief', tip: 'Zelfde als de infinitief',       ex: 'zij werken · ze maken' },
    ],
    tip: "\"t kofschip\" / \"'t fokschaap\" — letters t, k, f, s, ch, p bepalen of de past tense -te of -de krijgt.",
  },
  kofschip: {
    title: "'t Kofschip / 't Fokschaap — verleden tijd uitgang",
    enTitle: 'Rule for past tense ending: -te/-ten or -de/-den',
    letters: ['t', 'k', 'f', 's', 'c', 'h', 'p'],
    rule: "Eindigt de stam op een letter uit 't kofschip? \u2192 gebruik -te / -ten. Anders \u2192 gebruik -de / -den.",
    ruleEn: "Does the stem end in a letter from 't kofschip (t k f s ch p)? \u2192 use -te/-ten. Otherwise \u2192 use -de/-den.",
    examples: [
      { stem: 'werk',  last: 'k', inKof: true,  ovt: 'werkte / werkten',    vtt: 'heeft gewerkt' },
      { stem: 'maak',  last: 'k', inKof: true,  ovt: 'maakte / maakten',    vtt: 'heeft gemaakt' },
      { stem: 'praat', last: 't', inKof: true,  ovt: 'praatte / praatten',  vtt: 'heeft gepraat' },
      { stem: 'leer',  last: 'r', inKof: false, ovt: 'leerde / leerden',    vtt: 'heeft geleerd' },
      { stem: 'reis',  last: 's', inKof: true,  ovt: 'reisde / reisden',    vtt: 'heeft gereisd' },
      { stem: 'leef',  last: 'f', inKof: true,  ovt: 'leefde / leefden',    vtt: 'heeft geleefd' },
    ],
    tipNl: 'Let op: de v/z wissel! "leven" stam = "leef" → leefde (kofschip = f). Maar het deelwoord gebruikt de originale letter: geleefd (met d).',
    tipEn: 'Watch out for v/z switch! "leven" stem = "leef" → leefde (-te rule). But the participle restores original: geleefd.',
  },
  pastTense: {
    title: 'Verleden tijd — Onvoltooid verleden tijd (O.V.T.)',
    enTitle: 'Simple past tense',
    rows: [
      { pronoun: 'ik',              suffix: '-te of -de',       ex: 'ik werkte · ik leerde' },
      { pronoun: 'jij / je',        suffix: '-te of -de',       ex: 'jij werkte · jij leerde' },
      { pronoun: 'hij / zij / het', suffix: '-te of -de',       ex: 'hij werkte · zij leerde' },
      { pronoun: 'wij / jullie / zij', suffix: '-ten of -den',  ex: 'wij werkten · jullie leerden' },
    ],
    tipNl: 'Regelmatig: stam + -te(n)/-de(n). Onregelmatig: moet je uit het hoofd leren! (ging, kwam, was, zag…)',
    tipEn: 'Regular: stem + -te(n)/-de(n). Irregular: must be memorised! (ging, kwam, was, zag…)',
  },
  perfectTense: {
    title: 'Voltooid tegenwoordige tijd (V.T.T.) — Present perfect',
    enTitle: '"hebben" or "zijn" + past participle',
    formation: [
      { step: '1', nl: 'Kies het hulpwerkwoord: "hebben" of "zijn"', en: 'Choose auxiliary: "hebben" or "zijn"' },
      { step: '2', nl: '"zijn" gebruik je voor: beweging (gaan, komen, reizen), verandering van staat (worden, groeien)', en: '"zijn" is used for: movement verbs (go, come, travel), change of state (become, grow)' },
      { step: '3', nl: '"hebben" gebruik je voor alle andere werkwoorden', en: '"hebben" is used for all other verbs' },
      { step: '4', nl: 'Voltooid deelwoord (regelmatig): ge- + stam + t/d (kofschip bepaalt t of d)', en: 'Past participle (regular): ge- + stem + t/d (kofschip determines t or d)' },
      { step: '5', nl: 'Voltooid deelwoord (onregelmatig): moet je leren! (gedaan, gezien, geschreven…)', en: 'Past participle (irregular): must be memorised! (gedaan, gezien, geschreven…)' },
    ],
    examples: [
      { nl: 'Ik heb gewerkt.',       en: 'I have worked.',         note: 'hebben — regelmatig' },
      { nl: 'Ik heb gemaakt.',       en: 'I have made.',           note: 'hebben — regelmatig' },
      { nl: 'Ik ben gegaan.',        en: 'I have gone.',           note: 'zijn — beweging' },
      { nl: 'Ik ben gekomen.',       en: 'I have come.',           note: 'zijn — beweging' },
      { nl: 'Hij heeft gezien.',     en: 'He has seen.',           note: 'hebben — onregelmatig' },
      { nl: 'Wij zijn begonnen.',    en: 'We have started.',       note: 'zijn — verandering' },
    ],
  },
  modalVerbs: {
    title: 'Modale werkwoorden (Modal verbs)',
    enTitle: 'kunnen · willen · moeten · mogen · zullen · hoeven',
    rows: [
      { inf: 'kunnen', en: 'can / to be able to', ik: 'kan', jij: 'kunt/kan', hij: 'kan', wij: 'kunnen', use: 'Vermogen / mogelijkheid' },
      { inf: 'willen', en: 'to want',             ik: 'wil', jij: 'wilt',     hij: 'wil', wij: 'willen', use: 'Wil / verlangen' },
      { inf: 'moeten', en: 'must / have to',      ik: 'moet',jij: 'moet',     hij: 'moet',wij: 'moeten', use: 'Verplichting / noodzaak' },
      { inf: 'mogen',  en: 'may / allowed to',    ik: 'mag', jij: 'mag',      hij: 'mag', wij: 'mogen',  use: 'Toestemming' },
      { inf: 'zullen', en: 'shall / will',        ik: 'zal', jij: 'zult/zal', hij: 'zal', wij: 'zullen', use: 'Toekomst / belofte' },
      { inf: 'hoeven', en: 'need (to)',            ik: 'hoef',jij: 'hoeft',    hij: 'hoeft',wij: 'hoeven', use: 'Ontkenning (hoef niet)' },
    ],
    tip: 'Modale werkwoorden gebruiken altijd een infinitief aan het einde: Ik kan ZWEMMEN · Hij moet WERKEN.',
    tipEn: 'Modal verbs always take an infinitive at the end: Ik kan ZWEMMEN (I can swim) · Hij moet WERKEN (He must work).',
  },
};

const tenseData = [
  {
    name: 'Tegenwoordige tijd',
    abbr: 'OTT',
    en: 'Present tense',
    color: 'tense-ott',
    structure: 'Onderwerp + werkwoord (vervoegd)',
    structureEn: 'Subject + conjugated verb',
    when: [
      { nl: 'Iets wat nu gebeurt', en: 'Something happening right now' },
      { nl: 'Gewoontes en routines', en: 'Habits and routines' },
      { nl: 'Algemene waarheden / feiten', en: 'General truths and facts' },
      { nl: 'Een vaste afspraak in de nabije toekomst', en: 'A fixed plan in the near future' },
    ],
    examples: [
      { nl: 'Ik werk elke dag.', en: 'I work every day.', note: 'routine' },
      { nl: 'Hij spreekt Nederlands.', en: 'He speaks Dutch.', note: 'feit' },
      { nl: 'Morgen ga ik naar Amsterdam.', en: 'Tomorrow I am going to Amsterdam.', note: 'nabije toekomst' },
    ],
    tip: 'De meest gebruikte tijd in het Nederlands. Gebruik het als standaard.',
    tipEn: 'The most common tense in Dutch. Use it as your default.',
    keywords: [],
  },
  {
    name: 'Verleden tijd',
    abbr: 'OVT',
    en: 'Simple past',
    color: 'tense-ovt',
    structure: 'Onderwerp + stam + te(n) / de(n)  [of onregelmatig]',
    structureEn: 'Subject + stem + -te(n)/-de(n)  [or irregular form]',
    when: [
      { nl: 'Afgeronde handeling in het verleden — verhalen en verhaallijnen', en: 'Completed action in the past — narratives and storylines' },
      { nl: 'Reeks opeenvolgende handelingen in het verleden', en: 'A sequence of past events one after another' },
      { nl: 'Beschrijving van een situatie in het verleden', en: 'Description of a state or background in the past' },
      { nl: 'Formele schrijftaal (kranten, boeken)', en: 'Formal written language (newspapers, books)' },
    ],
    examples: [
      { nl: 'Gisteren werkte ik thuis.', en: 'Yesterday I worked at home.', note: 'afgerond' },
      { nl: 'Hij liep naar de winkel en kocht brood.', en: 'He walked to the shop and bought bread.', note: 'reeks' },
      { nl: 'Het was een mooie dag.', en: 'It was a beautiful day.', note: 'beschrijving' },
    ],
    tip: 'Gebruik de OVT in geschreven verhalen en formele teksten. In gesproken Nederlands gebruik je vaker de VTT.',
    tipEn: 'Use the simple past in written stories and formal texts. In spoken Dutch the present perfect (VTT) is more common.',
    keywords: ['gisteren', 'vroeger', 'toen', 'ooit', 'daarna', 'vervolgens'],
  },
  {
    name: 'Voltooid tegenwoordige tijd',
    abbr: 'VTT',
    en: 'Present perfect',
    color: 'tense-vtt',
    structure: 'Onderwerp + hebben / zijn + voltooid deelwoord',
    structureEn: 'Subject + hebben/zijn + past participle',
    when: [
      { nl: 'Iets wat is afgerond maar relevant is voor nu — gesproken taal', en: 'Something completed but relevant to now — spoken language' },
      { nl: 'Persoonlijke ervaringen (ooit gedaan / nooit gedaan)', en: 'Personal experiences (ever done / never done)' },
      { nl: 'Recent voltooide actie', en: 'Recently completed action' },
      { nl: 'Resultaat van een actie is nog zichtbaar', en: 'The result of an action is still visible' },
    ],
    examples: [
      { nl: 'Ik heb gegeten.', en: 'I have eaten. / I ate.', note: 'recent' },
      { nl: 'Zij is naar Spanje gegaan.', en: 'She has gone to Spain.', note: 'beweging → zijn' },
      { nl: 'Heb jij ooit Nederlands geleerd?', en: 'Have you ever learned Dutch?', note: 'ervaring' },
    ],
    tip: 'De VTT wordt in gesproken Nederlands gebruikt waar het Engels de simple past gebruikt: "Wat heb je gisteren gedaan?" (niet "Wat deed je?")',
    tipEn: 'The VTT is used in spoken Dutch where English uses the simple past: "Wat heb je gisteren gedaan?" = "What did you do yesterday?"',
    keywords: ['al', 'nog niet', 'ooit', 'nooit', 'net', 'zojuist', 'vandaag'],
  },
  {
    name: 'Toekomende tijd',
    abbr: 'TT',
    en: 'Future tense',
    color: 'tense-tt',
    structure: 'zullen + infinitief  —of—  gaan + infinitief  —of—  OTT + tijdsbepaling',
    structureEn: 'zullen + infinitive  —or—  gaan + infinitive  —or—  present tense + time word',
    when: [
      { nl: 'zullen + inf → formele/onzekere toekomst, beloftes, voorspellingen', en: 'zullen + inf → formal/uncertain future, promises, predictions' },
      { nl: 'gaan + inf → plan of voornemen (zoals "going to")', en: 'gaan + inf → plan or intention (like "going to")' },
      { nl: 'OTT + tijdsbepaling → vaste afspraken / schema (meest gebruikt in spreektaal)', en: 'Present tense + time word → fixed plans / schedule (most common in spoken Dutch)' },
    ],
    examples: [
      { nl: 'Het zal morgen regenen.', en: 'It will rain tomorrow.', note: 'voorspelling (zullen)' },
      { nl: 'Ik ga Nederlands leren.', en: 'I am going to learn Dutch.', note: 'voornemen (gaan)' },
      { nl: 'Morgen werk ik thuis.', en: 'Tomorrow I am working from home.', note: 'vaste afspraak (OTT)' },
    ],
    tip: 'In spreektaal vermijden Nederlanders "zullen" vaak en gebruiken ze liever "gaan" of gewoon de OTT.',
    tipEn: 'In spoken Dutch, "zullen" is often avoided. Dutch speakers prefer "gaan" or just the present tense for future plans.',
    keywords: ['morgen', 'volgende week', 'straks', 'binnenkort', 'over een jaar'],
  },
  {
    name: 'Voltooid verleden tijd',
    abbr: 'VVT',
    en: 'Past perfect (pluperfect)',
    color: 'tense-vvt',
    structure: 'Onderwerp + had / was + voltooid deelwoord',
    structureEn: 'Subject + had/was + past participle',
    when: [
      { nl: 'Iets wat al klaar was vóórdat een andere verleden handeling begon', en: 'Something already completed before another past action started' },
      { nl: 'Verleden in het verleden — "de stap daarvoor"', en: 'The past of the past — "the step before"' },
    ],
    examples: [
      { nl: 'Toen hij aankwam, had ik al gegeten.', en: 'When he arrived, I had already eaten.', note: 'eerder klaar' },
      { nl: 'Ze was al vertrokken toen ik belde.', en: 'She had already left when I called.', note: 'eerder klaar (zijn)' },
    ],
    tip: 'VVT = "had/was + deelwoord". Gebruik het om aan te geven dat iets eerder klaar was dan een andere actie.',
    tipEn: 'VVT = "had/was + participle". Use it to show that something was already done before another past action.',
    keywords: ['al', 'nog', 'toen', 'nadat', 'voordat'],
  },
  {
    name: 'OVT vs VTT',
    abbr: '?',
    en: 'Simple past vs Present perfect — when to use which',
    color: 'tense-vs',
    structure: 'OVT: stam + te/de  —vs—  VTT: hebben/zijn + deelwoord',
    structureEn: 'Simple past vs Present perfect',
    when: [
      { nl: 'OVT: formele/geschreven taal, verhalen, nieuwsberichten', en: 'Simple past: formal/written language, stories, news articles' },
      { nl: 'VTT: informele/gesproken taal, gesprekken, dagelijks leven', en: 'Present perfect: informal/spoken language, conversations, daily life' },
      { nl: 'OVT: zijn, hebben, moeten, kunnen, willen, zullen → altijd OVT in gesproken taal', en: 'Simple past: zijn, hebben, modal verbs → always use simple past even in speech' },
    ],
    examples: [
      { nl: 'Ik was moe. (niet: ik ben moe geweest)', en: 'I was tired. (not: ik ben moe geweest)', note: 'zijn → altijd OVT' },
      { nl: 'Ik had honger. (niet: ik heb honger gehad)', en: 'I was hungry. (not: ik heb honger gehad)', note: 'hebben → altijd OVT' },
      { nl: 'Ik heb gegeten. (spreektaal)', en: 'I ate / I have eaten. (spoken)', note: 'gewone ww → VTT' },
    ],
    tip: 'Gouden regel: zijn/hebben/modale werkwoorden → altijd OVT (was, had, kon, mocht…). Andere werkwoorden → VTT in gesprek, OVT in tekst.',
    tipEn: 'Golden rule: zijn/hebben/modal verbs → always simple past (was, had, kon, mocht…). Other verbs → present perfect in speech, simple past in writing.',
    keywords: [],
  },
];

const dehetRules = [
  {
    rule: 'de',
    nlTitle: 'De-woorden — wanneer gebruik je "de"?',
    enTitle: 'De-words — when do you use "de"?',
    items: [
      { nl: 'Personen en beroepen', en: 'Persons and professions', examples: ['de man, de vrouw, de leraar, de dokter'] },
      { nl: 'Woorden op -ing', en: 'Words ending in -ing', examples: ['de vergadering, de mening, de opleiding, de rekening'] },
      { nl: 'Woorden op -heid', en: 'Words ending in -heid', examples: ['de overheid, de vrijheid, de gezondheid, de schoonheid'] },
      { nl: 'Woorden op -ie / -tie / -sie', en: 'Words ending in -ie / -tie / -sie', examples: ['de functie, de natie, de fusie, de koffie, de serie'] },
      { nl: 'Woorden op -teit', en: 'Words ending in -teit', examples: ['de universiteit, de kwaliteit, de flexibiliteit'] },
      { nl: 'Woorden op -nis / -schap', en: 'Words ending in -nis / -schap', examples: ['de kennis, de wetenschap, de vriendschap'] },
      { nl: 'Persoonsnamen op -er / -aar', en: 'Person nouns ending in -er / -aar', examples: ['de huurder, de leraar, de verkoper, de werker'] },
      { nl: 'Meervoud', en: 'All plural nouns', examples: ['de kinderen, de huizen, de auto\'s, de boeken'] },
      { nl: 'Tijdsaanduidingen (meeste)', en: 'Most time expressions', examples: ['de ochtend, de middag, de avond, de week, de maand'] },
    ],
    tip: { nl: 'Tip: ~75% van alle Nederlandse woorden zijn de-woorden!', en: 'Tip: about 75% of all Dutch nouns are de-words!' },
  },
  {
    rule: 'het',
    nlTitle: 'Het-woorden — wanneer gebruik je "het"?',
    enTitle: 'Het-words — when do you use "het"?',
    items: [
      { nl: 'Verkleinwoorden op -je', en: 'Diminutives ending in -je', examples: ['het meisje, het huisje, het hondje, het kopje'] },
      { nl: 'Woorden met ge- voorvoegsel', en: 'Words with ge- prefix', examples: ['het gezicht, het gebouw, het gebruik, het gesprek, het gezin'] },
      { nl: 'Woorden met be- voorvoegsel', en: 'Words with be- prefix', examples: ['het bewijs, het bericht, het bedrag, het beleid'] },
      { nl: 'Woorden met ont- voorvoegsel', en: 'Words with ont- prefix', examples: ['het ontbijt, het ontslag, het ontwerp, het onthaal'] },
      { nl: 'Werkwoorden als zelfstandig naamwoord', en: 'Infinitives used as nouns', examples: ['het lopen, het werken, het eten, het leven'] },
      { nl: 'Leenwoorden op -ment / -aat / -at', en: 'Loanwords ending in -ment / -aat / -at', examples: ['het moment, het klimaat, het debat, het formaat'] },
      { nl: 'Samengestelde woorden erven het lidwoord van het grondwoord', en: 'Compound words inherit the article of their base word', examples: ['het huis → het ziekenhuis, het raadhuis', 'het werk → het huiswerk, het kunstwerk'] },
    ],
    tip: { nl: 'Gouden tip: als het woord op -je eindigt, is het ALTIJD het!', en: 'Golden tip: if the word ends in -je, it is ALWAYS het!' },
  },
];

const stypeFilterMap = {
  'Hoofdzin':           'hoofdzin',
  'Hoofdzin + inversie':'hoofdzin',
  'Samengestelde zin':  'hoofdzin',
  'Hoofdzin (vtt)':     'hoofdzin',
  'Hoofdzin + om…te':   'hoofdzin',
  'WH-vraagzin':        'vraagzin',
  'Ja/nee-vraagzin':    'vraagzin',
  'Hoofdzin + bijzin':  'bijzin',
  'Bijzin + hoofdzin':  'bijzin',
  'Gebiedende wijs':    'gebiedende-wijs',
};


function _buildA1GrammarRulesHtml() {
  // ── Sentence structure cards ──────────────────────────────────────────────
  const sentenceCards = grammarRulesData.map(rule => {
    const examples = defaultSentences.filter(s => s.stype === rule.stype).slice(0, 3);
    const badgeClass = 'stype-' + rule.stype.toLowerCase().replace(/[^a-z]/g, '-');
    const gfilter = stypeFilterMap[rule.stype] || 'hoofdzin';

    const slotsHtml = rule.slots && rule.slots.length ? `
      <div class="grammar-slots-title">🗂 Zinsposities / Sentence positions</div>
      <div class="grammar-slots">
        ${rule.slots.map(sl => `
          <div class="grammar-slot grammar-slot-${sl.color}">
            <div class="grammar-slot-pos">${sl.pos}</div>
            <div class="grammar-slot-body">
              <div class="grammar-slot-label">🇳🇱 ${sl.label}</div>
              <div class="grammar-slot-en">🇬🇧 ${sl.en}</div>
              <div class="grammar-slot-desc">${sl.desc}</div>
              <div class="grammar-slot-examples">${sl.examples}</div>
            </div>
          </div>`).join('')}
      </div>` : '';

    const wordOrderHtml = rule.wordOrder && rule.wordOrder.length ? `
      <div class="grammar-slots-title">📋 Extra regels / Extra rules</div>
      <table class="grammar-wo-table">
        ${rule.wordOrder.map(row => `
          <tr>
            <td class="grammar-wo-slot">${row.slot}</td>
            <td class="grammar-wo-q">${row.q}</td>
            <td class="grammar-wo-ex">${row.ex}</td>
          </tr>`).join('')}
      </table>` : '';

    return `
    <div class="grammar-rule-card" data-gfilter="${gfilter}">
      <div class="grammar-rule-header">
        <div>
          <div class="grammar-rule-title">${rule.stype}</div>
          <div class="grammar-rule-subtitle">${rule.en}</div>
        </div>
        <span class="stype-badge ${badgeClass}">${rule.stype.split(' ')[0]}</span>
      </div>
      <div class="grammar-pattern">${rule.pattern}</div>
      <p class="grammar-expl-nl">${rule.nlExpl}</p>
      <p class="grammar-expl-en">${rule.enExpl}</p>
      ${rule.tip ? `<div class="grammar-tip">💡 ${rule.tip}</div>` : ''}
      ${slotsHtml}
      ${wordOrderHtml}
      ${rule.conjunctions.length ? `<div class="grammar-conj">Voegwoorden / Conjunctions: <strong>${rule.conjunctions.join(', ')}</strong></div>` : ''}
      ${examples.length ? `
        <div class="grammar-examples-title">Voorbeelden uit de oefeningen:</div>
        ${examples.map(s => `
          <div class="grammar-example-item">
            <div class="grammar-ex-nl">${s.nl}</div>
            <div class="grammar-ex-en">${s.en}</div>
          </div>`).join('')}` : ''}
    </div>`;
  }).join('');

  // ── De/Het section ────────────────────────────────────────────────────────
  const dehetSection = `
    <div class="grammar-dehet-section gt-topic-block" data-gfilter="dehet" data-pill="dehet">
      <div class="grammar-section-title">
        <span>De / Het — lidwoorden</span>
        <span class="grammar-section-subtitle">Articles · Lidwoorden</span>
      </div>
      <div class="grammar-dehet-grid">
        ${dehetRules.map(block => `
          <div class="grammar-dehet-card grammar-dehet-${block.rule}">
            <div class="grammar-dehet-header">
              <span class="grammar-dehet-badge">${block.rule}</span>
              <div>
                <div class="grammar-dehet-title">${block.nlTitle}</div>
                <div class="grammar-dehet-subtitle">${block.enTitle}</div>
              </div>
            </div>
            <ul class="grammar-dehet-list">
              ${block.items.map(item => `
                <li>
                  <div class="grammar-dehet-rule-nl">${item.nl}</div>
                  <div class="grammar-dehet-rule-en">${item.en}</div>
                  <div class="grammar-dehet-examples">${item.examples.join(' · ')}</div>
                </li>`).join('')}
            </ul>
            <div class="grammar-tip" style="margin-top:12px">💡 ${block.tip.nl}<br><em>${block.tip.en}</em></div>
          </div>`).join('')}
      </div>
    </div>`;

  // ── Conjugation section ──────────────────────────────────────────────────
  const cd = conjugationData;

  const stemSteps = cd.stemRule.steps.map((s, i) => `
    <div class="cj-step"><span class="cj-step-num">${i+1}</span>
      <div><div class="cj-step-nl">${s.nl}</div>
           <div class="cj-step-en">${s.en}</div>
           <div class="cj-step-ex">${s.ex}</div></div></div>`).join('');

  const presentRows = cd.presentTense.rows.map(r => `
    <tr><td class="cj-pronoun">${r.pronoun}</td>
        <td class="cj-rule">${r.rule}</td>
        <td class="cj-tip">${r.tip}</td>
        <td class="cj-ex">${r.ex}</td></tr>`).join('');

  const kofLetters = cd.kofschip.letters.map(l =>
    `<span class="kof-letter">${l}</span>`).join('');
  const kofRows = cd.kofschip.examples.map(e => `
    <tr class="${e.inKof ? 'kof-yes' : 'kof-no'}">
      <td class="cj-ex">${e.stem}</td>
      <td class="cj-ex">${e.last}</td>
      <td>${e.inKof ? '<span class="kof-badge kof-badge-yes">kofschip ✓</span>' : '<span class="kof-badge kof-badge-no">niet kofschip</span>'}</td>
      <td class="cj-ex">${e.ovt}</td>
      <td class="cj-ex">${e.vtt}</td>
    </tr>`).join('');

  const pastRows = cd.pastTense.rows.map(r => `
    <tr><td class="cj-pronoun">${r.pronoun}</td>
        <td class="cj-rule">${r.suffix}</td>
        <td class="cj-ex">${r.ex}</td></tr>`).join('');

  const perfSteps = cd.perfectTense.formation.map(s => `
    <div class="cj-step"><span class="cj-step-num">${s.step}</span>
      <div><div class="cj-step-nl">${s.nl}</div>
           <div class="cj-step-en">${s.en}</div></div></div>`).join('');
  const perfExamples = cd.perfectTense.examples.map(e => `
    <div class="cj-perf-ex">
      <span class="cj-perf-nl">${e.nl}</span>
      <span class="cj-perf-en">${e.en}</span>
      <span class="cj-perf-note">${e.note}</span>
    </div>`).join('');

  const modalRows = cd.modalVerbs.rows.map(r => `
    <tr><td class="cj-pronoun">${r.inf}</td>
        <td class="cj-tip">${r.en}</td>
        <td class="cj-ex">${r.ik}</td>
        <td class="cj-ex">${r.jij}</td>
        <td class="cj-ex">${r.hij}</td>
        <td class="cj-ex">${r.wij}</td>
        <td class="cj-rule">${r.use}</td></tr>`).join('');

  const conjugationSection = `
    <div class="grammar-conj-section gt-topic-block" data-gfilter="vervoeging" data-pill="vervoeging">
      <div class="grammar-section-title">
        <span>Vervoeging</span>
        <span class="grammar-section-subtitle">Conjugation · Werkwoorden vervoegen</span>
      </div>

      <div class="cj-block">
        <div class="cj-block-title">${cd.stemRule.title}</div>
        ${stemSteps}
      </div>

      <div class="cj-block">
        <div class="cj-block-title">${cd.presentTense.title}</div>
        <table class="cj-table"><thead>
          <tr><th>Persoon</th><th>Regel</th><th>Let op</th><th>Voorbeeld</th></tr>
        </thead><tbody>${presentRows}</tbody></table>
        <div class="cj-tip">💡 ${cd.presentTense.tip}</div>
      </div>

      <div class="cj-block">
        <div class="cj-block-title">${cd.kofschip.title}</div>
        <div class="cj-block-subtitle">${cd.kofschip.enTitle}</div>
        <div class="kof-letters">'t kofschip: ${kofLetters}</div>
        <div class="cj-rule-text">🇳🇱 ${cd.kofschip.rule}</div>
        <div class="cj-rule-text cj-rule-en">🇬🇧 ${cd.kofschip.ruleEn}</div>
        <table class="cj-table cj-kof-table"><thead>
          <tr><th>Stam</th><th>Laatste letter</th><th>Kofschip?</th><th>Verleden tijd</th><th>Voltooid deelwoord</th></tr>
        </thead><tbody>${kofRows}</tbody></table>
        <div class="cj-tip">💡 ${cd.kofschip.tipNl}<br><em>${cd.kofschip.tipEn}</em></div>
      </div>

      <div class="cj-block">
        <div class="cj-block-title">${cd.pastTense.title}</div>
        <div class="cj-block-subtitle">${cd.pastTense.enTitle}</div>
        <table class="cj-table"><thead>
          <tr><th>Persoon</th><th>Uitgang</th><th>Voorbeeld</th></tr>
        </thead><tbody>${pastRows}</tbody></table>
        <div class="cj-tip">💡 ${cd.pastTense.tipNl}<br><em>${cd.pastTense.tipEn}</em></div>
      </div>

      <div class="cj-block">
        <div class="cj-block-title">${cd.perfectTense.title}</div>
        <div class="cj-block-subtitle">${cd.perfectTense.enTitle}</div>
        ${perfSteps}
        <div class="cj-perf-examples">${perfExamples}</div>
      </div>

      <div class="cj-block">
        <div class="cj-block-title">${cd.modalVerbs.title}</div>
        <div class="cj-block-subtitle">${cd.modalVerbs.enTitle}</div>
        <table class="cj-table"><thead>
          <tr><th>Infinitief</th><th>Betekenis</th><th>ik</th><th>jij</th><th>hij/zij</th><th>wij/jullie/zij</th><th>Gebruik</th></tr>
        </thead><tbody>${modalRows}</tbody></table>
        <div class="cj-tip">💡 ${cd.modalVerbs.tip}<br><em>${cd.modalVerbs.tipEn}</em></div>
      </div>
    </div>`;

  // ── Tenses section ───────────────────────────────────────────────────────
  const tenseCards = tenseData.map(t => {
    const whenRows = t.when.map(w => `
      <div class="tense-when-row">
        <span class="tense-when-nl">🇳🇱 ${w.nl}</span>
        <span class="tense-when-en">🇬🇧 ${w.en}</span>
      </div>`).join('');

    const exRows = t.examples.map(e => `
      <div class="tense-example">
        <div class="tense-ex-nl">${e.nl}</div>
        <div class="tense-ex-en">${e.en}</div>
        <span class="tense-ex-note">${e.note}</span>
      </div>`).join('');

    const keywords = t.keywords.length
      ? `<div class="tense-keywords">🔑 Signaalwoorden: <strong>${t.keywords.join(' · ')}</strong></div>` : '';

    return `
      <div class="tense-card ${t.color}">
        <div class="tense-card-header">
          <div>
            <div class="tense-name">🇳🇱 ${t.name} <span class="tense-abbr">(${t.abbr})</span></div>
            <div class="tense-name-en">🇬🇧 ${t.en}</div>
          </div>
        </div>
        <div class="tense-structure">
          <div>🇳🇱 ${t.structure}</div>
          <div class="tense-structure-en">🇬🇧 ${t.structureEn}</div>
        </div>
        <div class="tense-when-title">Wanneer gebruik je het? / When do you use it?</div>
        <div class="tense-when-list">${whenRows}</div>
        <div class="tense-when-title" style="margin-top:10px">Voorbeelden / Examples</div>
        ${exRows}
        ${keywords}
        <div class="tense-tip">💡 ${t.tip}<br><em>${t.tipEn}</em></div>
      </div>`;
  }).join('');

  const tensesSection = `
    <div class="grammar-tenses-section gt-topic-block" data-gfilter="tijden" data-pill="tijden">
      <div class="grammar-section-title">
        <span>Tijden</span>
        <span class="grammar-section-subtitle">Tenses · Wanneer gebruik je welke tijd?</span>
      </div>
      <div class="tense-grid">${tenseCards}</div>
    </div>`;

  return `
    <div class="gt-topic-block" data-pill="zinsstructuur">
      <div class="grammar-section-title grammar-struct-title">
        <span>Zinsstructuur</span>
        <span class="grammar-section-subtitle">Sentence structure · Woordvolgorde</span>
      </div>
      <div class="grammar-rules-grid-inner">${sentenceCards}</div>
    </div>
    ${dehetSection}
    ${conjugationSection}
    ${tensesSection}`;
}

function renderGrammarContent() {
  const container = document.getElementById('grammar-content');
  if (!container) return;
  const levelMeta = {
    A1: { name:'Beginner', nameEn:'Beginner', color:'#276047' },
    A2: { name:'Elementair', nameEn:'Elementary', color:'#2952A3' },
    B1: { name:'Gevorderd', nameEn:'Intermediate', color:'#6B3FA0' },
    B2: { name:'Hogere middenniveau', nameEn:'Upper-intermediate', color:'#8B4513' },
  };
  container.innerHTML = ['A1','A2','B1','B2'].map(lv => {
    const meta = levelMeta[lv];
    let cards = lv === 'A1' ? _buildA1GrammarRulesHtml() : '';
    if (typeof grammarTopicsData !== 'undefined') {
      cards += grammarTopicsData.filter(t => t.level === lv).map(_renderGtCard).join('');
    }
    if (!cards) return '';
    return `
      <div class="gt-level-section" data-gtlevel="${lv}" style="--lv-color:${meta.color}">
        <div class="gt-level-header">
          <div class="gt-level-header-top">
            <span class="level-badge level-${lv.toLowerCase()}">${lv}</span>
            <span class="gt-level-name">${meta.name}</span>
            <span class="gt-level-name-en">${meta.nameEn}</span>
          </div>
        </div>
        <div class="gt-level-cards">${cards}</div>
      </div>`;
  }).join('');
}


function resolveGrammar(s) {
  if (s.stype) return s;
  return defaultSentences.find(d => d.nl === s.nl) || s;
}

function buildStructureDetail(stype) {
  if (!stype) return '';
  const rule = grammarRulesData.find(r => r.stype === stype);
  if (!rule) return '';

  const slotRows = rule.slots.map((sl, i) => `
    <div class="sd-slot-row">
      <span class="sd-step">${i + 1}.</span>
      <span class="sd-slot-label">🇳🇱 ${sl.label} — 🇬🇧 ${sl.en}</span>
      <span class="sd-slot-desc">${sl.desc}</span>
      <span class="sd-slot-ex">${sl.examples}</span>
    </div>`).join('');

  const woRows = rule.wordOrder.length ? rule.wordOrder.map(row => `
    <div class="sd-wo-row">
      <span class="sd-wo-slot">${row.slot}</span>
      <span class="sd-wo-q">${row.q}</span>
      <span class="sd-wo-ex">${row.ex}</span>
    </div>`).join('') : '';

  return `
    <div class="struct-detail-body">
      <div class="sd-pattern">${rule.pattern}</div>
      ${slotRows}
      ${woRows ? `<div class="sd-wo-section">${woRows}</div>` : ''}
      ${rule.tip ? `<div class="sd-tip">💡 ${rule.tip}</div>` : ''}
    </div>`;
}

function renderSentences(filter) {
  const tbody = document.getElementById('sentence-tbody');
  let list;
  if (filter === 'flagged') list = sentences.filter(s => sentenceFlags[s.nl]?.starred);
  else if (filter === 'all') list = sentences;
  else list = sentences.filter(s => s.level === filter);

  tbody.innerHTML = list.map(raw => {
    const s = resolveGrammar(raw);
    const enRule = s.stype ? (stypeEN[s.stype] || '') : '';
    const st   = sentenceStats[s.nl];
    const flag = sentenceFlags[s.nl];
    const nlJson = JSON.stringify(s.nl);
    const statsHtml = st
      ? `<div class="sentence-stats"><span class="stat-correct">✓ ${st.c}</span><span class="stat-wrong">✗ ${st.w}</span></div>`
      : '';
    let commentHtml = '';
    if (flag?.starred) {
      if (flag.comment) {
        commentHtml = `<div class="sentence-comment">
          <span class="sentence-comment-icon">💬</span>
          <span class="sentence-comment-text">${escapeHtml(flag.comment)}</span>
          <button class="comment-action-btn" onclick="openInlineCommentEditor(this,${nlJson})" title="Bewerken">✏</button>
          <button class="comment-action-btn comment-action-btn--del" onclick="deleteCommentOnly(${nlJson})" title="Verwijder opmerking">🗑</button>
        </div>`;
      } else {
        commentHtml = `<div class="sentence-add-comment">
          <button class="add-comment-btn" onclick="openInlineCommentEditor(this,${nlJson})">+ opmerking toevoegen</button>
        </div>`;
      }
    }
    const starCell = flag?.starred
      ? `<td class="star-cell"><span class="zinnen-star starred" title="Vraag gemarkeerd">★</span></td>`
      : `<td class="star-cell"></td>`;
    return `
    <tr class="${st && st.w > st.c ? 'row-has-errors' : ''}${flag?.starred ? ' row-flagged' : ''}">
      ${starCell}
      <td class="sentence-nl">
        ${s.nl}
        ${statsHtml}
        ${commentHtml}
        ${s.srule ? `<div class="sentence-rule">${s.srule}</div>` : ''}
      </td>
      <td class="sentence-en">
        ${s.en}
        ${enRule ? `<div class="sentence-rule">${enRule}</div>` : ''}
      </td>
      <td><span class="badge badge-${s.level.toLowerCase()}">${s.level}</span></td>
      <td>${s.stype ? `<span class="stype-badge stype-${s.stype.toLowerCase().replace(/[^a-z]/g,'-')}">${s.stype}</span>` : ''}</td>
    </tr>`;
  }).join('');

  if (filter === 'flagged' && list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:24px">Geen gemarkeerde zinnen — druk op ⭐ tijdens het oefenen om een vraag te markeren.</td></tr>`;
  }
}

function filterSentences(filter, btn) {
  document.querySelectorAll('#panel-zinnen .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  _currentSentenceFilter = filter;
  renderSentences(filter);
}

// ─── VERB PRACTICE ────────────────────────────────────────────────────────────

let currentVerb = 0;

// ─── VERB PRONOUNS & TENSES META ──────────────────────────────────────────────

const verbPronouns = [
  { nl: 'ik',              en: 'I',             fi: 0, pi: 0 },
  { nl: 'jij / je',        en: 'you (sg.)',      fi: 1, pi: 0 },
  { nl: 'hij / zij / het', en: 'he / she / it',  fi: 2, pi: 0 },
  { nl: 'wij / we',        en: 'we',             fi: 3, pi: 1 },
  { nl: 'jullie',          en: 'you (pl.)',       fi: 4, pi: 1 },
  { nl: 'zij / ze',        en: 'they',            fi: 5, pi: 1 },
];

const verbTenses = [
  { key: 'ott', nl: 'Tegenwoordige tijd', en: 'Present tense',          abbr: 'OTT' },
  { key: 'ovt', nl: 'Verleden tijd',      en: 'Simple past',            abbr: 'OVT' },
  { key: 'vtt', nl: 'Voltooid t.t.',      en: 'Present perfect',        abbr: 'VTT' },
  { key: 'tt',  nl: 'Toekomende tijd',    en: 'Future tense',           abbr: 'TT'  },
  { key: 'vvt', nl: 'Voltooid v.t.',      en: 'Past perfect',           abbr: 'VVT' },
];

function getVerbForm(v, p, tenseKey) {
  const refl = v.reflexive ? [' me',' je',' zich',' ons',' je',' zich'][p.fi] : '';
  const auxHeb = v.aux === 'hebben';
  const auxMap = { 0:'heb',    1:'hebt',   2:'heeft',  3:'hebben', 4:'hebben', 5:'hebben' };
  const auxBe  = { 0:'ben',    1:'bent',   2:'is',     3:'zijn',   4:'zijn',   5:'zijn'   };
  const hadMap = { 0:'had',    1:'had',    2:'had',    3:'hadden', 4:'hadden', 5:'hadden' };
  const waMap  = { 0:'was',    1:'was',    2:'was',    3:'waren',  4:'waren',  5:'waren'  };
  const zulMap = { 0:'zal',    1:'zult',   2:'zal',    3:'zullen', 4:'zullen', 5:'zullen' };
  switch (tenseKey) {
    case 'ott': return v.forms[p.fi] + refl;
    case 'ovt': return (v.past?.[p.pi] ?? '—') + refl;
    case 'vtt': return (auxHeb ? auxMap[p.fi] : auxBe[p.fi]) + refl + ' ' + v.participle;
    case 'tt':  return zulMap[p.fi] + refl + ' ' + v.inf;
    case 'vvt': return (auxHeb ? hadMap[p.fi] : waMap[p.fi]) + refl + ' ' + v.participle;
  }
}

// ─── CONJUGATION TABLE ────────────────────────────────────────────────────────

function renderConjTable(v) {
  const auxHeb = v.aux === 'hebben';
  const vtypeLabel = { regelmatig:'Regelmatig · Regular', onregelmatig:'Onregelmatig · Irregular', modaal:'Modaal · Modal', scheidbaar:'Scheidbaar · Separable', reflexief:'Reflexief · Reflexive' }[v.vtype] || v.vtype;
  const vtypeClass = { regelmatig:'vref-regular', onregelmatig:'vref-irregular', modaal:'vref-modal', scheidbaar:'vref-modal', reflexief:'vref-irregular' }[v.vtype] || '';

  const bodyRows = verbPronouns.map(p => `
    <tr>
      <td class="ct-pronoun">${p.nl}<span class="ct-pronoun-en">${p.en}</span></td>
      ${verbTenses.map(t => `<td class="ct-cell">${getVerbForm(v, p, t.key)}</td>`).join('')}
    </tr>`).join('');

  document.getElementById('conjtool-table').innerHTML = `
    <div class="ct-header">
      <span class="vref-type ${vtypeClass}">${vtypeLabel}</span>
      <span class="ct-participle">🇳🇱 Deelwoord: <strong>${v.participle}</strong> &nbsp;·&nbsp; Hulpww: <strong>${v.aux}</strong> &nbsp;·&nbsp; 🇬🇧 Participle: <strong>${v.participle}</strong> &nbsp;·&nbsp; Auxiliary: <strong>${auxHeb ? 'to have' : 'to be'}</strong></span>
    </div>
    <div class="ct-table-wrap">
      <table class="ct-table">
        <thead><tr>
          <th class="ct-th-pronoun">Persoon / Person</th>
          ${verbTenses.map(t => `<th>🇳🇱 ${t.nl}<br><span class="ct-th-en">🇬🇧 ${t.en} (${t.abbr})</span></th>`).join('')}
        </tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

// ─── TENSE QUICK REFERENCE ────────────────────────────────────────────────────

function renderTenseQuickRef() {
  const el = document.getElementById('tense-quick-ref');
  if (!el) return;
  el.innerHTML = tenseData.map(t => `
    <div class="tqr-row">
      <div class="tqr-name ${t.color}-border">
        <span class="tqr-abbr">${t.abbr}</span>
        <span class="tqr-nl">${t.name}</span>
        <span class="tqr-en">${t.en}</span>
      </div>
      <div class="tqr-when">
        ${t.when.map(w => `<div class="tqr-when-item"><span class="tqr-nl-text">🇳🇱 ${w.nl}</span><span class="tqr-en-text">🇬🇧 ${w.en}</span></div>`).join('')}
        ${t.keywords.length ? `<div class="tqr-keywords">🔑 ${t.keywords.join(' · ')}</div>` : ''}
      </div>
    </div>`).join('');
}

// ─── VERB EXERCISE — ALL TENSES ───────────────────────────────────────────────

let vexCorrect = 0, vexWrong = 0;
let vexTenseIdx = 0;
let vexMode = 'type'; // 'type' | 'select'

function jumpToTense(ti) {
  vexTenseIdx = ti;
  loadVerbExercise();
}

function repeatCurrentTense() {
  loadVerbExercise();
}

function setVexMode(mode) {
  vexMode = mode;
  loadVerbExercise();
}

function vexDistractors(v, p, tenseKey, count) {
  const correct = getVerbForm(v, p, tenseKey).toLowerCase();
  const pool = new Set();
  // other verbs, same tense+pronoun
  verbs.forEach(ov => {
    if (ov.inf === v.inf) return;
    const f = getVerbForm(ov, p, tenseKey);
    if (f && f !== '—' && f.toLowerCase() !== correct) pool.add(f);
  });
  // other tenses of same verb
  verbTenses.forEach(t => {
    if (t.key === tenseKey) return;
    const f = getVerbForm(v, p, t.key);
    if (f && f !== '—' && f.toLowerCase() !== correct) pool.add(f);
  });
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}

function renderVexProgress() {
  const pct = Math.round((vexTenseIdx / verbTenses.length) * 100);
  return `
    <div class="vex-progress">
      <div class="vex-progress-steps">
        ${verbTenses.map((t, ti) => `
          <button class="vex-tense-step ${ti < vexTenseIdx ? 'done' : ti === vexTenseIdx ? 'active tense-' + t.key : ''}"
                  onclick="jumpToTense(${ti})" title="${t.nl} · ${t.en}">${t.abbr}</button>
          ${ti < verbTenses.length - 1 ? '<span class="vex-step-arrow">›</span>' : ''}`).join('')}
        <button class="vex-repeat-btn" onclick="repeatCurrentTense()">↺ Herhaal</button>
      </div>
      <div class="vex-progress-bar-wrap">
        <div class="vex-progress-bar-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
}

function loadVerbExercise() {
  const v  = verbs[currentVerb];
  const t  = verbTenses[vexTenseIdx];

  const tableRows = verbPronouns.map((p, pi) => {
    const correct = getVerbForm(v, p, t.key);
    if (vexMode === 'select') {
      const distractors = vexDistractors(v, p, t.key, 3);
      const opts = [correct, ...distractors].sort(() => Math.random() - 0.5);
      const optBtns = opts.map(o =>
        `<button class="vex-opt-btn" data-correct="${correct}" data-pi="${pi}"
                 onclick="vexSelectOption(this)">${o}</button>`).join('');
      return `<tr>
        <td class="vex-tbl-pronoun">${p.nl}<span class="vex-tbl-pronoun-en">${p.en}</span></td>
        <td class="vex-tbl-cell"><div class="vex-opts" id="vex-opts-${pi}">${optBtns}</div></td>
      </tr>`;
    } else {
      return `<tr>
        <td class="vex-tbl-pronoun">${p.nl}<span class="vex-tbl-pronoun-en">${p.en}</span></td>
        <td class="vex-tbl-cell">
          <input class="conj-input vex-tbl-input" data-correct="${correct}" data-pi="${pi}"
                 placeholder="..." autocomplete="off"
                 onkeydown="if(event.key==='Enter'){ this.closest('table').querySelectorAll('.vex-tbl-input').forEach(i=>i===this&&i.blur()); checkVerbTable(); }" />
        </td>
      </tr>`;
    }
  }).join('');

  document.getElementById('verb-ex-content').innerHTML = `
    ${renderVexProgress()}
    <div class="vex-mode-toggle">
      <button class="vex-mode-btn ${vexMode==='type'?'active':''}" onclick="setVexMode('type')">✏️ Typ zelf / Type</button>
      <button class="vex-mode-btn ${vexMode==='select'?'active':''}" onclick="setVexMode('select')">☰ Kies / Select</button>
    </div>
    <div class="vex-tense-badge tense-${t.key}" style="margin-bottom:12px">
      🇳🇱 ${t.nl} &nbsp;·&nbsp; 🇬🇧 ${t.en} (${t.abbr})
    </div>
    <table class="vex-table" id="vex-table">
      <thead><tr>
        <th class="vex-th-pronoun">Persoon / Person</th>
        <th>${v.inf}</th>
      </tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
    <div class="vex-actions" style="margin-top:12px">
      ${vexMode === 'type' ? `<button class="btn btn-primary" onclick="checkVerbTable()">Controleer / Check</button>` : ''}
      <button class="btn btn-secondary" onclick="showVerbTableAnswers()">Toon antwoorden / Show answers</button>
      <button class="btn btn-secondary" onclick="jumpToTense(${(vexTenseIdx+1) % verbTenses.length})">Volgende tijd / Next tense →</button>
    </div>
    <div id="vex-feedback"></div>`;

  if (vexMode === 'type') document.querySelector('.vex-tbl-input')?.focus();
}

function checkVerbTable() {
  let correct = 0, wrong = 0;
  document.querySelectorAll('.vex-tbl-input').forEach(inp => {
    const ok = inp.value.trim().toLowerCase() === inp.dataset.correct.toLowerCase();
    inp.className = 'conj-input vex-tbl-input ' + (inp.value.trim() ? (ok ? 'correct' : 'incorrect') : '');
    if (inp.value.trim()) { ok ? correct++ : wrong++; }
  });
  vexCorrect += correct; vexWrong += wrong;
  document.getElementById('vex-correct').textContent = '✓ ' + vexCorrect;
  document.getElementById('vex-wrong').textContent   = '✗ ' + vexWrong;

  // reveal correct answers for wrong ones
  document.querySelectorAll('.vex-tbl-input.incorrect').forEach(inp => {
    inp.title = 'Correct: ' + inp.dataset.correct;
    const hint = document.createElement('div');
    hint.className = 'vex-inline-hint';
    hint.textContent = inp.dataset.correct;
    inp.after(hint);
  });
}

function showVerbTableAnswers() {
  if (vexMode === 'type') {
    document.querySelectorAll('.vex-tbl-input').forEach(inp => {
      inp.value = inp.dataset.correct;
      inp.className = 'conj-input vex-tbl-input correct';
    });
  } else {
    document.querySelectorAll('.vex-opt-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === btn.dataset.correct) btn.classList.add('opt-correct');
    });
  }
}

function vexSelectOption(btn) {
  const pi = btn.dataset.pi;
  const correct = btn.dataset.correct;
  const container = document.getElementById('vex-opts-' + pi);
  container.querySelectorAll('.vex-opt-btn').forEach(b => b.disabled = true);
  const ok = btn.textContent === correct;
  btn.classList.add(ok ? 'opt-correct' : 'opt-wrong');
  if (!ok) container.querySelectorAll('.vex-opt-btn').forEach(b => {
    if (b.textContent === correct) b.classList.add('opt-correct');
  });
  if (ok) vexCorrect++; else vexWrong++;
  document.getElementById('vex-correct').textContent = '✓ ' + vexCorrect;
  document.getElementById('vex-wrong').textContent   = '✗ ' + vexWrong;
}

// ─── VERB SELECTOR ────────────────────────────────────────────────────────────

const MODAL_INFS = new Set(['zijn','hebben','worden','kunnen','willen','moeten','mogen','zullen','hoeven']);
let verbTypeFilter = 'all';
let verbUnitRange = null; // null = show all, or [from, to] to filter by unit

const VERB_GROUP_LABELS = {
  modaal:        'Modal verbs',
  onregelmatig:  'Irregular verbs',
  regelmatig:    'Regular verbs',
  scheidbaar:    'Separable verbs',
  reflexief:     'Reflexive verbs'
};
const VERB_GROUP_ORDER = ['modaal','onregelmatig','regelmatig','scheidbaar','reflexief'];

function _verbType(v) { return MODAL_INFS.has(v.inf) ? 'modaal' : v.vtype; }

function renderVerbSelector() {
  // Update total badge in card header
  const badge = document.getElementById('verb-total-badge');
  if (badge) badge.textContent = verbs.length + ' verbs';

  const counts = { modaal:0, onregelmatig:0, regelmatig:0, scheidbaar:0, reflexief:0 };
  verbs.forEach(v => counts[_verbType(v)]++);

  const wrap = document.getElementById('verb-selector');
  wrap.innerHTML = `
    <input class="verb-search-input" id="verb-search" type="text"
      placeholder="Search verb… e.g. gaan, to go" oninput="_filterVerbs()" autocomplete="off">
    <div class="verb-type-filters" id="verb-type-filters">
      <button class="filter-btn active" onclick="setVerbTypeFilter('all',this)">All <span class="vf-count">${verbs.length}</span></button>
      <button class="filter-btn" onclick="setVerbTypeFilter('modaal',this)">Modal <span class="vf-count">${counts.modaal}</span></button>
      <button class="filter-btn" onclick="setVerbTypeFilter('onregelmatig',this)">Irregular <span class="vf-count">${counts.onregelmatig}</span></button>
      <button class="filter-btn" onclick="setVerbTypeFilter('regelmatig',this)">Regular <span class="vf-count">${counts.regelmatig}</span></button>
      <button class="filter-btn" onclick="setVerbTypeFilter('scheidbaar',this)">Separable <span class="vf-count">${counts.scheidbaar}</span></button>
      <button class="filter-btn" onclick="setVerbTypeFilter('reflexief',this)">Reflexive <span class="vf-count">${counts.reflexief}</span></button>
    </div>
    <div class="verb-coverage-bar">
      <div class="verb-cov-levels">
        <span class="verb-cov-level verb-cov-a1">A1 ✓</span>
        <span class="verb-cov-level verb-cov-a2">A2 ✓</span>
        <span class="verb-cov-level verb-cov-b1">B1 ✓</span>
        <span class="verb-cov-level verb-cov-b2">B2 ~</span>
      </div>
      <div class="verb-cov-note">
        ${verbs.length} verbs in total · A1–B1 well covered · B2 ~80% · ~200 more to reach the ~1000 recommended for fluency
      </div>
    </div>
    <div id="verb-list"></div>
  `;
  _filterVerbs();
}

function setVerbTypeFilter(type, btn) {
  verbTypeFilter = type;
  document.querySelectorAll('#verb-type-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  _filterVerbs();
}

function _filterVerbs() {
  const list = document.getElementById('verb-list');
  if (!list) return;
  const query = (document.getElementById('verb-search')?.value || '').toLowerCase().trim();

  const filtered = verbs.reduce((acc, v, i) => {
    const rangeMatch = !verbUnitRange || (i >= verbUnitRange[0] && i <= verbUnitRange[1]);
    const typeMatch = verbTypeFilter === 'all' || _verbType(v) === verbTypeFilter;
    const searchMatch = !query || v.inf.includes(query) || v.meaning.toLowerCase().includes(query);
    if (rangeMatch && typeMatch && searchMatch) acc.push({ v, i });
    return acc;
  }, []);

  if (!filtered.length) {
    list.innerHTML = '<div class="verb-no-results">No verbs found.</div>';
    return;
  }

  const groups = {};
  filtered.forEach(({ v, i }) => {
    const t = _verbType(v);
    (groups[t] = groups[t] || []).push({ v, i });
  });

  const showHeaders = verbTypeFilter === 'all' || query;
  let html = '';
  VERB_GROUP_ORDER.forEach(type => {
    if (!groups[type]) return;
    if (showHeaders) {
      html += `<div class="verb-group-header">${VERB_GROUP_LABELS[type]}<span class="verb-group-count">${groups[type].length}</span></div>`;
    }
    html += `<div class="verb-chips-group">`;
    groups[type].forEach(({ v, i }) => {
      html += `<button class="verb-chip${i === currentVerb ? ' active' : ''}" onclick="selectVerb(${i},this)">
        <span class="verb-chip-inf">${v.inf}</span>
        <span class="verb-chip-en">${v.meaning}</span>
      </button>`;
    });
    html += `</div>`;
  });
  list.innerHTML = html;
}

function selectVerb(i, btn) {
  currentVerb = i;
  document.querySelectorAll('.verb-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('verb-study-card').style.display  = 'none';
  document.getElementById('verb-ex-card').style.display     = 'none';
  document.getElementById('verb-quiz-card').style.display   = 'none';
  document.getElementById('verb-choice-card').style.display = '';
  document.getElementById('verb-choice-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showVerbStudy() {
  const v = verbs[currentVerb];
  document.getElementById('verb-study-title').textContent   = v.inf;
  document.getElementById('verb-study-meaning').textContent = v.meaning;
  document.getElementById('verb-study-card').style.display  = '';
  document.getElementById('verb-ex-card').style.display     = 'none';
  document.getElementById('verb-quiz-card').style.display   = 'none';
  renderConjTable(v);
  renderTenseQuickRef();
  document.getElementById('verb-study-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showVerbExercise() {
  document.getElementById('verb-ex-card').style.display    = '';
  document.getElementById('verb-study-card').style.display = 'none';
  document.getElementById('verb-quiz-card').style.display  = 'none';
  vexCorrect = 0; vexWrong = 0; vexTenseIdx = 0; vexPronounIdx = 0;
  document.getElementById('vex-correct').textContent = '✓ 0';
  document.getElementById('vex-wrong').textContent   = '✗ 0';
  loadVerbExercise();
  document.getElementById('verb-ex-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── VERB MEANING QUIZ ────────────────────────────────────────────────────────

let vquizMode = 'nl';       // 'nl' = show Dutch ask English, 'en' = reverse, 'mix' = random
let vquizCorrect = 0, vquizWrong = 0;
let vquizOrder = [];         // shuffled indices into verbs[]
let vquizIdx = 0;
let vquizLocked = false;     // prevent double-click while showing feedback
let vquizFilter = 'all'; // 'all', 'unit-N', 'A1/A2', 'B1', 'B2', 'Extra'

// Verb level boundaries — auto-computed from lesson plan unit verbRanges
const VERB_LEVEL_RANGES = (function () {
  const units = typeof lessonPlanData !== 'undefined'
    ? lessonPlanData.levels.flatMap(lv => lv.units.map(u => ({ ...u, level: lv.level })))
    : [];
  const levelMap = {};
  units.forEach(u => {
    if (!u.verbRange) return;
    const lk = (u.level === 'A1' || u.level === 'A2') ? 'A1/A2' : u.level;
    if (!levelMap[lk]) levelMap[lk] = { from: u.verbRange[0], to: u.verbRange[1] };
    else {
      levelMap[lk].from = Math.min(levelMap[lk].from, u.verbRange[0]);
      levelMap[lk].to   = Math.max(levelMap[lk].to, u.verbRange[1]);
    }
  });
  const lastTo = Object.values(levelMap).reduce((m, r) => Math.max(m, r.to), -1);
  if (lastTo < verbs.length - 1) {
    levelMap['Extra'] = { from: lastTo + 1, to: verbs.length - 1 };
  }
  const order = ['A1/A2', 'B1', 'B2', 'Extra'];
  const labels = { 'A1/A2': 'A1 / A2', 'B1': 'B1', 'B2': 'B2', 'Extra': 'Extra' };
  return order.filter(k => levelMap[k]).map(k => ({ key: k, label: labels[k], from: levelMap[k].from, to: levelMap[k].to }));
})();

function _verbLevel(idx) {
  for (const r of VERB_LEVEL_RANGES) { if (idx >= r.from && idx <= r.to) return r.key; }
  return 'Extra';
}

function _shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function _pickDistractors(correctIdx, count, getField) {
  const correct = getField(verbs[correctIdx]);
  const pool = [];
  for (let i = 0; i < verbs.length; i++) {
    if (i !== correctIdx && getField(verbs[i]) !== correct) pool.push(i);
  }
  _shuffleArray(pool);
  return pool.slice(0, count);
}

function _getQuizVerbIndices() {
  if (vquizFilter === 'all') return [...Array(verbs.length).keys()];
  // Unit filter: 'unit-N'
  if (vquizFilter.startsWith('unit-')) {
    const unitNum = parseInt(vquizFilter.split('-')[1]);
    const units = _allUnits();
    const unit = units.find(u => u.unit === unitNum);
    if (unit && unit.verbRange) {
      const indices = [];
      for (let i = unit.verbRange[0]; i <= unit.verbRange[1]; i++) indices.push(i);
      return indices;
    }
    return [...Array(verbs.length).keys()];
  }
  // Level filter
  const range = VERB_LEVEL_RANGES.find(r => r.key === vquizFilter);
  if (!range) return [...Array(verbs.length).keys()];
  const indices = [];
  for (let i = range.from; i <= range.to; i++) indices.push(i);
  return indices;
}

function _renderQuizFilters() {
  const wrap = document.getElementById('vquiz-unit-filters');
  if (!wrap) return;
  const units = _allUnits();

  let html = `<button class="filter-btn ${vquizFilter === 'all' ? 'active' : ''}" onclick="setQuizFilter('all', this)">Alle · All <span class="badge-count">${verbs.length}</span></button>`;

  // Level filters
  VERB_LEVEL_RANGES.forEach(r => {
    const count = r.to - r.from + 1;
    const active = vquizFilter === r.key ? ' active' : '';
    html += `<button class="filter-btn${active}" onclick="setQuizFilter('${r.key}', this)">${r.label} <span class="badge-count">${count}</span></button>`;
  });

  // Unit filters
  html += `<div class="vquiz-unit-divider"></div>`;
  units.forEach(u => {
    if (!u.verbRange) return;
    const count = u.verbRange[1] - u.verbRange[0] + 1;
    const key = 'unit-' + u.unit;
    const active = vquizFilter === key ? ' active' : '';
    html += `<button class="filter-btn${active}" onclick="setQuizFilter('${key}', this)">Unit ${u.unit} <span class="badge-count">${count}</span></button>`;
  });

  wrap.innerHTML = html;
}

function setQuizFilter(filter, btn) {
  vquizFilter = filter;
  document.querySelectorAll('#vquiz-unit-filters .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  startVerbMeaningQuiz();
}

function setQuizMode(mode) {
  vquizMode = mode;
  document.getElementById('vquiz-mode-nl').classList.toggle('active', mode === 'nl');
  document.getElementById('vquiz-mode-en').classList.toggle('active', mode === 'en');
  document.getElementById('vquiz-mode-mix').classList.toggle('active', mode === 'mix');
  startVerbMeaningQuiz();
}

function showVerbMeaningQuiz() {
  document.getElementById('verb-quiz-card').style.display   = '';
  document.getElementById('verb-study-card').style.display  = 'none';
  document.getElementById('verb-ex-card').style.display     = 'none';
  _renderQuizFilters();
  startVerbMeaningQuiz();
  document.getElementById('verb-quiz-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function startVerbMeaningQuiz() {
  vquizCorrect = 0; vquizWrong = 0; vquizIdx = 0; vquizLocked = false;
  document.getElementById('vquiz-correct').textContent = '✓ 0';
  document.getElementById('vquiz-wrong').textContent   = '✗ 0';
  const indices = _getQuizVerbIndices();
  vquizOrder = _shuffleArray(indices);
  _renderQuizCard();
}

function _renderQuizCard() {
  const wrap = document.getElementById('vquiz-content');
  vquizLocked = false;

  if (vquizIdx >= vquizOrder.length) {
    const total = vquizCorrect + vquizWrong;
    const pct = total ? Math.round(vquizCorrect / total * 100) : 0;
    wrap.innerHTML = `
      <div class="vquiz-done">
        <div class="vquiz-done-title">Klaar! · Done!</div>
        <div class="vquiz-done-score">${vquizCorrect} / ${total} correct (${pct}%)</div>
        <button class="btn btn-primary" onclick="startVerbMeaningQuiz()">Opnieuw · Again</button>
      </div>`;
    document.getElementById('vquiz-progress').textContent = `${total} / ${verbs.length}`;
    return;
  }

  const correctVerbIdx = vquizOrder[vquizIdx];
  const v = verbs[correctVerbIdx];
  const showNL = vquizMode === 'nl' || (vquizMode === 'mix' && Math.random() < 0.5);
  const question = showNL ? v.inf : v.meaning;
  const correctAnswer = showNL ? v.meaning : v.inf;
  const qLang = showNL ? 'Nederlands' : 'English';
  const aLang = showNL ? 'English' : 'Nederlands';
  const getField = showNL ? (vb => vb.meaning) : (vb => vb.inf);

  // Build 4 options: 1 correct + 3 distractors
  const distractorIdxs = _pickDistractors(correctVerbIdx, 3, getField);
  const options = [
    { text: correctAnswer, correct: true },
    ...distractorIdxs.map(i => ({ text: getField(verbs[i]), correct: false }))
  ];
  _shuffleArray(options);

  document.getElementById('vquiz-progress').textContent = `${vquizIdx + 1} / ${verbs.length}`;

  let optionsHTML = options.map((o, i) =>
    `<button class="vquiz-option" data-correct="${o.correct}" onclick="_pickQuizOption(this, ${o.correct})">${o.text}</button>`
  ).join('');

  wrap.innerHTML = `
    <div class="vquiz-flashcard">
      <div class="vquiz-lang">${qLang}</div>
      <div class="vquiz-question">${question}</div>
      <div class="vquiz-type">${_verbType(v)}</div>
      <div class="vquiz-divider"></div>
      <div class="vquiz-lang">${aLang}</div>
      <div class="vquiz-options">${optionsHTML}</div>
    </div>`;
}

function _pickQuizOption(btn, isCorrect) {
  if (vquizLocked) return;
  vquizLocked = true;

  // Highlight all buttons
  document.querySelectorAll('.vquiz-option').forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('vquiz-opt-correct');
    else b.classList.add('vquiz-opt-wrong-dim');
  });

  if (isCorrect) {
    btn.classList.add('vquiz-opt-correct');
    vquizCorrect++;
    document.getElementById('vquiz-correct').textContent = '✓ ' + vquizCorrect;
  } else {
    btn.classList.remove('vquiz-opt-wrong-dim');
    btn.classList.add('vquiz-opt-wrong');
    vquizWrong++;
    document.getElementById('vquiz-wrong').textContent = '✗ ' + vquizWrong;
  }

  // Auto-advance after a short delay
  setTimeout(() => { vquizIdx++; _renderQuizCard(); }, isCorrect ? 600 : 1500);
}

// ─── NIET & GEEN EXERCISES ─────────────────────────────────────────────────────

// --- Exercise 1: Geen of Niet? ---

let _negChoosePool = [], _negChooseIdx = 0, _negChooseOk = 0, _negChooseWrong = 0;
let _negChooseLocked = false, _negChooseLevel = 'all';

function _buildNegChoosePool() {
  // Sentences that contain 'niet' or 'geen' with gtopic
  return sentences.filter(s =>
    (s.gtopic === 'niet' || s.gtopic === 'geen') &&
    (_negChooseLevel === 'all' || s.level === _negChooseLevel)
  );
}

function _renderNegChooseLevels() {
  const wrap = document.getElementById('neg-choose-levels');
  if (!wrap) return;
  const levels = ['all', 'A1', 'A2', 'B1', 'B2'];
  const labels = { all: 'All', A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2' };
  wrap.innerHTML = levels.map(lv => {
    const count = lv === 'all'
      ? sentences.filter(s => s.gtopic === 'niet' || s.gtopic === 'geen').length
      : sentences.filter(s => (s.gtopic === 'niet' || s.gtopic === 'geen') && s.level === lv).length;
    if (lv !== 'all' && count === 0) return '';
    return `<button class="filter-btn ${_negChooseLevel === lv ? 'active' : ''}" onclick="_setNegChooseLevel('${lv}', this)">${labels[lv]} <span class="badge-count">${count}</span></button>`;
  }).join('');
}

function _setNegChooseLevel(lv, btn) {
  _negChooseLevel = lv;
  document.querySelectorAll('#neg-choose-levels .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  startNegChoose();
}

function startNegChoose() {
  _negChoosePool = _shuffleArray(_buildNegChoosePool());
  _negChooseIdx = 0; _negChooseOk = 0; _negChooseWrong = 0; _negChooseLocked = false;
  document.getElementById('neg-choose-correct').textContent = '✓ 0';
  document.getElementById('neg-choose-wrong').textContent = '✗ 0';
  _renderNegChooseCard();
}

function _renderNegChooseCard() {
  const wrap = document.getElementById('neg-choose-content');
  _negChooseLocked = false;

  if (_negChooseIdx >= _negChoosePool.length) {
    const total = _negChooseOk + _negChooseWrong;
    const pct = total ? Math.round(_negChooseOk / total * 100) : 0;
    wrap.innerHTML = `<div class="vquiz-done">
      <div class="vquiz-done-title">Done!</div>
      <div class="vquiz-done-score">${_negChooseOk} / ${total} correct (${pct}%)</div>
      <button class="btn btn-primary" onclick="startNegChoose()">Again</button>
    </div>`;
    document.getElementById('neg-choose-progress').textContent = total + ' / ' + _negChoosePool.length;
    return;
  }

  const s = _negChoosePool[_negChooseIdx];
  const answer = s.gtopic; // 'niet' or 'geen'
  // Create display sentence with blank
  const blankNl = s.nl.replace(/\b(niet|geen)\b/i, '______');
  document.getElementById('neg-choose-progress').textContent = (_negChooseIdx + 1) + ' / ' + _negChoosePool.length;

  wrap.innerHTML = `
    <div class="neg-card">
      <div class="neg-english">${s.en}</div>
      <div class="neg-sentence">${blankNl}</div>
      ${s.srule ? `<div class="neg-rule-hint" id="neg-choose-rule" style="display:none"><strong>Rule:</strong> ${s.srule}</div>` : ''}
      <div class="neg-choose-btns">
        <button class="neg-btn" id="neg-btn-geen" onclick="_pickNegChoice('geen','${answer}')">GEEN</button>
        <button class="neg-btn" id="neg-btn-niet" onclick="_pickNegChoice('niet','${answer}')">NIET</button>
      </div>
    </div>`;
}

function _pickNegChoice(picked, correct) {
  if (_negChooseLocked) return;
  _negChooseLocked = true;

  const geenBtn = document.getElementById('neg-btn-geen');
  const nietBtn = document.getElementById('neg-btn-niet');
  const correctBtn = correct === 'geen' ? geenBtn : nietBtn;
  const wrongBtn = correct === 'geen' ? nietBtn : geenBtn;

  correctBtn.classList.add('neg-btn-correct');
  wrongBtn.classList.add('neg-btn-dim');

  if (picked === correct) {
    _negChooseOk++;
    document.getElementById('neg-choose-correct').textContent = '✓ ' + _negChooseOk;
  } else {
    _negChooseWrong++;
    document.getElementById('neg-choose-wrong').textContent = '✗ ' + _negChooseWrong;
    const pickedBtn = picked === 'geen' ? geenBtn : nietBtn;
    pickedBtn.classList.remove('neg-btn-dim');
    pickedBtn.classList.add('neg-btn-wrong');
  }

  // Show rule
  const ruleEl = document.getElementById('neg-choose-rule');
  if (ruleEl) ruleEl.style.display = '';

  // Show correct sentence
  const s = _negChoosePool[_negChooseIdx];
  const sentEl = document.querySelector('.neg-sentence');
  if (sentEl) sentEl.innerHTML = s.nl.replace(/\b(niet|geen)\b/i, '<strong style="color:var(--primary)">$1</strong>');

  if (picked === correct) {
    setTimeout(() => { _negChooseIdx++; _renderNegChooseCard(); }, 1200);
  } else {
    // Show "Next" button so the student can study the mistake
    const btnsEl = document.querySelector('.neg-choose-btns');
    if (btnsEl) btnsEl.innerHTML += `<button class="btn btn-primary neg-next-btn" onclick="_negChooseIdx++; _renderNegChooseCard();">Next →</button>`;
  }
}

// --- Exercise 2: Waar staat niet? ---

let _negPlacePool = [], _negPlaceIdx = 0, _negPlaceOk = 0, _negPlaceWrong = 0;
let _negPlaceLocked = false, _negPlaceLevel = 'all';

function _buildNegPlacePool() {
  return sentences.filter(s =>
    s.gtopic === 'niet' && s.nl.includes('niet') &&
    (_negPlaceLevel === 'all' || s.level === _negPlaceLevel)
  );
}

function _renderNegPlaceLevels() {
  const wrap = document.getElementById('neg-place-levels');
  if (!wrap) return;
  const levels = ['all', 'A1', 'A2', 'B1', 'B2'];
  const labels = { all: 'All', A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2' };
  wrap.innerHTML = levels.map(lv => {
    const count = lv === 'all'
      ? sentences.filter(s => s.gtopic === 'niet' && s.nl.includes('niet')).length
      : sentences.filter(s => s.gtopic === 'niet' && s.nl.includes('niet') && s.level === lv).length;
    if (lv !== 'all' && count === 0) return '';
    return `<button class="filter-btn ${_negPlaceLevel === lv ? 'active' : ''}" onclick="_setNegPlaceLevel('${lv}', this)">${labels[lv]} <span class="badge-count">${count}</span></button>`;
  }).join('');
}

function _setNegPlaceLevel(lv, btn) {
  _negPlaceLevel = lv;
  document.querySelectorAll('#neg-place-levels .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  startNegPlace();
}

function startNegPlace() {
  _negPlacePool = _shuffleArray(_buildNegPlacePool());
  _negPlaceIdx = 0; _negPlaceOk = 0; _negPlaceWrong = 0; _negPlaceLocked = false;
  document.getElementById('neg-place-correct').textContent = '✓ 0';
  document.getElementById('neg-place-wrong').textContent = '✗ 0';
  _renderNegPlaceCard();
}

function _renderNegPlaceCard() {
  const wrap = document.getElementById('neg-place-content');
  _negPlaceLocked = false;

  if (_negPlaceIdx >= _negPlacePool.length) {
    const total = _negPlaceOk + _negPlaceWrong;
    const pct = total ? Math.round(_negPlaceOk / total * 100) : 0;
    wrap.innerHTML = `<div class="vquiz-done">
      <div class="vquiz-done-title">Done!</div>
      <div class="vquiz-done-score">${_negPlaceOk} / ${total} correct (${pct}%)</div>
      <button class="btn btn-primary" onclick="startNegPlace()">Again</button>
    </div>`;
    document.getElementById('neg-place-progress').textContent = total + ' / ' + _negPlacePool.length;
    return;
  }

  const s = _negPlacePool[_negPlaceIdx];
  // Remove 'niet' and split into words, track where 'niet' was
  const words = s.nl.split(/\s+/);
  const nietIdx = words.findIndex(w => w.toLowerCase().replace(/[.,!?;:]$/, '') === 'niet');
  const wordsWithout = words.filter((_, i) => i !== nietIdx);

  document.getElementById('neg-place-progress').textContent = (_negPlaceIdx + 1) + ' / ' + _negPlacePool.length;

  // Create slots between and around words where user can tap to insert 'niet'
  let html = `
    <div class="neg-card">
      <div class="neg-english">${s.en}</div>
      ${s.srule ? `<div class="neg-rule-hint" id="neg-place-rule" style="display:none"><strong>Rule:</strong> ${s.srule}</div>` : ''}
      <div class="neg-place-sentence" id="neg-place-slots">`;

  for (let i = 0; i <= wordsWithout.length; i++) {
    html += `<button class="neg-slot" onclick="_pickNegSlot(${i}, ${nietIdx})" data-slot="${i}">niet</button>`;
    if (i < wordsWithout.length) {
      html += `<span class="neg-word">${wordsWithout[i]}</span>`;
    }
  }

  html += `</div>
      <div class="neg-place-result" id="neg-place-result"></div>
    </div>`;
  wrap.innerHTML = html;
}

function _pickNegSlot(slotIdx, correctIdx) {
  if (_negPlaceLocked) return;
  _negPlaceLocked = true;

  const s = _negPlacePool[_negPlaceIdx];
  const words = s.nl.split(/\s+/);
  const wordsWithout = words.filter((_, i) => i !== correctIdx);

  // Insert 'niet' at chosen position
  const result = [...wordsWithout];
  result.splice(slotIdx, 0, 'niet');
  const userSentence = result.join(' ');

  // Normalize for comparison
  const norm = str => str.toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
  const isCorrect = norm(userSentence) === norm(s.nl);

  // Highlight slots
  document.querySelectorAll('.neg-slot').forEach(btn => {
    btn.disabled = true;
    btn.classList.add('neg-slot-dim');
  });

  const chosenSlot = document.querySelector(`[data-slot="${slotIdx}"]`);
  const correctSlot = document.querySelector(`[data-slot="${correctIdx}"]`);

  if (isCorrect) {
    chosenSlot.classList.remove('neg-slot-dim');
    chosenSlot.classList.add('neg-slot-correct');
    _negPlaceOk++;
    document.getElementById('neg-place-correct').textContent = '✓ ' + _negPlaceOk;
  } else {
    chosenSlot.classList.remove('neg-slot-dim');
    chosenSlot.classList.add('neg-slot-wrong');
    correctSlot.classList.remove('neg-slot-dim');
    correctSlot.classList.add('neg-slot-correct');
    _negPlaceWrong++;
    document.getElementById('neg-place-wrong').textContent = '✗ ' + _negPlaceWrong;
  }

  // Show correct sentence and rule
  document.getElementById('neg-place-result').innerHTML =
    `<div class="neg-correct-sentence">${s.nl.replace(/\b(niet)\b/i, '<strong style="color:var(--primary)">$1</strong>')}</div>`;
  const ruleEl = document.getElementById('neg-place-rule');
  if (ruleEl) ruleEl.style.display = '';

  if (isCorrect) {
    setTimeout(() => { _negPlaceIdx++; _renderNegPlaceCard(); }, 1200);
  } else {
    // Show "Next" button so the student can study the mistake
    document.getElementById('neg-place-result').innerHTML +=
      `<button class="btn btn-primary neg-next-btn" style="margin-top:12px" onclick="_negPlaceIdx++; _renderNegPlaceCard();">Next →</button>`;
  }
}

// Init both exercises when switching to ontkenning tab
function _initNegExercises() {
  _renderNegChooseLevels();
  _renderNegPlaceLevels();
  startNegChoose();
  startNegPlace();
}

// ─── DE / HET ─────────────────────────────────────────────────────────────────

// Build combined pool from vocabulary nouns + dehetWords (with grammar reasons)
const _dhPool = (function () {
  // Lookup by word for grammar reasons from dehetWords
  const dhLookup = {};
  dehetWords.forEach(w => { dhLookup[w.word.toLowerCase()] = w; });

  const seen = new Set();
  const pool = [];

  // Add all dehetWords first (they have grammar reasons)
  dehetWords.forEach(w => {
    seen.add(w.word.toLowerCase());
    pool.push(w);
  });

  // Add vocabulary nouns that have a clear single article
  vocabulary
    .filter(w => w.type === 'zn.' &&
      (w.nl.startsWith('de ') || w.nl.startsWith('het ')) &&
      !(w.nl.startsWith('de ') && w.nl.includes(' / het ')) &&
      !(w.nl.startsWith('het ') && w.nl.includes(' / de ')))
    .forEach(w => {
      const article = w.nl.startsWith('de ') ? 'de' : 'het';
      const word = w.nl.slice(article.length + 1).split(' / ')[0].trim();
      const key = word.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        pool.push({ word, article, level: w.level, en: w.en, topic: w.topic });
      }
    });

  return pool;
})();

let dhIdx = 0, dhCorrect = 0, dhWrong = 0;
let dhCurrentLevel = 'A1';
let dhOrder = [];
let dhUnitTopics = null; // null = filter by level only, array = filter by unit topics

function _dhBuildOrder() {
  let pool;
  if (dhUnitTopics && dhUnitTopics.length > 0) {
    // Unit active: only words whose topic matches the unit (vocab-derived words have topic)
    pool = _dhPool.filter(w => w.level === dhCurrentLevel && w.topic && dhUnitTopics.includes(w.topic));
    // If that gives nothing, fall back to level-only (e.g. unit has no matching nouns)
    if (pool.length === 0) pool = _dhPool.filter(w => w.level === dhCurrentLevel);
  } else {
    pool = dhCurrentLevel === 'all' ? _dhPool : _dhPool.filter(w => w.level === dhCurrentLevel);
  }
  dhOrder = [...pool].sort(() => Math.random() - 0.5);
  dhIdx = 0;
}

function _dhUpdateCounts() {
  const levels = ['A1', 'A2', 'B1', 'B2'];
  levels.forEach(l => {
    const n = _dhPool.filter(w => w.level === l).length;
    document.getElementById('dh-count-' + l).textContent = n + ' woorden';
  });
  document.getElementById('dh-count-all').textContent = _dhPool.length + ' woorden';
}

function setDeHetLevel(level, btn) {
  dhCurrentLevel = level;
  document.querySelectorAll('#dh-level-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  dhCorrect = 0;
  dhWrong = 0;
  document.getElementById('dh-correct').textContent = 0;
  document.getElementById('dh-wrong').textContent = 0;
  document.getElementById('dh-word-panel').style.display = '';
  document.getElementById('dh-done-panel').style.display = 'none';
  _dhBuildOrder();
  loadDeHet();
}

function _dhUpdateRemaining() {
  const rem = Math.max(0, dhOrder.length - dhIdx);
  const el = document.getElementById('dh-remaining');
  if (el) el.textContent = rem;
}

function loadDeHet() {
  if (dhOrder.length === 0) _dhBuildOrder();
  // Show completion screen when all words are done
  if (dhIdx >= dhOrder.length) {
    document.getElementById('dh-word-panel').style.display = 'none';
    const donePanel = document.getElementById('dh-done-panel');
    donePanel.style.display = '';
    const pct = dhCorrect + dhWrong > 0 ? Math.round(dhCorrect / (dhCorrect + dhWrong) * 100) : 0;
    document.getElementById('dh-done-stats').innerHTML =
      `<strong>${dhCorrect}</strong> correct &nbsp;·&nbsp; <strong>${dhWrong}</strong> fout &nbsp;·&nbsp; <strong>${pct}%</strong> score<br>
       <span style="font-size:0.8rem;color:var(--text-muted)">${dhOrder.length} woorden geoefend</span>`;
    // Show next-step or next-unit button
    const nextStepBtn = document.getElementById('dh-next-step-btn');
    if (nextStepBtn) {
      const next = activeUnit ? _nextStepInfo('dehet') : null;
      if (next) {
        nextStepBtn.style.display = '';
        nextStepBtn.textContent = 'Next: ' + next.label + ' →';
        nextStepBtn.onclick = function() { _goNextUnitStep('dehet'); };
      } else if (activeUnit) {
        const _nu = _getNextUnit(activeUnit.unit);
        if (_nu) {
          nextStepBtn.style.display = '';
          nextStepBtn.textContent = '✓ Done → Start Unit ' + _nu.unit + ' →';
          nextStepBtn.onclick = function() { setActiveUnit(_nu.unit); switchTab(_firstIncompleteTab(_nu) || 'grammatica'); };
        } else {
          nextStepBtn.style.display = 'none';
        }
      } else {
        nextStepBtn.style.display = 'none';
      }
    }
    _dhUpdateRemaining();
    return;
  }
  document.getElementById('dh-word-panel').style.display = '';
  document.getElementById('dh-done-panel').style.display = 'none';
  const w = dhOrder[dhIdx];
  document.getElementById('dh-noun').textContent = w.word;
  document.getElementById('dh-translation').textContent = w.en;
  document.getElementById('dh-feedback').textContent = '';
  document.getElementById('dh-feedback').className = 'dehet-feedback';
  document.getElementById('dh-de').className = 'dehet-btn';
  document.getElementById('dh-het').className = 'dehet-btn';
  document.getElementById('dh-de').disabled = false;
  document.getElementById('dh-het').disabled = false;
  document.getElementById('dh-next-btn').style.display = 'none';
  _dhUpdateRemaining();
}

function restartDeHet() {
  dhCorrect = 0;
  dhWrong = 0;
  document.getElementById('dh-correct').textContent = 0;
  document.getElementById('dh-wrong').textContent = 0;
  _dhBuildOrder(); // reshuffle
  loadDeHet();
}

function answerDeHet(choice) {
  const w = dhOrder[dhIdx];
  const correct = choice === w.article;
  document.getElementById('dh-de').disabled = true;
  document.getElementById('dh-het').disabled = true;
  const chosenBtn = document.getElementById('dh-' + choice);
  const correctBtn = document.getElementById('dh-' + w.article);
  const reasonHtml = w.reason
    ? `<div class="dh-reason">🇳🇱 ${w.reason}${w.reasonEn ? `<br>🇬🇧 ${w.reasonEn}` : ''}</div>`
    : '';
  if (correct) {
    chosenBtn.className = 'dehet-btn selected-correct';
    dhCorrect++;
    document.getElementById('dh-feedback').innerHTML = '✓ Correct! <strong>' + w.article + ' ' + w.word + '</strong>' + reasonHtml;
    document.getElementById('dh-feedback').className = 'dehet-feedback correct';
  } else {
    chosenBtn.className = 'dehet-btn selected-wrong';
    correctBtn.className = 'dehet-btn reveal-correct';
    dhWrong++;
    document.getElementById('dh-feedback').innerHTML = '✗ Fout. Het is: <strong>' + w.article + ' ' + w.word + '</strong>' + reasonHtml;
    document.getElementById('dh-feedback').className = 'dehet-feedback wrong';
  }
  document.getElementById('dh-correct').textContent = dhCorrect;
  document.getElementById('dh-wrong').textContent = dhWrong;
  document.getElementById('dh-next-btn').style.display = 'inline-flex';
}

function nextDeHet() {
  dhIdx++;
  // Auto-mark de/het done when the full unit set has been completed
  if (activeUnit && dhUnitTopics && dhIdx >= dhOrder.length) {
    markUnitExercise(activeUnit.unit, 'dehet');
  }
  loadDeHet(); // shows completion screen automatically when dhIdx >= dhOrder.length
}

// ─── EDIT SENTENCES ───────────────────────────────────────────────────────────

const SENTENCES_KEY = 'schrijfcoach_sentences';

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderEditTable() {
  document.getElementById('edit-tbody').innerHTML = sentences.map((raw, i) => {
    const s = resolveGrammar(raw);
    const enRule = s.stype ? (stypeEN[s.stype] || '') : '';
    return `
    <tr data-idx="${i}">
      <td><input class="edit-input" value="${escapeHtml(s.nl)}" data-field="nl" placeholder="Nederlandse zin..." /></td>
      <td><input class="edit-input" value="${escapeHtml(s.en)}" data-field="en" placeholder="English sentence..." /></td>
      <td>
        <select class="edit-select" data-field="level">
          <option ${s.level==='A1'?'selected':''}>A1</option>
          <option ${s.level==='A2'?'selected':''}>A2</option>
          <option ${s.level==='B1'?'selected':''}>B1</option>
        </select>
      </td>
      <td class="edit-grammar-cell">
        ${s.stype ? `<span class="stype-badge stype-${s.stype.toLowerCase().replace(/[^a-z]/g,'-')}">${s.stype}</span>` : ''}
        ${enRule ? `<div class="edit-grammar-rule">${enRule}</div>` : ''}
      </td>
      <td><button class="delete-row-btn" onclick="this.closest('tr').remove()" title="Verwijderen">✕</button></td>
    </tr>`;
  }).join('');
  document.getElementById('edit-count').textContent = sentences.length + ' zinnen';
}

function addEditRow() {
  const tbody = document.getElementById('edit-tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input class="edit-input" value="" data-field="nl" placeholder="Nederlandse zin..." /></td>
    <td><input class="edit-input" value="" data-field="en" placeholder="English sentence..." /></td>
    <td>
      <select class="edit-select" data-field="level">
        <option>A1</option><option>A2</option><option>B1</option>
      </select>
    </td>
    <td><button class="delete-row-btn" onclick="this.closest('tr').remove()" title="Verwijderen">✕</button></td>`;
  tbody.appendChild(tr);
  tr.querySelector('.edit-input').focus();
}

function saveEditedSentences() {
  const rows = document.querySelectorAll('#edit-tbody tr');
  const validLevels = ['A1', 'A2', 'B1', 'B2'];
  const updated = [];
  let skipped = 0;
  rows.forEach(row => {
    const nl    = row.querySelector('[data-field="nl"]').value.trim();
    const en    = row.querySelector('[data-field="en"]').value.trim();
    const level = row.querySelector('[data-field="level"]').value;
    if (!nl || !en) { skipped++; return; }
    if (!validLevels.includes(level)) { skipped++; return; }
    updated.push(_mergeGrammarMeta(nl, level, en));
  });
  if (updated.length === 0) { showToast('⚠ Geen zinnen om op te slaan.'); return; }
  if (skipped > 0) showToast('⚠ ' + skipped + ' onvolledige rij(en) overgeslagen.');
  sentences = updated;
  _lsSet(SENTENCES_KEY, JSON.stringify(sentences));
  renderSentences('all');
  updateSentenceCount();
  exIdx = 0; exScore = 0;
  renderEditTable();
  showToast('✓ ' + sentences.length + ' zinnen opgeslagen!');
}

function resetSentences() {
  if (!confirm('Wil je alle aanpassingen verwijderen en teruggaan naar de standaard zinnen?')) return;
  sentences = [...defaultSentences];
  _lsRemove(SENTENCES_KEY);
  renderEditTable();
  renderSentences('all');
  updateSentenceCount();
  exIdx = 0; exScore = 0;
  showToast('Standaard zinnen hersteld');
}

function exportSentences() {
  const json = JSON.stringify(sentences, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'schrijfcoach_zinnen.json'; a.click();
  URL.revokeObjectURL(url);
}

function updateSentenceCount() {
  const el = document.getElementById('sentence-count-badge');
  if (el) el.textContent = sentences.length + ' zinnen';
}

// ─── SAVE / LOAD PROGRESS ────────────────────────────────────────────────────

const STORAGE_KEY = 'schrijfcoach_progress';

function saveProgress() {
  // Also flush any unsaved edits from the Bewerken table
  _autoSaveEdits();
  // Always persist current sentences
  _lsSet(SENTENCES_KEY, JSON.stringify(sentences));
  const data = {
    exIdx, exScore,
    dhCorrect, dhWrong,
    currentVerb,
    exMode,
    savedAt: new Date().toISOString(),
  };
  _lsSet(STORAGE_KEY, JSON.stringify(data));
  showToast('✓ Voortgang opgeslagen!');
  updateSaveDate(data.savedAt);
  const btn = document.getElementById('save-btn');
  btn.classList.add('saved');
  setTimeout(() => btn.classList.remove('saved'), 1500);
}

function _updateAccountability() {
  const pool      = _buildPool();
  const practiced = pool.filter(s => { const st = sentenceStats[s.nl]; return st && (st.c + st.w) > 0; }).length;
  const remaining = activeSentences.length - exIdx; // matches the session counter
  const errors    = pool.filter(s => { const st = sentenceStats[s.nl]; return st && st.w > st.c; }).length;
  const p = document.getElementById('ex-acc-practiced');
  const r = document.getElementById('ex-acc-remaining');
  const e = document.getElementById('ex-acc-errors');
  if (p) p.textContent = practiced + ' geoefend';
  if (r) r.textContent = remaining + ' resterend';
  if (e) { e.textContent = errors + ' fouten'; e.style.color = errors > 0 ? 'var(--accent)' : 'var(--text-muted)'; }
}

function _autoSaveIdx() {
  try {
    const raw = _lsGet(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data.exIdx = exIdx;
    data.exScore = exScore;
    data.exMode = exMode;
    _lsSet(STORAGE_KEY, JSON.stringify(data));
  } catch(e) {}
}

function loadProgress() {
  const raw = _lsGet(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    exIdx        = data.exIdx        ?? 0;
    exScore      = data.exScore      ?? 0;
    dhCorrect    = data.dhCorrect    ?? 0;
    dhWrong      = data.dhWrong      ?? 0;
    currentVerb  = data.currentVerb  ?? 0;
    if (data.exMode) {
      exMode = data.exMode;
      document.querySelectorAll('.ex-mode-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.mode === exMode));
    }
    if (data.savedAt) updateSaveDate(data.savedAt);
  } catch (e) { /* ignore corrupt data */ }
}

function updateSaveDate(iso) {
  const el = document.getElementById('save-date');
  if (!el) return;
  const d = new Date(iso);
  el.textContent = 'Opgeslagen: ' + d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
    + ' ' + d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ─── UNIT STEP NAVIGATION ──────────────────────────────────────────────────────

const _TYPE_TO_TAB = {
  grammatica:   'grammatica',
  zinnen:       'oefening',
  werkwoorden:  'werkwoorden',
  woordenschat: 'woordenschat',
  dehet:        'dehet',
};
const _TAB_TO_TYPE = {
  grammatica:   'grammatica',
  oefening:     'zinnen',
  werkwoorden:  'werkwoorden',
  woordenschat: 'woordenschat',
  dehet:        'dehet',
};
const _STEP_LABELS = {
  grammatica:   'Grammar',
  zinnen:       'Sentences',
  werkwoorden:  'Verbs',
  woordenschat: 'Vocabulary',
  dehet:        'De / Het',
};

// Returns ordered unique step types for any unit object
function _unitStepsFor(unit) {
  if (!unit) return [];
  const seen = new Set();
  return (unit.activities || [])
    .map(a => a.type)
    .filter(t => _TYPE_TO_TAB[t] && !seen.has(t) && seen.add(t));
}

// Returns ordered unique steps for the active unit (from activities list)
function _unitSteps() { return _unitStepsFor(activeUnit); }

// Returns the tab for the first incomplete step in a unit
function _firstIncompleteTab(unit) {
  if (!unit) return null;
  const prog = unitProgress[unit.unit] || {};
  const typeToProgKey = { zinnen: 'sentences', werkwoorden: 'werkwoorden', woordenschat: 'vocab', dehet: 'dehet' };
  for (const type of _unitStepsFor(unit)) {
    if (type === 'grammatica') {
      const allRead = (unit.grammarTopics || []).every(id => grammarReadData[id]);
      if (!allRead) return 'grammatica';
    } else {
      const progKey = typeToProgKey[type];
      if (progKey && !prog[progKey]) return _TYPE_TO_TAB[type];
    }
  }
  return null; // all done
}

// Returns { label, tab } for the next step after fromTab, or null if last step
function _nextStepInfo(fromTab) {
  const steps = _unitSteps();
  const currentType = _TAB_TO_TYPE[fromTab];
  const idx = steps.indexOf(currentType);
  const nextType = steps[idx + 1];
  if (!nextType) return null;
  return { label: _STEP_LABELS[nextType] || nextType, tab: _TYPE_TO_TAB[nextType] };
}

// Returns the next unit object after the given unit number, or null
function _getNextUnit(unitNum) {
  const all = _allUnits();
  const idx = all.findIndex(u => u.unit === unitNum);
  return (idx >= 0 && idx < all.length - 1) ? all[idx + 1] : null;
}

// Navigate to the next step, or advance to next unit if all done
function _goNextUnitStep(fromTab) {
  const next = _nextStepInfo(fromTab);
  if (next) {
    if (activeUnit) _saveLastPosition(activeUnit.unit, next.tab);
    switchTab(next.tab);
  } else if (activeUnit) {
    // All steps done — advance to next unit
    const nextUnit = _getNextUnit(activeUnit.unit);
    if (nextUnit) {
      setActiveUnit(nextUnit.unit);
      const firstTab = _firstIncompleteTab(nextUnit) || 'grammatica';
      switchTab(firstTab);
      showToast('✓ Unit ' + (nextUnit.unit - 1) + ' afgerond! · Starting Unit ' + nextUnit.unit);
    } else {
      switchTab('leerplan');
      showToast('✓ Alle units afgerond!');
    }
  } else {
    switchTab('leerplan');
  }
}

// ─── GRAMMAR PROGRESS TRACKING ─────────────────────────────────────────────────

function markGrammarTopicRead(id) {
  grammarReadData[id] = true;
  _lsSet(GRAMMAR_READ_KEY, JSON.stringify(grammarReadData));
  // Update the button in place
  const btn = document.querySelector(`[data-gtread="${id}"]`);
  if (btn) {
    btn.textContent = '✓ Studied';
    btn.classList.add('gt-read-done');
    btn.disabled = true;
  }
  // Update home stat
  _updateHomeGrammarStat();
  // Navigate to next step in the unit (or lesson plan if no unit active / last step)
  setTimeout(() => _goNextUnitStep('grammatica'), 600);
}

function _updateHomeGrammarStat() {
  if (typeof grammarTopicsData === 'undefined') return;
  const total = grammarTopicsData.length;
  const read = grammarTopicsData.filter(t => grammarReadData[t.id]).length;
  const errCount = _totalGrammarErrors();
  let stat = read + '/' + total + ' geleerd';
  if (errCount > 0) stat += ' · ' + errCount + ' fout';
  _setStat('home-stat-grammatica', stat);
}

function _totalGrammarErrors() {
  return sentences.filter(s => { const st = sentenceStats[s.nl]; return st && st.w > st.c; }).length;
}

// Returns error count for sentences matching a grammar topic filter/id
function _grammarTopicErrors(topic) {
  const filterKey = topic.filter || topic.id;
  const matcher = exGrammarMap[filterKey] || (s => s.gtopic === filterKey || s.gtopic === topic.id);
  const pool = sentences.filter(matcher);
  return pool.reduce((n, s) => {
    const st = sentenceStats[s.nl];
    return n + (st && st.w > st.c ? 1 : 0);
  }, 0);
}

// Jump to oefening tab in errors mode filtered to a grammar topic
function practiceGrammarErrors(topicFilter) {
  exGrammar = topicFilter || 'all';
  exMode = 'errors';
  switchTab('oefening');
  // Activate the matching grammar filter button if it exists
  setTimeout(() => {
    document.querySelectorAll('.ex-mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === 'errors'));
    const grammarBtns = document.querySelectorAll('#ex-grammar-filter .filter-btn');
    grammarBtns.forEach(b => b.classList.toggle('active', b.dataset.grammar === topicFilter));
    rebuildActive();
    exIdx = 0;
    loadSentence();
  }, 50);
}

// ─── GRAMMAR TOPICS A1–B2 ──────────────────────────────────────────────────────

function _renderGtCard(topic) {
  const levelClass = 'level-' + topic.level.toLowerCase();
  const allTables = [...(topic.tables || []), ...(topic.extraTables || [])];
  const tablesHtml = allTables.map(tbl => `
    <div class="gt-table-wrap">
      <div class="gt-table-heading">${tbl.headingEn || tbl.heading}</div>
      <table class="gt-table">
        <thead><tr>${(tbl.colsEn || tbl.cols).map(c => `<th>${c}</th>`).join('')}</tr></thead>
        <tbody>${tbl.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>`).join('');
  const rulesHtml = (topic.rules || []).map(r => `
    <div class="gt-rule">
      <span class="gt-rule-en">${r.en}</span>
    </div>`).join('');
  const examplesHtml = (topic.examples || []).map(ex => `
    <div class="gt-example">
      <span class="gt-ex-nl">${ex.nl}</span>
      <span class="gt-ex-en">${ex.en}</span>
      ${ex.note ? `<span class="gt-ex-note">${ex.note}</span>` : ''}
    </div>`).join('');
  const isRead = !!grammarReadData[topic.id];
  const readBtn = `<button class="gt-read-btn${isRead ? ' gt-read-done' : ''}" data-gtread="${topic.id}"
    onclick="markGrammarTopicRead('${topic.id}')"${isRead ? ' disabled' : ''}>
    ${isRead ? '✓ Studied' : 'Mark as studied'}
  </button>`;
  const errCount = _grammarTopicErrors(topic);
  const filterKey = topic.filter || topic.id;
  const practiceBtn = exGrammarMap[filterKey]
    ? `<button class="gt-practice-btn${errCount > 0 ? ' gt-practice-errors' : ''}"
        onclick="practiceGrammarErrors('${filterKey}')">
        ${errCount > 0 ? `Practice mistakes (${errCount})` : 'Practice sentences'}
      </button>`
    : '';
  return `
    <div class="gt-card gt-topic-block" data-gtlevel="${topic.level}" data-gtfilter="${topic.filter}" data-pill="${topic.id}">
      <div class="gt-card-header">
        <span class="level-badge ${levelClass}">${topic.level}</span>
        <span class="gt-title">${topic.title}</span>
        <span class="gt-title-en">${topic.titleEn}</span>
        <div class="gt-card-actions">${readBtn}${practiceBtn}</div>
      </div>
      <div class="gt-card-body">
        <div class="gt-intro-en">${topic.introEn || topic.intro}</div>
        ${tablesHtml}
        ${rulesHtml ? `<div class="gt-rules">${rulesHtml}</div>` : ''}
        ${examplesHtml ? `<div class="gt-examples"><div class="gt-examples-label">Examples</div>${examplesHtml}</div>` : ''}
        ${topic.tip ? `<div class="gt-tip"><span class="gt-tip-en">${topic.tipEn || topic.tip}</span></div>` : ''}
      </div>
    </div>`;
}

function filterGrammarLevel(level, btn) {
  document.querySelectorAll('#gt-level-filter .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // Reset all topic blocks to visible
  document.querySelectorAll('.gt-topic-block').forEach(b => b.style.display = '');
  // Show/hide level sections
  document.querySelectorAll('.gt-level-section').forEach(sec => {
    sec.style.display = (level === 'all' || sec.dataset.gtlevel === level) ? '' : 'none';
  });
  // Build sub-topic filter row
  const subRow = document.getElementById('gt-subtopic-filter');
  if (!subRow) return;
  if (level === 'all') { subRow.style.display = 'none'; subRow.innerHTML = ''; return; }
  const topics = _getTopicsForLevel(level);
  subRow.style.display = '';
  subRow.innerHTML = topics.map(t =>
    `<button class="filter-btn" data-subtopic="${t.key}" onclick="filterGrammarSubtopic('${t.key}',this)">${t.label}</button>`
  ).join('');
}

function _getTopicsForLevel(level) {
  const topics = [];
  if (level === 'A1') {
    topics.push(
      { key: 'zinsstructuur', label: 'Zinsstructuur' },
      { key: 'dehet',         label: 'De / Het' },
      { key: 'vervoeging',    label: 'Vervoeging' },
      { key: 'tijden',        label: 'Tijden' }
    );
  }
  if (typeof grammarTopicsData !== 'undefined') {
    grammarTopicsData.filter(t => t.level === level).forEach(t => {
      topics.push({ key: t.id, label: t.title });
    });
  }
  return topics;
}

function filterGrammarSubtopic(key, btn) {
  document.querySelectorAll('#gt-subtopic-filter .filter-btn').forEach(b => b.classList.remove('active'));
  const isActive = btn.dataset.subtopic === key && btn.classList.contains('active');
  if (isActive) {
    // Toggle off — show all blocks
    document.querySelectorAll('.gt-topic-block').forEach(b => b.style.display = '');
  } else {
    btn.classList.add('active');
    document.querySelectorAll('.gt-topic-block').forEach(b => {
      b.style.display = b.dataset.pill === key ? '' : 'none';
    });
  }
}

function navigateToGrammarTopic(level, topicKey) {
  switchTab('grammatica');
  const levelBtn = document.querySelector(`#gt-level-filter [data-gtlevel="${level}"]`);
  filterGrammarLevel(level, levelBtn);
  const subtopicBtn = document.querySelector(`#gt-subtopic-filter [data-subtopic="${topicKey}"]`);
  if (subtopicBtn) filterGrammarSubtopic(topicKey, subtopicBtn);
  document.getElementById('grammar-content')?.scrollIntoView({ behavior:'smooth', block:'start' });
}

// ─── UNIT FILTER ──────────────────────────────────────────────────────────────

let activeUnit = null; // null or {unit, level, title, grammarTopics, verbFocus, vocabTopics, sentenceFilter}

function _allUnits() {
  if (typeof lessonPlanData === 'undefined') return [];
  return lessonPlanData.levels.flatMap(lv =>
    lv.units.map(u => ({ ...u, level: lv.level }))
  );
}

function setActiveUnit(unitNumber) {
  const all = _allUnits();
  activeUnit = all.find(u => u.unit === unitNumber) || null;
  if (activeUnit) {
    _applyUnitFilters();
    // Determine and save the first incomplete step for this unit
    const firstTab = _firstIncompleteTab(activeUnit);
    _saveLastPosition(unitNumber, firstTab || 'grammatica');
  }
  renderAllUnitBars();
}

function clearActiveUnit() {
  activeUnit = null;
  vocabUnitTopics = null;
  vocabUnitLevel = null;
  dhUnitTopics = null;
  verbUnitRange = null;
  vquizFilter = 'all';
  renderAllUnitBars();
  renderVocab();
  _filterVerbs();
}

function _applyUnitFilters() {
  if (!activeUnit) return;
  const u = activeUnit;

  // Zinnen oefenen: level + sentenceFilter
  const levelBtn = document.querySelector(`#ex-level-filter [data-level="${u.level}"]`);
  if (levelBtn) filterExLevel(u.level, levelBtn);
  setTimeout(() => {
    const sf = u.sentenceFilter || 'all';
    const gramBtn = document.querySelector(`#ex-grammar-filter [data-grammar="${sf}"]`);
    if (gramBtn) filterExGrammar(sf, gramBtn);
  }, 50);

  // De/Het: filter by unit topics + level
  dhCurrentLevel = u.level;
  dhUnitTopics = (u.vocabTopics && u.vocabTopics.length > 0) ? u.vocabTopics.map(vt => vt.topic) : null;
  dhCorrect = 0; dhWrong = 0;
  document.getElementById('dh-correct').textContent = 0;
  document.getElementById('dh-wrong').textContent = 0;
  _dhBuildOrder();
  loadDeHet();

  // Woordenschat: filter by all vocabTopics for this unit
  if (u.vocabTopics && u.vocabTopics.length > 0) {
    vocabUnitTopics = u.vocabTopics.map(vt => vt.topic);
    vocabUnitLevel = u.level;
  } else {
    vocabUnitTopics = null;
    vocabUnitLevel = null;
  }
  renderVocab();

  // Grammatica: filter to unit's level
  const glBtn = document.querySelector(`#gt-level-filter [data-gtlevel="${u.level}"]`);
  if (glBtn) filterGrammarLevel(u.level, glBtn);

  // Werkwoorden: filter verb selector and quiz to unit's verbRange
  if (u.verbRange) {
    verbUnitRange = u.verbRange;
    vquizFilter = 'unit-' + u.unit;
  } else {
    verbUnitRange = null;
    vquizFilter = 'all';
  }
  _filterVerbs();
}

function renderUnitBar(panelId) {
  const container = document.getElementById('unit-bar-' + panelId);
  if (!container) return;
  const all = _allUnits();
  const levelNames = { A1: 'Beginner', A2: 'Elementair', B1: 'Gemiddeld', B2: 'Gevorderd' };

  if (activeUnit) {
    const u = activeUnit;
    let extraHtml = '';
    if (panelId === 'werkwoorden') {
      const verbCount = u.verbRange ? (u.verbRange[1] - u.verbRange[0] + 1) : 0;
      extraHtml = `<span class="unit-bar-count">${verbCount} werkwoorden te oefenen</span>`;
      if (u.verbFocus && u.verbFocus.length && u.verbFocus[0] !== 'alle werkwoorden herhalen') {
        extraHtml += `<span class="unit-bar-verbs">${u.verbFocus.map(v =>
          `<span class="lp-tag lp-tag-verb lp-tag-link" onclick="navigateToVerb('${v}')">${v}</span>`
        ).join('')}</span>`;
      }
    }
    if (panelId === 'woordenschat' && vocabUnitTopics) {
      const wordCount = _getVocabList().length;
      extraHtml = `<span class="unit-bar-count">${wordCount} woorden te oefenen</span>`;
    }
    if (panelId === 'dehet' && dhUnitTopics) {
      const dhCount = dhOrder.length || 0;
      extraHtml = `<span class="unit-bar-count">${dhCount} woorden</span>`;
    }
    const prog = unitProgress[u.unit] || {};
    const exTypes = [
      { key: 'vocab',      label: 'Woorden'     },
      { key: 'dehet',      label: 'De / Het'    },
      { key: 'sentences',  label: 'Zinnen'      },
      { key: 'werkwoorden',label: 'Werkwoorden' },
    ];
    const progressRow = exTypes.map(ex => {
      const done = !!prog[ex.key];
      return `<span class="up-item ${done ? 'up-done' : 'up-todo'}"
        onclick="markUnitExercise(${u.unit},'${ex.key}',${!done})"
        title="${done ? 'Klik om te resetten' : 'Klik om af te vinken'}"
      >${done ? '✓' : '○'} ${ex.label}</span>`;
    }).join('');
    const doneCount = exTypes.filter(ex => !!prog[ex.key]).length;
    // Step navigation
    const steps = _unitSteps();
    const currentType = _TAB_TO_TYPE[panelId] || null;
    const stepIdx = steps.indexOf(currentType);
    const stepCount = steps.length;
    const stepLabel = stepIdx >= 0
      ? `<span class="unit-bar-step">Step ${stepIdx + 1} of ${stepCount}: <strong>${_STEP_LABELS[currentType] || currentType}</strong></span>`
      : '';
    const nextInfo = currentType ? _nextStepInfo(panelId) : (steps.length ? { label: _STEP_LABELS[steps[0]], tab: _TYPE_TO_TAB[steps[0]] } : null);
    const nextBtn = nextInfo
      ? `<button class="unit-bar-next-btn" onclick="_goNextUnitStep('${panelId}')">Next: ${nextInfo.label} →</button>`
      : (currentType ? (() => {
          const _nu = _getNextUnit(u.unit);
          return _nu
            ? `<button class="unit-bar-next-btn unit-bar-next-btn--done" onclick="setActiveUnit(${_nu.unit}); switchTab('${_firstIncompleteTab(_nu) || 'grammatica'}')">✓ Done → Unit ${_nu.unit}</button>`
            : `<button class="unit-bar-next-btn unit-bar-next-btn--done" onclick="switchTab('leerplan')">✓ All done!</button>`;
        })() : '');

    container.innerHTML = `<div class="unit-bar unit-bar--active">
      <span class="unit-bar-chip unit-bar-chip--${u.level.toLowerCase()}">Unit ${u.unit} · ${u.level}</span>
      <span class="unit-bar-title">${u.title}</span>
      ${stepLabel}
      ${extraHtml}
      ${nextBtn}
      <button class="unit-bar-clear" onclick="clearActiveUnit()">✕</button>
      <div class="unit-bar-progress-row">
        <span class="up-label">Voortgang:</span>
        ${progressRow}
        <span class="up-count">${doneCount}/4</span>
        ${doneCount > 0 ? `<button class="up-reset-btn" onclick="resetUnitProgress(${u.unit})">↺ Reset</button>` : ''}
      </div>
    </div>`;
  } else {
    let opts = '<option value="">Kies een unit…</option>';
    all.forEach(u => {
      opts += `<option value="${u.unit}">Unit ${u.unit}: ${u.title} (${u.level})</option>`;
    });
    container.innerHTML = `<div class="unit-bar unit-bar--inactive">
      <span class="unit-bar-label">🎯 Kies een unit:</span>
      <select class="unit-bar-select" onchange="if(this.value) setActiveUnit(parseInt(this.value)); this.value='';">
        ${opts}
      </select>
    </div>`;
  }
}

function renderAllUnitBars() {
  ['oefening', 'dehet', 'woordenschat', 'werkwoorden', 'grammatica'].forEach(renderUnitBar);
}

// ─── LESSON PLAN NAVIGATION ───────────────────────────────────────────────────

function navigateToVocab(level, topic) {
  switchTab('woordenschat');
  // set level
  const levelBtn = document.querySelector(`#vocab-level-filters [data-level="${level}"]`);
  if (levelBtn) setVocabLevel(level, levelBtn);
  // set topic (after a tick so vocab renders first)
  setTimeout(() => {
    const topicBtn = document.querySelector(`#vocab-topic-filters [data-vtopic="${topic}"]`);
    if (topicBtn) setVocabTopic(topic, topicBtn);
    document.getElementById('panel-woordenschat')?.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 50);
}

function navigateToVerb(verbName) {
  switchTab('werkwoorden');
  setTimeout(() => {
    const chips = document.querySelectorAll('.verb-chip');
    chips.forEach(chip => {
      if (chip.textContent.trim().toLowerCase() === verbName.toLowerCase()) {
        chip.click();
        chip.scrollIntoView({ behavior:'smooth', block:'center' });
      }
    });
  }, 50);
}

function navigateToOefening(level, grammarFilter) {
  switchTab('oefening');
  setTimeout(() => {
    if (level && level !== 'all') {
      const levelBtn = document.querySelector(`#ex-level-filter [data-level="${level}"]`);
      if (levelBtn) filterExLevel(level, levelBtn);
    }
    if (grammarFilter && grammarFilter !== 'all') {
      const gramBtn = document.querySelector(`#ex-grammar-filter [data-grammar="${grammarFilter}"]`);
      if (gramBtn) filterExGrammar(grammarFilter, gramBtn);
    }
    document.getElementById('panel-oefening')?.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 50);
}

// ─── LESSON PLAN ──────────────────────────────────────────────────────────────

function renderLessonPlan() {
  const container = document.getElementById('leerplan-content');
  if (!container || typeof lessonPlanData === 'undefined') return;
  const d = lessonPlanData;

  // Build grammar topic title lookup (filter-id → human title)
  const gtLookup = {};
  if (typeof grammarTopicsData !== 'undefined') {
    grammarTopicsData.forEach(t => { gtLookup[t.id] = t.title; });
  }

  // Vocab topic labels (same as in renderVocab)
  const topicLabels = {
    begroeting:'Begroeting', familie:'Familie', eten:'Eten & drinken', huis:'Huis & interieur',
    vervoer:'Vervoer', lichaam:'Lichaam', kleding:'Kleding', kleuren:'Kleuren', tijd:'Tijd',
    dieren:'Dieren', weer:'Weer', sport:'Sport', vraagwoorden:'Vraagwoorden',
    werkwoorden:'Werkwoorden', dagelijks:'Dagelijks leven', natuur:'Natuur',
    onderwijs:'Onderwijs', werk:'Werk', geld:'Geld', gezondheid:'Gezondheid',
    communicatie:'Communicatie', reizen:'Reizen', bijvoeglijk:'Bijvoeglijk nw.',
    verbinders:'Verbinders', verbindingswoorden:'Verbindingswoorden',
    karakter:'Karakter', hobby:'Hobby\'s', winkelen:'Winkelen', technologie:'Technologie',
    media:'Media', samenleving:'Samenleving', politiek:'Politiek', milieu:'Milieu',
    gevoelens:'Gevoelens', relaties:'Relaties', psychologie:'Psychologie',
    uitdrukkingen:'Uitdrukkingen', collocaties:'Collocaties', woordfamilie:'Woordfamilie',
    abstract:'Abstracte woorden', economie:'Economie', financiën:'Financiën',
    recht:'Recht', wetenschap:'Wetenschap', toerisme:'Toerisme', cultuur:'Cultuur',
    wonen:'Wonen', bijwoord:'Bijwoorden', academisch:'Academisch', architectuur:'Architectuur',
    woordfamilie:'Woordfamilies', tijd:'Tijd', landbouw:'Landbouw',
    filosofie:'Filosofie & ethiek', schrijven:'Schrijven & retorica',
    taal:'Taal & literatuur', idiomen:'Idiomen', formeel:'Formeel register',
    persoonlijkheid:'Persoonlijkheid', voorzetsels:'Voorzetsels', sport:'Sport'
  };

  const actIcons = { grammatica:'📐', werkwoorden:'🔤', dehet:'📖', zinnen:'✏️', woordenschat:'⭐' };
  const levelEnNames = { A1:'Beginner', A2:'Elementary', B1:'Intermediate', B2:'Upper-intermediate', C1:'Advanced', C2:'Mastery' };

  const grammarFilterLabels = {
    niet:'niet & geen', geen:'niet & geen', inversie:'Inversie', vraagzin:'Vraagzinnen',
    bijzin:'Bijzinnen', gebiedende:'Gebiedende wijs', tijden:'Tijden', omte:'om…te', passief:'Passief'
  };

  container.innerHTML = `
    <p class="lp-intro">${d.intro}</p>
    <p class="lp-intro-en">${d.introEn}</p>
    <div class="lp-sessions">
      ${d.levels.map((lv, li) => {
        const sn = li + 1;
        const sessionTopics = _getTopicsForLevel(lv.level);
        return `
        <div class="lp-session" style="--lp-color:${lv.color}">
          <div class="lp-session-header">
            <span class="lp-session-num">Session ${sn}</span>
            <span class="level-badge level-${lv.level.toLowerCase()}">${lv.level}</span>
            <span class="lp-session-title">${lv.title} · ${levelEnNames[lv.level]}</span>
            <span class="lp-session-duration">${lv.duration} · ${lv.durationEn}</span>
          </div>
          <div class="lp-session-nav">
            ${sessionTopics.map(t =>
              `<button class="lp-nav-pill" onclick="navigateToGrammarTopic('${lv.level}','${t.key}')">${t.label}</button>`
            ).join('')}
          </div>
          <div class="lp-topics">
            ${lv.units.map((unit, ui) => {
              const tn = ui + 1;
              let sub = 0;

              const grammarRows = unit.grammarTopics && unit.grammarTopics.length
                ? unit.grammarTopics.map(t => {
                    sub++;
                    return `<div class="lp-subtopic">
                      <span class="lp-sub-num">${tn}.${sub}</span>
                      <span class="lp-sub-icon">📐</span>
                      <div class="lp-sub-content">
                        <span class="lp-sub-label">Grammatica</span>
                        <span class="lp-tag lp-tag-grammar lp-tag-link"
                          onclick="navigateToGrammarTopic('${lv.level}','${t}')"
                          title="Open in Grammatica">${gtLookup[t] || t} ↗</span>
                      </div>
                    </div>`;
                  }).join('') : '';

              const verbRow = unit.verbFocus && unit.verbFocus.length
                ? (sub++, `<div class="lp-subtopic">
                    <span class="lp-sub-num">${tn}.${sub}</span>
                    <span class="lp-sub-icon">🔤</span>
                    <div class="lp-sub-content">
                      <span class="lp-sub-label">Werkwoorden oefenen</span>
                      <div class="lp-tags">${unit.verbFocus.map(v =>
                        `<span class="lp-tag lp-tag-verb lp-tag-link"
                          onclick="navigateToVerb('${v}')"
                          title="Open in Werkwoorden">${v} ↗</span>`).join('')}</div>
                    </div>
                  </div>`) : '';

              const vocabRow = unit.vocabTopics && unit.vocabTopics.length
                ? (sub++, `<div class="lp-subtopic">
                    <span class="lp-sub-num">${tn}.${sub}</span>
                    <span class="lp-sub-icon">⭐</span>
                    <div class="lp-sub-content">
                      <span class="lp-sub-label">Woordenschat</span>
                      <div class="lp-tags">${unit.vocabTopics.map(vt =>
                        `<span class="lp-tag lp-tag-vocab lp-tag-link"
                          onclick="navigateToVocab('${vt.level}','${vt.topic}')"
                          title="Open in Woordenschat">${topicLabels[vt.topic] || vt.topic} (${vt.level}) ↗</span>`
                      ).join('')}</div>
                    </div>
                  </div>`) : '';

              const sentenceRow = unit.sentenceFilter
                ? (sub++, `<div class="lp-subtopic">
                    <span class="lp-sub-num">${tn}.${sub}</span>
                    <span class="lp-sub-icon">✏️</span>
                    <div class="lp-sub-content">
                      <span class="lp-sub-label">Zinnen oefenen</span>
                      <span class="lp-tag lp-tag-zinnen lp-tag-link"
                        onclick="navigateToOefening('${lv.level}','${unit.sentenceFilter}')"
                        title="Open in Zinnen oefenen">
                        ${lv.level} zinnen${unit.sentenceFilter !== 'all' ? ' · ' + (grammarFilterLabels[unit.sentenceFilter] || unit.sentenceFilter) : ''} ↗
                      </span>
                    </div>
                  </div>`) : '';

              const readingRow = (unit.readingTexts && unit.readingTexts.length)
                ? (() => {
                    sub++;
                    const textLinks = unit.readingTexts.map(id => {
                      const txt = (typeof readingTexts !== 'undefined') ? readingTexts.find(t => t.id === id) : null;
                      if (!txt) return '';
                      return `<span class="lp-tag lp-tag-lezen lp-tag-link"
                        onclick="navigateToReadingText('${id}')"
                        title="Open leestekst">${txt.topicEmoji || '📖'} ${txt.title} ↗</span>`;
                    }).filter(Boolean).join('');
                    return `<div class="lp-subtopic">
                      <span class="lp-sub-num">${tn}.${sub}</span>
                      <span class="lp-sub-icon">📚</span>
                      <div class="lp-sub-content">
                        <span class="lp-sub-label">Lezen (${unit.readingTexts.length} teksten)</span>
                        <div class="lp-tags">${textLinks}</div>
                      </div>
                    </div>`;
                  })() : '';

              const dehetRow = (sub++, `<div class="lp-subtopic">
                  <span class="lp-sub-num">${tn}.${sub}</span>
                  <span class="lp-sub-icon">📖</span>
                  <div class="lp-sub-content">
                    <span class="lp-sub-label">De / Het oefenen</span>
                    <span class="lp-tag lp-tag-dehet lp-tag-link"
                      onclick="setDeHetLevel('${lv.level}', document.querySelector('[data-dhlevel=\\'${lv.level}\\']')); switchTab('dehet');"
                      title="Open De/Het voor niveau ${lv.level}">
                      De/Het · ${lv.level} woorden ↗
                    </span>
                  </div>
                </div>`);

              const goalsRow = unit.goals && unit.goals.length
                ? (sub++, `<div class="lp-subtopic lp-subtopic-col">
                    <div class="lp-subtopic-head">
                      <span class="lp-sub-num">${tn}.${sub}</span>
                      <span class="lp-sub-icon">🎯</span>
                      <span class="lp-sub-label">Doelen · Goals</span>
                    </div>
                    <ul class="lp-goals">
                      ${unit.goals.map((g, gi) => `
                      <li class="lp-goal">
                        <span class="lp-goal-nl">${g}</span>
                        ${unit.goalsEn?.[gi] ? `<span class="lp-goal-en">${unit.goalsEn[gi]}</span>` : ''}
                      </li>`).join('')}
                    </ul>
                  </div>`) : '';

              const isCurrent = lastStudyPosition && lastStudyPosition.unit === unit.unit;
              const allDoneUnit = !_firstIncompleteTab({ ...unit, level: lv.level });
              const nextTabForUnit = isCurrent ? (_firstIncompleteTab({ ...unit, level: lv.level }) || lastStudyPosition.tab) : null;
              const nextStepLabelForUnit = nextTabForUnit ? (_STEP_LABELS[_TAB_TO_TYPE[nextTabForUnit]] || nextTabForUnit) : null;
              const _nextU = allDoneUnit ? _getNextUnit(unit.unit) : null;

              return `
              <div class="lp-topic${isCurrent ? ' lp-topic--current' : ''}${allDoneUnit ? ' lp-topic--done' : ''}" id="lp-unit-${unit.unit}">
                ${isCurrent && allDoneUnit && _nextU ? `<div class="lp-current-marker lp-current-marker--done">✓ Unit ${unit.unit} afgerond! <button class="btn btn-primary" style="margin-left:8px;padding:4px 12px;font-size:0.78rem" onclick="setActiveUnit(${_nextU.unit}); switchTab('${_firstIncompleteTab(_nextU) || 'grammatica'}')">Start Unit ${_nextU.unit}: ${_nextU.title} →</button></div>`
                : isCurrent ? `<div class="lp-current-marker">${allDoneUnit ? '✓ Completed' : '▶ You are here — Next: ' + nextStepLabelForUnit}</div>` : ''}
                <div class="lp-topic-header">
                  <span class="lp-topic-num">Unit ${unit.unit}</span>
                  <div class="lp-topic-titles">
                    <span class="lp-topic-title">${unit.title}</span>
                    <span class="lp-topic-title-en">${unit.titleEn}</span>
                  </div>
                  <span class="lp-topic-weeks">${unit.weeks}</span>
                  ${(() => {
                    const p = unitProgress[unit.unit] || {};
                    const n = ['vocab','dehet','sentences','werkwoorden'].filter(k => p[k]).length;
                    return n > 0
                      ? `<span class="lp-progress-badge ${n === 4 ? 'lp-progress-full' : ''}">${n}/4</span>`
                      : '';
                  })()}
                  ${isCurrent && allDoneUnit && _nextU
                    ? `<button class="lp-unit-continue-btn" onclick="setActiveUnit(${_nextU.unit}); switchTab('${_firstIncompleteTab(_nextU) || 'grammatica'}')">Unit ${_nextU.unit} →</button>`
                    : isCurrent && nextTabForUnit
                    ? `<button class="lp-unit-continue-btn" onclick="setActiveUnit(${unit.unit}); switchTab('${nextTabForUnit}')">Continue: ${nextStepLabelForUnit} →</button>`
                    : `<button class="lp-unit-practice-btn" onclick="setActiveUnit(${unit.unit}); switchTab('oefening');" title="Filter alle oefeningen op dit unit">🎯 Start</button>`
                  }
                </div>
                <div class="lp-subtopics">
                  ${grammarRows}${verbRow}${vocabRow}${sentenceRow}${readingRow}${dehetRow}${goalsRow}
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
  `;

  // Scroll to current unit if set
  if (lastStudyPosition && lastStudyPosition.unit) {
    setTimeout(() => {
      const el = document.getElementById('lp-unit-' + lastStudyPosition.unit);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

// Restore custom sentences if previously saved
const _savedSentences = _lsGet(SENTENCES_KEY);
if (_savedSentences) {
  try {
    const _saved = JSON.parse(_savedSentences);
    // Merge in gtopic/stype/srule from defaultSentences for matching sentences
    sentences = _saved.map(s => {
      const def = defaultSentences.find(d => d.nl === s.nl);
      return def ? { ...s, gtopic: def.gtopic, stype: def.stype, srule: def.srule } : s;
    });
    // Add any new defaultSentences not yet in saved set
    defaultSentences.forEach(d => {
      if (!sentences.find(s => s.nl === d.nl)) sentences.push(d);
    });
  } catch(e) {}
}

// Restore sentence stats
const _savedStats = _lsGet(STATS_KEY);
if (_savedStats) { try { sentenceStats = JSON.parse(_savedStats); } catch(e) {} }

// Restore sentence flags (stars + comments)
const _savedFlags = _lsGet(FLAGS_KEY);
if (_savedFlags) { try { sentenceFlags = JSON.parse(_savedFlags); } catch(e) {} }

// Restore grammar read data
const _savedGrammarRead = _lsGet(GRAMMAR_READ_KEY);
if (_savedGrammarRead) { try { grammarReadData = JSON.parse(_savedGrammarRead); } catch(e) {} }

// Restore last study position
const _savedLastPos = _lsGet(LAST_POSITION_KEY);
if (_savedLastPos) { try { lastStudyPosition = JSON.parse(_savedLastPos); } catch(e) {} }

loadProgress();
initSRS();
updateDueBadge();
rebuildActive();
loadSentence();
renderSentences('all');
updateSentenceCount();
renderVerbSelector();
_dhBuildOrder();
_dhUpdateCounts();
loadDeHet();
document.getElementById('dh-correct').textContent = dhCorrect;
document.getElementById('dh-wrong').textContent = dhWrong;
renderGrammarContent();
_loadUnitProgress();
renderAllUnitBars();
renderLessonPlan();

renderFlagsSection();
renderHome();

// ─── MOBILE HORIZONTAL OVERFLOW FIX ──────────────────────────────────────────
// Inline styles override all CSS, including cached stylesheets.
// This is the most reliable way to prevent horizontal scroll on Chrome Android.
(function _fixMobileOverflow() {
  const html = document.documentElement;
  const body = document.body;
  html.style.setProperty('overflow-x', 'hidden', 'important');
  html.style.setProperty('max-width', '100%', 'important');
  body.style.setProperty('overflow-x', 'hidden', 'important');
  body.style.setProperty('max-width', '100%', 'important');

  // Also clamp any element that is already wider than the viewport
  function _clampOverflowing() {
    const vw = document.documentElement.clientWidth;
    document.querySelectorAll(
      '#panel-lezen .card-body, #panel-lezen .reading-toolbar, ' +
      '#panel-lezen .reading-text, #panel-lezen .reading-section'
    ).forEach(function(el) {
      if (el.scrollWidth > vw) {
        el.style.setProperty('overflow-x', 'hidden', 'important');
        el.style.setProperty('max-width', '100%', 'important');
        el.style.setProperty('box-sizing', 'border-box', 'important');
      }
    });
  }

  // Run once on load and again after lezen renders
  _clampOverflowing();
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-tab="lezen"], #panel-lezen')) {
      setTimeout(_clampOverflowing, 100);
    }
  });
})();

// ─── WOORDENSCHAT OEFENMODUS ──────────────────────────────────────────────────

let _vpList = [];
let _vpIdx = 0;
let _vpCorrect = 0;
let _vpWrong = 0;

function startVocabPractice() {
  _vpList = _getVocabList().sort(() => Math.random() - 0.5);
  if (_vpList.length === 0) return;
  _vpIdx = 0;
  _vpCorrect = 0;
  _vpWrong = 0;
  document.getElementById('vocab-grid-area').style.display = 'none';
  document.getElementById('vocab-practice-area').style.display = '';
  _renderVpCard();
}

function _renderVpCard() {
  const area = document.getElementById('vocab-practice-area');
  const total = _vpList.length;
  if (_vpIdx >= total) { _renderVpResult(); return; }
  const w = _vpList[_vpIdx];

  // Build 4 multiple-choice options (1 correct + 3 distractors)
  const options = _vpDistractors(w);
  const optionsHtml = options.map((o, i) =>
    `<button class="btn btn-secondary vp-mc-btn" onclick="gradeVocabMC(${i})"
      style="width:100%;text-align:left;padding:12px 16px;font-size:0.95rem"
      data-correct="${o === w.en ? '1' : '0'}">${o}</button>`
  ).join('');

  area.innerHTML = `
    <div style="text-align:center; padding: 8px 0 16px">
      <span style="font-size:0.85rem; color:var(--text-muted)">${_vpIdx + 1} / ${total}</span>
      <div style="background:var(--bg-progress,#e5e7eb); height:4px; border-radius:4px; margin:8px 0">
        <div style="background:var(--color-primary,#276047); height:4px; border-radius:4px; width:${Math.round((_vpIdx/total)*100)}%"></div>
      </div>
    </div>
    <div style="background:var(--card-bg,#fff); border:1px solid var(--border,#e5e7eb); border-radius:12px; padding:32px 24px; text-align:center; margin-bottom:16px">
      <div style="font-size:1.6rem; font-weight:700; margin-bottom:8px">${w.nl}</div>
      <div style="font-size:0.85rem; color:var(--text-muted)">${w.type} · ${topicLabels[w.topic] || w.topic}</div>
    </div>
    <div id="vp-mc-options" style="display:flex; flex-direction:column; gap:10px; max-width:400px; margin:0 auto">
      ${optionsHtml}
    </div>
    <div style="text-align:center; margin-top:16px">
      <button class="btn btn-secondary" onclick="stopVocabPractice()" style="font-size:0.8rem">Stoppen</button>
    </div>`;
}

function _vpDistractors(w) {
  // Pick 3 random wrong answers from same level first, fallback to any
  const pool = vocabulary.filter(v => v.en !== w.en);
  const sameLvl = pool.filter(v => v.level === w.level);
  const src = sameLvl.length >= 3 ? sameLvl : pool;
  const shuffled = src.sort(() => Math.random() - 0.5);
  const seen = new Set([w.en.toLowerCase()]);
  const distractors = [];
  for (const v of shuffled) {
    if (distractors.length >= 3) break;
    if (seen.has(v.en.toLowerCase())) continue;
    seen.add(v.en.toLowerCase());
    distractors.push(v.en);
  }
  // Combine and shuffle
  const options = [w.en, ...distractors].sort(() => Math.random() - 0.5);
  return options;
}

function gradeVocabMC(idx) {
  const btns = document.querySelectorAll('#vp-mc-options .vp-mc-btn');
  if (!btns.length) return;
  const clicked = btns[idx];
  const isCorrect = clicked.getAttribute('data-correct') === '1';

  // Disable all buttons and show feedback
  btns.forEach(b => {
    b.disabled = true;
    b.style.cursor = 'default';
    if (b.getAttribute('data-correct') === '1') {
      b.style.background = '#16a34a';
      b.style.color = '#fff';
      b.style.borderColor = '#16a34a';
    }
  });
  if (!isCorrect) {
    clicked.style.background = '#dc2626';
    clicked.style.color = '#fff';
    clicked.style.borderColor = '#dc2626';
  }

  if (isCorrect) _vpCorrect++; else _vpWrong++;
  _vpIdx++;
  setTimeout(() => _renderVpCard(), isCorrect ? 600 : 1200);
}

function _renderVpResult() {
  // Auto-mark vocab as done for active unit
  if (activeUnit) markUnitExercise(activeUnit.unit, 'vocab');
  const total = _vpList.length;
  const pct = Math.round((_vpCorrect / total) * 100);
  const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪';
  const area = document.getElementById('vocab-practice-area');
  area.innerHTML = `
    <div style="text-align:center; padding:32px 16px">
      <div style="font-size:2.5rem; margin-bottom:8px">${emoji}</div>
      <div style="font-size:1.4rem; font-weight:700; margin-bottom:20px">Oefening voltooid!</div>
      <div style="display:flex; gap:32px; justify-content:center; margin-bottom:8px; flex-wrap:wrap">
        <div style="text-align:center">
          <div style="font-size:2.2rem; font-weight:700; color:#16a34a">${_vpCorrect}</div>
          <div style="font-size:0.85rem; color:var(--text-muted)">✓ goed</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:2.2rem; font-weight:700; color:#dc2626">${_vpWrong}</div>
          <div style="font-size:0.85rem; color:var(--text-muted)">✗ fout</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:2.2rem; font-weight:700">${pct}%</div>
          <div style="font-size:0.85rem; color:var(--text-muted)">score</div>
        </div>
      </div>
      <div style="color:var(--text-muted); font-size:0.9rem; margin-bottom:28px">van ${total} woorden</div>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap">
        <button class="btn btn-primary" id="vp-next-step-btn" style="display:none" onclick="_goNextUnitStep('woordenschat')">Next →</button>
        <button class="btn btn-secondary" onclick="startVocabPractice()">🔁 Opnieuw oefenen</button>
        <button class="btn btn-secondary" onclick="stopVocabPractice()">Terug naar lijst</button>
      </div>
    </div>`;
  _setupVpNextBtn();
}

function _setupVpNextBtn() {
  const btn = document.getElementById('vp-next-step-btn');
  if (!btn) return;
  const next = activeUnit ? _nextStepInfo('woordenschat') : null;
  if (next) {
    btn.style.display = '';
    btn.textContent = 'Next: ' + next.label + ' →';
    btn.onclick = function() { _goNextUnitStep('woordenschat'); };
  } else if (activeUnit) {
    const _nu = _getNextUnit(activeUnit.unit);
    if (_nu) {
      btn.style.display = '';
      btn.textContent = '✓ Done → Start Unit ' + _nu.unit + ' →';
      btn.onclick = function() { setActiveUnit(_nu.unit); switchTab(_firstIncompleteTab(_nu) || 'grammatica'); };
    }
  }
}

function stopVocabPractice() {
  document.getElementById('vocab-practice-area').style.display = 'none';
  document.getElementById('vocab-grid-area').style.display = '';
}

// ═══════════════════════════════════════════════════════════════════════════════
// READING (Lezen)
// ═══════════════════════════════════════════════════════════════════════════════

let _lezenViewIndex = null;
let _lezenView = 'library';  // 'library' | 'article'
let _lezenShowEn = false;
let _lezenShowVocabHighlights = true;
let _lezenMarkMode = false;  // when true, clicking a word toggles its "unknown" status

const UNKNOWN_WORDS_KEY = 'schrijfcoach_unknown_words';

function _unknownWords() {
  const raw = _lsGet(UNKNOWN_WORDS_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw) || {}; } catch (e) { return {}; }
}

function _saveUnknownWords(map) {
  _lsSet(UNKNOWN_WORDS_KEY, JSON.stringify(map));
}

function _normalizeWord(w) {
  return String(w || '').toLowerCase().replace(/[^\p{L}'']/gu, '');
}

function isUnknownWord(word) {
  const k = _normalizeWord(word);
  if (!k) return false;
  const map = _unknownWords();
  return Object.prototype.hasOwnProperty.call(map, k);
}

// Exact-match lookup against all curated sources (vocab + verbs).
function _exactTranslationLookup(k) {
  if (!k) return '';
  // Reading-specific vocabulary (matches inflected forms)
  if (typeof readingTexts !== 'undefined' && readingTexts.length) {
    for (let i = 0; i < readingTexts.length; i++) {
      const list = readingTexts[i].vocabulary;
      if (!list) continue;
      for (let j = 0; j < list.length; j++) {
        const v = list[j];
        if (_normalizeWord(v.nl) === k) return v.en || '';
        const forms = v.matches || [];
        for (let m = 0; m < forms.length; m++) {
          if (_normalizeWord(forms[m]) === k) return v.en || '';
        }
      }
    }
  }
  // Global vocabulary
  if (typeof vocabulary !== 'undefined' && vocabulary.length) {
    for (let i = 0; i < vocabulary.length; i++) {
      if (_normalizeWord(vocabulary[i].nl) === k) return vocabulary[i].en || '';
    }
  }
  // Verbs: infinitive, all conjugations, past tenses, past participle
  if (typeof verbs !== 'undefined' && verbs.length) {
    for (let i = 0; i < verbs.length; i++) {
      const v = verbs[i];
      if (_normalizeWord(v.inf) === k) return v.meaning || '';
      if (v.forms) {
        for (let f = 0; f < v.forms.length; f++) {
          if (_normalizeWord(v.forms[f]) === k) return v.meaning || '';
        }
      }
      if (v.past) {
        for (let p = 0; p < v.past.length; p++) {
          if (_normalizeWord(v.past[p]) === k) return v.meaning || '';
        }
      }
      if (v.participle && _normalizeWord(v.participle) === k) return v.meaning || '';
    }
  }
  return '';
}

// Generate stem variants for inflected words (plurals, conjugations, diminutives).
// e.g. "koekjes" → ["koekje", "koekjes"], "boeken" → ["boek", "boeke"]
function _wordStemCandidates(k) {
  const out = [];
  const seen = {};
  const add = function(s) {
    if (s && s.length >= 2 && !seen[s] && s !== k) { seen[s] = true; out.push(s); }
  };
  // Common Dutch endings to strip (ordered by likelihood)
  const suffixes = ['tjes', 'tje', 'pjes', 'pje', 'kjes', 'kje', 'jes', 'je',
                    'eren', 'aren', 'en', 'es', 's', 'e', 'de', 'te', 't'];
  for (let i = 0; i < suffixes.length; i++) {
    const sfx = suffixes[i];
    if (k.length > sfx.length + 1 && k.endsWith(sfx)) add(k.slice(0, -sfx.length));
  }
  // Doubled-consonant verbs: "stoppen" -> stem "stop", "zetten" -> "zet"
  if (k.endsWith('en') && k.length >= 5) {
    const stem = k.slice(0, -2);
    if (stem[stem.length - 1] === stem[stem.length - 2]) {
      add(stem.slice(0, -1));
    }
  }
  // Doubled-consonant adjectives: "dunne" -> "dunn" -> "dun", "dikke" -> "dikk" -> "dik"
  // After stripping -e, if result ends with doubled consonant, try de-doubling
  if (k.endsWith('e') && k.length >= 4) {
    const base = k.slice(0, -1); // strip -e
    const last = base[base.length - 1];
    if (last && 'aeiou'.indexOf(last) === -1 && base[base.length - 2] === last) {
      add(base.slice(0, -1)); // de-double: "dunn" -> "dun"
    }
  }
  // Single-vowel doubling for plurals: "boeken" -> "boek" already handled by -en strip
  // Vowel-shortening: "stenen" -> "steen" (long vowel doubles in singular)
  if (k.endsWith('en') && k.length >= 4) {
    const stem = k.slice(0, -2);
    if (stem.length >= 3) {
      // If stem like "sten" → try "steen"
      const vowels = 'aeiou';
      if (vowels.indexOf(stem[stem.length - 2]) >= 0 && vowels.indexOf(stem[stem.length - 1]) < 0) {
        add(stem.slice(0, -1) + stem[stem.length - 2] + stem[stem.length - 1]);
      }
    }
  }
  return out;
}

// Try to find an English translation for a word by checking, in order:
//   1. Reading vocabularies, global vocabulary[], verbs[] (exact match)
//   2. Same sources with common Dutch suffixes stripped (plurals, conjugations)
// Returns '' if nothing found.
function _lookupTranslation(word) {
  const k = _normalizeWord(word);
  if (!k) return '';
  const exact = _exactTranslationLookup(k);
  if (exact) return exact;
  const candidates = _wordStemCandidates(k);
  for (let i = 0; i < candidates.length; i++) {
    const hit = _exactTranslationLookup(candidates[i]);
    if (hit) return hit;
  }
  return '';
}

function _readingById(id) {
  if (!id || typeof readingTexts === 'undefined') return null;
  for (let i = 0; i < readingTexts.length; i++) {
    if (readingTexts[i].id === id) return readingTexts[i];
  }
  return null;
}

function toggleUnknownWord(word, en, readingId) {
  const k = _normalizeWord(word);
  if (!k) return;
  const map = _unknownWords();
  if (map[k]) {
    delete map[k];
  } else {
    const translation = en || _lookupTranslation(word);
    map[k] = {
      nl: word,
      en: translation,
      readingId: readingId || null,
      addedAt: _todayKey()
    };
    _saveUnknownWords(map);
    // Kick off background fetch if local lookup found nothing
    if (!translation) _fetchTranslation(word);
    return;
  }
  _saveUnknownWords(map);
}

// ── Online translation fallback (MyMemory API, free, no key) ────────────────
const _pendingTransFetches = {};      // currently in-flight
const _attemptedTransFetches = {};    // session-level: don't retry on every render

function _fetchTranslation(word) {
  const k = _normalizeWord(word);
  if (!k) return;
  if (_pendingTransFetches[k] || _attemptedTransFetches[k]) return;
  _pendingTransFetches[k] = true;
  _attemptedTransFetches[k] = true;

  const url = 'https://api.mymemory.translated.net/get?q=' +
              encodeURIComponent(word) + '&langpair=nl|en';

  fetch(url)
    .then(function(r) { return r.ok ? r.json() : null; })
    .then(function(data) {
      delete _pendingTransFetches[k];
      if (!data || !data.responseData) return;
      let en = (data.responseData.translatedText || '').trim();
      if (!en) return;
      // Filter rate-limit warnings and identical-input "translations"
      if (/^mymemory warning/i.test(en)) return;
      if (en.toLowerCase() === word.toLowerCase()) return;
      const map = _unknownWords();
      if (map[k] && !map[k].en) {
        map[k].en = en;
        _saveUnknownWords(map);
        renderUnknownWords();
      }
    })
    .catch(function() { delete _pendingTransFetches[k]; });
}

// Manually set or correct a translation. Opens a prompt() pre-filled with the
// current value. Empty string clears it so next render re-fetches.
function editUnknownTranslation(word) {
  const k = _normalizeWord(word);
  if (!k) return;
  const map = _unknownWords();
  const entry = map[k];
  if (!entry) return;
  const current = entry.en || '';
  const next = prompt('Vertaling voor "' + (entry.nl || word) + '":', current);
  if (next === null) return;  // cancelled
  entry.en = next.trim();
  _saveUnknownWords(map);
  // If user emptied it, allow auto-fetch again next time
  if (!entry.en) delete _attemptedTransFetches[k];
  renderUnknownWords();
}

// Click handler delegated from each .tts-word span
function onTTSWordClick(el) {
  const word = el.textContent.trim();
  if (_lezenMarkMode) {
    const en = el.getAttribute('data-en') || '';
    const t = readingTexts[_currentReadingIndex()];
    toggleUnknownWord(word, en, t ? t.id : null);
    // Sync highlight on every occurrence of this word in the current view
    const k = _normalizeWord(word);
    const nowUnknown = isUnknownWord(word);
    document.querySelectorAll('.tts-word').forEach(function(other) {
      if (_normalizeWord(other.textContent) === k) {
        other.classList.toggle('tts-unknown', nowUnknown);
      }
    });
    renderUnknownWords();
  } else {
    speakWord(word);
  }
}

function _readingHistory() {
  const raw = _lsGet(READING_HISTORY_KEY);
  if (!raw) return { byId: {}, lastReadId: null, lastReadDate: null };
  try { return JSON.parse(raw); } catch(e) { return { byId: {}, lastReadId: null, lastReadDate: null }; }
}

function _saveReadingHistory(h) {
  _lsSet(READING_HISTORY_KEY, JSON.stringify(h));
}

function _todayKey() {
  const d = new Date();
  return d.getUTCFullYear() + '-' +
    String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(d.getUTCDate()).padStart(2, '0');
}

function getDailyReadingIndex() {
  if (typeof readingTexts === 'undefined' || !readingTexts.length) return 0;
  const day = Math.floor((Date.now() - READING_EPOCH) / 86400000);
  const n = readingTexts.length;
  return ((day % n) + n) % n;
}

function _currentReadingIndex() {
  return _lezenViewIndex !== null ? _lezenViewIndex : getDailyReadingIndex();
}

function _escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

function _escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Wraps every word in the paragraph with <span class="tts-word" data-tts-start="N">.
// Vocab matches additionally get class "reading-word" + a data-en attribute for tooltip.
// Words present in the unknown-words list also get class "tts-unknown" for highlighting.
// paraStartOffset is the character offset of this paragraph inside the full t.text passed to TTS.
function _renderReadingPara(rawPara, vocab, paraStartOffset) {
  const unknownMap = _unknownWords();
  const isUnknownLocal = function(word) {
    const k = _normalizeWord(word);
    return !!k && Object.prototype.hasOwnProperty.call(unknownMap, k);
  };
  // Step 1: collect non-overlapping vocab matches (longest-form first)
  const vocabMatches = [];
  if (_lezenShowVocabHighlights && vocab && vocab.length) {
    const items = vocab.slice().sort(function(a, b) {
      const aLen = Math.max.apply(null, (a.matches || [a.nl]).map(function(m){ return m.length; }));
      const bLen = Math.max.apply(null, (b.matches || [b.nl]).map(function(m){ return m.length; }));
      return bLen - aLen;
    });
    for (let i = 0; i < items.length; i++) {
      const v = items[i];
      const forms = (v.matches && v.matches.length) ? v.matches : [v.nl];
      for (let j = 0; j < forms.length; j++) {
        const re = new RegExp('\\b' + _escapeRegex(forms[j]) + '\\b', 'gi');
        let m;
        while ((m = re.exec(rawPara)) !== null) {
          const ms = m.index, me = m.index + m[0].length;
          let overlap = false;
          for (let k = 0; k < vocabMatches.length; k++) {
            const vm = vocabMatches[k];
            if (!(vm.end <= ms || vm.start >= me)) { overlap = true; break; }
          }
          if (!overlap) vocabMatches.push({ start: ms, end: me, en: v.en });
        }
      }
    }
  }
  const vocabAt = function(pos) {
    for (let i = 0; i < vocabMatches.length; i++) {
      const vm = vocabMatches[i];
      if (pos >= vm.start && pos < vm.end) return vm;
    }
    return null;
  };

  // Step 2: walk paragraph emitting word spans + raw punctuation/whitespace
  const wordRe = /[\p{L}'']+/gu;
  let html = '';
  let lastIdx = 0;
  let m;
  while ((m = wordRe.exec(rawPara)) !== null) {
    const wStart = m.index;
    const wEnd = wStart + m[0].length;
    if (wStart > lastIdx) html += _escapeHtml(rawPara.slice(lastIdx, wStart));
    const vm = vocabAt(wStart);
    const ttsStart = paraStartOffset + wStart;
    const word = m[0];
    const classes = ['tts-word'];
    if (vm) classes.push('reading-word');
    if (isUnknownLocal(word)) classes.push('tts-unknown');
    let attrs = ' data-tts-start="' + ttsStart + '"';
    if (vm) attrs += ' data-en="' + _escapeHtml(vm.en) + '"';
    attrs += ' tabindex="0" onclick="onTTSWordClick(this)"';
    html += '<span class="' + classes.join(' ') + '"' + attrs + '>' + _escapeHtml(word) + '</span>';
    lastIdx = wEnd;
  }
  if (lastIdx < rawPara.length) html += _escapeHtml(rawPara.slice(lastIdx));
  return html;
}

function openReadingLibrary() {
  _stopAudio();
  _lezenMarkMode = false;
  _lezenView = 'library';
  const libView = document.getElementById('reading-library-view');
  const artView = document.getElementById('reading-article-view');
  if (libView) libView.style.display = '';
  if (artView) artView.style.display = 'none';
  renderReadingLibrary();
}

function openReadingArticle() {
  _lezenView = 'article';
  const libView = document.getElementById('reading-library-view');
  const artView = document.getElementById('reading-article-view');
  if (libView) libView.style.display = 'none';
  if (artView) artView.style.display = '';
}

function renderReadingLibrary() {
  const el = document.getElementById('reading-library-content');
  if (!el) return;
  if (typeof readingTexts === 'undefined' || !readingTexts.length) {
    el.innerHTML = '<p>Geen leesteksten beschikbaar.</p>';
    return;
  }
  const history = _readingHistory();
  const byId = history.byId || {};
  const todayKey = _todayKey();
  const todayIdx = getDailyReadingIndex();
  const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const groups = {};
  readingTexts.forEach(function(t, i) {
    if (!groups[t.level]) groups[t.level] = [];
    groups[t.level].push({ t: t, i: i });
  });
  const html = levelOrder.filter(function(lv) { return groups[lv]; }).map(function(lv) {
    const items = groups[lv].map(function(entry) {
      const t = entry.t, i = entry.i;
      const dates = byId[t.id] || [];
      const readToday = dates.indexOf(todayKey) !== -1;
      const everRead = dates.length > 0;
      const lastDate = dates.length ? dates[dates.length - 1] : null;
      const isToday = i === todayIdx;
      let statusHtml;
      if (readToday) {
        statusHtml = '<span class="rl-status rl-status--done">✓ Gelezen vandaag</span>';
      } else if (everRead) {
        statusHtml = '<span class="rl-status rl-status--read">✓ Gelezen · ' + lastDate + '</span>';
      } else {
        statusHtml = '<span class="rl-status rl-status--unread">Nog niet gelezen</span>';
      }
      const todayBadge = isToday ? '<span class="rl-today-badge">Vandaag</span>' : '';
      return '<li><button class="rl-item" onclick="openReadingText(' + i + ')">' +
        '<span class="rl-emoji">' + (t.topicEmoji || '📖') + '</span>' +
        '<span class="rl-info">' +
          '<span class="rl-title">' + _escapeHtml(t.title) + todayBadge + '</span>' +
          '<span class="rl-title-en">' + _escapeHtml(t.titleEn || '') + '</span>' +
          '<span class="rl-meta">' + _escapeHtml(t.level) + ' · ≈ ' + (t.readMinutes || '?') + ' min</span>' +
        '</span>' +
        statusHtml +
        '</button></li>';
    }).join('');
    return '<h3 class="reading-section-title"><span class="badge badge-' + lv.toLowerCase() + '">' + lv + '</span> ' +
      groups[lv].length + ' teksten</h3>' +
      '<ul class="rl-list">' + items + '</ul>';
  }).join('');
  el.innerHTML = html;
}

// ── Per-word hover tooltip (all words, not just vocab-tagged ones) ──────────
const _hoverCache = {};     // normalized word → fetched translation (session)
const _hoverAttempted = {}; // normalized word → true (already tried this session)

let _touchHideTimer = null;

function _triggerWordTip(span, autoHideMs) {
  const word = span.textContent.trim();
  const k = _normalizeWord(word);
  if (!k) return;
  const tip = document.getElementById('reading-hover-tip');
  if (!tip) return;
  const currentText = (typeof readingTexts !== 'undefined' && readingTexts.length)
    ? readingTexts[_currentReadingIndex()] : null;
  const info = _buildWordInfo(word, span, currentText);
  _showRichHoverTip(tip, span, info, k);
  if (info.grammarNote !== null) _pulseGrammarNote(info.grammarNote);
  if (!info.translation && !_hoverAttempted[k]) {
    _hoverAttempted[k] = true;
    const url = 'https://api.mymemory.translated.net/get?q=' +
      encodeURIComponent(word) + '&langpair=nl|en';
    fetch(url)
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(data) {
        if (!data || !data.responseData) return;
        let en = (data.responseData.translatedText || '').trim();
        if (!en || /^mymemory warning/i.test(en) || en.toLowerCase() === word.toLowerCase()) return;
        _hoverCache[k] = en;
        if (tip.dataset.word === k && tip.classList.contains('rht-visible')) {
          const parts2 = en.split(/\s*[\/·]\s*/).map(function(s){return s.trim();}).filter(Boolean);
          info.translation = parts2[0] || en;
          info.alternatives = parts2.slice(1);
          _showRichHoverTip(tip, span, info, k);
        }
      })
      .catch(function() {});
  }
  if (autoHideMs) {
    clearTimeout(_touchHideTimer);
    _touchHideTimer = setTimeout(function() {
      tip.classList.remove('rht-visible');
    }, autoHideMs);
  }
}

function _initReadingHoverTooltip() {
  const textEl = document.getElementById('reading-text');
  if (!textEl || textEl._hoverInited) return;
  textEl._hoverInited = true;
  let _lastTarget = null;

  // Desktop: mouseover
  textEl.addEventListener('mouseover', function(e) {
    const span = e.target.closest && e.target.closest('.tts-word');
    if (!span || span === _lastTarget) return;
    _lastTarget = span;
    clearTimeout(_touchHideTimer);
    _triggerWordTip(span, 0);
  });

  textEl.addEventListener('mouseleave', function() {
    _lastTarget = null;
    const tip = document.getElementById('reading-hover-tip');
    if (tip) tip.classList.remove('rht-visible');
  });

  // Mobile: touchstart — show tooltip, auto-hide after 3 s
  textEl.addEventListener('touchstart', function(e) {
    const span = e.target.closest && e.target.closest('.tts-word');
    if (!span) {
      // Tapped outside a word — hide immediately
      const tip = document.getElementById('reading-hover-tip');
      if (tip) tip.classList.remove('rht-visible');
      clearTimeout(_touchHideTimer);
      return;
    }
    _triggerWordTip(span, 3000);
  }, { passive: true });
}

// Build a rich info object for a hovered word.
function _buildWordInfo(word, span, currentText) {
  const k = _normalizeWord(word);

  // Translation: text-specific vocab first (most context-accurate), then general lookup
  let rawTr = span.getAttribute('data-en') || '';
  if (!rawTr) rawTr = _lookupTranslation(word);
  if (!rawTr) { const uw = _unknownWords(); if (uw[k]) rawTr = uw[k].en || ''; }
  if (!rawTr) rawTr = _hoverCache[k] || '';

  // Split primary translation from alternatives (separated by / or ·)
  const parts = rawTr ? rawTr.split(/\s*[\/·]\s*/).map(function(s) { return s.trim(); }).filter(Boolean) : [];
  const translation = parts[0] || '';
  const alternatives = parts.slice(1);

  // Separable verb detection: match against vtype=scheidbaar verbs
  let separable = null;
  if (typeof verbs !== 'undefined') {
    for (let i = 0; i < verbs.length; i++) {
      const v = verbs[i];
      if (v.vtype !== 'scheidbaar') continue;
      const inf = _normalizeWord(v.inf);
      // Match infinitive directly
      if (inf === k) { separable = { inf: v.inf, prefix: v.prefix, meaning: v.meaning }; break; }
      // Match conjugated forms: forms are like "leg uit", "legt uit" — check stem (first word)
      const forms = v.forms || [];
      for (let j = 0; j < forms.length; j++) {
        const stem = _normalizeWord((forms[j] + '').split(' ')[0]);
        if (stem === k) { separable = { inf: v.inf, prefix: v.prefix, meaning: v.meaning }; break; }
      }
      if (separable) break;
    }
  }

  // Grammar note detection: check if word appears in any grammar note's example
  let grammarNote = null;
  if (currentText && currentText.grammarNotes) {
    for (let i = 0; i < currentText.grammarNotes.length; i++) {
      const note = currentText.grammarNotes[i];
      const tokens = (note.example || '').split(/[\s·,;]+/).map(function(t) { return _normalizeWord(t); }).filter(Boolean);
      if (tokens.indexOf(k) !== -1) { grammarNote = i; break; }
    }
  }

  return { translation: translation, alternatives: alternatives, separable: separable, grammarNote: grammarNote };
}

// Render the tooltip with translation, separable info, grammar hint, and alternatives.
function _showRichHoverTip(tip, span, info, k) {
  let html = '';
  if (info.translation) {
    html += '<span class="rht-main">' + _escapeHtml(info.translation) + '</span>';
  } else {
    html += '<span class="rht-main rht-pending">…</span>';
  }
  if (info.separable) {
    const base = info.separable.inf.slice(info.separable.prefix.length);
    html += '<span class="rht-tag rht-sep">🔗 scheidbaar: ' +
      _escapeHtml(info.separable.prefix) + ' + ' + _escapeHtml(base) + '</span>';
  }
  if (info.grammarNote !== null) {
    html += '<span class="rht-tag rht-grammar">📖 grammatica hieronder ↓</span>';
  }
  if (info.alternatives.length) {
    html += '<span class="rht-alts">' +
      info.alternatives.map(function(a) { return _escapeHtml(a); }).join(' · ') + '</span>';
  }
  tip.innerHTML = html;
  tip.dataset.word = k;
  tip.classList.add('rht-visible');
  const rect = span.getBoundingClientRect();
  const cx = rect.left + rect.width / 2 + window.scrollX;
  // Flip below the word if too close to top of viewport
  if (rect.top < 60) {
    tip.style.transform = 'translate(-50%, 8px)';
    tip.style.top = (rect.bottom + window.scrollY) + 'px';
  } else {
    tip.style.transform = 'translate(-50%, calc(-100% - 10px))';
    tip.style.top = (rect.top + window.scrollY) + 'px';
  }
  // Clamp left so tooltip never goes off screen edge
  const tipHalfW = 115;
  const safeLeft = Math.max(tipHalfW, Math.min(cx, window.innerWidth - tipHalfW));
  tip.style.left = safeLeft + 'px';
}

// Briefly flash-highlight the n-th grammar note card so the user's eye is drawn to it.
function _pulseGrammarNote(index) {
  const notes = document.querySelectorAll('.reading-grammar-note');
  const el = notes[index];
  if (!el) return;
  el.classList.remove('reading-grammar-note--pulse');
  void el.offsetWidth; // reflow to restart animation
  el.classList.add('reading-grammar-note--pulse');
}

function openReadingText(i) {
  _lezenViewIndex = i;
  openReadingArticle();
  renderReading();
}

function renderReading() {
  if (typeof readingTexts === 'undefined' || !readingTexts.length) {
    const el = document.getElementById('reading-text');
    if (el) el.textContent = 'Geen leesteksten beschikbaar.';
    return;
  }
  // Show Edge recommendation only when running in a browser without Microsoft's
  // neural voices (everywhere except Edge): Edge UA contains "Edg/".
  const tip = document.getElementById('reading-audio-tip');
  if (tip) {
    const isEdge = /\bEdg\//.test(navigator.userAgent);
    tip.style.display = isEdge ? 'none' : 'block';
  }
  const idx = _currentReadingIndex();
  const t = readingTexts[idx];
  const todayIdx = getDailyReadingIndex();
  const isToday = idx === todayIdx;
  const history = _readingHistory();
  const dates = history.byId[t.id] || [];
  const readToday = dates.indexOf(_todayKey()) !== -1;

  // Header
  const dayLabel = document.getElementById('reading-day-label');
  if (dayLabel) dayLabel.textContent = isToday ? 'Vandaag · Today' : 'Archief · Archive';
  const titleEl = document.getElementById('reading-title');
  if (titleEl) titleEl.textContent = t.title;
  const titleEnEl = document.getElementById('reading-title-en');
  if (titleEnEl) titleEnEl.textContent = t.titleEn || '';
  const lvBadge = document.getElementById('reading-level-badge');
  if (lvBadge) {
    lvBadge.textContent = t.level;
    lvBadge.className = 'badge badge-' + t.level.toLowerCase();
  }
  const topicTag = document.getElementById('reading-topic-tag');
  if (topicTag) topicTag.innerHTML = (t.topicEmoji || '') + ' ' + _escapeHtml(t.topicEn || t.topic);
  const timeEl = document.getElementById('reading-time');
  if (timeEl) timeEl.textContent = '≈ ' + t.readMinutes + ' min · ' + t.wordCount + ' woorden';

  // Toggle buttons
  const toggleEn = document.getElementById('reading-toggle-en');
  if (toggleEn) {
    toggleEn.textContent = _lezenShowEn ? '🌐 Verberg vertaling' : '🌐 Toon vertaling';
    toggleEn.style.display = t.textEn ? '' : 'none';
  }
  const toggleVocab = document.getElementById('reading-toggle-vocab');
  if (toggleVocab) toggleVocab.textContent = _lezenShowVocabHighlights ? '✨ Verberg markering' : '✨ Markeer woorden';
  const toggleMark = document.getElementById('reading-toggle-mark');
  if (toggleMark) {
    toggleMark.textContent = _lezenMarkMode ? '✅ Klaar met markeren' : '🔖 Markeer onbekend';
    toggleMark.classList.toggle('reading-mark-btn--active', _lezenMarkMode);
  }
  const textEl = document.getElementById('reading-text');
  if (textEl) textEl.classList.toggle('reading-text--mark-mode', _lezenMarkMode);

  // Main text — paragraph by paragraph with inline translation
  if (textEl) {
    const nlParas = t.text.split('\n\n');
    const enParas = (t.textEn || '').split('\n\n');
    const enDisplay = _lezenShowEn ? 'block' : 'none';
    let cumulativeOffset = 0;
    textEl.innerHTML = nlParas.map(function(para, i) {
      const enPara = enParas[i] || '';
      const paraHtml = _renderReadingPara(para, t.vocabulary, cumulativeOffset);
      // +2 for the '\n\n' separator that join() will reinstate when feeding TTS
      cumulativeOffset += para.length + 2;
      return '<div class="reading-para-block">' +
        '<p class="reading-para-nl">' + paraHtml + '</p>' +
        (enPara ? '<p class="reading-para-en" style="display:' + enDisplay + '">' + _escapeHtml(enPara) + '</p>' : '') +
        '</div>';
    }).join('');
  }

  // Vocabulary list
  const vocabEl = document.getElementById('reading-vocab');
  if (vocabEl && t.vocabulary && t.vocabulary.length) {
    vocabEl.innerHTML = '<h3 class="reading-section-title">Woorden · Vocabulary</h3>' +
      '<ul class="reading-vocab-grid">' +
      t.vocabulary.map(function(v) {
        return '<li><span class="reading-vocab-nl">' + _escapeHtml(v.nl) + '</span>' +
               '<span class="reading-vocab-en">' + _escapeHtml(v.en) + '</span></li>';
      }).join('') +
      '</ul>';
  }

  // Grammar notes
  const grammarEl = document.getElementById('reading-grammar');
  if (grammarEl && t.grammarNotes && t.grammarNotes.length) {
    grammarEl.innerHTML = '<h3 class="reading-section-title">Grammatica in deze tekst · Grammar in this text</h3>' +
      t.grammarNotes.map(function(g) {
        return '<div class="reading-grammar-note">' +
          '<div class="reading-grammar-pattern">' + _escapeHtml(g.pattern) + '</div>' +
          '<div class="reading-grammar-example"><em>' + _escapeHtml(g.example) + '</em></div>' +
          '<div class="reading-grammar-explain">' + _escapeHtml(g.explanation) + '</div>' +
          '</div>';
      }).join('');
  }

  // Unknown-words list (across all readings)
  renderUnknownWords();

  // Comprehension questions
  const questionsEl = document.getElementById('reading-questions');
  if (questionsEl && t.questions && t.questions.length) {
    questionsEl.innerHTML = '<h3 class="reading-section-title">Begripsvragen · Comprehension questions</h3>' +
      t.questions.map(function(q, i) {
        return '<details class="reading-question">' +
          '<summary>' +
            '<span class="reading-q-num">' + (i + 1) + '.</span> ' +
            '<span class="reading-q-nl">' + _escapeHtml(q.q) + '</span>' +
            (q.qEn ? ' <span class="reading-q-en">(' + _escapeHtml(q.qEn) + ')</span>' : '') +
          '</summary>' +
          '<div class="reading-q-answer">' +
            '<strong>' + _escapeHtml(q.a) + '</strong>' +
            (q.aEn ? ' <span class="reading-q-answer-en">— ' + _escapeHtml(q.aEn) + '</span>' : '') +
          '</div>' +
          '</details>';
      }).join('');
  }

  // Complete button
  const btn = document.getElementById('reading-complete-btn');
  if (btn) {
    if (readToday) {
      btn.classList.add('reading-complete-btn--done');
      btn.textContent = '✓ Vandaag gelezen · Read today';
    } else {
      btn.classList.remove('reading-complete-btn--done');
      btn.textContent = '✓ Gelezen · Mark as read';
    }
  }

  // Nav info
  const navInfo = document.getElementById('reading-nav-info');
  if (navInfo) navInfo.textContent = (idx + 1) + ' / ' + readingTexts.length + (isToday ? ' · vandaag' : '');

  // Recent history
  // All texts library — grouped by level
  const histEl = document.getElementById('reading-history');
  if (histEl) {
    const byId = history.byId || {};
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const groups = {};
    readingTexts.forEach(function(tt, i) {
      if (!groups[tt.level]) groups[tt.level] = [];
      groups[tt.level].push({ tt: tt, i: i });
    });
    const html = levelOrder.filter(function(lv) { return groups[lv]; }).map(function(lv) {
      const items = groups[lv].map(function(entry) {
        const tt = entry.tt, i = entry.i;
        const dates = byId[tt.id] || [];
        const everRead = dates.length > 0;
        const lastDate = dates.length ? dates[dates.length - 1] : null;
        const isCurrent = i === idx;
        return '<li><button class="reading-library-item' + (isCurrent ? ' reading-library-item--active' : '') + '" onclick="jumpToReading(' + i + ')">' +
          '<span class="reading-library-emoji">' + (tt.topicEmoji || '📖') + '</span>' +
          '<span class="reading-library-info">' +
            '<span class="reading-library-title">' + _escapeHtml(tt.title) + '</span>' +
            '<span class="reading-library-title-en">' + _escapeHtml(tt.titleEn) + '</span>' +
          '</span>' +
          '<span class="reading-library-meta">' +
            (everRead
              ? '<span class="reading-library-read">✓ ' + lastDate + '</span>'
              : '<span class="reading-library-unread">Niet gelezen</span>') +
          '</span>' +
          '</button></li>';
      }).join('');
      return '<h3 class="reading-section-title"><span class="badge badge-' + lv.toLowerCase() + '">' + lv + '</span> ' + groups[lv].length + ' teksten</h3>' +
        '<ul class="reading-library-list">' + items + '</ul>';
    }).join('');
    histEl.innerHTML = html;
  }
  // Bind hover tooltip once (guarded by _hoverInited flag)
  _initReadingHoverTooltip();
}

function markReadingComplete() {
  if (typeof readingTexts === 'undefined' || !readingTexts.length) return;
  const idx = _currentReadingIndex();
  const t = readingTexts[idx];
  const today = _todayKey();
  const h = _readingHistory();
  if (!h.byId[t.id]) h.byId[t.id] = [];
  if (h.byId[t.id].indexOf(today) === -1) h.byId[t.id].push(today);
  h.lastReadId = t.id;
  h.lastReadDate = today;
  _saveReadingHistory(h);
  renderReading();
  renderReadingLibrary();
  renderHome();
  if (typeof showToast === 'function') showToast('Mooi! Tekst gelezen ✓');
}

function navigateReading(delta) {
  if (typeof readingTexts === 'undefined' || !readingTexts.length) return;
  _stopAudio();
  const cur = _currentReadingIndex();
  const n = readingTexts.length;
  _lezenViewIndex = ((cur + delta) % n + n) % n;
  renderReading();
}

function jumpToReading(i) {
  _stopAudio();
  _lezenViewIndex = i;
  openReadingArticle();
  renderReading();
}

function navigateToReadingText(id) {
  if (typeof readingTexts === 'undefined') return;
  const idx = readingTexts.findIndex(function(t) { return t.id === id; });
  if (idx < 0) return;
  _stopAudio();
  _lezenViewIndex = idx;
  // Switch tab without triggering library; open article directly
  switchTab('lezen');
  openReadingText(idx);
}

function toggleReadingTranslation() {
  _lezenShowEn = !_lezenShowEn;
  const display = _lezenShowEn ? 'block' : 'none';
  document.querySelectorAll('.reading-para-en').forEach(function(el) {
    el.style.display = display;
  });
  const btn = document.getElementById('reading-toggle-en');
  if (btn) btn.textContent = _lezenShowEn ? '🌐 Verberg vertaling' : '🌐 Toon vertaling';
}

function toggleReadingVocabHighlights() {
  _lezenShowVocabHighlights = !_lezenShowVocabHighlights;
  renderReading();
}

function toggleReadingMarkMode() {
  _lezenMarkMode = !_lezenMarkMode;
  const btn = document.getElementById('reading-toggle-mark');
  if (btn) {
    btn.textContent = _lezenMarkMode ? '✅ Klaar met markeren' : '🔖 Markeer onbekend';
    btn.classList.toggle('reading-mark-btn--active', _lezenMarkMode);
  }
  const textEl = document.getElementById('reading-text');
  if (textEl) textEl.classList.toggle('reading-text--mark-mode', _lezenMarkMode);
  if (_lezenMarkMode && typeof showToast === 'function') {
    showToast('Klik op woorden die je niet kent.');
  }
}

function clearUnknownWord(word) {
  const k = _normalizeWord(word);
  if (!k) return;
  const map = _unknownWords();
  if (map[k]) {
    delete map[k];
    _saveUnknownWords(map);
  }
  // Also remove the highlight in current reading view
  document.querySelectorAll('.tts-word.tts-unknown').forEach(function(el) {
    if (_normalizeWord(el.textContent) === k) el.classList.remove('tts-unknown');
  });
  renderUnknownWords();
}

function clearAllUnknownWords() {
  if (!confirm('Alle gemarkeerde woorden verwijderen?')) return;
  _saveUnknownWords({});
  document.querySelectorAll('.tts-word.tts-unknown').forEach(function(el) {
    el.classList.remove('tts-unknown');
  });
  renderUnknownWords();
}

// Sorted list of {key, word} for the practice session iterator.
function _unknownWordsSorted() {
  const map = _unknownWords();
  return Object.keys(map).sort().map(function(k) { return { key: k, word: map[k] }; });
}

function _buildUnknownWordsHTML(list) {
  if (_practiceUnknownActive) return _renderPracticeCard(list);

  return '<div class="reading-unknown-header">' +
      '<h3 class="reading-section-title">Alle moeilijke woorden · All difficult words <span class="reading-unknown-count">(' + list.length + ')</span></h3>' +
      '<div class="reading-unknown-actions">' +
        '<button class="btn btn-primary btn-small" onclick="startUnknownPractice()">📚 Oefenen · Practice</button>' +
        '<button class="btn btn-secondary btn-small" onclick="clearAllUnknownWords()">🗑 Alles wissen</button>' +
      '</div>' +
    '</div>' +
    '<ul class="reading-unknown-list">' +
      list.map(function(item) {
        const w = item.word;
        const nlRaw = w.nl || item.key;
        const nlEsc = _escapeHtml(nlRaw);
        // Try local lookup as a lazy fill before falling back to online fetch
        const enText = w.en || _lookupTranslation(nlRaw);
        const isPending = _pendingTransFetches[item.key];
        let enHtml;
        if (enText) {
          enHtml = '<span class="reading-unknown-en">' + _escapeHtml(enText) + '</span>';
        } else if (isPending) {
          enHtml = '<span class="reading-unknown-en reading-unknown-en--pending">vertalen…</span>';
        } else {
          enHtml = '<span class="reading-unknown-en reading-unknown-en--missing">geen vertaling</span>';
        }
        const editBtn = '<button class="reading-unknown-edit" data-word="' + nlEsc +
          '" onclick="editUnknownTranslation(this.dataset.word)" aria-label="Vertaling bewerken" title="Vertaling bewerken">✏</button>';
        const src = _readingById(w.readingId);
        const srcHtml = src
          ? '<button class="reading-unknown-source" data-rid="' + _escapeHtml(w.readingId) +
            '" onclick="jumpToReadingById(this.dataset.rid)" title="Open de tekst">📖 ' +
            _escapeHtml(src.title) + '</button>'
          : '';
        return '<li class="reading-unknown-item">' +
          '<div class="reading-unknown-row">' +
            '<button class="reading-unknown-word" data-word="' + nlEsc +
              '" onclick="speakWord(this.dataset.word)" title="Klik om uit te spreken">🔊 ' + nlEsc + '</button>' +
            enHtml +
            editBtn +
            '<button class="reading-unknown-remove" data-word="' + nlEsc +
              '" onclick="clearUnknownWord(this.dataset.word)" aria-label="Verwijderen" title="Verwijderen">✕</button>' +
          '</div>' +
          (srcHtml ? '<div class="reading-unknown-meta">' + srcHtml + '</div>' : '') +
          '</li>';
      }).join('') +
    '</ul>';
}

// Kick off background MyMemory fetches for any entry that still has no translation.
// Called from renderUnknownWords *after* the DOM is updated so the user immediately
// sees "vertalen…" placeholders.
function _autoFetchMissingTranslations(list) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const w = item.word;
    if (w.en) continue;
    const local = _lookupTranslation(w.nl || item.key);
    if (local) continue;
    _fetchTranslation(w.nl || item.key);
  }
}

function renderSessionWords() {
  const el = document.getElementById('reading-session-words');
  if (!el) return;
  if (typeof readingTexts === 'undefined' || !readingTexts.length) { el.innerHTML = ''; return; }
  const t = readingTexts[_currentReadingIndex()];
  const list = _unknownWordsSorted().filter(function(item) { return item.word.readingId === t.id; });
  if (!list.length) { el.innerHTML = ''; return; }
  el.innerHTML = '<h3 class="reading-section-title">Gemarkeerde woorden · Words you marked in this text <span class="reading-unknown-count">(' + list.length + ')</span></h3>' +
    '<ul class="reading-unknown-list">' +
    list.map(function(item) {
      const w = item.word;
      const nlRaw = w.nl || item.key;
      const nlEsc = _escapeHtml(nlRaw);
      const enText = w.en || _lookupTranslation(nlRaw);
      const isPending = _pendingTransFetches[item.key];
      let enHtml;
      if (enText) {
        enHtml = '<span class="reading-unknown-en">' + _escapeHtml(enText) + '</span>';
      } else if (isPending) {
        enHtml = '<span class="reading-unknown-en reading-unknown-en--pending">vertalen…</span>';
      } else {
        enHtml = '<span class="reading-unknown-en reading-unknown-en--missing">geen vertaling</span>';
      }
      return '<li class="reading-unknown-item">' +
        '<div class="reading-unknown-row">' +
          '<button class="reading-unknown-word" data-word="' + nlEsc +
            '" onclick="speakWord(this.dataset.word)" title="Klik om uit te spreken">🔊 ' + nlEsc + '</button>' +
          enHtml +
          '<button class="reading-unknown-remove" data-word="' + nlEsc +
            '" onclick="clearUnknownWord(this.dataset.word)" aria-label="Verwijderen" title="Verwijderen">✕</button>' +
        '</div></li>';
    }).join('') +
    '</ul>';
}

function renderUnknownWords() {
  const list = _unknownWordsSorted();
  const html = list.length ? _buildUnknownWordsHTML(list) : '';

  // In-reading section (Lezen tab): hide entirely when empty
  const readingEl = document.getElementById('reading-unknown-words');
  if (readingEl) readingEl.innerHTML = html;

  // Dedicated "Mijn woorden" tab: always render (with empty-state message)
  const mwContent = document.getElementById('mijnwoorden-content');
  const mwEmpty = document.getElementById('mijnwoorden-empty');
  if (mwContent) mwContent.innerHTML = html;
  if (mwEmpty) mwEmpty.style.display = list.length ? 'none' : '';

  // Keep per-text session words in sync
  renderSessionWords();

  // Fire MyMemory fetches in the background for entries that still lack a translation
  if (list.length) _autoFetchMissingTranslations(list);
}

function renderMijnWoorden() {
  // Just delegate — renderUnknownWords already targets both containers.
  renderUnknownWords();
}

// ── Practice session ─────────────────────────────────────────────────────────
let _practiceUnknownActive = false;
let _practiceUnknownIdx = 0;

function startUnknownPractice() {
  const list = _unknownWordsSorted();
  if (!list.length) return;
  _practiceUnknownActive = true;
  _practiceUnknownIdx = 0;
  renderUnknownWords();
  // Scroll into view so the user sees the card
  const el = document.getElementById('reading-unknown-words');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeUnknownPractice() {
  _practiceUnknownActive = false;
  renderUnknownWords();
}

function nextPracticeWord() {
  const list = _unknownWordsSorted();
  if (!list.length) { closeUnknownPractice(); return; }
  _practiceUnknownIdx = (_practiceUnknownIdx + 1) % list.length;
  renderUnknownWords();
}

function prevPracticeWord() {
  const list = _unknownWordsSorted();
  if (!list.length) { closeUnknownPractice(); return; }
  _practiceUnknownIdx = (_practiceUnknownIdx - 1 + list.length) % list.length;
  renderUnknownWords();
}

function markPracticeKnown() {
  const list = _unknownWordsSorted();
  if (!list.length) { closeUnknownPractice(); return; }
  const cur = list[_practiceUnknownIdx];
  if (cur) clearUnknownWord(cur.word.nl || cur.key);
  // After deletion, _unknownWordsSorted shrinks; clamp index
  const newList = _unknownWordsSorted();
  if (!newList.length) { closeUnknownPractice(); return; }
  if (_practiceUnknownIdx >= newList.length) _practiceUnknownIdx = 0;
  renderUnknownWords();
}

function jumpToReadingById(id) {
  if (typeof readingTexts === 'undefined') return;
  let idx = -1;
  for (let i = 0; i < readingTexts.length; i++) {
    if (readingTexts[i].id === id) { idx = i; break; }
  }
  if (idx < 0) return;
  closeUnknownPractice();
  _stopAudio();
  switchTab('lezen');
  openReadingText(idx);
  const el = document.getElementById('reading-text');
  if (el) setTimeout(function() { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 0);
}

function _renderPracticeCard(list) {
  if (!list.length) return '';
  if (_practiceUnknownIdx >= list.length) _practiceUnknownIdx = 0;
  const cur = list[_practiceUnknownIdx];
  const w = cur.word;
  const nlRaw = w.nl || cur.key;
  const nlEsc = _escapeHtml(nlRaw);
  const enText = w.en || _lookupTranslation(nlRaw);
  const isPending = _pendingTransFetches[cur.key];
  let enHtml;
  if (enText) {
    enHtml = '<div class="practice-en">' + _escapeHtml(enText) +
      ' <button class="practice-en-edit" data-word="' + nlEsc +
      '" onclick="editUnknownTranslation(this.dataset.word)" aria-label="Bewerken" title="Bewerken">✏</button></div>';
  } else if (isPending) {
    enHtml = '<div class="practice-en practice-en--missing">vertalen…</div>';
  } else {
    enHtml = '<div class="practice-en practice-en--missing">geen vertaling beschikbaar' +
      ' <button class="practice-en-edit" data-word="' + nlEsc +
      '" onclick="editUnknownTranslation(this.dataset.word)" aria-label="Handmatig invullen" title="Handmatig invullen">✏</button></div>';
  }
  const src = _readingById(w.readingId);
  const srcHtml = src
    ? '<div class="practice-source">📖 Uit: <button class="practice-source-btn" data-rid="' +
      _escapeHtml(w.readingId) + '" onclick="jumpToReadingById(this.dataset.rid)">' +
      _escapeHtml(src.title) + '</button></div>'
    : '<div class="practice-source practice-source--missing">Bron onbekend</div>';
  const addedAt = w.addedAt ? '<div class="practice-added">Gemarkeerd op ' + _escapeHtml(w.addedAt) + '</div>' : '';

  return '<div class="practice-card">' +
    '<div class="practice-header">' +
      '<h3 class="reading-section-title">📚 Oefenen · Practice</h3>' +
      '<button class="practice-close" onclick="closeUnknownPractice()" aria-label="Sluiten" title="Sluiten">✕</button>' +
    '</div>' +
    '<div class="practice-counter">' + (_practiceUnknownIdx + 1) + ' / ' + list.length + '</div>' +
    '<div class="practice-word">' + nlEsc + '</div>' +
    '<button class="practice-listen" data-word="' + nlEsc +
      '" onclick="speakWord(this.dataset.word)" title="Luisteren">🔊 Luisteren</button>' +
    enHtml +
    srcHtml +
    addedAt +
    '<div class="practice-actions">' +
      '<button class="btn btn-secondary" onclick="prevPracticeWord()">← Vorige</button>' +
      '<button class="btn btn-primary" onclick="markPracticeKnown()">✓ Ik ken het nu</button>' +
      '<button class="btn btn-secondary" onclick="nextPracticeWord()">Volgende →</button>' +
    '</div>' +
    '</div>';
}

// ── READING AUDIO (Web Speech API) ────────────────────────────────────────────
// Best quality in Microsoft Edge, which exposes Microsoft's neural cloud voices.
// Chrome falls back to local SAPI voices and sounds robotic.

let _ttsFixInterval = null;
let _cachedDutchVoice = null;
let _ttsActive = false;       // true between speak() and onend/onerror/stop
let _userPaused = false;      // user clicked pause (separate from keepalive pause/resume)
const TTS_RATE = 0.85;        // slow enough for A2 learners
const TTS_RATE_WORD = 0.85;

// Microsoft's most natural Dutch neural voices, in preference order.
// "Fenna" and "Maarten" are the nl-NL Online Natural voices Edge ships;
// they sound dramatically more human than older SAPI voices.
const PREFERRED_DUTCH_VOICES = ['fenna', 'maarten', 'colette', 'arnaud', 'dena'];

function _pickBestDutchVoice(voices) {
  const dutch = voices.filter(function(v) {
    return v.lang === 'nl-NL' || v.lang === 'nl-BE' || v.lang.startsWith('nl');
  });
  if (!dutch.length) return null;

  // Tier 1 — preferred neural names (Edge "Online Natural")
  for (let i = 0; i < PREFERRED_DUTCH_VOICES.length; i++) {
    const name = PREFERRED_DUTCH_VOICES[i];
    const v = dutch.find(function(v) {
      const n = v.name.toLowerCase();
      return n.includes(name) && (n.includes('online') || n.includes('natural') || n.includes('neural'));
    });
    if (v) return v;
  }
  // Tier 2 — any neural/online Dutch voice
  const neural = dutch.find(function(v) {
    const n = v.name.toLowerCase();
    return n.includes('online') || n.includes('natural') || n.includes('neural');
  });
  if (neural) return neural;
  // Tier 3 — Google Dutch (Chrome online)
  const google = dutch.find(function(v) { return v.name.toLowerCase().includes('google'); });
  if (google) return google;
  // Tier 4 — any nl-NL voice
  const nlNL = dutch.find(function(v) { return v.lang === 'nl-NL'; });
  return nlNL || dutch[0];
}

if (window.speechSynthesis) {
  const initVoice = function() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) _cachedDutchVoice = _pickBestDutchVoice(voices);
  };
  window.speechSynthesis.onvoiceschanged = initVoice;
  initVoice();
}

// ── Word-highlighting cache (built once per playback) ───────────────────────
let _ttsWordSpans = [];   // [{el, start}] sorted by start
let _ttsActiveIdx = -1;

function _cacheTTSWordSpans() {
  _ttsWordSpans = [];
  _ttsActiveIdx = -1;
  const root = document.getElementById('reading-text');
  if (!root) return;
  const nodes = root.querySelectorAll('[data-tts-start]');
  for (let i = 0; i < nodes.length; i++) {
    const start = parseInt(nodes[i].getAttribute('data-tts-start'), 10);
    if (!isNaN(start)) _ttsWordSpans.push({ el: nodes[i], start: start });
  }
}

function _highlightTTSAt(charIndex) {
  if (!_ttsWordSpans.length) return;
  // Binary search for largest start <= charIndex
  let lo = 0, hi = _ttsWordSpans.length - 1, best = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (_ttsWordSpans[mid].start <= charIndex) { best = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  if (best < 0 || best === _ttsActiveIdx) return;
  if (_ttsActiveIdx >= 0 && _ttsWordSpans[_ttsActiveIdx]) {
    _ttsWordSpans[_ttsActiveIdx].el.classList.remove('tts-active');
  }
  _ttsActiveIdx = best;
  const el = _ttsWordSpans[best].el;
  el.classList.add('tts-active');
  // Auto-scroll only when the word is off-screen
  const rect = el.getBoundingClientRect();
  const inView = rect.top >= 80 && rect.bottom <= window.innerHeight - 80;
  if (!inView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function _clearTTSHighlight() {
  if (_ttsActiveIdx >= 0 && _ttsWordSpans[_ttsActiveIdx]) {
    _ttsWordSpans[_ttsActiveIdx].el.classList.remove('tts-active');
  }
  _ttsActiveIdx = -1;
}

// ── Keepalive (Chromium throttles speechSynthesis after ~15s) ───────────────
function _startKeepalive() {
  if (_ttsFixInterval) return;
  _ttsFixInterval = setInterval(function() {
    if (!window.speechSynthesis.speaking || _userPaused) {
      clearInterval(_ttsFixInterval); _ttsFixInterval = null; return;
    }
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
  }, 10000);
}

function _stopKeepalive() {
  if (_ttsFixInterval) { clearInterval(_ttsFixInterval); _ttsFixInterval = null; }
}

// ── Public audio API ────────────────────────────────────────────────────────
function _stopAudio() {
  _stopKeepalive();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  _ttsActive = false;
  _userPaused = false;
  _clearTTSHighlight();
  _updateAudioBtn();
}

function _updateAudioBtn() {
  const playBtn = document.getElementById('reading-audio-btn');
  const pauseBtn = document.getElementById('reading-pause-btn');
  if (playBtn) {
    if (_ttsActive) {
      playBtn.textContent = '⏹ Stop';
      playBtn.classList.add('reading-audio-btn--active');
    } else {
      playBtn.textContent = '🔊 Luisteren';
      playBtn.classList.remove('reading-audio-btn--active');
    }
  }
  if (pauseBtn) {
    pauseBtn.style.display = _ttsActive ? '' : 'none';
    pauseBtn.textContent = _userPaused ? '▶ Verder' : '⏸ Pauzeren';
  }
}

function _speakText(text, rate, onEnd) {
  if (!window.speechSynthesis) return;
  _stopAudio();
  _cacheTTSWordSpans();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'nl-NL';
  utt.rate = rate || TTS_RATE;
  utt.pitch = 1.0;
  if (_cachedDutchVoice) utt.voice = _cachedDutchVoice;
  utt.onboundary = function(e) {
    if (e.name && e.name !== 'word') return;
    if (typeof e.charIndex === 'number') _highlightTTSAt(e.charIndex);
  };
  utt.onend = function() {
    _stopKeepalive();
    _ttsActive = false;
    _userPaused = false;
    _clearTTSHighlight();
    _updateAudioBtn();
    if (onEnd) onEnd();
  };
  utt.onerror = function() {
    _stopKeepalive();
    _ttsActive = false;
    _userPaused = false;
    _clearTTSHighlight();
    _updateAudioBtn();
  };
  _ttsActive = true;
  _userPaused = false;
  window.speechSynthesis.speak(utt);
  _startKeepalive();
  _updateAudioBtn();
}

function toggleReadingAudio() {
  if (!window.speechSynthesis) {
    if (typeof showToast === 'function') showToast('Je browser ondersteunt geen spraak.');
    return;
  }
  if (_ttsActive) { _stopAudio(); return; }
  const t = readingTexts[_currentReadingIndex()];
  if (!t) return;
  _speakText(t.text, TTS_RATE, null);
}

function togglePauseAudio() {
  if (!window.speechSynthesis || !_ttsActive) return;
  if (_userPaused) {
    _userPaused = false;
    window.speechSynthesis.resume();
    _startKeepalive();
  } else {
    _userPaused = true;
    _stopKeepalive();
    window.speechSynthesis.pause();
  }
  _updateAudioBtn();
}

function speakWord(word) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  _stopKeepalive();
  const utt = new SpeechSynthesisUtterance(word);
  utt.lang = 'nl-NL';
  utt.rate = TTS_RATE_WORD;
  utt.pitch = 1.0;
  if (_cachedDutchVoice) utt.voice = _cachedDutchVoice;
  window.speechSynthesis.speak(utt);
}
