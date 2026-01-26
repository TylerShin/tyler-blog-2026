# 📝 Tyler Blog

> Astro 기반 블로그 + Obsidian CMS 워크플로우

Astro로 구축된 정적 블로그를 Cloudflare Pages에 배포하고, Obsidian + Templater를 통해 CMS처럼 편리하게 글을 작성합니다.

---

## ✨ 주요 특징

- 🚀 **Astro** - 빠른 정적 사이트 생성
- 📓 **Obsidian** - 강력한 마크다운 에디터로 글 작성
- 🤖 **Templater** - 자동화된 포스트 생성 템플릿
- ☁️ **Cloudflare Pages** - 자동 배포
- 📦 **Draft Mode** - 초안은 로컬에서만 보기

---

## 📋 요구사항

- [Node.js](https://nodejs.org/) (LTS 권장)
- `pnpm` 또는 `npm`
- [Obsidian Desktop](https://obsidian.md/)
- **필수 플러그인**: [Templater](https://github.com/SilentVoid13/Templater)

---

## 📂 프로젝트 구조

```
tyler-blog/
├── src/
│   └── content/
│       └── blog/          # 📄 블로그 포스트 (.md)
├── public/
│   └── images/            # 🖼️ 이미지/첨부파일
├── _templates/            # 📋 Templater 템플릿
└── .obsidian/             # ⚙️ Obsidian 설정 (레포 포함)
```

---

## 🚀 빠른 시작

### 1⃣ 로컬 개발 서버 실행

```bash
npm run dev
```

---

## 🔧 Obsidian 설정

### 📁 Vault 열기

1. **Obsidian** 실행
2. **"Open folder as vault"** 선택
3. 이 프로젝트 **루트 폴더**를 Vault로 열기
   - ✅ `.obsidian/` 폴더가 보이면 성공

### 🔌 Community Plugins 활성화

1. `Settings` → `Community plugins`
2. **Restricted mode** 비활성화
3. 플러그인 사용 허용

### 📝 새 글(노트) 생성 위치 설정

**Settings** → **Files & Links**

```
Default location for new notes: src/content/blog
```

### 🖼️ 첨부파일(이미지) 위치 설정

**Settings** → **Files & Links**

```
Default location for new attachments: In the folder specified below
Attachment folder path: public/images
```

> 💡 이렇게 설정하면 `/images/...` 경로로 이미지 링크가 자동 생성되어 배포 시 안전합니다.

### 🔗 Wikilink 비활성화 (권장)

**Settings** → **Files & Links**

```
Use [[Wikilinks]]: ❌ OFF
```

> 💡 블로그 마크다운 호환성을 위해 일반 Markdown 링크 사용을 권장합니다.

---

## ✍️ 글 쓰기 워크플로우

### 1⃣ 새 포스트 생성

1. `src/content/blog/`에서 **새 노트** 생성 (임시 이름 OK)
2. **Command Palette** (`Ctrl/Cmd + P`) 실행
3. `Templater: Insert template` 선택
4. `_templates/new-post.md` 선택
5. 프롬프트에 따라 입력:
   - **slug**: 포스트 URL 경로
   - **title**: 포스트 제목

#### 자동으로 생성되는 것들

- ✅ 파일명: `YYYY-MM-DD-slug.md`
- ✅ Frontmatter 자동 작성
- ✅ 초안 모드: `draft: true`

### 2⃣ 포스트 발행

1. Frontmatter에서 `draft: false`로 변경
2. Git commit & push
3. 배포된 사이트에서 확인

---

## ☁️ 배포 (Cloudflare Pages)

### 설정

Cloudflare Pages에서 이 Git 레포를 연결합니다.

| 설정 항목 | 값 |
|---------|-----|
| **Build command** | `pnpm build` (또는 `npm run build`) |
| **Build output directory** | `dist` |

---

## 🔐 Git 및 Obsidian 설정

### `.obsidian/` 폴더 관리

이 레포는 `.obsidian/`을 커밋하여 팀/기기 간 동일한 작성 경험을 재현합니다.

다만, 개인 작업공간 파일은 `.gitignore`로 제외합니다:

```gitignore
.obsidian/workspace*
.obsidian/cache/
.obsidian/logs/
```

---

## 🐛 트러블슈팅

### ❌ 템플릿 폴더를 못 찾는 경우

- `_templates/` 폴더가 레포 루트에 있는지 확인
- **Templater 설정**에서 `Template folder location`이 `_templates`로 되어 있는지 확인

### ❌ 글이 사이트에 안 보이는 경우

- `draft: true`인 글은 로컬에서만 보입니다
- 발행하려면 `draft: false`로 변경 후 빌드/배포

---

## 📚 참고 자료

- [Astro Documentation](https://docs.astro.build/)
- [Obsidian Help](https://help.obsidian.md/)
- [Templater Documentation](https://silentvoid13.github.io/Templater/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

---

<div align="center">

**Made with ❤️ using Astro & Obsidian**

</div>
