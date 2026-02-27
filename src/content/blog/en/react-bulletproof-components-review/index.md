---
title: "Notes on Build Bulletproof React Components"
summary: "A compact memo on hydration, composition, portal, and transition constraints in React component design."
date: 2026-02-21
tags: ["React", "Hydration", "Composition", "Portal", "Transition"]
lang: en
translationKey: "react-bulletproof-components-review"
heroImage: "/assets/blog/react-bulletproof-components-review/hero.png"
heroImageAlt: "Illustration of React component resilience pillars"
---

## TL;DR

1. Writing "correct" React code is getting harder than before.
2. The `Make It Hydration-Proof` approach is practical because it designs around failure boundaries first.
3. `Make It Composition-Proof` filled a blind spot for me since I rarely used `cloneElement` directly.
4. `Make It Portal-Proof` did the same for portal-related edge conditions.
5. Transition-driven animation behavior still feels too easy to misuse because it tends to rely on deferred flows (`startTransition`, `useDeferredValue`).

## Original Post

- [Build Bulletproof React Components](https://shud.in/thoughts/build-bulletproof-react-components)
