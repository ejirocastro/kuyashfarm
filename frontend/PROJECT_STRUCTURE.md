# Betàni Farming Website - Project Structure

## Overview
This is a professionally structured Next.js 16 application built with TypeScript, Tailwind CSS, and following modern React best practices.

## Folder Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts and metadata
│   ├── page.tsx                 # Home page (assembles all sections)
│   └── globals.css              # Global styles and CSS variables
│
├── components/                   # Reusable React components
│   ├── ui/                      # Generic UI components
│   │   ├── Button.tsx           # Reusable button with variants
│   │   ├── Card.tsx             # Card component with hover effects
│   │   ├── Container.tsx        # Max-width container wrapper
│   │   └── Section.tsx          # Section wrapper with spacing
│   │
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx           # Sticky navbar with scroll effects
│   │   └── Footer.tsx           # Footer with links and social media
│   │
│   └── sections/                # Page sections
│       ├── Hero.tsx             # Hero section with background image
│       ├── Stats.tsx            # Statistics grid
│       ├── Mission.tsx          # Mission statement with image
│       ├── Services.tsx         # Services grid with hover effects
│       ├── Collaboration.tsx    # Collaboration section
│       ├── Blog.tsx             # Blog preview cards
│       └── Goals.tsx            # Goals and metrics
│
├── lib/                         # Utility functions and constants
│   ├── utils.ts                # Utility functions (cn for classnames)
│   └── constants.ts            # App-wide constants and data
│
├── types/                       # TypeScript type definitions
│   └── index.ts                # Shared type definitions
│
└── public/                      # Static assets
    └── images/                  # Image assets

```

## Design System

### Colors
- **Primary Green**: `#2d5f3f`
- **Secondary Green**: `#4a7c59`
- **Accent Green**: `#6b9d7a`
- **Earth Brown**: `#8b6f47`
- **Cream**: `#faf8f5`

### Typography
- **Serif Font**: Playfair Display (headings)
- **Sans-serif Font**: Inter (body text)

### Component Patterns

#### 1. Modular Components
Each component is self-contained and follows the single responsibility principle.

#### 2. Consistent Naming
- Layout components: `Navbar`, `Footer`
- Section components: `Hero`, `Stats`, etc.
- UI components: `Button`, `Card`, etc.

#### 3. TypeScript
All components are fully typed for better IDE support and error catching.

#### 4. Responsive Design
- Mobile-first approach
- Tailwind breakpoints: `sm`, `md`, `lg`, `xl`
- Grid layouts that adapt to screen size

#### 5. Animations
- Smooth transitions on hover
- Scale effects on cards
- Parallax-style backgrounds
- Scroll-triggered animations

## Key Features

### ✅ Professional Structure
- Organized by feature and function
- Separation of concerns
- Reusable components

### ✅ Performance Optimized
- Next.js Image optimization
- Font optimization with `next/font`
- Code splitting by default

### ✅ SEO Ready
- Semantic HTML
- Proper metadata
- Accessible components

### ✅ Developer Experience
- TypeScript for type safety
- ESLint for code quality
- Consistent code style

### ✅ Responsive Grid Layouts
- Services section: 1 → 2 → 3 columns
- Blog section: 1 → 2 → 3 columns
- Stats section: 1 → 2 → 4 columns

## How to Add New Sections

1. Create component in `components/sections/`
2. Import in `app/page.tsx`
3. Add to the main component tree
4. Update constants in `lib/constants.ts` if needed

## Best Practices Implemented

1. **Component Organization**: Logical folder structure
2. **Constants Management**: Centralized in `lib/constants.ts`
3. **Type Safety**: TypeScript throughout
4. **Utility Functions**: Shared utilities in `lib/utils.ts`
5. **Consistent Styling**: Tailwind classes with `cn()` utility
6. **Accessibility**: Semantic HTML and ARIA labels
7. **Performance**: Optimized images and fonts
8. **Maintainability**: Clear comments and documentation

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Setup

No environment variables needed for basic setup.
For production, consider adding:
- Analytics tracking
- Contact form API
- CMS integration
