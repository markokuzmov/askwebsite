#!/usr/bin/env python3
"""
WordPress Content & Media Extractor for ASK Business Solutions
Website: https://ask-for-solutions.com

Fetches all pages, posts, and media from the WordPress REST API and live site,
cleans Visual Composer shortcodes, converts HTML to clean Markdown, and generates
an organized content repository with YAML frontmatter and a comprehensive SITE_MAP.md.
"""

import os
import sys
import re
import html
import json
import base64
import urllib.parse
from datetime import datetime
from pathlib import Path

# Ensure UTF-8 output in Windows environments
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import requests
from bs4 import BeautifulSoup
import markdownify
import yaml


BASE_URL = "https://ask-for-solutions.com"
API_BASE = f"{BASE_URL}/wp-json/wp/v2"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "content"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    )
}


def fetch_paginated_api(endpoint: str) -> list:
    """Fetch all records from a WordPress REST API endpoint with pagination."""
    items = []
    page = 1
    per_page = 100
    print(f"[*] Fetching REST API: {endpoint}...")
    while True:
        url = f"{API_BASE}/{endpoint}?per_page={per_page}&page={page}"
        try:
            resp = requests.get(url, headers=HEADERS, timeout=30)
            if resp.status_code == 400:
                # Page out of bounds
                break
            resp.raise_for_status()
            data = resp.json()
            if not isinstance(data, list) or not data:
                break
            items.extend(data)
            total_pages = int(resp.headers.get("X-WP-TotalPages", 1))
            print(f"    Page {page}/{total_pages}: {len(data)} items")
            if page >= total_pages:
                break
            page += 1
        except Exception as e:
            print(f"    [!] Error fetching {url}: {e}")
            break
    print(f"[+] Total {endpoint} fetched: {len(items)}")
    return items


def decode_raw_html(encoded_str: str) -> str:
    """
    Decodes Visual Composer's raw_html shortcode content.
    Visual Composer often nests URL encoding and base64.
    """
    cleaned = encoded_str.strip()
    try:
        # Step 1: URL unquote
        s1 = urllib.parse.unquote(cleaned)
        # Step 2: Base64 decode
        s2 = base64.b64decode(s1).decode("utf-8", errors="ignore")
        # Step 3: Secondary URL unquote
        s3 = urllib.parse.unquote(s2)
        return s3
    except Exception:
        # Fallback to direct URL unquote
        return urllib.parse.unquote(cleaned)


def clean_vc_shortcodes(content: str, media_map: dict) -> str:
    """
    Cleans Visual Composer shortcodes and converts special elements to valid HTML
    ready for markdownify conversion.
    """
    if not content:
        return ""

    # Unescape HTML entities in shortcode tag strings so attribute parsers can work
    content = content.replace("&#8221;", '"').replace("&#8243;", '"')
    content = content.replace("&#8217;", "'").replace("&#8216;", "'")
    content = content.replace("&quot;", '"')

    # 1. vc_raw_html: extract inner encoded content and decode into HTML
    def replace_raw_html(match):
        raw_inner = match.group(1)
        decoded = decode_raw_html(raw_inner)
        return f"\n<div>{decoded}</div>\n"

    content = re.sub(
        r'\[vc_raw_html[^\]]*\](.*?)\[/vc_raw_html\]',
        replace_raw_html,
        content,
        flags=re.DOTALL
    )

    # 2. vc_btn: convert to HTML link
    def replace_btn(match):
        tag = match.group(0)
        title_m = re.search(r'title=["\'](.*?)["\']', tag)
        title = title_m.group(1) if title_m else "Button"
        link_m = re.search(r'link=["\'](.*?)["\']', tag)
        link_url = "#"
        if link_m:
            link_raw = link_m.group(1)
            # Format: url:http%3A%2F%2F...|title:...
            url_match = re.search(r'url:([^\|]+)', link_raw)
            if url_match:
                link_url = urllib.parse.unquote(url_match.group(1))
        return f'\n<p><a href="{link_url}">{title}</a></p>\n'

    content = re.sub(r'\[vc_btn[^\]]+\]', replace_btn, content)

    # 3. vc_single_image: convert to HTML image
    def replace_single_image(match):
        tag = match.group(0)
        img_m = re.search(r'image=["\'](\d+)["\']', tag)
        if img_m:
            img_id = int(img_m.group(1))
            img_url = media_map.get(img_id, "")
            if img_url:
                return f'\n<p><img src="{img_url}" alt="Image" /></p>\n'
        return ""

    content = re.sub(r'\[vc_single_image[^\]]+\]', replace_single_image, content)

    # 4. vc_custom_heading: convert to HTML heading
    def replace_heading(match):
        tag = match.group(0)
        text_m = re.search(r'text=["\'](.*?)["\']', tag)
        if text_m:
            return f"\n<h3>{text_m.group(1)}</h3>\n"
        return ""

    content = re.sub(r'\[vc_custom_heading[^\]]+\]', replace_heading, content)

    # 5. vc_separator: convert to horizontal rule
    content = re.sub(r'\[vc_separator[^\]]*\]', '\n<hr />\n', content)

    # 6. Remove layout shortcode tags (keep their inner text/html content)
    layout_tags = [
        'vc_row', 'vc_row_inner',
        'vc_column', 'vc_column_inner',
        'vc_column_text',
        'vc_section'
    ]
    for tag in layout_tags:
        content = re.sub(rf'\[/?{tag}(?:\s+[^\]]*)?\]', '', content)

    # 7. Strip any remaining shortcodes
    content = re.sub(r'\[/?[a-zA-Z0-9_\-]+(?:\s+[^\]]*)?\]', '', content)

    return content


