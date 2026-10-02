# OrigoVero · Digital Product Passport (mobile)

A static page for the **OrigoEV 75kWh Traction Battery** passport (`SCT-BAT-006`), built 1:1 from the Figma file
*OrigoVero Digital Product Passport — mobile*. No build step, no dependencies.

```
index.html   semantic markup, icon sprite, full-screen menu (<dialog>)
styles.css   tokens (primitives + semantic) and all component styles
app.js       menu open/close + current-section marker, report-form states
assets/      origovero-wordmark.svg (exported from Figma)
```

## Run

```bash
python -m http.server 8770
```

Open `http://localhost:8770` and use a 402 px wide viewport (the Figma frame width).

## What maps to what

| Figma | Code |
|---|---|
| Frame `Passport / Battery` (402 px) | `.page` (max-width 402 px, centred) |
| Variables `Passport / color` + `Passport / semantic` | `:root` custom properties in `styles.css` |
| `Top bar`, `Clicable Area` 48 × 48 | `.topbar`, `.icon-btn` |
| `Hero`, `Photo`, `Hero body` | `.hero`, `.photo`, `.hero-body` (`.fact`, `.index`) |
| `Row / Index` | `.row-link` (the whole 86 px row is the link) |
| `Row / Journey step` | `details.step` (summary = tap target) |
| `Row / Key-value` | `.kv__row` (110 px label column) |
| FAQ rows | `details.faq` |
| `Passport / Menu open` | `<dialog id="menu">`, active item = gold rule + arrow |
| `States / Interactive elements` | `:active` (pressed), `.btn[aria-busy]` (loading), `.is-invalid` (error), `:focus` on fields (editing) |

Section heights were checked against Figma: top bar 64, hero 170, photo 281, hero body 675, Journey 840,
Impact 456, Specifications 765, Care 259, Good to know 354, Report 553, footer 77.

## Colour

Two brand colours from the logo: ink `#1B1B19` and gold `#D4AF37`. Gold is used for fills and markers only
(primary button, link underlines, active menu rule). Text stays ink because gold on white is 2.1 : 1; ink on gold is 8.2 : 1.

## Differences from the Figma file (deliberate)

- **Menu close icon** is an ✕. Figma's "Menu open" frame still shows the hamburger in that spot.
- **Keyboard focus ring** (2 px ink) is kept for accessibility, although the Figma state sheet no longer draws it.
- **Top bar is sticky**; Figma frames are static.
- **Carbon footprint study** is plain text, as in Figma. There is no URL for it in the data.
- **Photo** is hot-linked from origovero.com; replace it with a local asset.
- **Report form** has no backend. Submit simulates the loading state, then shows a confirmation.
