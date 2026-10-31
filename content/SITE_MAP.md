# ASK Business Solutions - Extracted Site Map & Structure

**Target Website:** [https://ask-for-solutions.com](https://ask-for-solutions.com)  
**Extraction Date:** 2026-10-31 16:46:56  
**Extracted Artifacts:**
- **Pages Extracted:** 28
- **Posts Extracted:** 8
- **Products / Services Extracted:** 5
- **Media Assets Cataloged:** 146

---

## 1. Navigation Menus

The website employs a responsive top navigation bar (`rd-navbar`) with dropdown menus, plus header utility links and a footer.

### Primary Header Navigation

* **[What we do](https://ask-for-solutions.com/#what_we_do)** (Anchors to homepage service summary)
* **[Whom we can help](https://ask-for-solutions.com/whom-we-can-help/)** (Overview of target clients)
  * [Foreign national treaty investors](https://ask-for-solutions.com/#who_help|undefined2)
  * [Our speciality](https://ask-for-solutions.com/#who_help|undefined1)
  * [Small businesses](https://ask-for-solutions.com/#who_help|undefined3)
  * [Startups](https://ask-for-solutions.com/#who_help|undefined4)
  * [Need a loan to move your business ahead?](https://ask-for-solutions.com/#who_help|undefined0)
* **[Services](https://ask-for-solutions.com/services/)**
  * [Bookkeeping and reporting](https://ask-for-solutions.com/product/bookkeeping-and-reporting/)
  * [Business review](https://ask-for-solutions.com/product/in-depth-analysis/)
  * [Planning and setting up](https://ask-for-solutions.com/product/planning-and-setting-up/)
  * [Business model optimization](https://ask-for-solutions.com/product/business-model-optimization-and-development/)
* **[About us](https://ask-for-solutions.com/about-us/)**
  * [ENG (English)](https://ask-for-solutions.com/about-us/eng/)
  * [RUS (Russian)](https://ask-for-solutions.com/about-us/rus/)
  * [UKR (Ukrainian)](https://ask-for-solutions.com/about-us/ukr/)

### Header Utility & Account Links
* **Phone Direct:** [813.685.8870](tel:8136858870) / [813.532.9928](tel:8135329928)
* **Personal Cabinet:** [https://ask-for-solutions.com/personal-cabinet](https://ask-for-solutions.com/personal-cabinet) (Client portal login/registration)

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
| **Payment Center URL** | [https://ask-for-solutions.com/product/donation/](https://ask-for-solutions.com/product/donation/) |
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

## 4. Extracted Pages Directory (28 Pages)

All pages are stored as individual Markdown files under [`pages/`](pages/) with YAML frontmatter containing `title`, `slug`, `original_url`, and `date`.

| Title | Slug | Template | Content Source | Words | Markdown File |
|:------|:-----|:---------|:---------------|:------|:--------------|
| Testimonials | `testimonials` | `testimonials.php` | `api` | 0 | [testimonials.md](pages/testimonials.md) |
| Partial client list | `partial-client-list` | `default` | `api` | 494 | [partial-client-list.md](pages/partial-client-list.md) |
| BIOs | `bios` | `default` | `api` | 366 | [bios.md](pages/bios.md) |
| RUS | `rus` | `default` | `api` | 376 | [rus.md](pages/rus.md) |
| ENG | `eng` | `default` | `api` | 440 | [eng.md](pages/eng.md) |
| UKR | `ukr` | `default` | `api` | 375 | [ukr.md](pages/ukr.md) |
| Whom we can help | `whom-we-can-help` | `can_help.php` | `live_html` | 192 | [whom-we-can-help.md](pages/whom-we-can-help.md) |
| Useful Materials | `useful-materials` | `default` | `api` | 0 | [useful-materials.md](pages/useful-materials.md) |
| References | `references` | `testimonials.php` | `live_html` | 332 | [references.md](pages/references.md) |
| FAQ | `faq` | `faq.php` | `live_html` | 518 | [faq.md](pages/faq.md) |
| Мой аккаунт | `my-account` | `default` | `api` | 27 | [my-account.md](pages/my-account.md) |
| Checkout page | `checkout` | `default` | `api` | 293 | [checkout.md](pages/checkout.md) |
| Cart | `cart` | `default` | `api` | 8 | [cart.md](pages/cart.md) |
| Services | `services` | `default` | `live_html` | 12 | [services.md](pages/services.md) |
| Personal cabinet | `personal-cabinet` | `default` | `api` | 27 | [personal-cabinet.md](pages/personal-cabinet.md) |
| Useful financial documents | `useful-financial-documents` | `default` | `api` | 0 | [useful-financial-documents.md](pages/useful-financial-documents.md) |
| Certificates | `certificates` | `default` | `api` | 0 | [certificates.md](pages/certificates.md) |
| Find us on the net | `find-us-on-the-net` | `default` | `api` | 0 | [find-us-on-the-net.md](pages/find-us-on-the-net.md) |
| Languages spoken | `languages-spoken` | `default` | `api` | 0 | [languages-spoken.md](pages/languages-spoken.md) |
| Areas served | `areas-served` | `default` | `api` | 0 | [areas-served.md](pages/areas-served.md) |
| What we do | `what-we-do` | `default` | `api` | 0 | [what-we-do.md](pages/what-we-do.md) |
| Consultation | `consultation` | `consultation.php` | `live_html` | 193 | [consultation.md](pages/consultation.md) |
| Contacts | `contacts` | `default` | `api` | 0 | [contacts.md](pages/contacts.md) |
| Advice | `advice` | `advice.php` | `live_html` | 297 | [advice.md](pages/advice.md) |
| Investment Help | `investment-help` | `default` | `api` | 0 | [investment-help.md](pages/investment-help.md) |
| Financial Planning | `financial-planning` | `default` | `api` | 1771 | [financial-planning.md](pages/financial-planning.md) |
| About us | `about-us` | `about_me.php` | `live_html` | 440 | [about-us.md](pages/about-us.md) |
| Home | `home` | `home.php` | `api` | 1010 | [home.md](pages/home.md) |

---

## 5. Extracted Blog & Advice Posts (8 Posts)

Stored under [`posts/`](posts/) with YAML frontmatter.

| Title | Slug | Date | Words | Markdown File |
|:------|:-----|:-----|:------|:--------------|
| What do I need a bookkeeper for? | `what-do-i-need-a-bookkeeper-for` | 2016-08-31T13:30:17 | 96 | [what-do-i-need-a-bookkeeper-for.md](posts/what-do-i-need-a-bookkeeper-for.md) |
| What’s so special about your company? | `whats-so-special-about-your-company` | 2016-08-31T13:29:52 | 172 | [whats-so-special-about-your-company.md](posts/whats-so-special-about-your-company.md) |
| Why should I trust you? | `why-should-i-trust-you` | 2016-08-31T13:29:26 | 53 | [why-should-i-trust-you.md](posts/why-should-i-trust-you.md) |
| How does remote bookkeeping work? | `how-does-remote-bookkeeping-work` | 2016-08-31T13:28:55 | 118 | [how-does-remote-bookkeeping-work.md](posts/how-does-remote-bookkeeping-work.md) |
| What is “Personal Cabinet”? | `what-is-personal-cabinet` | 2016-08-31T13:28:22 | 37 | [what-is-personal-cabinet.md](posts/what-is-personal-cabinet.md) |
| The Truth About Money | `the-truth-about-money` | 2016-07-14T16:36:16 | 263 | [the-truth-about-money.md](posts/the-truth-about-money.md) |
| Новая важная запись | `%d0%bd%d0%be%d0%b2%d0%b0%d1%8f-%d0%b2%d0%b0%d0%b6%d0%bd%d0%b0%d1%8f-%d0%b7%d0%b0%d0%bf%d0%b8%d1%81%d1%8c` | 2016-07-14T11:09:58 | 216 | [%d0%bd%d0%be%d0%b2%d0%b0%d1%8f-%d0%b2%d0%b0%d0%b6%d0%bd%d0%b0%d1%8f-%d0%b7%d0%b0%d0%bf%d0%b8%d1%81%d1%8c.md](posts/%d0%bd%d0%be%d0%b2%d0%b0%d1%8f-%d0%b2%d0%b0%d0%b6%d0%bd%d0%b0%d1%8f-%d0%b7%d0%b0%d0%bf%d0%b8%d1%81%d1%8c.md) |
| Привет, мир! | `%d0%bf%d1%80%d0%b8%d0%b2%d0%b5%d1%82-%d0%bc%d0%b8%d1%80` | 2016-07-14T10:22:10 | 14 | [%d0%bf%d1%80%d0%b8%d0%b2%d0%b5%d1%82-%d0%bc%d0%b8%d1%80.md](posts/%d0%bf%d1%80%d0%b8%d0%b2%d0%b5%d1%82-%d0%bc%d0%b8%d1%80.md) |

---

## 6. Products & Services (5 Items)

Stored under [`products/`](products/) with YAML frontmatter.

| Product / Service | Slug | Markdown File | Original URL |
|:------------------|:-----|:--------------|:-------------|
| Payment Center / Donation | `donation` | [donation.md](products/donation.md) | [Link](https://ask-for-solutions.com/product/donation/) |
| Bookkeeping and Reporting | `bookkeeping-and-reporting` | [bookkeeping-and-reporting.md](products/bookkeeping-and-reporting.md) | [Link](https://ask-for-solutions.com/product/bookkeeping-and-reporting/) |
| Business Review (In-Depth Analysis) | `in-depth-analysis` | [in-depth-analysis.md](products/in-depth-analysis.md) | [Link](https://ask-for-solutions.com/product/in-depth-analysis/) |
| Planning and Setting Up | `planning-and-setting-up` | [planning-and-setting-up.md](products/planning-and-setting-up.md) | [Link](https://ask-for-solutions.com/product/planning-and-setting-up/) |
| Business Model Optimization | `business-model-optimization-and-development` | [business-model-optimization-and-development.md](products/business-model-optimization-and-development.md) | [Link](https://ask-for-solutions.com/product/business-model-optimization-and-development/) |

---

## 7. Media Assets Summary (146 Total Assets)

All media URLs and details are cataloged in [`media.md`](media.md) and [`media.json`](media.json).

### Breakdown by MIME Type:
- **`image/jpeg`**: 66 assets
- **`image/png`**: 51 assets
- **`application/zip`**: 5 assets
- **`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`**: 5 assets
- **`application/pdf`**: 5 assets
- **`application/rar`**: 2 assets
- **`application/octet-stream`**: 2 assets
- **`application/vnd.openxmlformats-officedocument.wordprocessingml.document`**: 2 assets
- **`unknown`**: 2 assets
- **`text/plain`**: 2 assets
- **`application/vnd.ms-excel`**: 2 assets
- **`text/html`**: 1 assets
- **`image/gif`**: 1 assets

---
*Extracted with automated script `scripts/extract_content.py`.*
