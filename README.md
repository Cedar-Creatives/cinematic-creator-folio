# Barony — Cinematic Creator Portfolio

A cinematic single-page portfolio for **Dauda Yakubu (Barony)** — Content Creator, Video Editor & Graphic Designer based in Nigeria.

Live at: [Cedar-Creatives/cinematic-creator-folio](https://github.com/Cedar-Creatives/cinematic-creator-folio)

---

## About

This portfolio showcases Barony's work across video editing, motion graphics, and graphic design. It features real project links (YouTube, TikTok, Instagram), graphic design visuals, and a full contact/social section.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Phosphor Icons

---

## Features

- **Cinematic Hero** — dark full-screen intro with amber gradient and grain overlay
- **About Section** — bio, avatar, location, skills with animated fill bars
- **Services** — Video Editing, Motion Graphics, Graphic Design, Color Grading
- **Portfolio Grid** — filterable by category (Video / Graphic), with YouTube auto-embeds in modal and external play links for TikTok / Instagram
- **Testimonials** — client quotes
- **Contact** — email, phone, and live social links (Instagram, YouTube, TikTok, Facebook, X)
- **Scroll-spy Navbar** — active section indicator with animated underline
- **Fully responsive** — mobile hamburger menu included

---

## Getting Started

**Install dependencies**
```bash
npm install
```

**Start development server**
```bash
npm run dev
```
Opens at `http://localhost:3000`

**Build for production**
```bash
npm run build
```

**Preview production build**
```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── ProjectModal.tsx     # Video embed + project detail overlay
│   └── ui/                  # shadcn/ui primitives (scaffolded)
├── data/
│   └── portfolioData.ts     # All content — projects, skills, services, socials
├── types.ts                 # TypeScript interfaces
├── App.tsx                  # Full page — all sections & layout
├── index.css                # Tailwind v4 config + dark amber theme
└── main.tsx                 # Entry point
public/
├── b1.jpg – b7.jpg          # Graphic design visuals + avatar/hero image
└── favicon.ico
```

---

## Content Updates

All editable content lives in one file: [`src/data/portfolioData.ts`](src/data/portfolioData.ts)

| Export | What it controls |
|---|---|
| `PERSONAL_INFO` | Name, bio, email, phone, location, avatar, resume URL |
| `projects` | Portfolio items — title, category, thumbnail, mediaUrl, tags |
| `skills` | Tool names, categories, proficiency levels |
| `services` | Service cards shown in the Services section |
| `testimonials` | Client quotes |
| `socialLinks` | Platform URLs for the Contact section |

---

## Social & Contact

| Platform | Link |
|---|---|
| Instagram | [@iam_barony1](https://www.instagram.com/iam_barony1) |
| YouTube | [@iam_barony](https://youtube.com/@iam_barony) |
| TikTok | [iam_barony](https://vm.tiktok.com/ZS9hrJ88qb6SN-gTbZx/) |
| Facebook | [Barony](https://www.facebook.com/share/1Bp2ER6qo9/) |
| X / Twitter | [@Baronyagain](https://x.com/Baronyagain) |
| Email | yakubuimakhu@gmail.com |

---

&copy; 2024 Dauda Yakubu (Barony). All rights reserved.
