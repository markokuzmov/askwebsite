# ASK Business Solutions - Website Content Migration Repository

This repository contains the extracted text content, page hierarchy, and media assets catalog from [ASK Business Solutions](https://ask-for-solutions.com) (`ask-for-solutions.com`), structured as clean Markdown files with YAML frontmatter.

---

## Directory Structure

```
askwebsite/
├── content/
│   ├── SITE_MAP.md              # Complete site map, navigation menus, forms & payment inventory
│   ├── media.md                 # Markdown table catalog of all 146 media assets
│   ├── media.json               # Full JSON metadata for all media assets
│   ├── pages/                   # All 28 WordPress pages converted to Markdown
│   │   ├── home.md
│   │   ├── about-us.md
│   │   ├── faq.md
│   │   ├── references.md
│   │   ├── consultation.md
│   │   ├── whom-we-can-help.md
│   │   ├── financial-planning.md
│   │   └── ...
│   ├── posts/                   # All 8 blog and advice posts
│   │   ├── what-do-i-need-a-bookkeeper-for.md
│   │   ├── whats-so-special-about-your-company.md
│   │   └── ...
│   └── products/                # Discovered WooCommerce products and service packages
│       ├── donation.md          # Payment Center / Donation custom payment portal
│       ├── bookkeeping-and-reporting.md
│       ├── in-depth-analysis.md
│       └── ...
├── scripts/
│   └── extract_content.py       # Automated Python extractor script
├── requirements.txt             # Python dependencies
└── README.md
```

---

## Content Extraction Details

The extraction pipeline (`scripts/extract_content.py`):
1. **Queries the WordPress REST API endpoints:**
   - Pages: `/wp-json/wp/v2/pages?per_page=100` (28 pages total)
   - Posts: `/wp-json/wp/v2/posts?per_page=100` (8 posts total)
   - Media: `/wp-json/wp/v2/media?per_page=100` (146 assets across 3 paginated pages)
2. **Visual Composer Shortcode Cleaning & Decoding:**
   - Strips Visual Composer layout wrappers (`[vc_row]`, `[vc_column]`, `[vc_column_text]`, etc.).
   - Decodes nested URL-encoded and base64-encoded `[vc_raw_html]` blocks (e.g. on the homepage).
   - Converts `[vc_btn]` shortcodes to clean Markdown/HTML buttons and links.
   - Resolves `[vc_single_image]` image IDs to their direct media asset URLs.
   - Strips embedded slider scripts (`jQuery sliderPro`) and CSS styles.
3. **Live HTML Fallback for Custom PHP Templates:**
   - For pages where `content.rendered` is empty in the REST API (such as custom theme templates `testimonials.php`, `faq.php`, `about_me.php`, `can_help.php`, `consultation.php`, `advice.php`), the script fetches the live web page, extracts the main content container (`div.page` / `main.page-content`), and converts the content to GitHub-Flavored Markdown.
4. **Frontmatter Metadata:**
   Every page and post Markdown file starts with YAML frontmatter:
   ```yaml
   ---
   title: "Page Title"
   slug: "page-slug"
   original_url: "https://ask-for-solutions.com/..."
   date: "2016-07-14T10:25:33"
   template: "home.php"
   content_source: "api" # or "live_html"
   ---
   ```

---

## How to Re-Run the Extraction Script

1. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Execute the script:
   ```bash
   python scripts/extract_content.py
   ```
The script will refresh all files inside `content/` and update `content/SITE_MAP.md`.
