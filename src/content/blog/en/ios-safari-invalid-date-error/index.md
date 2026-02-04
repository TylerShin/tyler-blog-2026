---
title: "The \"Invalid Date\" Trap in iOS Safari"
summary: "Why iOS Safari throws Invalid Date (Invalid time value) errors while Chrome doesn't, and how to fix it."
date: 2026-02-04
tags: ["iOS", "Safari", "Troubleshooting", "Web"]
lang: en
translationKey: "ios-safari-invalid-date-error"
---

## TL;DR

- **Problem**: iOS Safari is notoriously strict about parsing date strings in `new Date()`.
- **Symptom**: Date strings like `"2026.01.21"` work fine on Desktop Chrome but result in `Invalid Date` on iOS Safari.
- **Solution**: Never pass non-standard date strings to `new Date()`. Always use valid ISO 8601 formats (`YYYY-MM-DDTHH:mm:ss`) or manually parse the components.

## The Issue

You might encounter a situation where date-related features work perfectly on your desktop browser (Chrome, Firefox, or even macOS Safari) but break completely on an iPhone.

```javascript
// Example
const date = new Date("2026.01.21");
console.log(date.toString());
```

- **Desktop Chrome**: Returns a valid Date object.
- **iOS Safari**: Returns `Invalid Date`.

If you try to use this invalid date object—for example, passing it to a formatter or performing calculations—you'll likely see errors like `RangeError: Invalid time value`.

## Root Cause: Implementation Differences

The ECMAScript specification mandates support for ISO 8601 formats in `Date.parse()`, but leaves the handling of **non-standard strings** up to the browser implementation.

- **Chrome**: Very lenient. It tries to guess the date format even if it's messy (e.g., allowing spaces instead of `T`).
- **iOS Safari**: Strict adherence to standard. If the format doesn't match the spec, it rejects it immediately.

**Common patterns rejected by iOS Safari:**
1.  **Space separator**: `"2025-01-01 10:00:00"` (❌ Missing `T`)
2.  **Dot delimiters**: `"2026.01.21"` (❌ Not ISO standard)

## How to Fix It

**Stop relying on the browser to "guess" your date format.**

### Option A: Use Standard ISO Format (Best)

Ideally, ensure your data source (API) returns strictly formatted ISO 8601 strings.

```javascript
// ✅ ISO 8601 (Good)
new Date("2025-12-25T10:30:00Z");
```

### Option B: Pre-process the String

If you are stuck with a non-standard format like `YYYY-MM-DD HH:mm:ss`, manually replace the separator to comply with ISO standards before creating the Date object.

```javascript
const rawString = "2026.01.21";
const safeDate = new Date(rawString.replace(/\./g, "-")); // Becomes 2026-01-21, usually safe
```

## Conclusion

This is a classic cross-browser compatibility issue. Always test date-related logic on **actual iOS devices** or simulators. Even if you use a library, if usage involves passing raw strings to `new Date()`, this issue can still bite you. Always sanitize your date strings to be specification-compliant.
