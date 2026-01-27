import { getCollection, type CollectionEntry } from "astro:content"

export const SUPPORTED_LOCALES = ["ko", "en"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "ko"

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
}

/**
 * Extract locale from a content collection slug
 * Slugs are formatted as: ko/post-name or en/post-name
 */
export function getLocaleFromSlug(slug: string): Locale {
  const parts = slug.split("/")
  if (parts.length > 1 && SUPPORTED_LOCALES.includes(parts[0] as Locale)) {
    return parts[0] as Locale
  }
  return DEFAULT_LOCALE
}

/**
 * Get the post slug without locale prefix
 */
export function getSlugWithoutLocale(slug: string): string {
  const parts = slug.split("/")
  if (parts.length > 1 && SUPPORTED_LOCALES.includes(parts[0] as Locale)) {
    return parts.slice(1).join("/")
  }
  return slug
}

/**
 * Get posts filtered by locale
 */
export async function getPostsByLocale(locale: Locale) {
  const posts = await getCollection("blog")
  return posts.filter((post) => getLocaleFromSlug(post.slug) === locale)
}

/**
 * Find translations of a post by translationKey
 */
export async function getTranslations(
  post: CollectionEntry<"blog">
): Promise<Record<Locale, CollectionEntry<"blog">>> {
  const allPosts = await getCollection("blog")
  const translations: Partial<Record<Locale, CollectionEntry<"blog">>> = {}

  // Current post
  const currentLocale = post.data.lang || getLocaleFromSlug(post.slug)
  translations[currentLocale] = post

  // Find translations by translationKey
  if (post.data.translationKey) {
    for (const otherPost of allPosts) {
      if (
        otherPost.data.translationKey === post.data.translationKey &&
        otherPost.slug !== post.slug
      ) {
        const locale = otherPost.data.lang || getLocaleFromSlug(otherPost.slug)
        translations[locale] = otherPost
      }
    }
  }

  return translations as Record<Locale, CollectionEntry<"blog">>
}

/**
 * Get blog post URL with proper locale prefix
 */
export function getBlogPostUrl(slug: string, locale: Locale): string {
  const cleanSlug = getSlugWithoutLocale(slug)
  if (locale === DEFAULT_LOCALE) {
    return `/blog/${cleanSlug}`
  }
  return `/${locale}/blog/${cleanSlug}`
}

/**
 * Get current locale from URL pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length > 0 && SUPPORTED_LOCALES.includes(parts[0] as Locale)) {
    return parts[0] as Locale
  }
  return DEFAULT_LOCALE
}