def extract_live_page_content(url: str) -> str:
    """
    Fetches the live HTML page and extracts the main content container
    for pages that use custom PHP templates.
    """
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        if resp.status_code != 200:
            print(f"    [!] Failed to fetch live page {url} (status {resp.status_code})")
            return ""

        soup = BeautifulSoup(resp.text, "html.parser")

        page_div = soup.find("div", class_="page") or soup.body
        if not page_div:
            return ""

        # Remove header, footer, scripts, styles, noscript
        for unwanted in page_div.find_all(
            ["header", "footer", "script", "style", "noscript", "nav"]
        ):
            unwanted.decompose()

        # Remove breadcrumb section if present
        for breadcrumb in page_div.find_all("section", class_="bg-mine"):
            breadcrumb.decompose()

        # Target specific content elements inside page_div
        content_html_parts = []
        for child in page_div.children:
            if getattr(child, "name", None):
                # Don't re-include nested modals or overlays
                if child.get("id") in ["modal", "overlay"]:
                    continue
                content_html_parts.append(str(child))

        extracted_html = "\n".join(content_html_parts).strip()
        return extracted_html
    except Exception as e:
        print(f"    [!] Exception extracting live content from {url}: {e}")
        return ""


def html_to_clean_markdown(raw_html: str) -> str:
    """Converts HTML to clean, readable Markdown, stripping scripts and styles."""
    if not raw_html:
        return ""

    # Parse and strip any script or style tags with BeautifulSoup
    soup = BeautifulSoup(raw_html, "html.parser")
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    # Remove empty image tags
    for img in soup.find_all("img"):
        src = img.get("src", "").strip()
        if not src:
            img.decompose()

    cleaned_html = str(soup)

    md = markdownify.markdownify(
        cleaned_html,
        heading_style="ATX",
        bullets="*",
        strip=["script", "style"]
    )

    # Post-process markdown
    # Replace non-breaking spaces
    md = md.replace("\xa0", " ")
    # Replace carriage returns
    md = md.replace("\r\n", "\n").replace("\r", "\n")
    # Clean up empty heading tags or dangling markers
    md = re.sub(r'^(#+\s*)$', '', md, flags=re.MULTILINE)
    # Remove empty markdown images like ![]() or ![](\s*)
    md = re.sub(r'!\[.*?\]\(\s*\)', '', md)
    # Normalize multiple blank lines (max 2 consecutive newlines)
    md = re.sub(r'\n{3,}', '\n\n', md)
    return md.strip()


