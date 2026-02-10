---
title: "Linux에서 Bottles로 Battle.net 게임 실행하기 (CachyOS/Arch + KDE + NVIDIA)"
summary: "Bottles(Flatpak)를 사용하여 리눅스에서 Battle.net을 설치하고 게임을 실행하는 방법. Runner 변경 필수."
date: 2026-02-10
tags: ["Linux", "Bottles", "Battle.net", "Gaming", "Arch", "KDE"]
lang: ko
translationKey: "linux-bottles-battlenet"
heroImage: "/assets/blog/linux-bottles-battlenet/hero.png"
heroImageAlt: "A stylized wine bottle and game launcher elements on a Linux desktop"
---

## TL;DR

1.  **Bottles(Flatpak) 설치**
2.  **Gaming 타입 Bottle 생성**
3.  **Battle.net 설치** (앱 목록에서 선택 가능, GOLD 등급)
4.  **Runner 변경 (필수)**: 기본 Runner 대신 `GE-Proton` 또는 `Proton-GE` 사용해야 크래시 없음.
5.  **(옵션) 폰트 설정**: `cjkfonts`, `gdiplus` 설치로 런처 글자 깨짐 해결.

---

## 본문

### 환경

- **OS**: CachyOS (Arch 기반)
- **Desktop**: KDE Plasma
- **GPU**: NVIDIA
- **Method**: Bottles (Flatpak)

### 1) Bottles 설치 (Flatpak)

Arch Linux(CachyOS) 환경이지만 샌드박스 환경과 의존성 관리가 편한 Flatpak 버전을 추천함.

```bash
sudo pacman -Syu flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak install flathub com.usebottles.bottles
flatpak run com.usebottles.bottles
```

### 2) 새 Bottle 만들기 (Gaming)

Bottles 실행 후 **Create new Bottle**을 클릭하고 타입을 **Gaming**으로 생성함.
이렇게 하면 DXVK, vkd3d, LatencyFleX 등 게임에 필요한 필수 환경이 자동으로 구성되어 매우 편리함.

### 3) Battle.net 설치 (중요: “앱에서 선택 설치” 가능)

Battle.net 설치 파일(.exe)을 따로 다운로드해서 실행할 수도 있지만, Bottles 내부 기능을 이용하면 더 간단함.

- 생성한 Bottle로 진입 → **Install Programs(설치 메뉴)** 클릭.
- 목록에서 **Battle.net**을 찾아 다운로드 아이콘 클릭.

Bottles에서 Battle.net은 **지원 등급이 GOLD**로 분류되어 있어, 리눅스 환경에서도 비교적 안정적으로 구동됨.

### 4) Runner(실행기) 추가/변경은 사실상 “필수” (강조)

이 부분이 가장 중요함. Battle.net은 Bottles 기본 Runner(예: Soda, 시스템 Wine)로 실행 시 다음과 같은 문제가 발생할 수 있음.

- 실행 직후 크래시.
- 로그인 화면 무한 로딩.
- `wine: Unhandled exception 0x80000003 ... starting debugger...` 오류.

따라서 **Runner를 GE-Proton/Proton-GE 계열로 변경하는 것이 필수적**임.

#### 진행 방법

1.  Bottle 설정(우측 상단 톱니바퀴) → **Runner / Runners** 탭 진입.
2.  **Install/Download** 메뉴에서 `GE-Proton` 또는 `Proton-GE` 최신 버전을 다운로드.
3.  다시 메인 화면으로 돌아와 **Runner** 드롭다운 메뉴에서 방금 받은 GE-Proton을 선택.
4.  설정 종료 후 Battle.net 실행.

> [!TIP]
> 만약 이미 설치된 Bottle이 꼬였다면, **새 Bottle을 만든 뒤** 처음부터 GE-Proton Runner로 지정하고 Battle.net을 설치하는 것이 정신 건강에 이로움.

### 5) (옵션) Battle.net 런처 한글 일부 깨짐/누락 개선

게임 내 한글은 정상 출력되지만, Battle.net 런처 UI에서 일부 글자가 누락되거나 깨져 보일 수 있음. 이는 폰트 및 렌더링 라이브러리 부재 때문임.

- Bottle → **Dependencies(종속성)** 메뉴 진입.
- 다음 항목들 검색하여 설치:
  - `cjkfonts` (한글/중국어/일어 폰트)
  - `gdiplus` (그래픽 렌더링 라이브러리)

만약 여전히 글자가 누락된다면 winetricks 설정으로 폰트 스무딩을 적용해볼 수 있음.

```bash
winetricks settings fontsmooth=rgb
```

설정 적용 후 런처를 완전히 종료(트레이 아이콘 포함)하고 재실행하면 개선됨.

---

## 결론

- Battle.net은 Bottles의 **Install 메뉴**로 쉽게 설치 가능.
- 하지만 **Runner를 GE-Proton 계열로 변경**하지 않으면 실행 자체가 어려울 수 있음.
- 한글 깨짐은 `dependencies` 설치로 대부분 해결 가능하며, 게임 플레이에는 지장 없음.
