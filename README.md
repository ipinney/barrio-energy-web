# Barrio Energy - Website Rebuild

Modern, responsive website for Barrio Energy built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
barrio-energy-web/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Home page
│       └── globals.css     # Global styles
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── .gitignore
```

## 🎨 Design System

### Colors
- **Navy (Primary):** `#1a3a52` - Brand primary color
- **Blue (Accent):** `#3ba9ff` - Call-to-action elements
- **Gray (Secondary):** `#666666` - Text and secondary elements

Colors are configured as Tailwind utilities:
- `bg-barrio-navy`, `text-barrio-navy`
- `bg-barrio-blue`, `text-barrio-blue`
- `bg-barrio-gray`, `text-barrio-gray`

## 🔄 Deployment

### To Vercel

1. Push this repository to GitHub
2. Import project into Vercel
3. Vercel auto-detects Next.js and applies optimal settings
4. Deploy with automatic Git-based CI/CD

### Environment Variables

Create `.env.local` for local development:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📝 Development Notes

### Adding Pages

Create new pages in `src/app/` directory:
```typescript
// src/app/about/page.tsx
export default function About() {
  return <div>About page</div>
}
```

### Styling

Use Tailwind CSS classes directly in JSX. Custom colors available:
```jsx
<div className="bg-barrio-navy text-barrio-blue">
  Styled with Barrio colors
</div>
```

### API Routes (Coming Soon)

API endpoints will be in `src/app/api/` for backend functionality like news feed integration.

## 🔧 Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1
- **Hosting:** Vercel
- **Git:** GitHub (version control)
- **CMS:** MDX + Database (planned)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Dev** - Full-stack developer for Barrio Energy  
Contact: dev@barrioenergy.com
