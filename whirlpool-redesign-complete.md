# Whirlpool — Complete Website Redesign Document
**Design System & Developer Handoff**
Version 1.0 | May 2026

---

## 1. Design Identity & Vision

### Concept: "Dark Command Center"
Whirlpool is a real-time event-driven platform. The design language must communicate **speed, power, precision, and live data**. Think Bloomberg Terminal meets modern SaaS — dark, dense, professional.

### Target Impression
When a US client or enterprise user opens this app, within 3 seconds they should think:
- "This is serious software"
- "I can see everything happening in real time"
- "This team knows what they're doing"

### Aesthetic Direction
- **Theme**: Dark Command Center / Industrial Ops
- **Mood**: Confident, technical, premium
- **NOT**: Playful, pastel, generic SaaS blue-on-white
- **Comparable products**: Bloomberg Terminal, Grafana, Datadog, Linear

---

## 2. Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Background Deep | `#0a0d12` | Main app background |
| Background Surface | `#0d1117` | Cards, sidebar, panels |
| Background Elevated | `#111827` | Hover states, tooltips |
| Border Subtle | `#1e2d3d` | All card/panel borders |
| Border Default | `#2d3748` | Dividers, separators |

### Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | `#0ea5e9` | Primary actions, links, active states |
| Primary Indigo | `#6366f1` | Secondary accent, WebSocket indicators |
| Success Green | `#22c55e` | UP status, positive price change, online |
| Danger Red | `#ef4444` | DOWN status, negative price change, error |
| Warning Amber | `#f59e0b` | Warnings, degraded service |

### Text Colors
| Name | Hex | Usage |
|------|-----|-------|
| Text Primary | `#f1f5f9` | Headings, important values |
| Text Secondary | `#94a3b8` | Labels, secondary info |
| Text Muted | `#64748b` | Timestamps, hints |
| Text Faint | `#475569` | Placeholder, disabled |
| Text Dim | `#334155` | Section headers, metadata |

### Semantic Overlay Colors (with alpha)
| Name | Value | Usage |
|------|-------|-------|
| Success bg | `#22c55e15` | Green pill backgrounds |
| Danger bg | `#ef444415` | Red pill backgrounds |
| Blue bg | `#0ea5e915` | Blue badge backgrounds |
| Blue border | `#0ea5e940` | Blue outline buttons |
| Glow Green | `#22c55e80` | Live dot shadow |
| Glow Red | `#ef444460` | Down status dot shadow |

---

## 3. Typography

### Font Stack
```css
/* Primary UI font */
font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;

/* Monospace for data values, tickers, prices */
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

/* Fallback */
font-family: sans-serif;
```

### Type Scale
| Role | Size | Weight | Color |
|------|------|--------|-------|
| Logo | 16px | 600 | `#f1f5f9` |
| Section Header | 10px | 600 | `#334155` (uppercase, 1.5px letter-spacing) |
| Nav Tab | 12px | 400 | `#64748b` / active: `#e2e8f0` |
| Card Stat | 22px | 600 | `#f1f5f9` |
| Card Label | 10px | 400 | `#475569` (uppercase, 0.5px spacing) |
| Table Header | 10px | 500 | `#334155` (uppercase) |
| Table Body | 13px | 400 | `#94a3b8` |
| Ticker Symbol | 14px | 600 | `#e2e8f0` |
| Price Value | 13px | 500 | `#f1f5f9` (tabular-nums) |
| Feed Text | 11px | 400 | `#64748b` |
| Timestamp | 10px | 400 | `#334155` |

---

## 4. Spacing & Layout System

### Grid
```
Sidebar: 200px fixed
Main Content: 1fr (flexible)
Right Panel: 220px fixed
Total layout: 3-column CSS grid
```

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, tight padding |
| sm | 8px | Inner card padding, small gaps |
| md | 12px | Component gaps |
| lg | 14–16px | Section padding |
| xl | 20px | Page padding |

