# Genesis Workshop — Website Build Specification

**Stack:** React + Vite
**Styling:** Tailwind CSS (utility classes) + CSS custom properties for design tokens
**Status:** Hero section already exists. Everything below it does not.

> **Read this before starting:** Section 1 is the brief. Section 2 is the design system — every color, font, and surface style used anywhere in the site must trace back to these tokens, no ad-hoc values. Section 3 is setup. Section 4 is the component contract list. Section 5 is the data layer. Section 6 is the section-by-section spec, in build order. Section 7 is the global checklist. If the existing Hero component uses different colors or fonts than Section 2, **reconcile toward the Hero** — treat its tokens as the source of truth and update Section 2's values to match before building anything else.

---

## 1. Project Brief

The Genesis Workshop is an open-source developer event that helps aspiring contributors understand open-source culture, collaboration, Git workflows, AI-assisted development, and Bitcoin-ecosystem technologies. The site's single job: convince a developer, student, or curious builder that this event is for them, and get them to register.

Tone: a workshop crossed with a research lab. Practical, technical, unpretentious. Not a hype-driven startup landing page.

---

## 2. Design System

### 2.1 Direction

The brief asks for one style: **glassmorphism** (soft, translucent, blurred) 

**Glass-morphism:** every card is a blurred, translucent glass surface (the atmosphere) wrapped in a crisp border with a hard, non-blurred offset shadow (the structure). Most cards use this at a light weight. The Event Details cards use a heavier version of the *same* system (thicker border, bigger shadow offset, zero corner radius) — they're not a different style, just turned up, because that section needs to read as the most concrete, factual part of the page.

Avoid the generic AI-design defaults: not a warm cream/terracotta page

### 2.2 Color Tokens

Use as CSS custom properties on `:root`, mirrored into `tailwind.config.js` under `theme.extend.colors`. use the existing colors from `tailwind.config.js` and import them into `App.tsx`. use them asCSS custom properties on `:root`, mirrored into `tailwind.config.js` under `theme.extend.colors`. Do not introduce additional brand colors. Status/system colors (error, success) if ever needed should be standard red/green at low saturation, used only for form validation states — not decoration.

### 2.3 Typography

maintaince souce code pro font

Load via `<link>` in `index.html` with `display=swap`, not `@import`. Define fallback stacks (`'Space Grotesk', system-ui, sans-serif`, etc.) so text never blocks render.

Type scale (mobile → desktop, use `clamp()`):
- H1 (hero only, already built — match its scale): `clamp(2.5rem, 8vw, 5rem)`
- H2 (section titles): `clamp(1.75rem, 4vw, 2.75rem)`, Space Grotesk 600
- H3 (card titles): `1.125rem–1.25rem`, Space Grotesk 600
- Body: `1rem`, Inter 400, line-height 1.6
- Eyebrow/label: `0.75rem`, JetBrains Mono 500, uppercase, letter-spacing `0.08em`

**Signature typographic device:** every section eyebrow is written as a code comment, e.g. `// about`, `// why genesis`, `// topics covered`. This is the one consistent motif tying typography to the subject matter — don't add numbered markers (`01 / 02 / 03`) anywhere, since the sections aren't a sequence and numbering would be decorative, not informational.

### 2.4 Surfaces, Radius, Shadow



All transitions: `200–250ms ease`. No bounce/elastic easing — this isn't a playful brand.

### 2.5 Spacing

4px base unit. Section vertical padding: `clamp(3.5rem, 8vw, 7rem)` top and bottom. Container: `max-width: 1180px`, horizontal padding `1.25rem` mobile → `2rem` at `md:`.

### 2.6 Breakpoints (Tailwind defaults)

`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`. Build mobile-first: base styles = mobile (single column), add `md:`/`lg:` overrides for grid columns.

### 2.7 Background Texture

Body background: `var(--color-bg)` with a very faint fixed dot-grid pattern (CSS `radial-gradient`, dots at `rgba(244,241,234,0.04)`, `24px` spacing) — reads as graph/blueprint paper, reinforces the lab feel. Keep it subtle enough that it never competes with foreground content; do not animate it.

---

## 3. Tech Stack & Setup

- React + Vite (already initialized, has existing Hero component)
- Tailwind CSS — install and configure with the color tokens above added to `theme.extend.colors`, fonts added to `theme.extend.fontFamily`
- No UI kit/component library — everything below is hand-built per the contracts in Section 4
- Icons: inline SVG components (stroke-based, `currentColor`), no icon-font dependency
- No images required for v1 — speaker photos and partner logos use generated placeholders (see Section 5) until real assets are supplied
- `prefers-reduced-motion` must disable all non-essential transitions and the scroll-reveal effect

