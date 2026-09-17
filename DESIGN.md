# Landing Page Design Guide: Detailer Quote & Booking

Build a production landing page for a SaaS product that lets mobile detailers and ceramic coating installers give customers an instant price, let them book a time, and collect a deposit. The page's main job is to support cold outreach: a detailer taps a link in a DM or email, tries the interactive demo on their phone, and signs up for early access.

The attached reference file `Main.dc.html` is the approved mockup. Match its look, copy, and demo behavior. This guide explains how to rebuild it as a real, deployable site.

## Goals, in priority order

1. The interactive demo works flawlessly, especially on a phone. Most visitors arrive from Instagram DMs on mobile.
2. The early-access form captures email and Instagram handle and stores them.
3. Loads fast (aim for under 2 seconds on mobile). No heavy libraries.
4. Easy to edit copy and prices later.

## Suggested stack

- Next.js (App Router) with TypeScript, or Astro if you prefer a lighter static site. One page is fine.
- Plain CSS or CSS modules with the tokens below as CSS variables. Tailwind is fine too if mapped to these tokens.
- Deploy on Vercel or Netlify.
- Form: store signups via a simple API route writing to a database (Supabase, or a Google Sheet via API), or a form service like Formspree. Send a notification email to the owner on each signup.
- Analytics: Plausible or Vercel Analytics. Track demo starts, demo completions, and form submits as events.
- Support `?ref=` or UTM params and store them with each signup, so outreach channels can be compared (Instagram DM vs email vs Facebook ad).

## Design tokens

### Colors

| Token | Hex | Use |
|---|---|---|
| `--ground` | `#F3F1EC` | Page background, light panels |
| `--ink` | `#16181B` | Main text, dark demo stage, dark cards |
| `--muted` | `#4A4F55` | Secondary text on light backgrounds |
| `--muted-on-dark` | `#C9C6BF` | Secondary text on dark backgrounds |
| `--line` | `#D9D6D0` | Card borders, unselected option borders |
| `--line-soft` | `#E4E1DB` | Dividers, progress track |
| `--surface` | `#FFFFFF` | Cards, phone screen |
| `--bezel` | `#2A2D31` | Phone frames, active step row |
| `--dot-idle` | `#3A3E43` | Inactive step number circles |
| `--accent` | `#0B5E54` | Buttons, links, selected borders, CTA band |
| `--accent-hover` | `#083F38` | Hover on accent |
| `--accent-soft` | `#E7F1EE` | Selected option background |
| `--signal` | `#4FD1B5` | Live/done indicators, "Approve" button on dark |

Keep text contrast at 4.5:1 or better. White text only on `--accent` or `--ink`.

### Typography

- Display: **Barlow Condensed**, weights 600 and 700, uppercase, tight line-height (0.95–1.05). Fallback: `"Arial Narrow", sans-serif`.
- Body: **IBM Plex Sans**, weights 400, 500, 600. Fallback: `"Helvetica Neue", Helvetica, sans-serif`.
- Load via `next/font` or self-host to avoid layout shift.

| Element | Desktop | Mobile |
|---|---|---|
| Hero H1 | 84px / 0.95 | 44px / 1.0 |
| Section H2 | 56px / 1.0 | 38px |
| Card H3 | 30px | 26px |
| Eyebrow label | 15px, 600, uppercase, 1.5px tracking | 13px |
| Body large | 21px / 1.5 | 18px |
| Body | 16px / 1.55 | 16px |
| Small / captions | 13–14px | 13–14px |

### Spacing and shape

- Content max width: 1280px, horizontal padding 40px desktop, 20px mobile.
- Section vertical padding: 80px desktop, 56px mobile.
- Grid gaps: 24px for cards, 8–10px inside the phone UI.
- Radius: 28px for large panels (demo stage, CTA band), 20px cards, 12–14px buttons and options, 48px phone frame outer / 38px screen.
- Borders: 1px `--line` on cards; 2px on selectable options.
- Minimum touch target: 44px tall.
- No gradients, no drop-shadow-heavy cards, no emoji. Icons are simple inline stroke SVGs (1.8–2.4 stroke width).

## Page structure

### 1. Nav
Logo text `[APP NAME]` in Barlow Condensed 28px bold on the left. Right: links "How it works", "Pricing", "FAQ" (smooth scroll to anchors) and an accent button "Get early access". On mobile, hide the text links and keep the button.