### Border Radius
| Element | Radius |
|---------|--------|
| App container | 12px |
| Cards / Panels | 10px |
| Status cards | 8px |
| Pills / Badges | 20px |
| Buttons | 6px |
| Logo icon | 8px |
| Avatars | 50% |
| Sparkline bars | 2px |

### Borders
All borders: `0.5px solid #1e2d3d`
Hover borders: `0.5px solid #2d3748`
Active/focus: `0.5px solid #0ea5e9`

---

## 5. Component Library

### 5.1 Topbar
```
Height: 52px
Background: #0d1117
Border-bottom: 0.5px solid #1e2d3d
Padding: 0 20px
Layout: space-between (Logo | Nav Tabs | User Controls)
```

**Logo:**
- 30×30px rounded icon with gradient (135deg, `#0ea5e9` → `#6366f1`)
- Whirlpool SVG swirl mark inside
- "Whirlpool" text 16px/600
- "LIVE" badge: `#0ea5e920` bg, `#0ea5e9` text, 0.5px border, 9px, uppercase, 1px letter-spacing

**Nav Tabs:**
- Default: transparent bg, `#64748b` text
- Active: `#1e2d3d` bg, `#e2e8f0` text, 6px radius
- Tabs: Dashboard | Streams | Services | Alerts

**User Controls:**
- Live dot: 7px, `#22c55e`, `box-shadow: 0 0 6px #22c55e80` (pulsing animation)
- "CONNECTED" label: 11px, `#22c55e`, 0.5px letter-spacing
- Avatar: 30px circle, `#1e2d3d` bg, initials, 11px/600

### 5.2 Sidebar
```
Width: 200px
Background: #0d1117
Border-right: 0.5px solid #1e2d3d
Padding: 16px 0
```

**Section Headers:**
- 10px, uppercase, `#334155`, 1.5px letter-spacing, 600 weight
- Padding: 8px 16px 4px

**Sidebar Items:**
- Padding: 8px 16px
- Default: `#64748b` text, transparent border-left
- Active: `#e2e8f0` text, `#0ea5e910` bg, `2px solid #0ea5e9` border-left
- Icon: 15px Tabler outline icon + label text

**Sidebar Badge:**
- Background: `#0ea5e920`
- Color: `#0ea5e9`
- 10px, 2px 6px padding, 10px radius
- Margin-left: auto

### 5.3 Stat Cards (top row, 4-column grid)
```
Background: #0d1117
Border: 0.5px solid #1e2d3d
Border-radius: 10px
Padding: 14px
Grid: repeat(4, 1fr), gap 10px
```
- Label: 10px, uppercase, `#475569`, 0.5px spacing, margin-bottom 8px
- Value: 22px, 600, `#f1f5f9`
- Sub-label: 11px, colored (green/red/muted)

**Four default stat cards:**
1. Active Streams (count)
2. Kafka Messages/s (throughput)
3. WebSocket Latency (ms)
4. Services Online (X / total)

### 5.4 Data Panels (Stock, Uptime, Weather)
```
Background: #0d1117
Border: 0.5px solid #1e2d3d
Border-radius: 10px
Padding: 14px
```

**Panel Header:**
- Section title: 12px, 600, `#94a3b8`, uppercase, 0.5px spacing
- "Add" button: flex row, `#0ea5e915` bg, `#0ea5e9` text, `#0ea5e940` border, 6px radius, 5px 10px padding, 11px

### 5.5 Stock Table
```css
/* Table structure */
width: 100%;
border-collapse: collapse;

/* Headers */
font-size: 10px; color: #334155; text-transform: uppercase;
letter-spacing: 1px; padding: 0 0 10px; font-weight: 500;

/* Rows */
border-top: 0.5px solid #0f1923;

/* Ticker column */
color: #e2e8f0; font-weight: 600; font-size: 14px;

/* Price column */
color: #f1f5f9; font-weight: 500; font-variant-numeric: tabular-nums;
```

**Columns:** Symbol | Price | Change | Volume | Trend (sparkline)

**Change Pills:**
- Up: `#22c55e15` bg, `#22c55e` text, 20px radius
- Down: `#ef444415` bg, `#ef4444` text, 20px radius

