# Product Requirements Document (PRD): MPKV Portal Modernization & CMS

| Document Metadata | Details | 
| ----- | ----- | 
| **Project Name** | Mahatma Phule Krishi Vidyapeeth (MPKV) — Modern Web Portal & Admin CMS | 
| **Language & Content Rule** | **Same Bilingual Content (Marathi `मराठी` + English) Scraped & Preserved Verbatim (As-Is)** | 
| **Data Organization Rule** | **Zero Omissions & Strictly Sorted According to Pages** | 
| **Source Website** | `https://mpkv.ac.in/Home/IndexNew` & internal `mpkv.ac.in` routes | 
| **Reference Architecture** | MahaPrisons Portal & Maker-Checker CMS (v1.0) | 
| **Version** | 1.5 (Strict Zero-Omission, Per-Page Sorted, Same Bilingual Content, Frontend-First, Local-Media-Only, Verbatim-Data Edition) | 
| **Date** | November 22, 2026 | 
| **Target Audience** | Farmers, Students, Researchers, Extension Officers, Citizens, and University Staff | 

## 1. Executive Summary & Non-Negotiable Orders

This PRD defines how to modernize the **Mahatma Phule Krishi Vidyapeeth (MPKV)** (`महात्मा फुले कृषी विद्यापीठ`) website in **Antigravity** using the **MahaPrisons** public frontend + Maker-Checker Admin CMS architecture. Every build step and scraper run must obey these strict orders without exception:

1. **Strict Order — Get Each and Every Data Item (Zero Omissions / Do Not Miss Anything):** Extract **100% of data** from every discovered page and section—every heading (`h1`–`h6`), paragraph, list item, table row and cell, card, link, button/label, form field, tab panel, accordion body, carousel slide, modal/audio item, announcement, tender, recruitment notice, circular, agro-advisory (`शेतकरी सल्ला`), holiday entry, seed/nursery row, contact detail, header/footer item, and media asset. Hidden or collapsed UI panels must be expanded/activated before extraction, and a coverage ledger (`coverage-ledger.json`) must verify that every discovered route and DOM/data block is accounted for without silent omission.

2. **Strict Order — Every Data Must Be Sorted According to Pages:** Every single extracted text block, table row, announcement, advisory, seed/nursery record, media asset, and link must be explicitly tagged with its exact originating `page_slug` and `source_url` and **sorted according to pages**—stored in individual per-page files (`src/data/scraped/pages/<page-slug>.json`), a deterministically page-sorted master index (`src/data/scraped/by-page.json`), and a complete page inventory (`src/data/scraped/page-manifest.json`), with items within each page ordered deterministically by section and sequence index.

3. **Strict Order — Same Bilingual Content (Marathi + English):** Include the **exact same bilingual content in both Marathi (`मराठी`) and English** across menus, headings, pages, announcements, advisories, seed/nursery tables, and CMS fields so switching between `मराठी` and `English` on the frontend and editing in the CMS preserves full bilingual parity.

4. **Strict Order — Zero External Runtime Links/Media:** No data, images, logos, PDFs, audio, or embeds may be loaded dynamically from external URLs at runtime. Download every image, logo, PDF, and audio asset locally into `public/media/{logos|images|docs|audio}/` and rewrite references to local `/media/...` paths.

5. **Strict Order — Verbatim Scraped Data (Zero Alteration):** Preserve all scraped Marathi and English text, numbers, dates, names, and records **100% as-is**—character-for-character and value-for-value—without summarizing, paraphrasing, cleaning up, translating, or altering scraped content.

6. **Strict Order — Frontend First, Then Save to DB:** Build and verify the complete modern Public Frontend and Admin CMS UI **first** using the local per-page scraped bilingual data and `/public/media/...` assets, and only after the frontend is complete, save/persist that data into the project database.

## 2. Target Tech Stack (Antigravity Optimized)

* **Frontend Framework:** Next.js 14+ (App Router) with React 18+ and TypeScript

* **Styling & Design System:** Tailwind CSS + Lucide Icons + Modern Agricultural/Academic Theme (Primary Forest/Emerald Green `#14532D` / `#166534`, Accent Harvest Gold `#D97706`, Clean Neutral Surfaces `#F8FAFC`, High-Contrast `#000000` / `#FACC15`)

* **Local Asset Storage:** Local filesystem storage inside the project (`public/media/logos/`, `public/media/images/`, `public/media/docs/`, `public/media/audio/`) — **no external hotlinking**

* **Frontend Seed Data Layer (Step 1 — Strictly Sorted by Page):** Per-page local JSON/TypeScript datasets generated verbatim by the scraper (`src/data/scraped/pages/<page-slug>.json`, `src/data/scraped/by-page.json`, `src/data/scraped/page-manifest.json`, `src/data/scraped/coverage-ledger.json`) containing paired Marathi and English scraped content sorted strictly according to pages

