---
title: "Arch(CachyOS) niri kime 입력기 설정"
summary: "Arch Linux(CachyOS)에서 niri와 kime 한글 입력기 설정 방법 정리."
date: 2026-01-23
tags: ["Linux", "Arch", "CachyOS", "kime", "niri"]
lang: ko
---

## TL;DR

kime 설치
```bash
# git 버전이 아니면 글쓴 날짜 기준 qt6 관련 컴파일이 실패함.
$ paru -S kime-git
# or
$ yay -S kime-git
```

kime 기본세팅 복사
```bash
mkdir -p ~/.config/kime
cp /usr/share/doc/kime/default_config.yaml ~/.config/kime/config.yaml
```

dbus를 사용해서 오른쪽 alt키(RALT)를 한글입력키로 설정

## 본문

Arch Linux 기반 CachyOS에서 niri 윈도우 매니저와 kime 한글 입력기 설정 과정 기록.

### kime 설치

```bash
paru -S kime-git
# or
yay -S kime-git
```

git 버전 미사용 시 Qt6 관련 컴파일 에러 발생 가능.

### 환경 변수 설정

`~/.profile` 또는 쉘 설정에 다음 추가:

```bash
export GTK_IM_MODULE=kime
export QT_IM_MODULE=kime
export XMODIFIERS=@im=kime
```

### kime 설정

기본 설정 파일 복사:

```bash
mkdir -p ~/.config/kime
cp /usr/share/doc/kime/default_config.yaml ~/.config/kime/config.yaml
```

필요 시 `~/.config/kime/config.yaml` 수정하여 키 바인딩 커스터마이징.

재시작 후 Win+Space로 한영 전환 확인.