**Sparkline Bars:**
- 6 bars per cell
- Width: 4px each, gap: 2px
- Height: varies (8–24px range)
- Color: fading from transparent to solid green/red
- Border-radius: 2px

### 5.6 Site Uptime Cards
```
Background: #0a0d12
Border: 0.5px solid #1e2d3d
Border-radius: 8px
Padding: 10px 12px
Layout: flex row, gap 10px
```

- Status dot: 8px circle, green/red with box-shadow glow
- Name: 12px, `#e2e8f0`, 500
- Ping: 10px, `#475569`
- Status pill: right-aligned, "UP" green / "DOWN" red

### 5.7 Weather Cards
```
Background: #0a0d12
Border: 0.5px solid #1e2d3d
Border-radius: 8px
Padding: 12px
Grid: repeat(3, 1fr), gap 8px
```

- Emoji icon: 20px
- City: 12px, `#94a3b8`
- Temperature: 24px, 600, `#f1f5f9`
- Description: 11px, `#475569`

### 5.8 Right Panel

**Microservices Status:**
- Row: flex, space-between
- Dot: 7px circle, green/amber/red
- Name: 12px, `#64748b`
- Uptime %: right-aligned, `#22c55e`, 10px

**Kafka Throughput Bars:**
- Label: 11px, `#64748b`
- Track: height 3px, `#1e2d3d` bg
- Fill: height 3px, colored by topic, 2px radius
- Value: 10px, `#475569`

**Activity Feed:**
- Dot: 6px, colored by event type (green=data, red=error, blue=connect, indigo=system)
- Text: 11px, `#64748b`, key term highlighted in `#94a3b8`
- Timestamp: 10px, `#334155`
- Separator: `0.5px solid #0f1923`

---

## 6. Pages & Screens

### 6.1 Login Page

**Layout:** Centered card on full dark background
**Background:** `#0a0d12` with subtle radial gradient overlay (indigo at center, fading)

**Login Card:**
```
Width: 380px
Background: #0d1117
Border: 0.5px solid #1e2d3d
Border-radius: 12px
Padding: 36px
```

**Content:**
1. Logo (centered, large)
2. Headline: "Welcome back" (20px, 500, `#f1f5f9`)
3. Subtext: "Connect to your live data streams" (13px, `#64748b`)
4. Input: Username/email
5. Input: Password
6. "Sign In" button (full-width, `#0ea5e9` bg, white text)
7. Footer: "Powered by Apache Kafka" (10px, `#334155`)

**Input Fields:**
```
Background: #111827
Border: 0.5px solid #1e2d3d
Color: #f1f5f9
Placeholder: #475569
Padding: 10px 14px
Border-radius: 8px
Font-size: 13px
```

**Sign In Button:**
```
Background: #0ea5e9
Color: white
Border: none
Border-radius: 8px
Padding: 11px
Width: 100%
Font-size: 14px
Font-weight: 500
```

**Animated background element:** Slowly rotating SVG swirl (the Whirlpool logo mark) at 20% opacity in the background.

---

### 6.2 Dashboard (Main) — Already Detailed Above

Additional notes:
- Default view on login
- URL: `/dashboard`
- All three feed types visible simultaneously
- Real-time updates animate in (fade + slide from right, 200ms)
- New data rows flash `#22c55e10` → transparent for 1s

---

### 6.3 Stocks Page (Full Screen)

**URL:** `/streams/stocks`

**Layout:** Full-width table with advanced features

**Additional features vs dashboard:**
- Search/filter by ticker
- Sort by: Price, Change%, Volume
- Historical chart (7-day line chart per ticker, expandable)
- Add/remove symbols
- Real-time price update animation (number count-up effect)

**Chart style (per ticker):**
- Line chart, `#0ea5e9` stroke, 1.5px
- Fill: gradient from `#0ea5e920` to transparent
- Grid: `#1e2d3d`, 0.5px dashed
- No axes labels on mini chart

---

### 6.4 Site Uptime Page

**URL:** `/streams/uptime`

