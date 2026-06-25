# Rampsaay Consulting

> **Quiet expertise for loud transformations.**

A modern, fully animated consulting website built with **Vite + React + TypeScript** and **GSAP** for smooth, professional animations.

---

## ✨ Features

- **GSAP page-load wipe** — rust-coloured full-screen overlay slides away on entry
- **Staggered hero animations** — badge, heading, paragraph, buttons, and quote card animate in sequence
- **ScrollTrigger** — services and contact sections animate as you scroll
- **"Get in touch" CTA** — smoothly scrolls to the Contact section with GSAP
- **Pure CSS design** — no images, warm cream & rust palette, glassmorphism navbar
- **Fully responsive** — mobile-friendly layouts
- **TypeScript** — zero type errors

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Navbar.tsx / Navbar.css     # Fixed glassmorphism nav + CTA
│   ├── Hero.tsx   / Hero.css       # Hero section with quote card
│   ├── Services.tsx / Services.css # Three discipline cards
│   └── Contact.tsx  / Contact.css  # Email & phone contact cards
├── utils/
│   └── scroll.ts                   # GSAP-enhanced smooth scroll utility
├── App.tsx / App.css               # Root component + page-load overlay
├── main.tsx                        # Entry point
└── index.css                       # Global design tokens & resets
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Dev server runs at **http://localhost:5173/**

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [GSAP](https://gsap.com/) | Animations & ScrollTrigger |
| Vanilla CSS | Styling (no Tailwind) |

---

## 📄 License

© 2025 Rampsaay Consulting. All rights reserved.
