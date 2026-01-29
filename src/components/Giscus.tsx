import { onMount } from "solid-js"

type Props = {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: string
  term?: string
  strict?: string
  reactionsEnabled?: string
  emitMetadata?: string
  inputPosition?: string
  theme?: string
  lang?: string
  loading?: string
}

export default function Giscus(props: Props) {
  onMount(() => {
    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", props.repo || "TylerShin/tyler-blog-2026")
    script.setAttribute("data-repo-id", props.repoId || "R_kgDOQ_ivEw")
    script.setAttribute("data-category", props.category || "Announcements")
    script.setAttribute("data-category-id", props.categoryId || "DIC_kwDOQ_ivE84C1lB9")
    script.setAttribute("data-mapping", props.mapping || "pathname")
    script.setAttribute("data-strict", props.strict || "0")
    script.setAttribute("data-reactions-enabled", props.reactionsEnabled || "1")
    script.setAttribute("data-emit-metadata", props.emitMetadata || "0")
    script.setAttribute("data-input-position", props.inputPosition || "bottom")
    script.setAttribute("data-theme", props.theme || "preferred_color_scheme")
    script.setAttribute("data-lang", props.lang || "ko")
    script.setAttribute("data-loading", props.loading || "lazy")
    script.crossOrigin = "anonymous"
    script.async = true

    const container = document.getElementById("giscus-container")
    if (container) {
      container.innerHTML = ""
      container.appendChild(script)
    }

    // Listen for theme changes to update Giscus theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark")
          const theme = isDark ? "dark" : "light"
          const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame")
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              { giscus: { setConfig: { theme } } },
              "https://giscus.app"
            )
          }
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
  })

  return <div id="giscus-container" class="mt-16" />
}