---

## 4. Reusable Component Library

Build these once in `src/components/ui/`, then compose every section from them. Do not write one-off card markup inside section files.

### `<Eyebrow text="..." />`
Renders the mono "code comment" label, e.g. `text="about"` → renders `// about`. Color `var(--color-orange)`.

### `<SectionHeading eyebrow title intro? />`
Wraps `<Eyebrow>` + `<h2>` + optional intro paragraph. Used at the top of every section for consistent spacing/alignment.

### `<GlassCard as="div" hover={true} className? children />`
Default card surface (see 2.4). `hover` toggles the lift/shadow-grow interaction.

### `<BrutalCard as="div" className? children />`
Heavy card surface, used only in Event Details.

### `<Button as="button"|"a" href? variant="primary"|"ghost" onClick? children />`
- `primary`: orange fill, ink border, mono uppercase label, brutal offset shadow (`4px 4px 0 0 var(--color-ink)`)
- `ghost`: transparent fill, ink border, no shadow until hover (then a thin orange underline/glow — keep minimal)

### `<CheckItem label />`
Small square icon (orange fill, ink checkmark, 2px border) + label, used in Who Should Attend.

### `<Accordion items={[{id, question, answer}]} />`
Renders a list of `<AccordionItem>`. Multiple items can be open at once (don't force single-open — simpler and avoids surprising collapses). Each item:
- Button header with `aria-expanded`, `aria-controls`, unique `id`
- Plus icon rotates 45° to an X when open
- Panel uses a height-animation technique that respects `prefers-reduced-motion` (e.g. grid-template-rows trick or measured height), not `display:none` toggling with no transition, and not `max-height` set to an arbitrarily large fixed value

### `<Navbar />` + `<MobileMenu />`
Sticky top nav, see 2.4 for surface. Desktop: inline links + primary "Register" button. Mobile: hamburger toggles a full-width glass dropdown panel with stacked links; trap focus while open, close on `Escape` and on link click, toggle button has `aria-expanded`.

### `<Footer />`
See Section 6.10.

---

## 5. Data Layer

Put content in `src/data/` as plain JS modules, imported by section components. This keeps content edits separate from layout code and makes every list-driven section reusable.

```
src/data/
  whyCards.js
  topics.js
  speakers.js
  eventDetails.js
  attendees.js
  partners.js
  faq.js
```

### `whyCards.js`
```js
export const whyCards = [
  {
    id: "new-contributors",
    icon: "compass", // maps to an icon component
    title: "Open Source Needs New Contributors",
    description: "Many developers want to contribute but don't know where to start.",
  },
  {
    id: "ai-changes",
    icon: "cpu",
    title: "AI Changes Everything",
    description: "AI makes writing code easier, but understanding systems still matters.",
  },
  {
    id: "community",
    icon: "users",
    title: "Community Matters",
    description: "Great software is built through collaboration, feedback, and trust.",
  },
];
```

### `topics.js`
Descriptions weren't provided in the brief — these one-liners are placeholders the content owner should review before launch, not final copy.
```js
export const topics = [
  { id: "oss-fundamentals", icon: "git-branch", title: "Open Source Fundamentals", description: "Licenses, project structure, and how open communities actually make decisions." },
  { id: "git-github", icon: "github", title: "Git & GitHub Workflows", description: "Branching, pull requests, and the day-to-day mechanics of shipping code with others." },
  { id: "ai-dev", icon: "sparkles", title: "AI-Assisted Development", description: "Using AI tools well without losing track of what your code actually does." },
  { id: "code-review", icon: "eye", title: "Code Review Culture", description: "Giving and receiving feedback that makes the project — and you — better." },
  { id: "bitcoin-tech", icon: "bitcoin", title: "Bitcoin Technologies", description: "An introduction to the protocols and tools behind the Bitcoin ecosystem." },
  { id: "building-public", icon: "radio", title: "Building in Public", description: "Sharing work-in-progress, writing it up, and growing a track record as a contributor." },
];
```

### `speakers.js`
**Default state is an empty array.** The Speakers section component must check `speakers.length === 0` and render the "more speakers coming soon" empty state — don't hardcode placeholder people.
```js
export const speakers = [
  // Example shape for when real speakers are confirmed:
  // {
  //   id: "speaker-1",
  //   name: "Jane Doe",
  //   role: "Core Maintainer",
  //   organization: "Some OSS Project",
  //   bio: "One or two sentences on their background and what they'll cover.",
  //   image: "/speakers/jane-doe.jpg", // falls back to initials avatar if missing
  // },
];
```

### `eventDetails.js`
Only Community Partner was specified in the brief. Everything else is a placeholder — **flag these to the content owner, don't invent real-sounding values.**
```js
export const eventDetails = [
  { id: "location", label: "Location", value: "TBA", icon: "map-pin" },
  { id: "date", label: "Date", value: "TBA", icon: "calendar" },
  { id: "time", label: "Time", value: "TBA", icon: "clock" },
  { id: "organizer", label: "Organizer", value: "OSGuild", icon: "users" }, // inferred from footer — confirm before launch
  { id: "partner", label: "Community Partner", value: "BitDevs Mauritius", icon: "handshake" },
];
```

### `attendees.js`
```js
export const attendees = [
  "Developers",
  "Students",
  "Open-source enthusiasts",
  "Bitcoin builders",
  "Curious learners",
];
```

### `partners.js`
```js
export const partners = [
  { id: "osguild", name: "OSGuild", logo: null, placeholder: false },
  { id: "bitdevs-mu", name: "BitDevs Mauritius", logo: null, placeholder: false },
  { id: "slot-3", name: "Your logo here", logo: null, placeholder: true },
  { id: "slot-4", name: "Your logo here", logo: null, placeholder: true },
  { id: "slot-5", name: "Your logo here", logo: null, placeholder: true },
];
```
Render confirmed partners as wordmark text inside a `GlassCard` (no real logo files exist yet — don't fabricate one). Render `placeholder: true` slots as a dashed-border box with the mono label "coming soon".

### `faq.js`
```js
export const faq = [
  { id: "prior-experience", question: "Do I need prior open-source experience?", answer: "No. Genesis is built for people taking their first steps as much as for people who've contributed before." },
  { id: "beginner-friendly", question: "Is the workshop beginner friendly?", answer: "Yes — sessions are designed to be approachable for first-time contributors, with no assumed background beyond basic coding." },
  { id: "what-to-bring", question: "What should I bring?", answer: "A laptop with Git installed and a GitHub account. Everything else will be covered on the day." },
  { id: "is-it-free", question: "Is participation free?", answer: "[Confirm with organizer before launch — placeholder answer]." },
  { id: "recordings", question: "Will recordings be available?", answer: "[Confirm with organizer before launch — placeholder answer]." },
];
```

---

## 6. Page Sections (build in this order)

For every section below: mobile layout is the default; desktop is the override. Every section title uses `<SectionHeading>`.

### 6.1 Hero
Already built. Do not modify, except to pull its color/font values into Section 2's tokens if they differ from what's listed there.

### 6.2 About — "What is Genesis?"
- Eyebrow: `about`
- Title: `What is Genesis?`
- Body copy (use verbatim):
  > Genesis Workshop is a gathering for developers, students, and curious builders who want to understand how open source works and how meaningful software is built through collaboration.
  >
  > Participants will learn from experienced contributors, explore modern development workflows, and gain practical insights into open-source communities and Bitcoin technologies.
- Layout: single column, max-width ~65ch for readability, mobile and desktop both. No card needed — this is a plain-text intro section, not a card grid. Keep it quiet; this section's job is to orient, not impress.

### 6.3 Why We Built Genesis
- Eyebrow: `why genesis`
- Title: `Why We Built Genesis`
- 3× `GlassCard`, each rendering one `whyCards` entry (icon, title, description)
- Layout: mobile = stacked single column; `md:` = 3-column grid, equal height cards

### 6.4 Topics Covered
- Eyebrow: `topics covered`
- Title: `Topics Covered`
- 6× `GlassCard` from `topics.js` (icon, title, description)
- Layout: mobile = single column; `sm:` = 2-column; `lg:` = 3-column grid

### 6.5 Speakers
- Eyebrow: `speakers`
- Title: `Speakers`
- If `speakers.length > 0`: grid of speaker `GlassCard`s — circular image (or generated initials avatar if `image` is missing), name (Space Grotesk), role + organization (mono, dim), 1–2 line bio. Layout: mobile single column, `md:` 2-column, `lg:` 3-column.
- If `speakers.length === 0`: render a single centered `GlassCard` (dashed border variant) with the mono text "More speakers coming soon" — no empty grid, no broken layout.

### 6.6 Event Details
- Eyebrow: `event details`
- Title: `Event Details`
- 5× `BrutalCard` (not `GlassCard` — this section is the heavy/grounded one), one per `eventDetails.js` entry: icon, label (mono, dim), value (Space Grotesk, large)
- Layout: mobile = stacked single column, full-width cards; `md:` = 2-column grid; `lg:` = a 5-card layout (e.g. 3 + 2, or all 5 across on very wide screens) — cards should feel large and confident at every breakpoint, not cramped
- Render any `value === "TBA"` with slightly dimmed text so it visually reads as "pending," not as a finished answer

### 6.7 Who Should Attend
- Eyebrow: `who should attend`
- Title: `Who Should Attend`
- 5× `CheckItem` from `attendees.js`
- Layout: mobile = 2-column grid of check items (or stacked, whichever stays legible at 320px); `md:` = single row of 5, or a clean 3+2 grid — keep all five items visually equal weight, no card chrome needed, this is a lightweight list not another card section

### 6.8 Community Partners
- Eyebrow: `community partners`
- Title: `Community Partners`
- Grid of partner entries from `partners.js` — confirmed partners as solid `GlassCard` wordmarks, `placeholder: true` entries as dashed-border boxes reading "coming soon"
- Layout: mobile = 2-column grid; `md:` = 3–4 column grid

### 6.9 FAQ
- Eyebrow: `faq`
- Title: `Frequently Asked Questions`
- `<Accordion items={faq} />`
- Layout: single column, max-width ~720px, centered, at all breakpoints — accordions don't need a multi-column grid

### 6.10 Final CTA — "Start Your Open Source Journey"
- Large, generous vertical padding (more than other sections — this is the page's closing statement)
- Title: `Start Your Open Source Journey`
- Supporting text (verbatim):
  > Whether you're writing your first line of code or looking to contribute to larger projects, Genesis is designed to help you take the next step.
- One `Button variant="primary"` labeled `Register for Genesis`, centered
- Subtle background glow (radial gradient in `--color-orange` at low opacity) behind the button — the one place on the page besides the hero allowed a decorative glow; keep every other section flat

### 6.11 Footer
Four groups, mobile = stacked, `md:` = horizontal columns:
1. **Brand** — "Genesis Workshop" wordmark + one-line tagline
2. **Organized by** — OSGuild, BitDevs Mauritius (text links if URLs are supplied later; plain text for now)
3. **Connect** — Twitter/X icon link, GitHub icon link, email (`mailto:`) — use real URLs/address once supplied; until then, link to `#` and flag with a code comment `// TODO: real URL`
4. **Bottom row** — copyright line, small mono text

---

## 7. Global Technical Requirements (acceptance checklist)

- [ ] Mobile-first CSS: every component's base styles target the smallest viewport (320–375px) before any `md:`/`lg:` override
- [ ] Fully responsive from 320px through 1440px+, no horizontal scroll at any width
- [ ] All interactive elements (nav links, accordion triggers, mobile menu toggle, CTA buttons) are real `<button>`/`<a>` elements, keyboard-operable, with visible `:focus-visible` rings using `--color-cyan`
- [ ] Color contrast: body text on `--color-bg` and on glass surfaces meets WCAG AA; verify orange-on-dark text usage stays large/bold enough to pass, or use orange only for accents/icons, not body copy
- [ ] All images (when added) have meaningful `alt` text; decorative SVGs use `aria-hidden="true"`
- [ ] Accordion and mobile menu use correct ARIA (`aria-expanded`, `aria-controls`) and manage focus sensibly
- [ ] `prefers-reduced-motion: reduce` disables card-hover transforms, scroll-reveal animation, and accordion height transitions (swap to instant show/hide)
- [ ] No layout shift from web font loading (`font-display: swap` + fallback stacks sized closely to the real fonts)
- [ ] Components in `src/components/ui/` are generic and reusable — no section-specific styling leaks into them; section components only pass data and className overrides
- [ ] Section data lives in `src/data/*.js`, not inline in JSX, so content can be edited without touching layout code
- [ ] Lighthouse mobile performance target: 90+ (lazy-load any below-the-fold images once real speaker photos/logos are added; keep the SVG icon set inline rather than as a sprite request)
- [ ] Every placeholder value (`TBA`, "Confirm with organizer," `// TODO: real URL`) is visually distinguishable as pending content, and listed in a final summary for the content owner before launch

---

## 8. Explicit Open Questions for the Content Owner

These were not specified in the brief and need real values before launch:
1. Event location, date, and time
2. Confirm "OSGuild" as the organizer (inferred from the footer requirement, not stated outright)
3. Whether participation is free, and the recordings answer, for the FAQ
4. Twitter/X handle, GitHub org/repo URL, and contact email for the footer
5. Real topic descriptions (six placeholders were written above to unblock layout work)
6. Speaker data, whenever confirmed — the empty-state component is ready to receive it