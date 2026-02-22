# OpenMode

A Chrome extension that gives you precise control over how links open — per site.

“Take back control of how websites open links.”

![OpenMode popup](preview.png)

---

## Why it’s valuable

Most sites assume how you want links to open. Sometimes they replace your current tab. Sometimes they open new ones. It’s inconsistent — and it breaks flow.

OpenMode fixes that.

### 1. Protect your focus

Researching, reading docs, or working in a web app?
Set a site to **BG** and explore links without losing context.

### 2. Reduce tab chaos

Some sites aggressively open new tabs.
Set them to **OFF** and keep your workspace clean.

### 3. Optimize deep work

Working in tools like dashboards, admin panels, or knowledge bases?
Choose exactly how navigation behaves so it matches your workflow.

### 4. Save micro-decisions

No more constant ⌘+click vs normal click decisions.
Your rule is remembered per site.

### 5. Stay in control

A global toggle lets you disable everything instantly without losing your per-site rules.

Small change. Massive cumulative time savings.

---

## How it works

By default the extension does nothing — all sites behave normally. You opt in per site by clicking the extension icon and choosing a mode.

**BG** — opens links in a background tab (you stay on the current page, like ⌘+click on Mac)
**FG** — opens links in a foreground tab (switches to the new tab)
**OFF** — normal browser behavior (default for all sites)

---

## Install

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked** and select this folder

---

## Files

```
manifest.json   extension config
content.js      intercepts link clicks on every page
background.js   opens tabs + draws the toolbar icon
popup.html/css/js   the settings UI
```

---

## Usage

1. Visit a site where you want links to open in new tabs
2. Click the extension icon in the toolbar
3. Set **This site** to **BG** or **FG**
4. Your rule is saved — manage all rules under **Saved rules**
