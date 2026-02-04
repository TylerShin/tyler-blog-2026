---
title: "iOS Safari의 까다로운 Date 파싱와 \"Invalid Date\" 에러"
summary: "iOS Safari에서만 발생하는 Invalid Date(Invalid time value) 에러의 원인은 브라우저의 엄격한 Date 파싱 규칙 때문입니다."
date: 2026-02-04
tags: ["iOS", "Safari", "Troubleshooting", "Web"]
lang: ko
translationKey: "ios-safari-invalid-date-error"
---

## TL;DR

- **문제**: iOS Safari는 `new Date()`에 문자열을 넣을 때, ISO 8601 표준을 아주 엄격하게 따짐.
- **증상**: Chrome(PC)에서는 잘 되는 `"2026.01.21"` 같은 문자열이 iOS Safari에서는 `Invalid Date`가 됨.
- **해결**: 문자열을 직접 `new Date()`에 넣지 말고, 반드시 표준 포맷(`YYYY-MM-DDTHH:mm:ss`)으로 변환하거나 파싱 라이브러리를 통해 안전하게 변환해야 함.

## 본문

### 1. 문제 상황

개발 중 데스크톱 브라우저(Chrome, Firefox)에서는 잘 동작하던 날짜 관련 기능이, **이유 없이 아이폰(iOS Safari)에서만** 깨지거나 에러가 발생하는 경우가 있음.

```javascript
// 예시 코드
const date = new Date("2026.01.21");
console.log(date.toString());
```

- **Chrome / Desktop Safari**: 정상적으로 날짜 객체 생성됨.
- **iOS Safari**: `Invalid Date` 반환.

이 상태에서 이 날짜 객체를 사용해 포맷팅을 하거나 계산을 하려고 하면 `rangeError: Invalid time value` 같은 에러가 발생함.

### 2. 원인: 브라우저마다 다른 파싱 허용 범위

JavaScript 명세(ECMAScript)는 `Date.parse()`가 ISO 8601 포맷을 지원해야 한다고 명시하지만, **비표준 문자열**에 대해서는 "브라우저 마음대로(implementation-specific)" 처리하도록 둠.

- **Chrome**: "이 정도면 날짜겠네" 하고 융통성 있게 처리해줌. (띄어쓰기, 슬래시 등 허용)
- **iOS Safari**: "명세에 없는 포맷이네?" 하고 바로 `Invalid Date` 처리.

대표적으로 iOS Safari가 거부하는 패턴들:
1.  **날짜와 시간 사이 공백**: `"2025-01-01 10:00:00"` (❌ `T` 누락)
2.  **구분자로 점(.) 사용**: `"2026.01.21"` (❌ 표준 아님)
3.  **밀리초 등 미묘한 포맷 불일치**.

### 3. 해결 방법

**"브라우저가 알아서 파싱해주겠지"라는 기대를 버려야 함.**

가장 확실한 방법은 입력 데이터의 포맷을 고정하고, `new Date()`에 넘기기 전에 전처리를 하는 것임.

#### 방법 A: 표준 ISO 포맷 사용 (권장)

가능하다면 백엔드 API 응답 자체를 ISO 8601(`YYYY-MM-DDTHH:mm:ssZ`)로 맞추는 것이 가장 깔끔함.

```javascript
// ✅ 표준 포맷 (Good)
new Date("2025-12-25T10:30:00Z");
```

#### 방법 B: 문자열 치환 (차선책)

어쩔 수 없이 `YYYY-MM-DD HH:mm:ss` 포맷을 써야 한다면, 최소한 공백을 `T`로라도 바꿔줘야 함.

```javascript
const rawString = "2026.01.21";
const safeDate = new Date(rawString.replace(/\./g, "-")); // 2026-01-21로 변환되어 동작함
```

### 4. 결론

크로스 브라우징 이슈의 단골 손님임. "내 컴퓨터에선 되는데?"라고 넘기지 말고, **날짜 처리는 무조건 iOS Safari에서 테스트**해봐야 함. 편의상 라이브러리를 쓰더라도 결국 내부적으로 `new Date()`를 호출한다면 똑같은 문제가 발생하므로, 입력값(String) 자체가 표준인지 항상 의심해볼 것.
