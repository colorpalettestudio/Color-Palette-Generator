# Color Palette Generator - Design Guidelines

## Design Approach
**Reference-Based**: Matching the clean, modern aesthetic of thecolorcodeconverter.com with Inter font, generous whitespace, rounded cards, and signature rainbow accent.

## Core Design Elements

### A. Color Palette
**Light Mode (Primary)**
- Background: Pure white (#FFFFFF)
- Text Primary: Near-black (240 10% 10%)
- Text Secondary: Medium gray (240 5% 45%)
- Border/Dividers: Light gray (240 5% 90%)
- Primary Button: Near-black background with white text
- Secondary Button: White background with thin dark border
- Rainbow Accent: Animated gradient on the word "Color" in H1 (gentle animation)

### B. Typography
**Font Family**: Inter (Google Fonts)
- **H1 (Hero)**: 48px/1.2, font-weight 700
- **H2 (Sections)**: 32px/1.3, font-weight 600
- **Body**: 16px/1.6, font-weight 400
- **Button Text**: 16px, font-weight 500
- **Color HEX Codes**: 14px, font-weight 500, monospace fallback
- **Small/Meta**: 14px, font-weight 400

### C. Layout System
**Spacing Units**: Use Tailwind spacing - primarily 4, 6, 8, 12, 16, 24, 32 units
- Section padding: py-16 to py-24
- Card padding: p-6 to p-8
- Button padding: px-6 py-3
- Gap between elements: gap-4 to gap-8

**Container**: max-w-7xl, centered with px-4 horizontal padding

### D. Component Library

**Hero Section**
- Badge: Small pill with subtle background "Free, Fast & No Sign-Up"
- H1: Large centered headline with rainbow gradient on "Color"
- Subhead: 18px supporting text below headline
- Three-button layout: Primary "Shuffle Palette", Secondary "Add Color", Link "Clear All"

**Color Palette Cards** (Primary UI)
- Tall rectangles (similar to Coolors.co style)
- Large color fill preview (minimum 200px height)
- HEX code display at bottom (clickable for copy)
- Lock icon toggle (outlined lock when locked, open when unlocked)
- Delete button "×" in corner
- Subtle shadow: shadow-md
- Rounded corners: 12px (rounded-xl)
- Responsive grid: 
  - Desktop: 1x5 horizontal row
  - Tablet: 2x3 grid
  - Mobile: 1x1 stacked

**Toolbar**
- Horizontal button group below palette
- Equal-width buttons: "Export PNG" | "Export PDF" | "Save Palette" | "View Library"
- Secondary button style with icons

**Palette Library Section**
- Section title: "Browse Popular Palettes" with supporting subtext
- Card grid: 4-6 cards per row (desktop), responsive down to 2-1
- Each card shows mini horizontal color strips (5-8 colors)
- Palette name below preview
- Hover state: subtle lift (shadow increase)
- Click interaction: loads palette into generator
- Example palettes: "Warm Neutrals," "Coastal Dawn," "Retro Candy," "Fresh Citrus," "Bold & Modern"

**Educational Blocks**
- Clean section breaks with adequate whitespace
- H2 section headers
- 2-column layout on desktop, single column on mobile
- Comfortable reading width (max-w-3xl for text blocks)

**FAQ Accordion**
- Minimal design with subtle borders
- Expand/collapse icons
- Smooth transitions
- Questions from attached file

**Footer**
- Two-column layout: branding left, links right
- "Made with ❤️ by The Color Palette Studio"
- Secondary navigation: Privacy · Terms · Contact
- Additional tool links: "Explore more free tools →"

### E. Interactions & States

**Copy Feedback**
- Visual confirmation when HEX copied (brief "Copied!" toast or text change)

**Lock Toggle**
- Clear visual distinction between locked/unlocked states
- Smooth icon transition

**Shuffle Animation**
- Brief color transition (not jarring flash)
- Only unlocked colors change

**Button States**
- Hover: slight opacity change or shadow increase
- Active/Click: subtle scale or shadow reduction
- Disabled: 50% opacity

**Card Hover**
- Library cards: slight lift and shadow increase
- Color cards: subtle border highlight

**Color Palette Fixer Advertisement**
- Positioned after palette library section, before educational content
- Two-column layout (text left, product image right)
- Gradient background (blue-50 to purple-50) for visual distinction
- "Palette Not Perfect?" badge with sparkle icon
- Frustration-based headline: "Want to get this palette brand-ready?"
- Tagline emphasizes: "Using math, not AI"
- Three bullet points highlighting key features:
  - Instantly identifies what's off (too bright, too flat, low contrast)
  - Gives you one-click Smart Palette Suggestions™
  - Makes your colors website-ready, accessible, and balanced
- CTA button: "Try Color Palette Fixer" with external link icon
- Product image showing the Fixer tool interface (clickable)
- Shadow-xl card with hover-elevate interaction
- Links to: https://thecolorpalettestudio.com/products/color-palette-fixer

## Images
**No large hero images required** - this is a tool-focused microsite. Visual interest comes from:
- Rainbow gradient accent on "Color" text
- Colorful palette cards themselves
- Mini palette previews in library section

## Responsive Behavior
**Breakpoints**:
- Mobile: < 768px (single column, stacked palettes)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

**Mobile Optimizations**:
- Larger tap targets (48px minimum)
- Full-width buttons
- Stacked palette cards
- Simplified toolbar (icon-only or wrapped)

## Accessibility
- High contrast text (WCAG AA minimum)
- Focus states on all interactive elements
- Keyboard navigation support
- Screen reader labels for icon buttons
- Color contrast checker for generated palettes

## Brand Consistency
Maintain visual harmony with thecolorcodeconverter.com:
- Same Inter font family
- Identical spacing rhythm
- Rainbow accent treatment on key words
- Rounded card aesthetic (12px corners)
- Generous whitespace philosophy
- Near-black buttons with white text