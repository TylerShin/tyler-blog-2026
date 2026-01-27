---
title: "Linux 카카오톡 설치 및 한글 설정 (ulagbulag/kakaotalk)"
summary: "Linux 환경에서 카카오톡 설치 및 한글 설정 방법 정리."
date: 2026-01-27
tags: ["Linux", "Arch", "KakaoTalk", "카카오톡"]
lang: ko
---

## TL;DR

### Arch Linux (AUR)

```bash
paru -S kakaotalk
# or
yay -S kakaotalk
```

### Ubuntu / Debian

```bash
# 의존성 설치
sudo apt-get install bash curl desktop-file-utils wine xdg-utils

# 설치
git clone https://github.com/ulagbulag/kakaotalk.git
cd kakaotalk
sudo ./install.sh
```

## 본문

Linux 환경에서 카카오톡 설치와 한글 설정을 돕는 [ulagbulag/kakaotalk](https://github.com/ulagbulag/kakaotalk) 사용법을 정리함.

이 스크립트는 Wine 설정, 폰트 설치, 한글 입력기 연동 과정을 자동화해주어 매우 편리함.

### 설치

#### Arch Linux

AUR 패키지로 간편하게 설치할 수 있음.

```bash
paru -S kakaotalk
```

#### Ubuntu 및 기타 배포판

`install.sh` 스크립트를 직접 실행하여 설치함.

```bash
sudo ./install.sh
# 또는 사용자 전용 설치
. ./install.sh
```

### 특징

- Wine Prefix 자동 구성 및 최적화가 적용됨.
- 한글 폰트(굴림)가 자동 설치되어 깨짐을 방지함.
- 데스크탑 바로가기(.desktop)가 생성됨.

## References

- [ulagbulag/kakaotalk](https://github.com/ulagbulag/kakaotalk) - KakaoTalk One-Shot Installer for Linux

> [!CAUTION]
> 외부 스크립트 실행 전, 특히 `paru`나 `yay`를 통한 AUR 패키지 설치 시에는 PKGBUILD와 관련 스크립트 내용을 먼저 확인하는 것을 권장함.