### 2. Hero
- Eyebrow (accent): "For mobile detailers and coating installers"
- H1: "Customers get a price, book a time, and pay a deposit. While you're working."
- Body: "No more "DM for a quote" and waiting a day to reply. Put one link in your Instagram bio or on your site, and customers go from curious to booked in about two minutes."
- Buttons: primary "Get early access" (scrolls to `#join`), outline "Try the demo below" (scrolls to `#demo`).

### 3. Demo stage (`#demo`) — the most important section
A dark `--ink` panel with three columns on desktop:

- **Left: step list.** H2 "Try it like a customer", subtitle "Tap through the phone. The right side shows what lands on the detailer's phone." Then six rows, each with a numbered circle, title, and one-line body. Active row gets `--bezel` background; active and completed circles are `--signal` with ink text; completed circles show a checkmark.
- **Center: customer phone** (360×740, bezel `--bezel`, white screen). Label above: "Customer's phone".
- **Right: detailer phone** (320 wide card, `--bezel`). Label above: "Detailer's phone". Caption below: "Demo pricing is an example. Detailers set their own packages and prices."

**Mobile layout:** stack in this order: customer phone first, then detailer phone directly below, then the step list collapsed into a single line above the phone ("Step 3 of 5: Describes condition"). When the booking completes, auto-scroll to the detailer card so the visitor sees the payoff. Scale the phone frame to fit the screen width (max 360px); on very small screens drop the bezel and show just the screen card.

### 4. Why customers commit (`#how`)
H2 "Why customers actually commit", then a 3×2 grid (1 column on mobile) of white cards, each with an accent number, H3, and body:

1. **A price right away** — Customers see a real range for their vehicle and condition instead of waiting on a DM. People book the detailer who answers first.
2. **Booking on the same screen** — Open times show next to the price, so there's no second conversation about scheduling.
3. **A deposit locks it in** — People who pay something show up. You set the deposit amount and cancellation policy.
4. **You approve big jobs** — Paint correction, coatings, and heavy interiors come to you with photos. Confirm or adjust the price with one tap.
5. **Follow-ups on autopilot** — Got a price but didn't book? They get a reminder with their quote and a booking link.
6. **No website needed** — Use your booking link in your Instagram bio, Google profile, or texts. Have a site? Embed it there too.

### 5. Pricing (`#pricing`)
H2 "Simple pricing". Two cards side by side (stacked on mobile), max width 920px:
- **Starter** (white card): `[$XX] /mo`. "Quote and booking page, photo uploads, time slots, deposits, and instant lead alerts."
- **Pro** (ink card, light text): `[$XX] /mo`. "Everything in Starter, plus one-tap price approval for big jobs and automatic follow-up texts."
Below: "Founding detailers: locked-in price and free setup for the first [10] shops."

Keep prices in one config file so they're easy to change.

### 6. FAQ (`#faq`)
Two-column grid (one column mobile). Can be static or accordions.
- **What if the car is worse than the photos?** Customers agree up front that the price can change if the condition differs. They approve any change before you start.
- **Do my customers need an app?** No. It opens in their phone's browser from your link.
- **How long does setup take?** Pick your packages, enter prices by vehicle size, set your hours. Founding shops get it set up for them.
- **Where do deposits go?** Straight to your own payment account. `[Payment provider details]`

### 7. CTA (`#join`)
Accent-colored band, radius 28px, white text. H2 "Stop losing jobs to slow replies". Body "Join the founding detailers. Free setup and a locked-in price." Form with visible labels: Email (required, type email), Instagram handle (optional), and an ink "Get early access" button. Stack fields on mobile.

On submit: validate, show loading state, then replace the form with "You're in. I'll message you within a day to get your page set up." Show a clear error message if it fails. Include a honeypot field for spam.

## Demo behavior spec

Build the demo as a self-contained client component with local state:
`step (0–5), vehicle, pkg, cond, slot, photos (0–3)`.

### Steps (customer phone)
Header: business name `[Your Detailing Co.]`, "Step N of 5" (or "Done"), progress bar = (step+1)/5, uppercase title.

| Step | Title | Content | Continue enabled when | Button label |
|---|---|---|---|---|
| 0 | What are we detailing? | 4 vehicle options | vehicle chosen | Continue |
| 1 | Pick a package | 4 packages with duration and "from $X" | package chosen | Continue |
| 2 | How does it look right now? | 3 condition options + 3 photo tiles | condition chosen | See my price |
| 3 | Your price and a time | Price card + 4 time slots | slot chosen | Continue to deposit |
| 4 | Lock in your spot | Order summary + deposit + policy text | always | Pay $X deposit (demo) |
| 5 | You're booked | Check icon, confirmation, "Run the demo again" | — | (no nav) |

