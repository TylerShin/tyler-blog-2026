---
title: "Understanding img srcSet, sizes, and devicePixelRatio"
summary: "Explaining how HTML img tag's srcSet and sizes attributes interact with devicePixelRatio to determine which image the browser selects."
date: 2026-02-01
tags: ["HTML", "Image", "Performance", "Web"]
lang: en
translationKey: "img-srcset-sizes-and-device-pixel-ratio"
---

## TL;DR

- `devicePixelRatio` is multiplied by CSS pixels (`width`) to calculate the physical pixel resolution required for rendering.
- The size specified by the `sizes` attribute becomes the baseline, and the **smallest image** from the `srcSet` list that satisfies this baseline is selected.

## Body

When implementing responsive images, `srcSet` and `sizes` are frequently used, but it's often confusing to understand the exact criteria browsers use to select an image. The key lies in the interaction between **devicePixelRatio** and **sizes**.

### devicePixelRatio and Rendering Resolution Calculation

When rendering an image, the browser calculates the actual number of physical pixels needed by multiplying the device's current `devicePixelRatio` value by the width in CSS.

- For example, let's assume an image needs to be rendered at `1080px` width on the screen.
- If the `devicePixelRatio` is 1, it actually needs 1080 physical pixels.
- If the `devicePixelRatio` is 2, it needs `1080 * 2 = 2160`, meaning an image with 2160 physical pixels in width is required.

Note that `devicePixelRatio` tends to be an integer value.
Interestingly, depending on OS settings, `devicePixelRatio` might differ from what you expect. For instance, on macOS using a 4k monitor (set to 2560x1440 resolution), the browser often detects `devicePixelRatio` as 2, even if the actual pixel ratio is set to around 1.5.

### Selection Logic for sizes and srcSet

The `sizes` attribute tells the browser "how large (in CSS pixels) this image will appear on the screen." Based on this information, the browser calculates the required resolution and selects the most appropriate candidate from the images defined in `srcSet`.

The selection criteria is simple: **choose the smallest image that can cover the calculated required resolution.**

#### Example Scenario

Suppose we have the following setup:

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

1.  Assume that in the current viewport, the image width is determined to be **230px** by `sizes`.
2.  The user's device has a `devicePixelRatio` of **2**.
3.  The browser calculates the required physical pixel width: `230px * 2 = 460px`.
4.  Now it looks at the `srcSet` candidates: `[256w, 512w, 780w]`.
5.  Since it needs to cover `460px`, 256w is disqualified.
6.  Among the candidates larger than 460, the smallest value, **512w**, is selected.

As a result, `image-512.jpg` is loaded. If the `devicePixelRatio` were 3, it would be `230 * 3 = 690`, so the 780w image would have been selected.

### Conclusion

To use `srcSet` and `sizes` correctly, you must understand that it's not just about viewport width, but that `devicePixelRatio` is a multiplier. This prevents loading unnecessarily large images while ensuring high-resolution display users get crisp images.
