function getIconImageData(enabled) {
  const S = 128;
  const canvas = new OffscreenCanvas(S, S);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = enabled ? '#111118' : '#1a1a1e';
  ctx.beginPath();
  ctx.roundRect(0, 0, S, S, 22);
  ctx.fill();

  // Scale the same 15x15 SVG path used in popup.html
  const pad = 14;
  const sc = (S - pad * 2) / 15;
  const tx = x => pad + x * sc;
  const ty = y => pad + y * sc;

  ctx.strokeStyle = enabled ? '#4a9eff' : '#35354a';
  ctx.lineWidth = sc * 1.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Box (3/4 rounded rect, missing top-right corner)
  ctx.beginPath();
  ctx.moveTo(tx(6.5), ty(3.5));
  ctx.lineTo(tx(3),   ty(3.5));
  ctx.arcTo( tx(2),   ty(3.5), tx(2), ty(4.5),   sc);
  ctx.lineTo(tx(2),   ty(11.5));
  ctx.arcTo( tx(2),   ty(12.5), tx(3), ty(12.5),  sc);
  ctx.lineTo(tx(10),  ty(12.5));
  ctx.arcTo( tx(11),  ty(12.5), tx(11), ty(11.5), sc);
  ctx.lineTo(tx(11),  ty(8));
  ctx.stroke();

  // Arrow head (L)
  ctx.beginPath();
  ctx.moveTo(tx(9.5),  ty(1.5));
  ctx.lineTo(tx(13.5), ty(1.5));
  ctx.lineTo(tx(13.5), ty(5.5));
  ctx.stroke();

  // Diagonal arrow line
  ctx.beginPath();
  ctx.moveTo(tx(13.5), ty(1.5));
  ctx.lineTo(tx(7),    ty(8));
  ctx.stroke();

  return ctx.getImageData(0, 0, S, S);
}

async function updateIcon() {
  const { enabled = true } = await chrome.storage.sync.get('enabled');
  chrome.action.setIcon({ imageData: getIconImageData(enabled) });
}

chrome.runtime.onInstalled.addListener(updateIcon);
chrome.runtime.onStartup.addListener(updateIcon);
chrome.storage.onChanged.addListener(changes => {
  if ('enabled' in changes) updateIcon();
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.url) {
    chrome.tabs.create({ url: msg.url, active: msg.mode === 'foreground' });
  }
});
