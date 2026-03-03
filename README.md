# CS2 DRINK OR DIE 🎮

A CS2 drinking game web app built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout with Google Fonts
│   └── page.tsx          # Main game orchestrator
├── components/
│   ├── Button.tsx         # Reusable button
│   ├── Modal.tsx          # Modal wrapper
│   ├── Toast.tsx          # Notification toast
│   ├── RulesModal.tsx     # Drinking rules modal
│   ├── ChallengesModal.tsx # Challenge editor modal
│   ├── SetupScreen.tsx    # Player setup
│   ├── SpinningScreen.tsx # Challenge spin phase
│   ├── OverviewScreen.tsx # Card reveal phase
│   ├── GuessingScreen.tsx # Guessing round
│   └── ScoreboardScreen.tsx # Final results
├── lib/
│   └── data.ts            # Default challenges + constants
└── types/
    └── game.ts            # TypeScript interfaces
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** (Bebas Neue, Share Tech Mono, Barlow)
