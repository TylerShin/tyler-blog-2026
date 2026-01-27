---
title: "Registering App Version as PostHog Built-in Property"
summary: "How to properly register app version as a PostHog built-in property."
date: 2026-01-28
tags: ["PostHog", "Analytics", "JavaScript"]
lang: en
translationKey: "posthog-app-version"
---

## TL;DR

```javascript
// ❌ Registered as Custom Property
posthog.register({ app_version: "v1.2.3" });

// ✅ Registered as PostHog Property
posthog.register({ $app_version: "v1.2.3" });
```

That `$` prefix makes all the difference.

## The Problem

If you've used PostHog, you've probably wanted to track your app version at some point. But the official docs don't really explain how to make it show up as a built-in property. After some trial and error, here's what I found.

### Custom Property vs PostHog Property

PostHog has two types of properties:

**1. PostHog Properties (Built-in)**
- Starts with `$` prefix
- Shows up under "PostHog" category in dashboard
- Examples: `$device_id`, `$user_id`, `$os`, `$browser`

**2. Custom Properties**
- Just snake_case, no `$` prefix
- Shows up under "Custom" category in dashboard
- Examples: `user_role`, `region_name`

### The Issue: app_version Shows Up as Custom

My first attempt looked like this:

```javascript
posthog.register({
  app_version: import.meta.env.PUBLIC_APP_RELEASE_TAG,
});
```

But this puts `app_version` in the Custom Properties category. I wanted it grouped with other system properties...

### Solution: Just Add the $ Prefix

```javascript
posthog.register({
  $app_version: import.meta.env.PUBLIC_APP_RELEASE_TAG,
});
```

That's it. One character difference and it's recognized as a built-in property. Not sure why this isn't in the docs.

### Implementation Examples

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

#### With PostHogProvider

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

### How to Verify It Worked

#### 1. Browser Console

```javascript
posthog.persistence.properties()
// Result
{
  $device_id: "...",
  $user_id: "...",
  $app_version: "v1.2.3",  // ← If it shows up with other $ properties, you're good
}
```

#### 2. Network Tab

1. DevTools → Network tab
2. Filter by `posthog`
3. Click on `/e/` request
4. Check if `$app_version` is in the Payload

#### 3. PostHog Dashboard

Events → Recent Events → Click any event → Look for `$app_version` under "PostHog" category in Properties.

### Why Use register()?

Using `posthog.register()` makes it a super property:

- ✅ Automatically attached to all events — no need to add it every time
- ✅ Persists across sessions — stored in localStorage
- ✅ Stays consistent until app version actually changes

## Wrap Up

It's just one character, but it makes a real difference when filtering in the dashboard. If you want app version grouped with other system properties, don't forget that `$`.

## References

- [PostHog JS Docs](https://posthog.com/docs/references/posthog-js)
- [PostHog Naming Conventions](https://posthog.com/questions/best-practices-naming-convention-for-event-names-and-properties)
