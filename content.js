let settings = { enabled: true, sites: {} };

// Load settings at startup (synchronous check on click)
chrome.storage.sync.get(['enabled', 'sites'], result => {
  settings.enabled = result.enabled ?? true;
  settings.sites   = result.sites   ?? {};
});

// Keep in sync when changed from popup
chrome.storage.onChanged.addListener(changes => {
  if (changes.enabled) settings.enabled = changes.enabled.newValue;
  if (changes.sites)   settings.sites   = changes.sites.newValue;
});

document.addEventListener('click', function (e) {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.href;
  if (!href || link.protocol === 'javascript:') return;

  // Skip same-page anchors
  if (
    link.hash &&
    link.origin   === location.origin &&
    link.pathname === location.pathname &&
    link.search   === location.search
  ) return;

  if (!settings.enabled) return;

  const mode = settings.sites[location.hostname] ?? 'disabled';
  if (mode === 'disabled') return;

  e.preventDefault();
  e.stopImmediatePropagation();

  chrome.runtime.sendMessage({ url: href, mode });
}, true);