def build_yaml_frontmatter(metadata: dict) -> str:
    """Builds clean YAML frontmatter."""
    ordered = {
        "title": metadata.get("title", ""),
        "slug": metadata.get("slug", ""),
        "original_url": metadata.get("original_url", ""),
        "date": metadata.get("date", ""),
        "template": metadata.get("template", ""),
        "content_source": metadata.get("content_source", "api"),
    }
    yaml_str = yaml.safe_dump(ordered, default_flow_style=False, sort_keys=False, allow_unicode=True)
    return f"---\n{yaml_str}---\n\n"


def process_pages(pages: list, media_map: dict) -> list:
    """Processes all pages and saves them as Markdown files."""
    pages_dir = OUTPUT_DIR / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)

    page_records = []
    print("\n[*] Processing Pages...")

    for p in pages:
        page_id = p["id"]
        raw_slug = p["slug"]
        slug = urllib.parse.unquote(raw_slug)
        title = html.unescape(p["title"]["rendered"]).strip()
        link = p["link"]
        date = p["date"]
        template = p.get("template", "")
        api_rendered = p["content"]["rendered"]

        # Check API content after cleaning
        cleaned_api = clean_vc_shortcodes(api_rendered, media_map)
        content_source = "api"
        raw_content_html = cleaned_api

        # If API content is empty or trivial, fallback to live HTML scraping
        clean_text_check = BeautifulSoup(cleaned_api, "html.parser").get_text(strip=True)
        if len(clean_text_check) < 50:
            print(f"    -> Slug '{slug}' API content empty/trivial ({len(clean_text_check)} chars). Fetching live HTML...")
            live_html = extract_live_page_content(link)
            live_text_check = BeautifulSoup(live_html, "html.parser").get_text(strip=True)
            if len(live_text_check) > len(clean_text_check):
                raw_content_html = live_html
                content_source = "live_html"
                print(f"       Extracted {len(live_text_check)} chars from live HTML.")
            else:
                print(f"       Live HTML also empty/placeholder ({len(live_text_check)} chars).")

        # Convert to clean markdown
        md_body = html_to_clean_markdown(raw_content_html)

        # Build frontmatter
        meta = {
            "title": title,
            "slug": slug,
            "original_url": link,
            "date": date,
            "template": template if template else "default",
            "content_source": content_source,
        }
        full_md = build_yaml_frontmatter(meta)
        if md_body:
            full_md += md_body + "\n"
        else:
            full_md += "*(This page had no content in the WordPress database or live site template.)*\n"

        # Save to file
        file_path = pages_dir / f"{slug}.md"
        file_path.write_text(full_md, encoding="utf-8")

        word_count = len(md_body.split())
        page_records.append({
            "id": page_id,
            "title": title,
            "slug": slug,
            "original_url": link,
            "date": date,
            "template": template or "default",
            "content_source": content_source,
            "word_count": word_count,
            "file_path": f"pages/{slug}.md"
        })
        print(f"    [+] Saved {file_path.name} ({word_count} words, source: {content_source})")

    return page_records


def process_posts(posts: list, media_map: dict) -> list:
    """Processes all blog posts and saves them as Markdown files."""
    posts_dir = OUTPUT_DIR / "posts"
    posts_dir.mkdir(parents=True, exist_ok=True)

    post_records = []
    print("\n[*] Processing Posts...")

    for p in posts:
        post_id = p["id"]
        slug = p["slug"]
        title = html.unescape(p["title"]["rendered"]).strip()
        link = p["link"]
        date = p["date"]
        api_rendered = p["content"]["rendered"]

        cleaned_html = clean_vc_shortcodes(api_rendered, media_map)
        md_body = html_to_clean_markdown(cleaned_html)

        meta = {
            "title": title,
            "slug": slug,
            "original_url": link,
            "date": date,
            "content_source": "api"
        }
        if slug != urllib.parse.unquote(slug):
            meta["slug_decoded"] = urllib.parse.unquote(slug)

        full_md = build_yaml_frontmatter(meta)
        if md_body:
            full_md += md_body + "\n"
        else:
            full_md += "*(No content)*\n"

        file_path = posts_dir / f"{slug}.md"
        file_path.write_text(full_md, encoding="utf-8")

        word_count = len(md_body.split())
        post_records.append({
            "id": post_id,
            "title": title,
            "slug": slug,
            "original_url": link,
            "date": date,
            "word_count": word_count,
            "file_path": f"posts/{slug}.md"
        })
        print(f"    [+] Saved {file_path.name} ({word_count} words)")

    return post_records


