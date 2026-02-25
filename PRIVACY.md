# Privacy Policy for OpenMode

**Last updated:** February 25, 2026

## Overview

OpenMode is a Chrome extension that lets you control how links open on a per-site basis. Your privacy is important — this extension is designed to work entirely locally on your device.

## Data Collection

OpenMode does **not** collect, transmit, or share any personal or sensitive user data.

## Data Storage

OpenMode stores your per-site preferences (site hostname and chosen mode) using Chrome's local storage API (`chrome.storage.local`). This data:

- Never leaves your device
- Is not transmitted to any server
- Is not shared with any third party
- Is only used to remember your link-opening preferences per site

## Permissions

- **`tabs`** — Used to open links in new tabs (background or foreground) based on your chosen mode.
- **`storage`** — Used to save your per-site preferences locally on your device.
- **`<all_urls>` (content script)** — Required so the extension can intercept link clicks on any website you choose to configure.

## Third-Party Services

OpenMode does not use any third-party services, analytics, or tracking.

## Changes to This Policy

If this privacy policy is updated, the changes will be reflected in this document with an updated date.

## Contact

If you have questions about this privacy policy, please open an issue on the [GitHub repository](https://github.com/thatjimmi/openmode/issues).
