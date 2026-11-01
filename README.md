# ASK Business Solutions - Modern Web Platform & Content Repository

Modern Next.js 16 (App Router) + Tailwind CSS replacement for [ask-for-solutions.com](https://ask-for-solutions.com), featuring full static pre-rendering (SSG), Markdown content integration, an online payment portal, and Python data pipelines managed by Poetry.

---

## Architecture Overview

```
askwebsite/
├── content/                     # Extracted WordPress content
│   ├── SITE_MAP.md             # Inventory of pages, forms, payments & nav
│   ├── media.md                # 146 media attachments catalog
│   ├── pages/                  # 28 Markdown pages with YAML frontmatter
│   ├── posts/                  # 8 Blog & advice posts
│   └── products/               # E-commerce & service packages
│
├── src/                        # Next.js 16 Application (App Router)
│   ├── app/
│   │   ├── page.tsx            # Modern homepage
│   │   ├── layout.tsx          # Root layout with Navbar & Footer
│   │   ├── [slug]/page.tsx     # Dynamic renderer for any Markdown page
│   │   ├── posts/[slug]/       # Dynamic renderer for advice/blog posts
│   │   └── pay/page.tsx        # Online Payment Center (replaces WooCommerce donation)
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive navigation & language indicator
│   │   └── Footer.tsx          # Office address, contact, and quick links
│   └── lib/
│       └── content.ts          # Markdown & frontmatter parsing (gray-matter + marked)
│
├── scripts/                    # Python data extraction pipeline
│   └── extract_content.py      # Automated WordPress REST API & live content scraper
│
├── pyproject.toml              # Poetry Python dependencies
├── poetry.lock                 # Poetry lockfile
├── package.json                # Next.js & React dependencies
└── tsconfig.json               # TypeScript configuration
```

---

## Getting Started

### 1. Frontend Development (Node.js & Next.js)

Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To build the static production bundle:
```bash
npm run build
```
*(All 42+ pages, posts, and routes are statically pre-rendered in ~1 second).*

---

### 2. Python Environment (Poetry)

The repository uses **Poetry** to manage Python virtual environments and scraping scripts.

To run the content extraction scraper inside Poetry's environment:
```bash
poetry run python scripts/extract_content.py
```

Or activate the shell:
```bash
poetry shell
```

---

## Key Features

1. **Static-First Performance:** React Server Components (RSC) pre-render to pure static HTML for 100/100 Google Lighthouse scores and superior local SEO.
2. **Git-Backed Content:** Edit any `.md` file in `content/pages/` or `content/posts/` and the site automatically renders the changes.
3. **Integrated Payment Center (`/pay`):** Modern replacement for the legacy WooCommerce donation page. Allows clients to pay agreed service fees securely.
4. **Multilingual Navigation:** Ready for international clients with support for English, Russian, Ukrainian, and Polish language consulting.
