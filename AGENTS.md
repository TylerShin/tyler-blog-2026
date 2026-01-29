# AGENTS.md - Development Guidelines for Tyler Blog

This file contains essential information for agentic coding agents working in this repository.

## Project Overview

This is a bilingual (Korean/English) blog built with Astro 4.x and Solid.js. It's a content-focused static site with no formal testing framework.

## Technology Stack

- **Framework**: Astro 4.4.13 (Static Site Generator)
- **UI**: Solid.js 1.8.15 for interactive components
- **Styling**: Tailwind CSS 3.4.1 with @tailwindcss/typography
- **Language**: TypeScript 5.3.3 (strict mode)
- **Content**: MDX support with Astro content collections
- **i18n**: Built-in Astro i18n (ko/en locales)

## Build & Development Commands

```bash
# Development
npm run dev                    # Start dev server (localhost:4321)
npm run dev:network           # Start dev server accessible on network
npm run start                 # Alias for dev

# Production
npm run build                 # Type check + build to /dist
npm run preview               # Preview production build

# Code Quality
npm run lint                  # Run ESLint
npm run lint:fix              # Fix ESLint issues
```

## Testing

⚠️ **No test framework is configured**. This is a content-focused blog without formal tests. For validation:
- Use `npm run build` to verify TypeScript compilation
- Manually test interactive components in development
- Validate content collections via build process

## Code Style Guidelines

### Import Conventions
- Use path aliases: `@/components/*`, `@/lib/*`, `@/styles/*`
- Content collections: `import { getCollection, type CollectionEntry } from "astro:content"`
- Constants: `import { SITE, LINKS } from "@consts"`
- Utilities: `import { cn } from "@lib/utils"`

### Component Architecture
- **Astro components** (`.astro`): Server-side, no client JS unless `<script client:load>` specified
- **Interactive components** (`.tsx`): Use Solid.js for client-side interactivity
- **Styling**: Tailwind-first approach with `cn()` utility (clsx + tailwind-merge)
- **Props**: TypeScript interfaces for type safety

### TypeScript Patterns
- Strict mode enabled with comprehensive type checking
- Content types auto-generated from Astro collections
- Use existing interfaces: `Site`, `Page`, `Links`, `Socials`
- Maintain i18n types for bilingual support

### Styling Guidelines
- **Dark mode**: Class-based strategy with `html.dark`
- **Responsive**: Mobile-first with Tailwind breakpoints
- **Component styling**: Prefer utility classes over custom CSS
- **Custom CSS**: Use scoped `<style>` blocks in Astro components when needed

## Content Creation Rules

### Blog Posts (Korean)
Follow `.agent/rules/blog_style.md` guidelines:
- **Tone**: Dry and concise with noun endings (`~함`, `~임`, `~됨`)
- **Structure**: Frontmatter → TL;DR → Main Content → References → Disclaimer
- **Tags**: Technical and specific only (e.g., "Linux", "Arch", "ToolName")
- **No generic tags**: Avoid "Tips", "Guide", "Tutorial"

### Content Structure
```markdown
---
title: "제목 입력"
summary: "짧은 요약."
date: YYYY-MM-DD
tags: ["Technical", "Tags"]
---

## TL;DR
### Quick Install
```bash
command here
```

## Main Content
Detailed explanations...

## References
- [Link Name](URL)

> [!CAUTION]
> Always verify external scripts before execution.
```

### Content Collections
- **Blog**: `/content/content/blog/{ko,en}/`
- **Work**: `/content/content/work/`
- **Projects**: `/content/content/projects/`
- **Legal**: `/content/content/legal/`

## Development Workflow

### File Organization
- Date-based naming for blog posts: `YYYY-MM-DD-slug.md`
- Draft mode: Add `draft: true` to frontmatter for local-only preview
- i18n: Create separate files for each locale in respective folders

### Obsidian Integration
This repo includes full Obsidian + Templater workflow. When working with content:
- Preserve frontmatter structure and Zod schema validation
- Maintain translation keys for i18n content
- Follow the established folder structure

### Performance Considerations
- Static site generation prioritizes performance
- Use Sharp for image optimization (configured)
- Minimize client-side JavaScript
- Leverage Astro's island architecture for interactivity

## Linting & Code Quality

- **ESLint**: Basic configuration (`eslint .` and `eslint . --fix`)
- **TypeScript**: `astro check` for type validation (runs in build)
- **No Prettier**: Not configured
- **No pre-commit hooks**: Not implemented

## Key Patterns to Follow

### Component Examples
```typescript
// Astro component
---
import Component from '@/components/Component.astro'
import { cn } from '@lib/utils'
---
<div class={cn('base-styles', props.className)}>
  <Component />
</div>
```

```typescript
// Solid.js interactive component
import { createSignal } from 'solid-js'
export default function Counter() {
  const [count, setCount] = createSignal(0)
  return <button onClick={() => setCount(c => c + 1)}>{count()}</button>
}
```

### Path Aliases
- `@/*` → `src/*`
- Content: `astro:content`
- Check `astro.config.mjs` for full alias configuration

## Important Notes

- This is a **content-first blog** - prioritize content quality and structure
- **No testing framework** - focus on build validation and manual testing
- **Bilingual support** - maintain consistency between ko/en content
- **Static performance** - minimal JavaScript, fast builds
- **Obsidian integration** - respect existing CMS workflow
- Build process includes content collection validation

## Common Gotchas

- Interactive components need `client:*` directives in Astro
- Content collections have Zod schemas that validate on build
- i18n routing is automatic but requires proper file structure
- Dark mode requires `html.dark` class, not CSS variables alone
- Images should use Astro's `<Image />` component for optimization