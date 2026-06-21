# ESP32 Project Studio

A self-contained, picture-grid catalog that takes you from **idea → breadboard/simulation → 3D-printed device** for the ESP32 boards and 46-module sensor kit on your bench.

- **108 worked projects** across 12 categories, each with parts, breadboard wiring, an online-simulator note, **Arduino + MicroPython** code, and step-by-step "make it a real device" instructions.
- **7 boards** (ESP32-C3 Super Mini, S3 Gold, C6 + 1.47″ screen, S3-CAM, C6 Super Mini, LilyGO T-Embed CC1101, Chameleon Ultra) with pinouts, strengths and gotchas.
- **46-module component library** (24 inputs, 18 outputs, 4 utility) — filter by input/output and interface (I2C/SPI/analog/…).
- **Buy-More tab** of add-on parts (BME280, MPU6050, RC522, I2S mic/amp, WS2812 strip, GPS, e-paper, LoRa, LiPo…) showing exactly which projects each unlocks.
- **Guides**: how to approach a build (+ board chooser), prototyping (breadboard + Wokwi), and 3D printing & enclosures.
- **Sources tab** crediting the catalogs/repos every idea draws from, with links to go deeper.

## Run it

No build step, no server, no dependencies. Just open the file:

```
open index.html      # macOS
xdg-open index.html  # Linux
# or double-click index.html
```

Data is loaded via plain `<script>` tags (`data/*.js` → `window.DB`), so it works directly from `file://`.

### Deploy free (optional)
Push to GitHub and enable **Pages** (Settings → Pages → deploy from branch, root). It's a static site — any host works (Pages, Netlify, Vercel, S3).

## Tile images

Tiles render as themed **SVG illustrations generated in the browser** — fully offline, no copyright issues. To use your own **AI-generated images** instead, drop files named by the item's `tile`/`id` into `assets/images/`:

```
assets/images/ultrasonic-radar.png
assets/images/temp-tft.png
```

The app prefers a matching `.png` if present and silently falls back to the SVG tile otherwise — **no code changes needed**.

## Add your own projects

Everything is data-driven. Append an object to `data/projects.js`:

```js
{
  id:"my-build", title:"My Build", glyph:"🛠️", difficulty:"Beginner",
  boards:["s3"], inputs:["button"], outputs:["led"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"randomnerd",
  summary:"One-line description.",
  whyBoard:"Why this board fits.",
  parts:["Push Button","LED"],
  prototype:{ breadboard:["step 1","step 2"], wiring:[{from:"Button",to:"GPIO4"}],
    simulator:{tool:"Wokwi",notes:"...",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:"...", micropython:null },
  makeItReal:["solder","power","print enclosure","deploy"]
}
```

- `category` must be one of the 12 in the filter bar.
- `boards` ids come from `data/boards.js`; `source` keys from `data/sources.js`; `extraParts` should match a `name` in `data/shopping.js`.
- Validate with: `node -e 'global.window={};["sources","shopping","boards","modules","guides","projects"].forEach(f=>require("./data/"+f+".js"));console.log(window.DB.projects.length)'`

## Safety note

The **T-Embed CC1101** (sub-GHz/IR) and **Chameleon Ultra** (RFID/NFC) projects are scoped to **authorized, personal, educational use only** — your own remotes, devices and cards. Don't interact with systems or credentials you don't own. Relay/mains projects start with low-voltage loads; use proper isolation and enclosures before going anywhere near mains.

## Structure

```
index.html        App shell (tabs, filter bar, grid, detail overlay)
styles.css        Dark, responsive picture-grid UI
app.js            View engine: tiles, filters, search, detail sheets
data/boards.js    7 boards
data/modules.js   46-module kit
data/projects.js  108 projects
data/guides.js    3 long-form guides
data/sources.js   Attribution + "go deeper" links
data/shopping.js  Add-on parts and what they unlock
assets/images/    Drop-in AI raster tiles (optional)
assets/tiles/     (reserved) static SVG tiles if you prefer files over generated ones
```

Project ideas are grounded in established, openly available catalogs and repositories — see the **Sources** tab in the app for full attribution and links.
