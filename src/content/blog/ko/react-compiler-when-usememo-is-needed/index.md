---
title: "React Compiler 시대에도 useMemo가 필요한 3가지 경우"
summary: "React Compiler가 자동 메모이제이션을 해도 useMemo를 직접 써야 하는 경계 조건 정리."
date: 2026-02-15
tags: ["React", "ReactCompiler", "Memoization", "Performance", "useMemo"]
lang: ko
translationKey: "react-compiler-when-usememo-is-needed"
heroImage: "/assets/blog/react-compiler-when-usememo-is-needed/hero.png"
heroImageAlt: "A cute robot compiler handing a memo card to a React hook"
---

## TL;DR

1. React Compiler는 컴포넌트/훅 내부 값을 자동 메모이제이션함.
2. 그래도 `useMemo`가 필요한 경우는 딱 3가지임.
3. 기준은 간단함: **참조 안정성이 외부 계약으로 사용되는지** 보면 됨.

---

## 본문

`"Compiler가 다 해주니 useMemo는 이제 필요 없음"`이라는 말이 자주 보임.
완전히 틀린 말은 아니지만, 정확하지도 않음.

React Compiler는 선언적으로 분석 가능한 범위를 잘 최적화함.
문제는 `Object.is` 기반 참조 비교에 의존하는 API 경계에서 발생함.
여기서는 개발자가 의도를 명시해야 함.

### 1) `React.memo` 컴포넌트 props로 전달할 때

`React.memo`는 props를 참조 비교함.
전달 값이 매 렌더마다 새 객체/배열이면 메모 이점이 사라짐.

```tsx
const List = React.memo(function List({ items }: { items: Todo[] }) {
  return <ul>{items.map((item) => <li key={item.id}>{item.title}</li>)}</ul>;
});

function TodoPage({ todos, filter }: { todos: Todo[]; filter: Filter }) {
  const filteredTodos = useMemo(() => {
    if (filter === "done") return todos.filter((t) => t.done);
    if (filter === "todo") return todos.filter((t) => !t.done);
    return todos;
  }, [todos, filter]);

  return <List items={filteredTodos} />;
}
```

### 2) `useEffect` 의존성으로 넣을 때

Effect는 의존성 참조가 바뀌면 다시 실행됨.
연결/구독 코드에서 불필요한 cleanup/reconnect가 발생하기 쉬움.

```tsx
function ChatRoom({ roomId }: { roomId: string }) {
  const options = useMemo(
    () => ({
      serverUrl: "https://localhost:1234",
      roomId,
    }),
    [roomId],
  );

  useEffect(() => {
    const conn = createConnection(options);
    conn.connect();
    return () => conn.disconnect();
  }, [options]);

  return <p>Room: {roomId}</p>;
}
```

### 3) 다른 Hook의 의존성으로 넣을 때

한 Hook의 의존성이 매번 새 참조면, 상위 최적화가 무효화됨.
가장 흔한 패턴은 `useMemo`의 의존성에 배열/객체 리터럴을 넣는 경우임.

```tsx
const SEARCH_FIELDS = ["name", "description", "category"];

function ProductSearch({ query }: { query: string }) {
  const results = useMemo(() => {
    return products.filter((product) =>
      SEARCH_FIELDS.some((field) =>
        String(product[field]).toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query]);

  return <SearchResults results={results} />;
}
```

리터럴이 고정값이면 컴포넌트 바깥 상수로 빼는 편이 더 단순함.

---

## 실전 판단 기준

아래 3개 중 하나라도 해당하면 `useMemo`를 씀.

- `React.memo` 컴포넌트에 전달되는 props인가?
- `useEffect` 의존성 배열에 들어가는가?
- 다른 `useMemo`/`useCallback` 의존성으로 쓰이는가?

셋 다 아니면, 우선 Compiler에 맡기는 편이 코드가 단순함.

---

## 측정 먼저

최적화는 추측이 아니라 측정 기반으로 진행해야 함.
`React DevTools Profiler`에서 실제 렌더 시간과 커밋 횟수를 확인한 뒤 적용하는 게 안전함.

---

## 결론

React Compiler는 대부분의 수동 메모이제이션을 대체함.
다만 참조 안정성이 계약이 되는 지점은 여전히 수동 제어가 필요함.

핵심은 `"무조건 useMemo"`도 아니고 `"절대 useMemo 금지"`도 아님.
경계 조건 3가지만 기억하면 됨.

## References

- [React Compiler Introduction](https://react.dev/learn/react-compiler/introduction)
- [useMemo API Reference](https://react.dev/reference/react/useMemo)
- [React Compiler 1.0 Release](https://react.dev/blog/2025/10/07/react-compiler-1)
- [React DevTools](https://react.dev/learn/react-developer-tools)

> [!CAUTION]
> 성능 최적화는 체감이 아니라 프로파일링 결과 기준으로 적용하는 것을 권장함.
