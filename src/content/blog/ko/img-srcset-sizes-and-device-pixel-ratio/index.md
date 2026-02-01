---
title: "img srcSet 및 sizes 속성과 devicePixelRatio의 이해"
summary: "HTML img 태그의 srcSet, sizes 속성이 devicePixelRatio와 어떻게 상호작용하여 브라우저가 이미지를 선택하는지 정리."
date: 2026-02-01
tags: ["HTML", "Image", "Performance", "Web"]
lang: ko
translationKey: "img-srcset-sizes-and-device-pixel-ratio"
---

## TL;DR

- `devicePixelRatio`와 CSS 픽셀(`width`)이 곱해져서 실제 렌더링에 필요한 물리 픽셀 해상도가 계산됨.
- `sizes` 속성으로 지정된 크기가 기준이 되며, `srcSet` 목록 중 이 기준을 만족하는 **가장 작은 이미지**가 선택됨.

## 본문

반응형 이미지를 구현할 때 `srcSet`과 `sizes`를 자주 사용하지만, 브라우저가 정확히 어떤 기준으로 이미지를 선택하는지 헷갈릴 때가 많음. 핵심은 **devicePixelRatio**와 **sizes**의 상호작용에 있음.

### devicePixelRatio와 렌더링 해상도 계산

브라우저는 이미지를 렌더링할 때, 현재 디바이스의 `devicePixelRatio` 값과 CSS 상의 너비(`width`)를 곱해서 실제로 필요한 물리 픽셀 수를 계산함.

- 예를 들어, 화면에서 이미지가 `1080px` 너비로 렌더링되어야 한다고 가정해보자.
- 이때 `devicePixelRatio`가 1이라면 실제로는 1080 물리 픽셀이 필요함.
- `devicePixelRatio`가 2라면 `1080 * 2 = 2160`, 즉 2160 물리 픽셀 너비의 이미지가 필요함.

참고로 `devicePixelRatio`는 보통 정수값으로 떨어지는 경향이 있음.
재미있는 점은 OS 설정에 따라 `devicePixelRatio`가 예상과 다를 수 있다는 것임. 예를 들어 macOS에서 4k 모니터(2560x1440 해상도 설정)를 사용할 때, 실제 픽셀 비율을 1.5 정도로 설정하더라도 브라우저상에서 `devicePixelRatio`는 2로 잡히는 경우가 있음.

### sizes와 srcSet의 선택 로직

`sizes` 속성은 브라우저에게 "이 이미지가 화면에서 얼마만큼의 크기(CSS 픽셀)로 보일 것인지" 미리 알려주는 역할을 함. 브라우저는 이 정보를 바탕으로 필요한 해상도를 계산하고, `srcSet`에 정의된 이미지 후보들 중 가장 적절한 것을 선택함.

선택 기준은 간단함: **계산된 필요 해상도를 포함할 수 있는 이미지 중 가장 작은 것**을 선택함.

#### 예시 상황

다음과 같은 설정이 있다고 가정해보자.

```html
<img 
  srcSet="image-256.jpg 256w,
          image-512.jpg 512w,
          image-780.jpg 780w"
  sizes="(max-width: 600px) 230px, 
         50vw"
  src="image-512.jpg" 
  alt="Example"
/>
```

1.  현재 뷰포트 상황에서 `sizes`에 의해 이미지 너비가 **230px**로 결정되었다고 하자.
2.  사용자의 디바이스는 `devicePixelRatio`가 **2**이다.
3.  브라우저는 필요한 물리 픽셀 너비를 계산함: `230px * 2 = 460px`.
4.  이제 `srcSet` 후보들을 살펴봄: `[256w, 512w, 780w]`.
5.  `460px`을 커버해야 하므로 256w는 탈락.
6.  460을 넘는 후보 중 가장 작은 값인 **512w**가 선택됨.

결과적으로 `image-512.jpg`가 로드됨. 만약 `devicePixelRatio`가 3이었다면 `230 * 3 = 690`이 되어 780w 이미지가 선택되었을 것임.

### 결론

`srcSet`과 `sizes`를 올바르게 사용하려면 단순히 뷰포트 너비만 고려하는 것이 아니라, `devicePixelRatio`가 곱해진다는 점을 이해해야 함. 이를 통해 불필요하게 큰 이미지를 로딩하는 것을 방지하고, 고해상도 디스플레이 사용자에게는 선명한 이미지를 제공할 수 있음.