def process_media(media_items: list) -> tuple[dict, list]:
    """Generates media lookup map and saves media catalog."""
    media_map = {}
    catalog = []

    for item in media_items:
        m_id = item["id"]
        source_url = item["source_url"]
        media_map[m_id] = source_url

        catalog.append({
            "id": m_id,
            "date": item.get("date", ""),
            "slug": item.get("slug", ""),
            "title": html.unescape(item.get("title", {}).get("rendered", "")).strip(),
            "mime_type": item.get("mime_type", ""),
            "media_type": item.get("media_type", ""),
            "source_url": source_url,
            "alt_text": item.get("alt_text", ""),
            "width": item.get("media_details", {}).get("width"),
            "height": item.get("media_details", {}).get("height"),
        })

    # Save JSON catalog
    json_path = OUTPUT_DIR / "media.json"
    json_path.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding="utf-8")

    # Save Markdown catalog
    md_lines = [
        "# Media Assets Catalog\n",
        f"Total Assets: **{len(catalog)}**\n",
        "| ID | Title | MIME Type | Dimensions | Direct Link |",
        "|:---|:------|:----------|:-----------|:------------|",
    ]
    for c in catalog:
        dims = f"{c['width']}x{c['height']}" if c['width'] and c['height'] else "-"
        md_lines.append(
            f"| {c['id']} | {c['title']} | `{c['mime_type']}` | {dims} | [Link]({c['source_url']}) |"
        )

    md_path = OUTPUT_DIR / "media.md"
    md_path.write_text("\n".join(md_lines) + "\n", encoding="utf-8")
    print(f"[+] Saved media catalog to {md_path.name} and {json_path.name}")

    return media_map, catalog


def process_products() -> list:
    """
    Extracts WooCommerce donation & service products discovered on the site.
    """
    products_dir = OUTPUT_DIR / "products"
    products_dir.mkdir(parents=True, exist_ok=True)

    product_urls = [
        ("donation", "Payment Center / Donation", f"{BASE_URL}/product/donation/"),
        ("bookkeeping-and-reporting", "Bookkeeping and Reporting", f"{BASE_URL}/product/bookkeeping-and-reporting/"),
        ("in-depth-analysis", "Business Review (In-Depth Analysis)", f"{BASE_URL}/product/in-depth-analysis/"),
        ("planning-and-setting-up", "Planning and Setting Up", f"{BASE_URL}/product/planning-and-setting-up/"),
        ("business-model-optimization-and-development", "Business Model Optimization", f"{BASE_URL}/product/business-model-optimization-and-development/"),
    ]

    records = []
    print("\n[*] Processing Products...")

    for slug, default_title, url in product_urls:
        try:
            resp = requests.get(url, headers=HEADERS, timeout=30)
            if resp.status_code != 200:
                continue
            soup = BeautifulSoup(resp.text, "html.parser")
            product_div = soup.find("div", class_="product") or soup.find("main") or soup.body
            for unwanted in product_div.find_all(["header", "footer", "script", "style", "noscript"]):
                unwanted.decompose()

            raw_html = str(product_div)
            md_body = html_to_clean_markdown(raw_html)

            meta = {
                "title": default_title,
                "slug": slug,
                "original_url": url,
                "type": "woocommerce_product",
                "content_source": "live_html"
            }
            full_md = build_yaml_frontmatter(meta) + md_body + "\n"

            file_path = products_dir / f"{slug}.md"
            file_path.write_text(full_md, encoding="utf-8")

            records.append({
                "title": default_title,
                "slug": slug,
                "original_url": url,
                "file_path": f"products/{slug}.md"
            })
            print(f"    [+] Saved product: {file_path.name}")
        except Exception as e:
            print(f"    [!] Error extracting product {url}: {e}")

    return records


