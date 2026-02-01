---
title: "Setting up niri and kime Input Method on Arch (CachyOS)"
summary: "A guide on setting up niri and the kime Korean input method on Arch Linux (CachyOS)."
date: 2026-01-23
tags: ["Linux", "Arch", "CachyOS", "kime", "niri"]
lang: en
---

## TL;DR

Install kime
```bash
# Compile for qt6 might fail if not using the git version (as of writing date).
$ paru -S kime-git
# or
$ yay -S kime-git
```

Copy default kime configuration
```bash
mkdir -p ~/.config/kime
cp /usr/share/doc/kime/default_config.yaml ~/.config/kime/config.yaml
```

Set Right Alt (RALT) as the Korean input key using dbus.

## Content

Documenting the process of setting up the niri window manager and kime Korean input method on Arch Linux-based CachyOS.

### Installing kime

```bash
paru -S kime-git
# or
yay -S kime-git
```

Compile errors related to Qt6 may occur if not using the git version.

### Setting Environment Variables

Add the following to `~/.profile` or your shell configuration:

```bash
export GTK_IM_MODULE=kime
export QT_IM_MODULE=kime
export XMODIFIERS=@im=kime
```

### kime Configuration

Copy the default configuration file:

```bash
mkdir -p ~/.config/kime
cp /usr/share/doc/kime/default_config.yaml ~/.config/kime/config.yaml
```

Modify `~/.config/kime/config.yaml` if you need to customize key bindings.

After restarting, verify Korean-English switching with Win+Space (or your configured key).