* **Database & Backend (Step 2 — After Frontend is Built):** PostgreSQL (or SQLite/Postgres via Prisma/Drizzle) for persisting all frontend data, bilingual CMS edits, users, submissions, and immutable audit logs

* **Authentication & RBAC:** Session/JWT auth (`SUPER_ADMIN`, `MAKER`, `CHECKER`)

* **Bilingual & Marathi Input:** Phonetic transliteration helper + translation utility in CMS (while keeping all scraped legacy Marathi and English content untouched as-is)

## 3. Build Order: Frontend-First → Save to DB

Development in Antigravity **must** execute in this strict sequence:

### Stage A: Verbatim Bilingual Per-Page Scraper + Local Asset Downloader (Zero Omissions & Strict Page Sorting)

1. Discover and crawl `https://mpkv.ac.in/Home/IndexNew` and every internal `mpkv.ac.in` page/route across **both Marathi (`mr`) and English (`en`)** so every record exists with the exact same bilingual content.

2. Expand/click all tabs, accordions, carousels, modals, and data tables before extraction so **no data is missed**, and record every discovered vs. extracted route/element in `src/data/scraped/coverage-ledger.json`.

3. Group and **sort every single extracted record strictly according to pages** (`src/data/scraped/pages/<page-slug>.json`, `src/data/scraped/by-page.json`, `src/data/scraped/page-manifest.json`), ordered deterministically by page slug/route and item order within each page.

4. Download every image (`.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`, logos, banners, portraits, gallery photos), PDF/document, and audio asset locally into `public/media/{logos|images|docs|audio}/`, mapping every asset reference to a local `/media/...` path and logging checksums and any download failures in `media-manifest.json` and `failed-assets.json`.

5. Keep every scraped string, date, number, and table record **100% verbatim as-is** without rewriting, summarizing, or modifying original scraped text.

### Stage B: Modern Public Frontend & Admin CMS UI (Using Local Page-Sorted Bilingual Data)

1. Build the **Public Frontend** rendering 100% from local `/media/...` files and strictly page-sorted local data (`src/data/scraped/pages/<page-slug>.json` / `by-page.json`), with zero external network calls for images or content and identical Marathi (`मराठी`) and English content.

2. Implement bilingual toggle (`मराठी` / `English`), accessibility controls (`A+`, `A`, `A-`, High Contrast, Dark Theme), `Listen to Content / मजकूर ऐका` (Web Speech API), responsive mega-menu + mobile drawer, tabbed notices, seed/nursery tables, photo gallery lightbox, and polite 404 (*Page Not Configured*).

3. Build the **Admin CMS** (MahaPrisons structure) on top of the local page-sorted data store with full bilingual (`mr` + `en`) fields:

   * Roles & logins (`SUPER_ADMIN`, `MAKER`, `CHECKER`) + User Management (`SUPER_ADMIN` only, unique email, blank password keeps old password, self-delete blocked).

   * Media Library (`All`, `Images`, `Logos`, `Docs`, `<= 4.5 MB` limit, allowed image/PDF types, search, copy path/link, delete).

   * Global Settings (Header, Footer, Home Wallpapers with configurable rotation speed, Login photo, Undo, split-screen live preview).

   * 3-Level Navigation Builder (`Main Heading → Column Group → Page Link`, reorder, Undo, protected `Home`).

   * Page Editor (Homepage, flagship campus/institute view, and inner pages sorted by page with **25 Ready-Made Page Templates**, click-to-jump side-by-side preview, `Cancel Draft`, template content memory, Marathi phonetic typing + translate helper).

   * Maker-Checker workflow (`Submit for Review` for Maker, `My Submissions`, Checker `View Live Preview` + mandatory rejection reason + `Approve & Publish`) and immutable `Audit Logs`.

### Stage C: Save Frontend Data to Database & Connect Backend Persistence

1. Once the frontend and CMS are built and verified end-to-end using the local page-sorted bilingual data, create the database schema and import/seed pipeline.

2. Persist all bilingual frontend/scraped data (`site_settings`, `navigation_items`, `pages`, `announcements`, `seed_nursery_stock`, `holidays_calendar`, `media_library` metadata referencing local `/media/...` files, `users`, `submissions`, and `audit_logs`) into the database while maintaining strict per-page grouping/sorting (`page_slug` + `sort_order`) and bilingual parity.

3. Replace in-memory/JSON mutations in the Admin CMS with database read/write/approval/audit-log persistence while keeping all media files stored locally on disk.

## 4. Verbatim Bilingual Data Migration Specification (`mpkv.ac.in` → Page-Sorted Local Data & DB)