def generate_site_map(pages: list, posts: list, products: list, media_catalog: list):
    """
    Generates content/SITE_MAP.md summarizing extracted pages, navigation menus,
    forms, payment buttons, and media assets.
    """
    site_map_path = OUTPUT_DIR / "SITE_MAP.md"

    mime_counts = {}
    for m in media_catalog:
        mime = m["mime_type"] or "unknown"
        mime_counts[mime] = mime_counts.get(mime, 0) + 1

    content = f"""# ASK Business Solutions - Extracted Site Map & Structure

**Target Website:** [{BASE_URL}]({BASE_URL})  
**Extraction Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Extracted Artifacts:**
- **Pages Extracted:** {len(pages)}
- **Posts Extracted:** {len(posts)}
- **Products / Services Extracted:** {len(products)}
- **Media Assets Cataloged:** {len(media_catalog)}

---

## 1. Navigation Menus

The website employs a responsive top navigation bar (`rd-navbar`) with dropdown menus, plus header utility links and a footer.

### Primary Header Navigation

* **[What we do]({BASE_URL}/#what_we_do)** (Anchors to homepage service summary)
* **[Whom we can help]({BASE_URL}/whom-we-can-help/)** (Overview of target clients)
  * [Foreign national treaty investors]({BASE_URL}/#who_help|undefined2)
  * [Our speciality]({BASE_URL}/#who_help|undefined1)
  * [Small businesses]({BASE_URL}/#who_help|undefined3)
  * [Startups]({BASE_URL}/#who_help|undefined4)
  * [Need a loan to move your business ahead?]({BASE_URL}/#who_help|undefined0)
* **[Services]({BASE_URL}/services/)**
  * [Bookkeeping and reporting]({BASE_URL}/product/bookkeeping-and-reporting/)
  * [Business review]({BASE_URL}/product/in-depth-analysis/)
  * [Planning and setting up]({BASE_URL}/product/planning-and-setting-up/)
  * [Business model optimization]({BASE_URL}/product/business-model-optimization-and-development/)
* **[About us]({BASE_URL}/about-us/)**
  * [ENG (English)]({BASE_URL}/about-us/eng/)
  * [RUS (Russian)]({BASE_URL}/about-us/rus/)
  * [UKR (Ukrainian)]({BASE_URL}/about-us/ukr/)

### Header Utility & Account Links
* **Phone Direct:** [813.685.8870](tel:8136858870) / [813.532.9928](tel:8135329928)
* **Personal Cabinet:** [{BASE_URL}/personal-cabinet]({BASE_URL}/personal-cabinet) (Client portal login/registration)

### Footer Links & Socials
* **Privacy Policy:** `privacy.html`
* **Facebook:** [ASK Business Solutions Facebook](https://www.facebook.com/ASKBusinessSolutions/)
* **LinkedIn:** [ASK Business Solutions LinkedIn](https://www.linkedin.com/company-beta/25014332/)
* **Developer/Agency Link:** [Smart Made](http://en.smart-made.com/)
* **Office Location:** 2820 Graphite Ct, Valrico, FL 33594-5043 USA
* **Email:** info@ask-for-solutions.com

---

## 2. Payment & Stripe / E-Commerce Analysis

| Item | Details |
|:-----|:--------|
| **Payment Button Found** | `[YOU CAN PAY RIGHT HERE]` on Home page |
| **Payment Button Shortcode** | `[vc_btn title="YOU CAN PAY RIGHT HERE" link="url:%2Fproduct%2Fdonation%2F||"]` |
| **Payment Center URL** | [{BASE_URL}/product/donation/]({BASE_URL}/product/donation/) |
| **Payment Functionality** | Custom payment gateway allowing clients to enter a custom amount (`donation_amount`) for accounting and bookkeeping services. |
| **E-Commerce Platform** | **WooCommerce** (`product-type-donation`). Integrates standard credit/debit card checkout. |
| **Checkout Flow** | Products/Donations are added to Cart (`/cart/`) -> proceed to Checkout (`/checkout/`). |
| **Stripe / Payment Gateway** | WooCommerce standard credit card gateway handlers configured on backend. |

---

## 3. Contact Forms & Interactive Elements

| Location / Page | Form Type | Fields / Inputs | Action / Handler |
|:----------------|:----------|:----------------|:-----------------|
| **Global Footer (All Pages)** | Contact Form 7 (`wpcf7-form`) | `your-email` (Newsletter subscription) | Action: `/#wpcf7-f280-o1` |
| **Home Page** | Contact Form 7 (`wpcf7-f212-p4-o2`) | `your-name`, `your-email`, `your-message`, submit | Action: `/#wpcf7-f212-p4-o2` |
| **Consultation Page** (`/consultation/`) | RD Mailform (`rd-mailform`) | `name`, `surname`, `email`, `phone`, date & appointment slot picker | Action: `bat/rd-mailform.php` |
| **Personal Cabinet / My Account** (`/personal-cabinet/`, `/my-account/`) | WooCommerce Login & Registration Forms | Login: `username`, `password`, `rememberme`<br>Register: `email`, `password`, `email_2` | Action: WooCommerce authentication handlers |

---

## 4. Extracted Pages Directory ({len(pages)} Pages)

All pages are stored as individual Markdown files under [`pages/`](pages/) with YAML frontmatter containing `title`, `slug`, `original_url`, and `date`.

| Title | Slug | Template | Content Source | Words | Markdown File |
|:------|:-----|:---------|:---------------|:------|:--------------|
"""

    for p in pages:
        content += f"| {p['title']} | `{p['slug']}` | `{p['template']}` | `{p['content_source']}` | {p['word_count']} | [{p['slug']}.md]({p['file_path']}) |\n"

    content += f"""
---

## 5. Extracted Blog & Advice Posts ({len(posts)} Posts)

Stored under [`posts/`](posts/) with YAML frontmatter.

| Title | Slug | Date | Words | Markdown File |
|:------|:-----|:-----|:------|:--------------|
"""

    for p in posts:
        content += f"| {p['title']} | `{p['slug']}` | {p['date']} | {p['word_count']} | [{p['slug']}.md]({p['file_path']}) |\n"

    content += f"""
---

## 6. Products & Services ({len(products)} Items)

Stored under [`products/`](products/) with YAML frontmatter.

| Product / Service | Slug | Markdown File | Original URL |
|:------------------|:-----|:--------------|:-------------|
"""

    for pr in products:
        content += f"| {pr['title']} | `{pr['slug']}` | [{pr['slug']}.md]({pr['file_path']}) | [Link]({pr['original_url']}) |\n"

    content += f"""
---

## 7. Media Assets Summary ({len(media_catalog)} Total Assets)

All media URLs and details are cataloged in [`media.md`](media.md) and [`media.json`](media.json).

### Breakdown by MIME Type:
"""

    for mime, count in sorted(mime_counts.items(), key=lambda x: -x[1]):
        content += f"- **`{mime}`**: {count} assets\n"

    content += "\n---\n*Extracted with automated script `scripts/extract_content.py`.*\n"

    site_map_path.write_text(content, encoding="utf-8")
    print(f"\n[+] Successfully generated {site_map_path.name}")


def main():
    print("=" * 60)
    print(" ASK Business Solutions Content Extractor")
    print(" Target: https://ask-for-solutions.com")
    print("=" * 60)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Fetch Media and build lookup map
    raw_media = fetch_paginated_api("media")
    media_map, media_catalog = process_media(raw_media)

    # 2. Fetch and process Pages
    raw_pages = fetch_paginated_api("pages")
    page_records = process_pages(raw_pages, media_map)

    # 3. Fetch and process Posts
    raw_posts = fetch_paginated_api("posts")
    post_records = process_posts(raw_posts, media_map)

    # 4. Extract Products
    product_records = process_products()

    # 5. Generate SITE_MAP.md
    generate_site_map(page_records, post_records, product_records, media_catalog)

    print("\n" + "=" * 60)
    print(" Extraction Complete!")
    print(f" Output Directory: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
