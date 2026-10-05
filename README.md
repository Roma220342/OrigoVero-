# OrigoVero · Digital Product Passport (mobile)

A static page for the **OrigoEV 75kWh Traction Battery** passport (`SCT-BAT-006`), built 1:1 from the final Swiss frames in the Figma file
*OrigoVero Digital Product Passport — mobile*: `Passport / Battery (tabs + language)` plus its states
(scrolled with tabs, language list, FAQ expanded, Journey step expanded). No build step, no dependencies.

```
index.html   semantic markup, icon sprite, language sheet (<dialog>)
styles.css   tokens (primitives + semantic) and all component styles
app.js       section tabs that follow the scroll, language sheet, report-form states
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
| Frame `Passport / Battery (tabs + language)` (402 px) | `.page` (max-width 402 px, centred) |
| Variables `Passport / color` + `Passport / semantic` | `:root` custom properties in `styles.css` |
| `Header` (top bar 64 + `Section tabs` 48) | `.header` (sticky), `.topbar`, `.tabs` |
| `Language button` (EN + chevron, 48 px tap area) | `.lang-btn` opens `#lang-sheet` |
| `Section tabs`: active tab = Medium + 2 px gold rule over a 2 px hairline | `.tab[aria-current="true"]`, `.tabs::after` |
| `Hero` with `Meta` rows (icon + text pairs) | `.hero`, `.meta` |
| `Key fact` | `.fact` |
| `Step / …` timeline rows (rail, date, stage, place, panel) | `.step` with a `<details>` per step; current step has the gold dot with halo |
| `Row / Key-value` | `.kv__row` (110 px label column) |
| FAQ rows | `details.faq` |
| `Language sheet` (640 px, grabber, list of 11 languages, scrim 45 %) | `<dialog class="lang-sheet">` |
| Interaction states sheet | `:active` (pressed), `.btn[aria-busy]` (loading), `.is-invalid` (error), `:focus` on fields (editing) |

Section heights were checked against Figma: header 112, hero 178, photo 281, hero body 183, Journey 938,
Impact 456, Specifications 765, Care 259, Good to know 354, Report 553, footer 77.
(Impact, Specifications and Good to know measure 1–2 px short in browsers that draw 1 px borders thinner than 1 px.)

## Behaviour

- **Tabs** scroll sideways; the active tab changes as you scroll and the strip keeps it in view. An anchor jump leaves 36 px between the header and the section title.
- **Language** is UI only: choosing a language updates the button (`EN` → `SV`), remembers it in `localStorage` and closes the sheet. The copy itself is not translated and `<html lang>` is left as is.

## Colour

Two brand colours from the logo: ink `#1B1B19` and gold `#D4AF37`. Gold is used for fills and markers only
(primary button, link underlines, active tab rule, current timeline step). Text stays ink because gold on white is 2.1 : 1; ink on gold is 8.2 : 1.

## Differences from the Figma file (deliberate)

- **Keyboard focus ring** (2 px ink) is kept for accessibility, although the Figma state sheet does not draw it.
- **Header is sticky**; Figma frames are static.
- **Carbon footprint study** is plain text, as in Figma. There is no URL for it in the data.
- **Photo** is hot-linked from origovero.com; replace it with a local asset.
- **Report form** has no backend. Submit simulates the loading state, then shows a confirmation.
- **Language list** (English, Svenska, Nederlands, Deutsch, Français, Español, Italiano, Polski, Dansk, Suomi, Українська) is a placeholder set from the mockup.
