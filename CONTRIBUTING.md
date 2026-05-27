# Contributing to Frontend Manual

Thank you for considering contributing to Frontend Manual! Here's how to add your lesson.

## How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/divya9936/frontend-manual.git
cd frontend-manual
```

### 2. Add Your Lesson

Edit `data.js` and add your lesson to the `wisdomData` array:

```javascript
{
  id: 99,
  category: "react",  // react, performance, data-integrity, api-network, state-management, css-layout, security, debugging, architecture
  icon: "⚛️",         // emoji icon
  difficulty: "intermediate",  // beginner, intermediate, advanced
  title: "Your lesson title",
  body: "Clear explanation (50-100 words) of what to do and why",
  code: `// Bad practice
const bad = () => {...}

// Good practice
const good = () => {...}`,
  tags: ["react", "general"]  // react or general
}
```

### 3. Guidelines

Before submitting, make sure your lesson:

- ✅ Is specific — real lessons from real projects, not generic advice
- ✅ Includes code — shows the problem and the solution
- ✅ Is practical — focuses on actionable, hands-on knowledge
- ✅ Is honest — shares real experiences from your work
- ✅ Is concise — most lessons fit in 50-100 words plus code
- ❌ No self-promotion — this isn't a marketing platform
- ❌ No duplicates — check existing lessons first
- ❌ No outdated tech — focus on current best practices

### 4. Commit & Push

```bash
git add data.js
git commit -m "Add lesson: [Your Lesson Title]"
git push origin main
```

### 5. Create a Pull Request

Go to the GitHub repo and create a PR. Describe your lesson and why it's valuable.

## What Happens Next?

I'll review your PR and either:

- Merge it (your lesson goes live!)
- Request changes
- Discuss improvements

Thank you for contributing! 🎉
