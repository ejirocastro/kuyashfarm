#  - Farming for a Future

A modern, professional farming website landing page built with Next.js 16, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Modern Design**: Clean, elegant, nature-oriented aesthetic
- **Performance Optimized**: Built with Next.js 16 and Turbopack
- **Type Safe**: Full TypeScript implementation
- **SEO Ready**: Semantic HTML and proper metadata
- **Smooth Animations**: Hover effects and transitions throughout
- **Professional Structure**: Modular, maintainable codebase

## 🎨 Design Highlights

### Color Palette
- Primary Green: `#2d5f3f`
- Secondary Green: `#4a7c59`
- Accent Green: `#6b9d7a`
- Earth Brown: `#8b6f47`
- Cream: `#faf8f5`

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Navbar, Footer
│   └── sections/          # Page sections
├── lib/                   # Utils and constants
├── types/                 # TypeScript definitions
└── public/                # Static assets
```

See [PROJECT_STRUCTURE.md](frontend/PROJECT_STRUCTURE.md) for detailed documentation.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to frontend
cd kuyashfarm/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Built With

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Playfair Display & Inter** - Typography
- **clsx & tailwind-merge** - Class management

## 🎯 Sections

1. **Hero** - Full-screen hero with background image
2. **Stats** - Key metrics grid
3. **Mission** - Two-column mission statement
4. **Services** - Services grid with hover effects
5. **Collaboration** - Full-width collaboration section
6. **Blog** - Blog preview cards
7. **Goals** - Impact metrics
8. **Footer** - Links and social media

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **ESLint**: Next.js recommended config
- **TypeScript**: Strict mode enabled
- **Component Documentation**: JSDoc comments

## 🎨 Customization

### Updating Content

Edit constants in `frontend/lib/constants.ts`:
- Navigation links
- Stats data
- Services information
- Footer links

### Changing Colors

Update CSS variables in `frontend/app/globals.css`:
```css
:root {
  --primary-green: #2d5f3f;
  --secondary-green: #4a7c59;
  /* ... */
}
```

### Adding New Sections

1. Create component in `components/sections/`
2. Import in `app/page.tsx`
3. Add to component tree

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

## ⚡ Performance Features

- Image optimization with Next.js Image
- Font optimization with next/font
- Automatic code splitting
- Turbopack for fast development

## 🔒 Best Practices

✅ Component modularity
✅ TypeScript type safety
✅ Semantic HTML
✅ Accessibility considerations
✅ Consistent naming conventions
✅ Clean code organization
✅ Reusable utilities

## 📄 License

MIT License - feel free to use for your projects

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and structure.

## 📧 Contact

For questions or feedback, reach out to your development team.

---

**Built with ❤️ for sustainable farming**