### 4.1 Strict Orders: Zero Omissions, Sorted According to Pages, Same Bilingual Content, & Verbatim Preservation

* **Get Each and Every Data Item (Do Not Miss Anything):** Every visible and expandable text block, heading, paragraph, list, table row/cell, card, link, notice, tender, recruitment item, circular, agro-advisory, holiday, seed/nursery item, contact item, header/footer element, and media file on every page must be captured and verified against `coverage-ledger.json`. Nothing may be dropped silently.

* **Every Data Must Be Sorted According to Pages:** Every record must carry its exact `page_slug` and `sort_order` and be organized into per-page JSON files (`src/data/scraped/pages/<page-slug>.json`), a master page-sorted index (`src/data/scraped/by-page.json` sorted by page key/route), and `src/data/scraped/page-manifest.json`.

* **Same Bilingual Content (Marathi + English):** Every page and data entry must capture and preserve the **exact same bilingual content in both Marathi (`मराठी`) and English** available on the source portal so both languages are complete and available across the frontend and CMS.

* **Verbatim Preservation:** Every scraped Marathi and English string, title, date, number, table cell, and record must be stored **exact as scraped** (`raw` / verbatim preservation) without editing, summarizing, or translating existing scraped text.

* Any missing or unscraped field is left explicitly null/empty rather than fabricated.

### 4.2 Local Asset Rule (No External Links)

* All external image URLs, PDF/document URLs, and audio URLs discovered during scraping must be downloaded to local storage (`public/media/logos/`, `public/media/images/`, `public/media/docs/`, `public/media/audio/`).

* All rendered `<img>`, audio, and document links in the frontend and CMS must reference local paths (e.g., `/media/images/...`, `/media/logos/...`, `/media/docs/...`, `/media/audio/...`), never external URLs.

* Media Library uploads in the CMS also save files to local storage and enforce:

  * **Max size:** `4.5 MB` (`4,718,592` bytes)

  * **Allowed formats:** Images (`.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`) and PDFs (`.pdf`)

### 4.3 Data Categories to Scrape Verbatim in Both Languages (Sorted According to Pages)

1. **Header, Footer & Institutional Info:** Marathi and English titles, logos, contact addresses, phone numbers, emails, statutory/utility links, and audio items—assigned to their page(s) and sorted per page.

2. **Navigation Menu:** Top-level headings, dropdown/sub-menus, and links in both Marathi and English preserving original labels, hierarchy, and page mapping.

3. **Pages & Sections:** Homepage blocks, leadership/officials, academics, research, extension, library, students, and inner pages mapped to the **25 Ready-Made Page Templates**, strictly sorted per page with Marathi and English content intact.

4. **Announcements & Tables:** Recruitment, Tenders, Circulars, Agro-Advisories (`शेतकरी सल्ला`), News/Events, Holidays, and Seed/Nursery availability tables in Marathi and English—all kept verbatim with locally saved PDFs and images and strictly sorted under their respective pages.

## 5. Database Schema (For Stage C — Saving Frontend Data to DB)

Once the frontend is built, persist the frontend state and page-sorted bilingual records into these tables:

 1. **`users`**: `id`, `full_name`, `email` (unique), `password_hash`, `role` (`SUPER_ADMIN` | `MAKER` | `CHECKER`), `department`, `is_active`, `created_at`, `updated_at`

 2. **`media_library`**: `id`, `file_name`, `local_path` (e.g., `/media/images/...`), `file_type` (`LOGO` | `IMAGE` | `DOC` | `AUDIO`), `mime_type`, `file_size_bytes` (`<= 4718592` for CMS uploads), `source_page_slug`, `sort_order`, `uploaded_by`, `created_at`

 3. **`site_settings`**: `id` (PK `1`), `header_config` (JSONB), `footer_config` (JSONB), `wallpaper_config` (JSONB), `login_config` (JSONB), `updated_at`

 4. **`navigation_items`**: `id`, `parent_id` (nullable), `level` (`1` | `2` | `3`), `page_slug`, `label_en`, `label_mr`, `is_mega_group`, `icon_name`, `target_slug`, `external_url`, `sort_order`, `is_protected`, `verbatim_source` (JSONB)

 5. **`pages`**: `id`, `slug` (unique), `page_type` (`HOME` | `FLAGSHIP_CAMPUS` | `INNER_TEMPLATE`), `template_name`, `title_en`, `title_mr`, `sort_order`, `published_content` (JSONB), `draft_content` (JSONB), `template_history` (JSONB), `verbatim_scraped_content` (JSONB), `status` (`PUBLISHED` | `DRAFT`), `updated_by`, `updated_at`

 6. **`announcements`**: `id`, `page_slug`, `category`, `title_en`, `title_mr`, `publish_date`, `closing_date`, `pdf_local_path`, `pdf_size_label`, `is_new_badge`, `is_published`, `sort_order`, `verbatim_source` (JSONB)

 7. **`seed_nursery_stock`**: `id`, `page_slug`, `station_name_en`, `station_name_mr`, `category`, `crop_name_en`, `crop_name_mr`, `variety_name_en`, `variety_name_mr`, `rate_inr`, `unit_en`, `unit_mr`, `available_qty`, `contact_phone`, `sort_order`, `verbatim_source` (JSONB), `updated_at`

 8. **`holidays_calendar`**: `id`, `page_slug`, `holiday_date`, `title_en`, `title_mr`, `holiday_type`, `sort_order`, `verbatim_source` (JSONB)

 9. **`submissions`**: `id`, `entity_type`, `entity_id`, `entity_label`, `maker_id`, `maker_note`, `before_snapshot` (JSONB), `after_snapshot` (JSONB), `status` (`PENDING` | `APPROVED` | `REJECTED` | `CANCELLED`), `checker_id`, `rejection_reason`, `submitted_at`, `reviewed_at`

