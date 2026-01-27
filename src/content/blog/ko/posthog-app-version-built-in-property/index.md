---
title: "PostHog에 앱 버전을 Built-in Property로 등록하기"
summary: "PostHog 공식 문서에서 찾기 어려운 앱 버전 등록 방법 정리."
date: 2026-01-28
tags: ["PostHog", "Analytics", "JavaScript"]
lang: ko
translationKey: "posthog-app-version"
---

## TL;DR

```javascript
// ❌ Custom Property로 잡힘
posthog.register({ app_version: "v1.2.3" });

// ✅ PostHog Property로 잡힘
posthog.register({ $app_version: "v1.2.3" });
```

`$` prefix 하나가 built-in property 여부를 결정한다.

## 본문

PostHog 써보면 앱 버전 추적하고 싶을 때가 있는데, 공식 docs를 봐도 어떻게 해야 built-in property로 인식되는지 잘 안 나와있다. 한참 삽질하다가 알아낸 내용 정리해둔다.

### Custom Property vs PostHog Property

PostHog에는 두 종류의 property가 있다:

**1. PostHog Properties (Built-in)**
- `$` prefix로 시작
- 대시보드에서 "PostHog" 카테고리로 분류됨
- 예: `$device_id`, `$user_id`, `$os`, `$browser`

**2. Custom Properties**
- `$` prefix 없이 그냥 snake_case
- 대시보드에서 "Custom" 카테고리로 분류됨
- 예: `user_role`, `region_name`

### 문제: app_version이 Custom Property로 잡힌다

처음에 이렇게 했다:

```javascript
posthog.register({
  app_version: import.meta.env.PUBLIC_APP_RELEASE_TAG,
});
```

근데 이렇게 하면 PostHog 대시보드에서 `app_version`이 Custom Property로 분류된다. 다른 시스템 property들이랑 같이 묶이게 하고 싶었는데...

### 해결: $ prefix만 붙이면 된다

```javascript
posthog.register({
  $app_version: import.meta.env.PUBLIC_APP_RELEASE_TAG,
});
```

이거 하나 차이로 PostHog의 built-in property로 인식된다. 왜 docs에 안 써놨는지 모르겠다.

### 실제 구현 예시

#### React/JavaScript Web SDK

```javascript
import { posthog } from 'posthog-js';

function PosthogTracker() {
  let initialized = false;

  return {
    init: ({ userId }) => {
      if (initialized || !import.meta.env.PUBLIC_POSTHOG_KEY) {
        return;
      }

      posthog.identify(userId, {}, { userId });
      posthog.register({
        $app_version: import.meta.env.PUBLIC_APP_RELEASE_TAG,
      });

      initialized = true;
    },
  };
}
```

#### PostHogProvider 쓸 때

```jsx
import { PostHogProvider } from 'posthog-js/react';

<PostHogProvider
  apiKey={POSTHOG_KEY}
  options={{
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    loaded: (posthog) => {
      posthog.register({
        $app_version: process.env.REACT_APP_VERSION,
      });
    },
  }}
>
  {children}
</PostHogProvider>
```

### 잘 됐나 확인하는 방법

#### 1. 브라우저 콘솔에서

```javascript
posthog.persistence.properties()
// 결과
{
  $device_id: "...",
  $user_id: "...",
  $app_version: "v1.2.3",  // ← 다른 $ property들이랑 같이 나오면 성공
}
```

#### 2. Network 탭에서

1. 개발자 도구 → Network 탭
2. `posthog` 필터링
3. `/e/` 요청 클릭
4. Payload에서 `$app_version` 있는지 확인

#### 3. PostHog 대시보드에서

Events → Recent Events → 아무 이벤트 클릭 → Properties 섹션에서 "PostHog" 카테고리에 `$app_version` 있으면 됨.

### 왜 register()를 쓰나?

`posthog.register()`로 등록하면 super property가 돼서:

- ✅ 모든 이벤트에 자동으로 붙음 — 매번 넣어줄 필요 없음
- ✅ 세션 넘어가도 유지됨 — localStorage에 저장됨
- ✅ 앱 버전 바뀌기 전까지는 계속 같은 값 사용

## 정리

prefix 하나 차이인데 대시보드에서 필터링할 때 꽤 차이 난다. 앱 버전을 다른 시스템 property들이랑 같이 관리하고 싶으면 `$` 꼭 붙이자.

## References

- [PostHog JS Docs](https://posthog.com/docs/references/posthog-js)
- [PostHog Naming Conventions](https://posthog.com/questions/best-practices-naming-convention-for-event-names-and-properties)
