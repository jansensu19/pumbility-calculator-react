# 🎮 Pump It Up Phoenix 2 - Pumbility & Title Calculator

A fast, responsive web application built with **React 19**, **Tailwind CSS v4**, and **Vite** to calculate and track player **Pumbility** and **Skill Titles** for the arcade rhythm game *Pump It Up Phoenix 2*.

---

## ⚡ Key Features

- **Accurate Phoenix 2 Calculation Engine**:
  - Implements the exact arcade formula:
    $$\text{Pumbility} = \lfloor ((\text{Grade Points} + \text{Plate Bonus}) \times \text{Weight}) \times 100 \rfloor / 100$$
  - Single level offset scaling ($S_{\text{Level}} = D_{\text{Level}+1}$).
  - Exact 2-decimal truncation matching official PIU arcade leaderboards.
- **Top 50 Score Management**:
  - Tracks Top 50 Overall, Top 50 Singles, and Top 50 Doubles.
  - Automatically calculates total rating, average score per chart, and highest clear.
- **Official Title & Rank Progression Ladders**:
  - **Overall Gem Tiers**: Bronze $\rightarrow$ Silver $\rightarrow$ Gold $\rightarrow$ Platinum $\rightarrow$ Diamond 1–5 $\rightarrow$ Red Beryl 1–5 $\rightarrow$ Alexandrite 1–5 $\rightarrow$ Abyss Absolute.
  - **Single & Double Title Ladders**:
    - **Intermediate (Lv.1 – Lv.10)**: 5,000 to 14,000 PB (+1,000 PB per level)
    - **Advanced (Lv.1 – Lv.10)**: 15,000 to 17,250 PB (+250 PB per level)
    - **Expert (Lv.1 – Lv.10)**: 17,500 to 18,900 PB (Lv.1–6 step +200, Lv.6–10 step +100)
    - **The Master**: 19,000+ PB
  - Interactive ladder tracker tabs with remaining PB indicators and progress bars.
- **650+ Song Phoenix 2 Database & Smart Search**:
  - Pre-loaded database including Phoenix 2 charts and classic legacy charts.
  - Punctuation- and typo-tolerant search (e.g. typing `mr lapus` immediately resolves to `Mr. Larpus`).
  - Available chart badges allow 1-click level & mode selection.
- **Data Portability & Offline Persistence**:
  - Automatic browser `localStorage` persistence.
  - One-click **CSV Export** and **CSV Import** for backing up and migrating scores.
- **Cyber-Arcade UI**:
  - Authentic 5-panel PIU arcade stage pad logo.
  - Cyber-arcade dark slate aesthetics with neon glows (cyan, rose, emerald, amber) and arcade plate badges (PG, UG, EG, SG, MG, TG, FG, RG).
- **Automated CI/CD**:
  - GitHub Actions workflow for automated linting, building, and GitHub Pages deployment.

---

## 📐 The Phoenix 2 Pumbility Formula

| Component | Values |
| :--- | :--- |
| **Base Grade Points** | `SSS+`: 375.0, `SSS`: 372.5, `SS+`: 370.0, `SS`: 367.5, `S+`: 365.0, `S`: 362.5, `AAA+`: 357.5, `AAA`: 352.5, `AA+`: 347.5, `AA`: 342.5, `A+`: 337.5, `A`: 330.0 |
| **Plate Bonus** | `PG`: +5.00, `UG`: +4.25 (Single) / +4.00 (Double), `EG`: +3.50, `SG`: +2.00, `MG`: +1.50, `TG`: +1.00, `FG`: +0.50, `RG`: +0.00 |
| **Doubles Weight** | Level 10–24: $0.52 + (0.02 \times \text{Level})$<br>Level 25+: Accelerates $+0.04$ per level (D25=1.04, D26=1.08, D27=1.12, D28=1.16) |
| **Singles Weight** | Shifted +1 level higher ($S_{\text{Level}} = D_{\text{Level}+1}$, e.g. S22 uses D23 weight = 0.98; S23 uses D24 weight = 1.00) |
| **Rounding** | Two decimal places with floor truncation |

---

## 🚀 Quickstart

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation & Development
```bash
# 1. Clone the repository
git clone https://github.com/your-username/pumbility-calculator-react.git
cd pumbility-calculator-react

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run ESLint code checks
npm run lint

# 5. Build for production
npm run build
```

The production assets will be built in the `dist/` directory ready for static hosting.

---

## 📚 Technical Documentation

For an in-depth reference explaining every component, configuration file, utility function, hook, and data flow architecture, see:

👉 [**Full Architecture & Component Documentation (DOCUMENTATION.md)**](./DOCUMENTATION.md)

---

## 🛠 Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment & CI/CD**: GitHub Actions + GitHub Pages

---

## 📄 License

MIT License. Open source and free to use for the Pump It Up arcade rhythm game community.