10. **`audit_logs`** *(Append-only / Immutable — no update/delete)*: `id`, `submission_id`, `actor_id`, `actor_name`, `actor_role`, `action`, `entity_type`, `entity_label`, `diff_payload` (JSONB), `created_at`

## 6. Public Frontend & Admin CMS Specifications

### 6.1 Public Frontend

* **Modern Design & Accessibility:** Clean emerald/harvest-gold agricultural-academic UI, responsive desktop mega-menu + mobile side drawer, `मराठी` / `English` toggle rendering the same bilingual content, `A+` / `A` / `A-` font scaling, `Standard` / `High Contrast` (black bg + yellow/white text) / `Dark Theme`, and `Listen to Content / मजकूर ऐका` audio reader.

* **Page-Sorted Homepage & Inner Pages:** Hero carousel (pauses on hover), leadership profiles, tabbed announcements (with red PDF badge + file size for local PDFs), seed/nursery availability view, holiday calendar, gallery lightbox, inner pages strictly organized and sorted by page, and polite *Page Not Configured* 404 screen.

### 6.2 Admin CMS (MahaPrisons Parity)

* **Roles & Accounts:** `SUPER_ADMIN`, `MAKER`, `CHECKER`; User Management hidden from non-Super Admins; unique emails; empty password keeps existing password; cannot delete own Super Admin account.

* **Media Library:** Tabs (`All`, `Images`, `Logos`, `Docs`), search, select/copy local path, delete, `4.5 MB` max limit, image + PDF only.

* **Settings & Navigation:** Split-screen live preview, Header/Footer/Wallpapers/Login settings in Marathi & English, `Undo`, 3-level Navigation Builder (`Main Heading → Column Title → Page Link`), protected `Home` item.

* **Page Editor & 25 Templates:** 25 ready-made templates across 6 categories, click-to-focus live preview, `Cancel Draft`, template memory on template switch, Marathi phonetic typing (5 arrow-key suggestions) + translate helper.

* **Maker-Checker & Audit Logs:** Maker submits with note (`My Submissions` shows `Pending`/`Approved`/`Rejected` + rejection note); Checker previews diff + opens **View Live Preview** in a new tab without altering live site, **cannot reject without a reason**, and clicks `Approve & Publish` to go live; `Audit Logs` records all actions permanently with **View Diff** and cannot be edited or deleted by anyone.

## 7. Acceptance Criteria

1. **Zero Omissions & Strict Per-Page Sorting:** Every single data item on every page is extracted without missing anything (verified in `coverage-ledger.json`), and every record is sorted strictly according to pages in `src/data/scraped/pages/<page-slug>.json`, `by-page.json`, and `page-manifest.json`.

2. **Same Bilingual Content (Marathi + English):** Both Marathi and English scraped content are included and surfaced accurately when toggling languages on the frontend and editing in the CMS.

3. **Zero External Data/Media Loading:** All rendered images, logos, PDFs, audio, and page/table data are served locally (and later from the project DB), with no runtime dependency on external websites.

4. **100% Verbatim Scraped Data:** All scraped Marathi and English content is preserved as-is without modification.

5. **Frontend-First Execution:** The modern Public Frontend and Admin CMS UI are built and verified first using the local page-sorted dataset before saving/persisting data to the database.

6. **Full Maker-Checker & Accessibility Parity:** All RBAC rules, `4.5 MB` / file-type checks, `25` templates, Marathi input/translate tools, `View Live Preview`, mandatory rejection reason, immutable `Audit Logs`, and citizen accessibility controls work as specified.