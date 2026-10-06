# OrigoVero · Digital Product Passport (mobile)

A static page for the **OrigoEV 75kWh Traction Battery** passport (`SCT-BAT-006`), built from the final Swiss frames in the Figma file
*OrigoVero Digital Product Passport — mobile*: `Passport / Battery (tabs + language), scannable`, its all-open states, the
expanded map and the marker notes. No build step. The only external code is Leaflet, loaded when the map is near the screen.

```
index.html   semantic markup, icon sprite, language sheet (<dialog>)
styles.css   tokens (primitives + semantic) and all component styles
app.js       section tabs that follow the scroll, journey map and step viewer, language sheet, report form, copy link
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
| `Hero` with the verification block (Verified by OrigoVero, How we verify, serial) | `.hero`, `.verified` |
| Battery health band (82%, gold on ink) | `.hero-body`, `.fact` |
| `Journey summary` (57 days from factory to installation) | `.block--sum` |
| `Map / inline` (240 px, expand button, city-level caption) | `.map`, `#map-view`, Leaflet inside `#map-canvas` |
| `Map expanded` (full screen, close at top right, step card with Previous and Next) | `<dialog class="map-sheet">`, `.map-card`, `.nav-btn` |
| `Continues as` band and the End of life steps | `.continues`, `.section--eol`, `.eol__body` |
| `Key figures` (75 kWh, 3000 charge cycles, 96 months) at the top of Specifications | `.figures` |
| Expanding rows (Battery type, More data, Substances, Safety, Documents) | `details.more`, `.pairs`, `.plain` |
| `Figure block` rows in Impact (label, big number, parts) | `.blocks`, `.block` |
| Details card under an open step, FAQ answer, Category text | `.card-block`, `.faq__a` (surface subtle, radius 4) |
| `Step / …` timeline rows (rail, date, stage, place, panel) | `.step` with a `<details>` per step; the current step has the gold dot with an ink outline |
| `Row / Key-value` | `.kv__row` (110 px label column) |
| FAQ rows | `details.faq` |
| `Language sheet` (640 px, grabber, list of 11 languages, scrim 45 %) | `<dialog class="lang-sheet">` |
| Interaction states sheet | `:active` (pressed), `.btn[aria-busy]` (loading), `.is-invalid` (error), `:focus` on fields (editing) |

Measured at 402 px: hero 184 (Figma 180), health band 184, Specifications 1133 (1129), Impact 583, Journey 909 (899),
End of life 975 (1044), Good to know 354, Report 553. Page 5528 px against 5559 px in Figma; the difference is mostly in End of life.

## Behaviour

- **Sections** run Specifications, Impact, Journey, End of life, Good to know, Report. Everything that expands (journey step, FAQ, Category) opens with a height animation, and opening a journey step closes the previous one.
- **One radius**: every rounded surface uses 4 px (`--r`).
- **Tabs** scroll sideways; the active tab changes as you scroll and the strip keeps it in view. An anchor jump leaves 36 px between the header and the section title.
- **Map**: one component fed by the steps (`data-lat`, `data-lng`, `data-city`, `data-place` on each `.step`), so it works for any product.
  In the page it only previews and a tap opens it full screen. The dot travels once from the first stop to the last recorded stop, leaving an ink trail, then rests there with a soft pulse.
  With reduced motion it opens in the final state. In the sheet the map can be moved and zoomed; Previous and Next walk through the steps and the dot follows. Opening adds `#map` to the history, so the system Back button closes the map.
  Coordinates are city level. Tiles come from OpenStreetMap through a grayscale filter; production needs a tile provider with a suitable licence.
- **How we verify** scrolls to the FAQ and opens the answer about authenticity. **Copy link** copies the address and says “Link copied”.
- **Report form**: the reason has no default; sending without one shows “Choose a reason before sending.”.
- **Language** is UI only: choosing a language updates the button (`EN` → `SV`), remembers it in `localStorage` and closes the sheet. The copy itself is not translated and `<html lang>` is left as is.

## Colour

Two brand colours from the logo: ink `#1B1B19` and gold `#D4AF37`. Gold is used for fills and markers only
(primary button, link underlines, active tab rule, current timeline step). Text stays ink because gold on white is 2.1 : 1; ink on gold is 8.2 : 1.

## Differences from the Figma file (deliberate)

- **Keyboard focus ring** (2 px ink) is kept for accessibility, although the Figma state sheet does not draw it.
- **Header is sticky**; Figma frames are static.
- **Carbon footprint study** and the three documents in Specifications (responsible sourcing, labels, substance safety) link to the PDFs on origovero.com and open in a new tab.
- **Map tiles** load from OpenStreetMap and Leaflet from unpkg. Both are third-party requests; self-host or use a licensed provider for production. If either fails, the map block says so and every place is still named in the steps.
- **Coordinates** of Skellefteå and Umeå are city centres entered by hand; the source gives place names only.
- **Link arrow** is an SVG icon instead of the ↗ text glyph, so it looks the same in every browser.
- **Photo** is hot-linked from origovero.com; replace it with a local asset.
- **Report form** has no backend. Submit simulates the loading state, then shows a confirmation.
- **Language list** (English, Svenska, Nederlands, Deutsch, Français, Español, Italiano, Polski, Dansk, Suomi, Українська) is a placeholder set from the mockup.

### Map: one point per step
Every step has its own point and the traveller visits all of them in order. The source only gives a city, so steps in the same city are placed on a ~1 km ring around the city centre (schematic, not addresses; the caption says so). In the full screen map the first Previous/Next zooms to the city, and moves inside the city then move only the dot.
