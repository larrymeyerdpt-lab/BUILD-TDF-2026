# Le Suiveur — Tour de France 2026 companion

A mobile-first web app for following the 2026 Tour de France (Barcelona → Paris, July 4–26).
Built with Vite + React + Leaflet. Deploys to Vercel in a couple of minutes and installs to
your iPhone home screen like a native app.

## What's inside

- **Stages** — all 21 stages with dates, start times, distances and types (flat / hilly / mountain / TT).
  Tap a stage for its **interactive elevation profile with a draggable marker that stays synced to a
  top-down map** — slide down the profile and the red dot moves along the route.
- **Riders** — the full confirmed **184-rider** startlist. Search by name; filter by **team** (dropdown)
  and **nationality** (dropdown); sort by age. Each rider shows age, years as a pro, height (cm + ft/in),
  **weight (kg + lb)**, Grand Tours started and Tour de France stage wins.
- **Teams** — all 23 teams, tap through to each roster.
- **Race-day weather** — each stage pulls a live forecast for the start area (temperature in **°C and °F**,
  chance of rain, wind) from the free Open-Meteo API. Stages more than ~16 days out show "forecast opens
  closer to the date."
- **Convert** — km/h ↔ mph, **°C ↔ °F**, and a km → miles reference table.

## Preview it right now (no deploy needed)

Open **`tdf2026-preview.html`** (a single self-contained file) by double-clicking it — it runs the whole
app in your browser. You need an internet connection for the map tiles and the weather forecast, but nothing
else. This is just for a quick look; deploy the project folder for the real, installable version.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Deploy to Vercel

**Option A — Git (recommended):** push this folder to a GitHub repo, then in Vercel choose
"Add New → Project", import the repo, and deploy. Vercel auto-detects Vite (build `npm run build`,
output `dist`). No env vars needed.

**Option B — CLI:**

```bash
npm i -g vercel
vercel            # follow prompts; accept the Vite defaults
vercel --prod
```

## Add it to your iPhone

Open the deployed URL in Safari → Share → **Add to Home Screen**. It runs full-screen with its own icon.

## Editing the data

Everything is plain JavaScript — no database.

- `src/data/stages.js` — the 21 stages. Each stage's `profile` is now sampled directly from the **official
  letour.fr GPS trace** (150 points per stage), so the elevation profiles and map routes are the real course.
  The full-resolution `.gpx` files live in the `gpx/` folder; `gen_profiles.py` shows how they were sampled,
  so you can regenerate them denser if you want.
- `src/data/riders.js` — the full 184-rider confirmed startlist (names, teams, nationalities, bibs). Age,
  height, weight and career tallies are filled in for well-known riders and left `null` (shown as "—") where
  not yet verified — fill any of those in and the app updates instantly.
- **All 21 stages carry the real GPS trace.** To make any stage even more detailed, re-sample its
  `.gpx` in `gpx/` into more `{ km, ele, lat, lng }` points and paste the array in place of the stage's
  `profile` (bump the `n=150` in `gen_profiles.py` to go denser).
- `src/data/teams.js` — the 23 teams.

## Data notes

- Route metadata (stages, dates, cities, distances, start times, key climbs) reflects the official
  2026 route: 3,333 km, 54,450 m of climbing, highest point Col du Galibier (2,642 m).
- Elevation **profiles and map routes are the real letour.fr GPS traces** (150 sampled points per stage),
  so summit heights and route shapes match the actual course — e.g. Stage 20 tops out around 2,632 m on the
  Galibier. Swap in the full-resolution `.gpx` from `gpx/` for metre-by-metre detail.
- Rider body metrics and career tallies are best-effort and worth cross-checking on ProCyclingStats.

## Tiles

Maps use free CARTO dark basemap tiles + OpenStreetMap data (no API key). If you expect heavy traffic,
swap the `TileLayer` URL in `src/components/StageProfile.jsx` for a keyed provider.