A "Back" button (88px wide, outline) shows on steps 1–4. Disabled Continue is 40% opacity.

### Data
Vehicles (price multiplier): Sedan / Coupe 1.0, SUV / Crossover 1.2, Truck 1.3, Van / 3-row SUV 1.45.
Packages (base, duration): Maintenance wash $60 "About 1–2 hours"; Full interior $150 "About 3 hours"; Full detail $230 "About 4–5 hours"; Ceramic coating $650 "1–2 days".
Conditions (multiplier, description): Light 1.0 "Regular upkeep, no stains"; Moderate 1.15 "Some stains, crumbs, a little pet hair"; Heavy 1.35 "Lots of pet hair, spills, or odors".
Time slots: Thu 9:00 AM, Thu 2:00 PM, Fri 10:00 AM, Sat 8:00 AM.

### Logic
- `low = round(base × vehicleMult × conditionMult, nearest 10)`; `high = round(low × 1.2, nearest 10)`. Display `$low–$high`.
- `needsApprove = pkg is coating OR condition is heavy`.
- `deposit = $100 for coating, otherwise $50`.
- Price note: if needsApprove, "The detailer confirms the final price from your photos, usually within minutes. You can still hold a time now." Otherwise "Final price confirmed at the car. Any change needs your OK first."
- Photo tiles: tapping any empty tile increments `photos` (max 3). Filled tiles show accent dashed border, soft background, "Added". This is simulated; no real upload.
- Step 4 policy text: "Your deposit comes off the final bill. If the car's condition differs from your photos, you'll approve any price change before work starts. Free cancellation up to [24 hrs] before."
- Step 5: "Booked for {slot}. {deposit} deposit paid." plus "You'll get a text as soon as the detailer confirms your final price." (needsApprove) or "You'll get a reminder text the day before."

### Detailer phone
- Steps 0–4: bell icon, "You're on a job", and "Nothing to do yet. The customer is picking options on their own." (step 0) or "Still nothing to answer. The customer is on step N by themselves."
- Step 5: green `--signal` dot + "New booking" (or "New booking: needs your price OK"). A light card with: "[Customer name] · {slot}", "{vehicle} · {package}", "Condition: {condition} · {N photos}", "Estimate: {range}", and accent "{deposit} deposit paid".
  - If needsApprove: "Big job. Check the photos and confirm the final price:" with "Approve {high}" (`--signal` background) and "Adjust price" (outline) buttons. Buttons can briefly show "Approved" / a toast on tap.
  - Otherwise: "Standard job, booked instantly. It's on your calendar."
- Nice to have: a subtle slide-in animation and short vibration-style shake when the booking arrives. Respect `prefers-reduced-motion`.

### Step list (left column)
Titles and bodies:
1. Taps your link — From Instagram, Google, or your site. Picks their vehicle.
2. Chooses a package — Your packages, your prices, adjusted by vehicle size.
3. Describes condition — Quick condition pick plus photos, so the price holds up.
4. Sees a price, picks a time — A real range and your open slots on the same screen.
5. Pays a deposit — Locks the spot and cuts no-shows.
6. You get the booking — Details and photos land on your phone. Big jobs wait for your approval.

## Accessibility
- All options and buttons are real `<button>` elements with visible focus rings (2px accent outline, 2px offset).
- Selected options use `aria-pressed="true"`.
- Announce step changes with an `aria-live="polite"` region.
- Form inputs have `<label>` elements.
- Icon-only buttons need `aria-label`.

## SEO and sharing
- Title: "[APP NAME] | Instant quotes and bookings for detailers"
- Meta description: "Let customers get a price, book a time, and pay a deposit from your Instagram link."
- Open Graph image (1200×630): ink background, the H1 in Barlow Condensed, and a screenshot of the two phones. Link previews in DMs matter for cold outreach.
- Favicon: simple accent square with the app initial.

## Placeholders to replace before launch
`[APP NAME]`, `[Your Detailing Co.]`, `[$XX]` prices, `[10]` founding spots, `[24 hrs]` cancellation window, `[Payment provider details]`, `[Customer name]`.

## Out of scope for this page
No real payments, bookings, or uploads. The demo is simulated. No testimonials or statistics until there are real ones.