**Layout:** Card grid (3 columns) + status timeline

**Features:**
- Add URL form (input + submit)
- Per-site uptime percentage (last 24h)
- Response time trend graph (last 30 pings)
- Status history bar: 90 tiny blocks, green/red by minute

**Status History Bar:**
- 90 blocks, each 3px wide, 2px gap, 20px tall
- Colors: `#22c55e` (up), `#ef4444` (down), `#475569` (unknown)
- Border-radius: 1px each

---

### 6.5 Weather Page

**URL:** `/streams/weather`

**Layout:** Large weather cards (2-column grid)

**Features:**
- Add city/ZIP input
- Current temperature + condition
- 5-element icon row (hourly forecast)
- Wind, humidity, feels-like
- Background card color shifts subtly based on condition (sunny → warm tint, rain → cool tint)

---

### 6.6 Services / System Health Page

**URL:** `/services`

**Layout:** Full visibility into backend microservices

**Sections:**
1. **Service health grid** — each microservice as a card with: name, status dot, uptime %, last heartbeat, restart count
2. **Kafka Topic Monitor** — table: topic name, partitions, consumer lag, messages/s, last message time
3. **WebSocket Connections** — active connections count, connection list (ID, user, connected-at, subscriptions)
4. **System Log** — scrollable feed, monospace, color-coded by level (INFO=`#64748b`, WARN=`#f59e0b`, ERROR=`#ef4444`)

---

### 6.7 Alerts Page

**URL:** `/alerts`

**Features:**
- Create alert rules: IF [ticker] price [above/below] [value] THEN notify
- Alert history feed
- Toggle alerts on/off
- Alert cards with colored left-border (green=active, amber=triggered, red=critical)

---

## 7. Animations & Interactions

### Live Data Updates
```css
/* New data pulse */
@keyframes dataFlash {
  0%   { background: #22c55e15; }
  100% { background: transparent; }
}
.row-updated { animation: dataFlash 1s ease-out; }
```

### Live Dot Pulse
```css
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 4px #22c55e60; }
  50%       { box-shadow: 0 0 10px #22c55e; }
}
.live-dot { animation: pulse 2s infinite; }
```

### Page Load — Staggered Reveal
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.stat-card:nth-child(1) { animation: fadeUp 0.3s 0.0s ease both; }
.stat-card:nth-child(2) { animation: fadeUp 0.3s 0.1s ease both; }
.stat-card:nth-child(3) { animation: fadeUp 0.3s 0.2s ease both; }
.stat-card:nth-child(4) { animation: fadeUp 0.3s 0.3s ease both; }
```

### Price Counter Animation
When a price updates, animate from old value to new value using a JS counter that runs in 400ms.

### WebSocket Connection Status
- On connect: dot turns green, "CONNECTED" appears with fade-in
- On disconnect: dot turns amber, "RECONNECTING..." with pulse
- On error: dot turns red, "DISCONNECTED" static

---

## 8. Responsive Breakpoints

### Desktop (primary target)
- Full 3-column layout as shown
- Min-width: 1200px for full experience

### Tablet (≥768px)
- Hide right panel, collapse into bottom section
- Sidebar becomes icon-only (40px wide)
- 2-column stat grid instead of 4

### Mobile (≤767px)
- Bottom tab navigation replaces sidebar
- Single column layout
- Stat cards: 2×2 grid
- Tables convert to card-per-row format
- Right panel becomes separate "System" tab

---

## 9. Tech Stack Recommendations for Frontend

| Concern | Recommendation | Reason |
|---------|----------------|--------|
| Framework | React 18 | Already in use, hooks for real-time state |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Charts | Recharts or Chart.js | Lightweight, good dark mode |
| Icons | Tabler Icons (React) | 5800+ outline icons, MIT license |
| WebSocket | Native `WebSocket` API | No extra library needed |
| State | Zustand | Lightweight, perfect for live feed state |
| Routing | React Router v6 | Standard, simple |
| Animations | Framer Motion | Smooth data transitions |
| Fonts | Load via Google Fonts or bundles | See section 3 |

---

## 10. CSS Variables (Root Setup)

```css
:root {
  /* Backgrounds */
  --bg-deep:     #0a0d12;
  --bg-surface:  #0d1117;
  --bg-elevated: #111827;

  /* Borders */
  --border-subtle:  #1e2d3d;
  --border-default: #2d3748;

  /* Text */
  --text-primary:   #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted:     #64748b;
  --text-faint:     #475569;
  --text-dim:       #334155;

  /* Accents */
  --accent-blue:   #0ea5e9;
  --accent-indigo: #6366f1;
  --accent-green:  #22c55e;
  --accent-red:    #ef4444;
  --accent-amber:  #f59e0b;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;

  /* Shadows / Glows */
  --glow-green: 0 0 6px #22c55e80;
  --glow-red:   0 0 5px #ef444460;
  --glow-blue:  0 0 6px #0ea5e980;
}
```

---

## 11. Logo & Branding

### Whirlpool Mark
The logo is a stylized circular swirl suggesting rotation and flow — representing both the name "Whirlpool" and the concept of data circulating through Kafka topics.

**SVG Mark (simplified):**
```svg
<svg width="30" height="30" viewBox="0 0 16 16" fill="none">
  <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2a4 4 0 0 1 3.5 5.9L5.1 4.5A3.97 3.97 0 0 1 8 4zm0 8a4 4 0 0 1-3.5-5.9l6.4 5.4A3.97 3.97 0 0 1 8 12z" fill="white"/>
