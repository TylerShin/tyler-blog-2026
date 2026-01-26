import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Tyler Shin",
  DESCRIPTION: "Tyler의 기술 블로그입니다.",
  AUTHOR: "Tyler Shin",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "지금까지의 커리어 히스토리입니다.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "개발과 기술에 관한 글을 씁니다.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "진행했던 프로젝트들입니다.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "글과 프로젝트를 검색하세요.",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "Work",
    HREF: "/work",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "TylerShin",
    HREF: "https://github.com/TylerShin"
  },
]
