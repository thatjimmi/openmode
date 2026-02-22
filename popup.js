let currentHost = '';
let settings = { enabled: true, sites: {} };

async function load() {
  const result = await chrome.storage.sync.get(['enabled', 'sites']);
  settings.enabled = result.enabled ?? true;
  settings.sites = result.sites ?? {};
}

async function save() {
  await chrome.storage.sync.set({ enabled: settings.enabled, sites: settings.sites });
}

// Move the sliding pill to the active button
function updatePill(seg) {
  const active = seg.querySelector('.seg-btn.active');
  const pill = seg.querySelector('.seg-pill');
  if (!active || !pill) return;
  pill.style.left  = active.offsetLeft + 'px';
  pill.style.width = active.offsetWidth + 'px';
}

function setMode(seg, mode) {
  seg.dataset.mode = mode;
  seg.querySelectorAll('.seg-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  requestAnimationFrame(() => updatePill(seg));
}

function makeSeg(mode, onChange) {
  const seg = document.createElement('div');
  seg.className = 'seg';
  seg.innerHTML = `
    <div class="seg-pill"></div>
    <button class="seg-btn" data-mode="background">BG</button>
    <button class="seg-btn" data-mode="foreground">FG</button>
    <button class="seg-btn" data-mode="disabled">OFF</button>
  `;
  seg.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(seg, btn.dataset.mode);
      onChange(btn.dataset.mode);
    });
  });
  setMode(seg, mode);
  return seg;
}

function renderRules() {
  const list  = document.getElementById('rules-list');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('rules-count');
  list.innerHTML = '';

  const entries = Object.entries(settings.sites);
  count.textContent = entries.length;

  if (entries.length === 0) { empty.classList.add('visible'); return; }
  empty.classList.remove('visible');

  entries.forEach(([domain, mode]) => {
    const row = document.createElement('div');
    row.className = 'rule-row';

    const label = document.createElement('span');
    label.className = 'domain';
    label.textContent = domain;
    label.title = domain;

    const seg = makeSeg(mode, newMode => {
      if (newMode === 'disabled') delete settings.sites[domain];
      else settings.sites[domain] = newMode;
      save();
      renderRules();
      if (domain === currentHost) setMode(document.getElementById('current-seg'), newMode);
    });

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.title = 'Remove rule';
    del.textContent = '×';
    del.addEventListener('click', () => {
      delete settings.sites[domain];
      save();
      renderRules();
      if (domain === currentHost) {
        setMode(document.getElementById('current-seg'), 'background');
      }
    });

    row.append(label, seg, del);
    list.appendChild(row);
  });

  // Update all pills after DOM insertion
  requestAnimationFrame(() => {
    list.querySelectorAll('.seg').forEach(updatePill);
  });
}

function initCurrentSite() {
  const domain = document.getElementById('current-domain');
  const seg = document.getElementById('current-seg');

  domain.textContent = currentHost || '—';

  if (!currentHost) {
    document.getElementById('current-row').style.opacity = '0.4';
    document.getElementById('current-row').style.pointerEvents = 'none';
    return;
  }

  const mode = settings.sites[currentHost] ?? 'disabled';
  setMode(seg, mode);

  seg.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const m = btn.dataset.mode;
      setMode(seg, m);
      if (m === 'disabled') delete settings.sites[currentHost];
      else settings.sites[currentHost] = m;
      save();
      renderRules();
    });
  });
}

function initGlobalToggle() {
  const toggle = document.getElementById('global-toggle');
  const body   = document.getElementById('app-body');
  toggle.checked = settings.enabled;
  body.classList.toggle('disabled', !settings.enabled);

  toggle.addEventListener('change', () => {
    settings.enabled = toggle.checked;
    body.classList.toggle('disabled', !settings.enabled);
    save();
  });
}

async function init() {
  await load();

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.url) {
      const url = new URL(tab.url);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        currentHost = url.hostname;
      }
    }
  } catch (_) {}

  initGlobalToggle();
  initCurrentSite();
  renderRules();
}

init();
