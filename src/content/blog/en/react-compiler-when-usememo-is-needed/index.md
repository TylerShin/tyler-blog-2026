---
title: "When useMemo Is Still Needed in the React Compiler Era"
summary: "React Compiler handles most memoization, but three reference-stability boundaries still need explicit useMemo."
date: 2026-02-15
tags: ["React", "ReactCompiler", "Memoization", "Performance", "useMemo"]
lang: en
translationKey: "react-compiler-when-usememo-is-needed"
heroImage: "/assets/blog/react-compiler-when-usememo-is-needed/hero.png"
heroImageAlt: "A cute robot compiler handing a memo card to a React hook"
---

## TL;DR

1. React Compiler auto-memoizes values inside components and hooks.
2. `useMemo` is still necessary in three specific cases.
3. The rule is simple: use it when **reference stability is part of an external contract**.

---

## Content

A common claim is: "React Compiler makes `useMemo` obsolete."
That is directionally true, but incomplete.

React Compiler is very good at optimizing declarative computations. The remaining edge is API boundaries that rely on reference identity (`Object.is`). In those boundaries, intent should still be explicit.

### 1) Passing props to `React.memo` components

`React.memo` compares props by reference. If a prop is a fresh object/array on every render, memoization is effectively bypassed.

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

### 2) Using it in `useEffect` dependencies

Effects re-run when dependency references change. For connection/subscription code, this can create unnecessary cleanup and re-connect cycles.

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

### 3) Using it as another Hook dependency

If a dependency itself is recreated every render, higher-level memoization is invalidated.
A common version is putting array/object literals directly into dependency chains.

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

If the value is static, a module-level constant is usually cleaner than memoizing inside the component.

---

## Practical Rule

Use `useMemo` if at least one is true:

- Value is passed to a `React.memo` child as props.
- Value is used in a `useEffect` dependency array.
- Value is used as a dependency of another `useMemo` or `useCallback`.

If none apply, keeping the code simple and letting the compiler optimize is usually the right default.

---

## Measure First

Do not optimize from intuition alone. Check actual render cost and commit frequency with React DevTools Profiler, then optimize only where data says it matters.

---

## Conclusion

React Compiler removes a lot of manual memoization work.
It does not remove the need for explicit control at reference-sensitive boundaries.

So the target is not "always useMemo" or "never useMemo."
Remember the three boundaries and apply it only there.

## References

- [React Compiler Introduction](https://react.dev/learn/react-compiler/introduction)
- [useMemo API Reference](https://react.dev/reference/react/useMemo)
- [React Compiler 1.0 Release](https://react.dev/blog/2025/10/07/react-compiler-1)
- [React DevTools](https://react.dev/learn/react-developer-tools)

> [!CAUTION]
> Apply performance optimizations based on profiling data, not assumptions.
