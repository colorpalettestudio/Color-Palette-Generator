# Color Palette Generator

## Overview

The Color Palette Generator is a web-based tool that allows users to create, customize, and export color palettes. Built as a reference implementation matching thecolorcodeconverter.com's design aesthetic, it features a clean, modern interface with Inter font, generous whitespace, rounded cards, and an animated rainbow accent on the word "Color" in headings.

The application provides palette generation through multiple methods (random shuffling, image color extraction, harmony-based generation), color locking functionality, drag-and-drop reordering, and export capabilities (PNG, PDF). It includes a curated library of 44+ preset palettes and educational content for SEO purposes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter - a minimal client-side router handling routes for Home (`/`), Palettes (`/palettes`), Privacy Policy, Terms, and Contact pages.

**UI Component Library**: Shadcn UI (New York style variant) with Radix UI primitives for accessible, unstyled components. Custom styling applied via Tailwind CSS with CSS variables for theming.

**State Management**: React hooks (useState, useEffect) for local component state. No global state management library - all palette data stored in localStorage for persistence.

**Styling System**: 
- Tailwind CSS with custom configuration
- CSS variables for color theming (light mode primary with dark mode support structure)
- Custom utility classes for hover/active states (`hover-elevate`, `active-elevate-2`)
- Inter font family from Google Fonts
- Custom rainbow gradient animation for "Color" text (`rainbow-text`, `rainbow-text-animated`)

**Key Libraries**:
- `tinycolor2` - Color manipulation and harmony generation
- `html2canvas` - Palette export to PNG
- `jspdf` - Palette export to PDF
- `@tanstack/react-query` - Data fetching and caching (configured but minimal API usage)

### Backend Architecture

**Server**: Express.js with TypeScript running on Node.js.

**Development Setup**: Vite middleware integration for HMR (Hot Module Replacement) during development. Production serves static built files.

**API Structure**: RESTful API endpoints for palette like functionality:
- `GET /api/palette-likes` - Fetch all palette like counts
- `POST /api/palette-likes/:paletteName/like` - Like a palette (increments count)
- `POST /api/palette-likes/:paletteName/unlike` - Unlike a palette (decrements count)

**Session Management**: Infrastructure present (connect-pg-simple) but not actively used.

### Data Storage Solutions

**Primary Storage**: Browser localStorage for:
- Saved user palettes
- User preferences
- Selected palette state (when navigating from library)
- User's liked palettes (for tracking which palettes the user has liked)

**Database**: PostgreSQL via Neon serverless with Drizzle ORM, actively used for:
- Palette like counts (global, persistent across all users)
- Users table (schema defined but not actively used)

**Data Models**:
- `users` table with id, username, password fields (defined but unused)
- `palette_likes` table with id, palette_name (unique), and like_count fields
- Schema validation via drizzle-zod
- Database-backed storage implementation using DbStorage class

### Color Generation & Manipulation

**Random Color Generation**: Uses tinycolor's random function for initial palette generation.

**Harmony-Based Generation**: BaseColorGenerator component implements six harmony modes:
- Analogous (5 adjacent hues)
- Complementary (opposite colors on color wheel)
- Triadic (3 evenly spaced colors)
- Tetradic (4 colors in two complementary pairs)
- Split-complementary
- Monochromatic (single hue with variations)

**Image Color Extraction**: ImageColorExtractor component samples pixels from uploaded images, filters out transparent/extreme values, clusters similar colors, and extracts dominant palette.

**Color Locking**: Individual colors can be locked to prevent changes during shuffle operations.

### User Interface Features

**Palette Manipulation**:
- Shuffle: Regenerates unlocked colors while preserving locked ones
- Add/Remove: Dynamic palette size (3-8 colors minimum-maximum)
- Drag & Drop: Reorder colors via HTML5 drag API
- Manual Color Picking: Click color to open native color picker
- Copy HEX: Click code to copy to clipboard with toast feedback
- Undo/Redo: History tracking of palette states

**Export Functionality**:
- PNG Export: Captures palette visual using html2canvas
- PDF Export: Generates document with jsPDF including color swatches and HEX codes

**Preset Library**: 135 curated palettes stored in `lib/palettes.ts` displayed in grid layout with click-to-load functionality.

**Palette Likes System**:
- Heart icon on each palette card showing global like count
- Click to like/unlike palettes (optimistic UI updates)
- localStorage tracks user's individual liked palettes
- Database stores global like counts persistently
- Error handling with rollback on failed API calls
- Toast notifications for errors

**Sorting Options**:
- Most Loved: Sort by like count (descending)
- A-Z: Alphabetical by palette name
- Newest: Reverse order (latest first)

### SEO & Content Strategy

**Metadata**: Comprehensive meta tags in index.html including Open Graph and JSON-LD structured data (SoftwareApplication and FAQPage schemas).

**Content Sections**:
- Educational content explaining color palette generation
- Usage instructions
- Tips for finding great palettes
- Use cases for commercial/creative projects
- FAQ accordion component (6 common questions)

**Additional Pages**: Privacy Policy, Terms of Service, Contact pages with footer navigation.

**Robots.txt**: Configured to allow all crawlers with sitemap reference.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Comprehensive set of 25+ unstyled, accessible React components (@radix-ui/react-*)
- **Shadcn UI**: Pre-styled component implementations built on Radix primitives
- **Lucide React**: Icon library for consistent iconography

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with PostCSS
- **class-variance-authority (CVA)**: Type-safe variant API for component styling
- **tailwind-merge & clsx**: Utility for merging Tailwind classes

### Color Manipulation
- **tinycolor2**: Color parsing, manipulation, and color theory (harmonies, triads, etc.)

### Export & Canvas
- **html2canvas**: Renders DOM elements to canvas for PNG export
- **jspdf**: Generates PDF documents for palette export

### Data & Forms
- **React Hook Form**: Form state management (@hookform/resolvers for validation)
- **Zod**: Schema validation (via drizzle-zod integration)

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-kit**: CLI for schema migrations

### Development Tools
- **Vite**: Build tool and dev server
- **@vitejs/plugin-react**: React plugin for Vite
- **@replit/vite-plugin-***: Replit-specific dev plugins (error overlay, cartographer, dev banner)
- **TypeScript**: Type safety across client and server
- **ESBuild**: Used for production server bundle

### Fonts
- **Google Fonts**: Inter font family (weights 400, 500, 600, 700)

### Analytics Placeholder
- **Google Analytics**: Mentioned in privacy policy but not yet implemented

Note: While PostgreSQL and Drizzle are configured, the current implementation does not require database connectivity for core functionality. All features operate client-side with localStorage persistence.