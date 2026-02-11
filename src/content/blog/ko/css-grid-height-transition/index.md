---
title: "CSS Grid로 높이(Height) 애니메이션 구현하기 (feat. Dynamic List 한계점)"
summary: "height: auto 애니메이션의 해결책인 grid-template-rows 트랜지션 기법 소개 및 동적 리스트 적용 시의 한계점 분석."
date: 2026-02-11
tags: ["CSS", "Grid", "Animation", "Web", "UI"]
lang: ko
translationKey: "css-grid-height-transition"
heroImage: "/assets/blog/css-grid-height-transition/hero.png"
heroImageAlt: "A cute blue box stretching vertically with a happy face on a grid background"
---

## TL;DR

1.  `height: auto`는 CSS `transition`이 적용되지 않음.
2.  `grid-template-rows: 0fr` ↔ `1fr` 전환을 이용하면 자연스러운 높이 애니메이션 가능.
3.  **동적 리스트**의 경우, 컨테이너가 아닌 **각 아이템**에 적용하면 될 것 같음.

---

## 본문

웹 개발을 하다 보면 가장 흔하게 겪는 "짜증나는" 순간 중 하나가 바로 높이 값이 동적으로 변하는 요소(`height: auto`)에 애니메이션을 넣을 때임.
Dropdown 메뉴나 Accordion(Collapse) 컴포넌트를 만들 때, 내용물에 따라 자연스럽게 스르르 열리고 닫히게 만들고 싶은데, `height` 속성은 `auto` 값으로의 트랜지션을 지원하지 않음.

### 과거의 꼼수: `max-height`

예전에는 이 문제를 해결하기 위해 `max-height`를 사용했음.

```css
.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.content.open {
  max-height: 1000px; /* 충분히 큰 값 */
}
```

하지만 이 방식은 치명적인 단점이 있음.
`max-height`가 실제 높이보다 훨씬 크면, 닫힐 때 딜레이가 발생하거나 애니메이션 속도 곡선(Easing)이 어색해짐.

### 새로 알아낸 대안

최근(이라기엔 좀 됐지만) 가장 깔끔한 해결책은 **CSS Grid**를 활용하는 것임.
`fr` 단위는 트랜지션이 가능하기 때문임.

#### 구현 방법

```css
.wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.wrapper.open {
  grid-template-rows: 1fr;
}

.inner {
  overflow: hidden;
}
```

```html
<div class="wrapper">
  <div class="inner">
    <!-- 내용물 -->
  </div>
</div>
```

`0fr`에서 `1fr`로 변하면, Grid 트랙의 크기가 0에서 "사용 가능한 공간 전체(내용물 크기만큼)"로 부드럽게 변함. `min-height`를 0으로 줘야 한다는 점도 잊지 말아야 함(일부 브라우저 버그 방지).

### 심화: 동적 리스트(Dynamic List)의 한계와 해결

아코디언처럼 "On/Off" 되는 요소는 위 방법으로 완벽함. 그런데 **"리스트에 아이템이 하나씩 추가되면서 컨테이너가 늘어나는 경우"**는 어떨까?

컨테이너 자체에 Grid 트랜지션을 거는 건 아이템 개수가 가변적이라 꽤 까다로움.
직접 깊게 파보진 않았지만, 컨테이너가 아니라 **추가되는 아이템 자체**에 `grid-template-rows` 트랜지션을 걸면 가능할 것 같음. 아이템이 렌더링될 때 `0fr` → `1fr`로 변하게 하면 자연스럽게 리스트가 늘어나는 효과를 낼 수 있을 듯함.

---

## 결론

- **Collapse/Accordion**: `grid-template-rows: 0fr` ↔ `1fr` 기법이 표준(Standard)에 가까움.
- **Dynamic List**: 컨테이너가 아닌 **개별 아이템**에 Grid 트랜지션을 적용하면 될 것 같음.