</svg>
```

**Icon container gradient:**
```css
background: linear-gradient(135deg, #0ea5e9, #6366f1);
border-radius: 8px;
```

### Wordmark
- Font: Segoe UI or substitute
- Weight: 600
- Size: 16px in topbar, 28px on login
- Color: `#f1f5f9`
- No all-caps. Proper case "Whirlpool"

---

## 12. Micro-copy & UX Writing

| Element | Copy |
|---------|------|
| Login headline | "Welcome back" |
| Login subtext | "Connect to your live data streams" |
| Empty stocks state | "No symbols added yet. Click 'Add symbol' to subscribe to a stock." |
| Empty uptime state | "No URLs monitored. Add a site to start tracking uptime." |
| Offline state | "Connection lost. Attempting to reconnect…" |
| Loading state | "Connecting to stream…" |
| Add stock placeholder | "Enter ticker symbol (e.g. GOOG)" |
| Add URL placeholder | "Enter URL (e.g. https://example.com)" |
| Add city placeholder | "Enter city name or ZIP code" |
| Services all healthy | "All services operational" |
| Kafka footer note | "Powered by Apache Kafka" |

---

## 13. Deliverables Checklist

- [x] Design system documentation (this file)
- [ ] Login page implementation
- [ ] Dashboard / main view
- [ ] Stocks full-page view
- [ ] Uptime full-page view
- [ ] Weather full-page view
- [ ] Services / system health page
- [ ] Alerts page
- [ ] Mobile responsive layouts
- [ ] CSS variables stylesheet
- [ ] Component library (React components)
- [ ] Loading / skeleton states
- [ ] Error states
- [ ] Empty states
- [ ] Dark mode (default, already dark)
- [ ] Favicon (Whirlpool swirl mark)

---

## 14. What Makes This Worth Premium Pay

1. **Architecture-aware design** — the UI exposes Kafka topics, WebSocket status, and microservice health. The design isn't just pretty; it tells the story of the system.
2. **Real-time first** — every design decision supports live updating. Animations, status indicators, and activity feeds are core UI elements, not afterthoughts.
3. **Data density without chaos** — the 3-panel layout gives users access to stocks, uptime, weather, system health, and live feed simultaneously, without feeling overwhelming.
4. **Professional credibility** — the dark command-center aesthetic positions Whirlpool as enterprise-grade software, not a toy project.
5. **Scalable component system** — CSS variables + consistent spacing scale means new features fit seamlessly without redesigning.

---

*Document prepared for client handoff — Whirlpool Redesign Project, May 2026*
