# Frontend Manual

A curated collection of **practical frontend development knowledge** learned through experience. Real patterns, real pitfalls, and real solutions from shipping products.

![Frontend Manual](https://img.shields.io/badge/Frontend-Manual-8b5cf6?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🎯 What is This?

Frontend Manual is a knowledge base for developers who ship real products. No fluff, no tutorials — just hard-won wisdom about:

- **React patterns** — Components, hooks, performance
- **Data integrity** — How to trust (or not trust) backend data
- **API & Network** — Race conditions, error handling, state
- **State management** — Global state, derived state, syncing
- **Performance** — Optimization techniques that matter
- **CSS & Layout** — Layout systems, responsive design
- **Security** — Common vulnerabilities and how to prevent them
- **Debugging** — Finding and fixing issues fast
- **Architecture** — Larger patterns for scaling
- **UX Engineering** — The human side of development

Each lesson includes a **clear explanation** + **working code examples**.

## 🚀 Quick Start

### View Lessons

1. Open `index.html` in your browser
2. Browse by category or search for topics
3. Click cards to see code examples

### Local Development

```bash
# No build step needed! Just serve the files
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code
# Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000`

## 📝 Contributing

Have a lesson? We'd love it! Here's how:

### 1. Fork & Clone

```bash
git clone https://github.com/divya9936/frontend-manual.git
cd frontend-manual
```

### 2. Add Your Lesson

Edit `data.js` and add to the `wisdomData` array:

```javascript
{
  id: 99,
  category: "react",  // react, performance, data-integrity, etc.
  icon: "⚛️",
  difficulty: "intermediate",  // beginner, intermediate, advanced
  title: "Your Lesson Title",
  body: "Clear explanation (50-100 words)",
  code: `// Example code`,
  tags: ["react", "general"]  // react or general
}
```

### 3. Commit & Push

```bash
git add data.js
git commit -m "Add lesson: Your Lesson Title"
git push origin main
```

### 4. Create a Pull Request

Open a PR on GitHub. We'll review and merge if it fits our guidelines.

### Lesson Guidelines

✅ **Do:**

- Be specific — real lessons from real projects
- Include code — show the problem and solution
- Be practical — actionable, hands-on knowledge
- Be honest — share real experiences
- Be concise — most lessons fit in 50-100 words + code

❌ **Don't:**

- Self-promote — this isn't a marketing platform
- Duplicate — check existing lessons first
- Use outdated tech — focus on current best practices
- Be vague — generic advice isn't helpful

## 📂 Project Structure

```
frontend-manual/
├── index.html          # Main page with lesson grid
├── about.html          # About the project
├── contribute.html     # Contribution guide
├── data.js             # Lesson data
├── script.js           # JavaScript logic
├── styles.css          # Styling
├── README.md           # This file
└── CONTRIBUTING.md     # Detailed contribution guidelines
```

## 🎨 Features

- 🌙 **Dark & Light Mode** — Toggle theme preference
- 🔍 **Search** — Find lessons by keyword
- 🏷️ **Filtering** — Browse by category
- 📱 **Responsive** — Works on mobile, tablet, desktop
- ⚡ **Fast** — Vanilla JS, no framework bloat
- 🎯 **Focused** — Quality over quantity

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, modern layouts
- **Vanilla JavaScript** — No dependencies
- **Font:** Inter (UI), JetBrains Mono (code)

## 📊 Stats

- **Lessons:** See homepage
- **Categories:** 11 (React, Performance, Data Integrity, API & Network, State Management, CSS & Layout, Security, Debugging, Architecture, UX Engineering, + General)
- **Difficulty Levels:** Beginner, Intermediate, Advanced

## 🌐 Live Demo

Visit the live site: [Frontend Manual](https://divya9936.github.io/frontend-manual/)

## 📄 License

MIT — Use, modify, and share freely.

## 💬 Questions?

- Found a bug? [Open an issue](https://github.com/divya9936/frontend-manual/issues)
- Have an idea? [Start a discussion](https://github.com/divya9936/frontend-manual/discussions)
- Want to chat? Reach out on [Twitter/X](https://twitter.com/divya9936)

---

**Built with ❤️ by developers who ship real products.**
