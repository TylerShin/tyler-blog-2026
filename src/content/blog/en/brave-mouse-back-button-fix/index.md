---
title: "Fixing Brave Browser Mouse Back Button Double Click Issue on Arch Linux + Niri"
summary: "A guide to solving the issue where the mouse back button triggers twice in Brave browser on Arch Linux with Niri."
date: 2026-01-29
tags: ["Arch Linux", "Niri", "Wayland", "Brave", "Troubleshooting"]
lang: en
translationKey: "brave-mouse-back-button-fix"
---

## TL;DR

Configure Brave to run as **Wayland Native** instead of using XWayland by editing `~/.config/brave-flags.conf`.

```bash
# ~/.config/brave-flags.conf
--ozone-platform-hint=auto
```

Restart Brave completely and check `chrome://gpu` to confirm **Ozone platform** is set to `wayland`.

## The Problem

I recently encountered an issue where clicking the mouse back button (Mouse Button 4/5) in Brave browser caused the page to go back twice on my Arch Linux system running Niri (Wayland Scrollable Tiling Compositor). This post documents the cause and solution.

### Symptom

- **OS**: Arch Linux
- **Compositor**: Niri (Wayland)
- **Browser**: Brave
- **Issue**: Clicking the mouse back button generates two events, causing the browser to navigate back two pages instead of one.

### Root Cause

The issue is related to **XWayland**.
By default, Brave (and other Chromium-based browsers) often run through **XWayland** (X11 compatibility layer) even in a Wayland environment.

When running via XWayland, conflicts or duplicate delivery of input events can occur between the Wayland compositor (Niri) and the X11 client (Brave). Specifically, auxiliary mouse button inputs (Back/Forward) might be recognized by both X11 and Wayland, or the release event handling might glitch, causing it to be misinterpreted as a double click.

### Solution

Forcing the browser to run as a **Wayland native** client ensures input events are handled correctly.

Brave (Chromium) uses an abstraction layer called `Ozone` to support various graphics/input systems. You can explicitly set this to Wayland.

#### Configuration

Add the following flag to your configuration file (`~/.config/brave-flags.conf`) in your home directory.

```bash
# Create or edit ~/.config/brave-flags.conf
--ozone-platform-hint=auto
```

*   `--ozone-platform-hint=auto`: Automatically uses the Wayland backend if the system is using Wayland. (You can also explicitly use `--ozone-platform=wayland`.)

After configuration, **completely quit and restart** Brave to resolve the issue.
To confirm it is applied correctly, type `chrome://gpu` in the address bar and check if **Ozone platform** is set to `wayland`.

## References

1.  **ArchWiki - Chromium (Native Wayland support)**:
    Official documentation on enabling Wayland in Chromium-based browsers.
    https://wiki.archlinux.org/title/Chromium#Native_Wayland_support

2.  **Brave Community & GitHub Issues**:
    Many similar mouse input issues (Double click bugs on Linux) have been reported, and most confirm that running natively on Wayland resolves them.
