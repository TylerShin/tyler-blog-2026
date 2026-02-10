---
title: "Running Battle.net Games on Linux with Bottles (CachyOS/Arch + KDE + NVIDIA)"
summary: "How to install Battle.net and run games on Linux using Bottles (Flatpak). Changing the Runner is essential."
date: 2026-02-10
tags: ["Linux", "Bottles", "Battle.net", "Gaming", "Arch", "KDE"]
lang: en
translationKey: "linux-bottles-battlenet"
heroImage: "/assets/blog/linux-bottles-battlenet/hero.png"
heroImageAlt: "A stylized wine bottle and game launcher elements on a Linux desktop"
---

## TL;DR

1.  **Install Bottles (Flatpak)**
2.  **Create a Gaming Bottle**
3.  **Install Battle.net** (Select directly from the app list, Rated GOLD)
4.  **Change Runner (MANDATORY)**: You MUST switch the default Runner to `GE-Proton` or `Proton-GE` to avoid crashes.
5.  **(Optional) Fix Fonts**: Install `cjkfonts` and `gdiplus` to fix missing text in the launcher.

---

## Guide

### Environment

- **OS**: CachyOS (Arch-based)
- **Desktop**: KDE Plasma
- **GPU**: NVIDIA
- **Method**: Bottles (Flatpak)

### 1) Install Bottles (Flatpak)

Even on Arch Linux (CachyOS), the Flatpak version is recommended for better sandbox environment and dependency management.

```bash
sudo pacman -Syu flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak install flathub com.usebottles.bottles
flatpak run com.usebottles.bottles
```

### 2) Create a New Bottle (Gaming)

After launching Bottles, click **Create new Bottle** and select **Gaming** as the type.
This automatically configures essential environments like DXVK, vkd3d, and LatencyFleX, which is very convenient.

### 3) Install Battle.net (Important: Use the "Install Programs" menu)

While you can download the Battle.net installer (.exe) separately, it's easier to use Bottles' built-in feature.

- Enter the created Bottle → Click **Install Programs**.
- Find **Battle.net** in the list and click the download icon.

Battle.net is rated **GOLD** in Bottles, meaning it runs relatively stably on Linux.

### 4) Adding/Changing Runner is "MANDATORY" (Emphasis)

This is the most critical step. Running Battle.net with the default Bottles Runner (e.g., Soda, System Wine) often causes:

- Immediate crashes.
- Infinite loading on the login screen.
- `wine: Unhandled exception 0x80000003 ... starting debugger...` errors.

Therefore, **it is essential to change the Runner to a GE-Proton/Proton-GE variant.**

#### How to proceed

1.  Bottle Settings (Top right gear icon) → **Runner / Runners** tab.
2.  In the **Install/Download** menu, download the latest version of `GE-Proton` or `Proton-GE`.
3.  Go back to the main screen and select the downloaded **GE-Proton** from the **Runner** dropdown menu.
4.  Close settings and launch Battle.net.

> [!TIP]
> If your existing Bottle is already messed up, it's faster to **create a new Bottle** and set the Runner to GE-Proton _before_ installing Battle.net.

### 5) (Optional) Fix Broken/Missing Korean Fonts in Launcher

Games usually display fonts correctly, but the Battle.net launcher UI might have missing or broken text. This is due to missing fonts and rendering libraries.

- Bottle → **Dependencies** menu.
- Search for and install:
  - `cjkfonts` (Korean/Chinese/Japanese fonts)
  - `gdiplus` (Graphics rendering library)

If text is still missing, try applying font smoothing settings via winetricks.

```bash
winetricks settings fontsmooth=rgb
```

After applying, fully close the launcher (including the tray icon) and restart.

---

## Conclusion

- Battle.net can be easily installed via the **Install menu** in Bottles.
- However, **changing the Runner to GE-Proton** is crucial for it to work.
- Font issues can be mostly resolved by installing `dependencies`, and gameplay is not affected.
