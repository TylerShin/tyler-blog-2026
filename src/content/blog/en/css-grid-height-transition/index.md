---
title: "Animating Height with CSS Grid (and the Limitations of Dynamic Lists)"
summary: "Learn how to use grid-template-rows for smooth height transitions and understand the challenges of animating dynamic lists."
date: 2026-02-11
tags: ["CSS", "Grid", "Animation", "Web", "UI"]
lang: en
translationKey: "css-grid-height-transition"
heroImage: "/assets/blog/css-grid-height-transition/hero.png"
heroImageAlt: "A cute blue box stretching vertically with a happy face on a grid background"
---

## TL;DR

1.  `height: auto` cannot be transitioned directly in CSS.
2.  Use `grid-template-rows: 0fr` ↔ `1fr` to achieve a smooth height animation.
3.  For **dynamic lists (adding/removing items)**, animate the **individual items** appearing, rather than trying to animate the container's height directly.

---

## Content

One of the most common frustrations in web development is trying to animate an element's height when the content is dynamic (`height: auto`).
Whether you're building a dropdown menu or an accordion, you want it to slide open smoothly. However, `height` doesn't support transitions to `auto`.

### The Old Hack: `max-height`

In the past, we relied on the `max-height` trick:

```css
.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.content.open {
  max-height: 1000px; /* Arbitrarily large value */
}
```

This method has a significant drawback. If `max-height` is much larger than the actual content, the animation curve (easing) feels wrong, and there's a noticeable delay when closing the element.

### The Modern Way: CSS Grid (`grid-template-rows`)

The cleanest modern solution is using **CSS Grid**, specifically because fractional units (`fr`) are interpolatable (animatable).

#### How It Works

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
    <!-- Your content goes here -->
  </div>
</div>
```

When transitioning from `0fr` to `1fr`, the grid track grows from 0 to "all available space" (the size of the content), creating a perfect slide-down effect. Don't forget to set `min-height: 0` on the wrapper if you encounter rendering issues in some browsers.

### Advanced: The Challenge with Dynamic Lists

This technique works perfectly for Accordions (Simple On/Off states). But what about a list where **items are added one by one**?

Animating the container itself is tricky because the item count is variable.
I haven't tested this deeply, but it should be possible by applying the `grid-template-rows` transition to the **individual items** as they enter, rather than the container. If you make each new item transition from `0fr` to `1fr` upon rendering, it would create a natural expansion effect.

---

## Conclusion

- **Accordions**: Use `grid-template-rows: 0fr` ↔ `1fr`. It's the standard way now.
- **Dynamic Lists**: Apply the Grid transition to **individual items** as they enter, rather than the parent container. (Requires JS state management).
