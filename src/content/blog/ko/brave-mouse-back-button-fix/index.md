---
title: "Arch Linux + Niri 환경에서 Brave 브라우저 마우스 뒤로가기 중복 입력 문제 해결"
summary: "Arch Linux와 Niri 환경에서 Brave 브라우저 뒤로가기 버튼이 두 번 눌리는 현상 해결 방법 정리."
date: 2026-01-29
tags: ["Arch Linux", "Niri", "Wayland", "Brave", "Troubleshooting"]
lang: ko
translationKey: "brave-mouse-back-button-fix"
---

## TL;DR

Brave가 XWayland가 아닌 **Wayland Native**로 실행되도록 `~/.config/brave-flags.conf` 설정.

```bash
# ~/.config/brave-flags.conf
--ozone-platform-hint=auto
```

설정 후 Brave 완전히 종료했다가 재시작 (`chrome://gpu`에서 Ozone platform: wayland 확인).

## 본문

최근 Arch Linux와 Niri(Wayland Scrollable Tiling Compositor) 환경에서 Brave 브라우저 사용 시 마우스 뒤로가기 버튼(Mouse Button 4/5)을 누르면 페이지가 두 번 뒤로 가는 현상이 발생함. 원인과 해결 방법을 정리함.

### 문제 상황

- **OS**: Arch Linux
- **Compositor**: Niri (Wayland)
- **Browser**: Brave
- **증상**: 마우스 뒤로가기 버튼 클릭 시 이벤트가 중복 발생하여 전전 페이지로 이동.

### 원인 분석 (Root Cause)

**XWayland**와 관련된 문제임.
Brave(및 Chromium 기반 브라우저)는 기본적으로 Wayland 환경에서도 X11 호환성 레이어인 XWayland를 통해 실행되는 경우가 많음.

이때 Wayland 컴포지터(Niri)와 X11 클라이언트(Brave) 간 입력 이벤트 처리 과정에서 충돌이나 중복 전달이 발생할 수 있음. 특히 마우스 보조 버튼(Back/Forward) 입력이 X11과 Wayland 양쪽에서 인식되거나, 릴리즈(release) 이벤트 처리가 불안정해 더블 클릭으로 오인되는 버그가 있음.

### 해결 방법 (Solution)

브라우저를 **Wayland 네이티브**로 실행되도록 강제하면 입력 이벤트가 정상 처리됨.
Brave(Chromium)의 `Ozone` 추상화 계층 설정을 변경해주면 됨.

#### 설정 방법

홈 디렉토리의 설정 파일(`~/.config/brave-flags.conf`)에 플래그 추가.

```bash
# ~/.config/brave-flags.conf
--ozone-platform-hint=auto
```

*   `--ozone-platform-hint=auto`: 시스템이 Wayland면 자동으로 Wayland 백엔드 사용. (명시적으로 `--ozone-platform=wayland` 사용 가능)

설정 후 Brave를 **완전히 종료 후 재시작**하면 해결됨.
주소창에 `chrome://gpu`를 입력하여 **Ozone platform** 항목이 `wayland`인지 확인 가능.

## References

1.  **ArchWiki - Chromium (Native Wayland support)**:
    Chromium 기반 브라우저에서 Wayland 활성화 방법 공식 문서.
    https://wiki.archlinux.org/title/Chromium#Native_Wayland_support

2.  **Brave Community & GitHub Issues**:
    유사한 마우스 입력 문제(Double click bugs on Linux) 다수 보고됨, Wayland 네이티브 구동으로 해결 사례 확인.
