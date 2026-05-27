// --- DOM Elements ---
const cardsGrid = document.getElementById("cards-grid");
const filterBar = document.getElementById("filter-bar");
const searchInput = document.getElementById("search-input");
const scrollTopBtn = document.getElementById("scroll-top");
const hamburgerBtn = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const statCards = document.getElementById("stat-cards");
const statCategories = document.getElementById("stat-categories");
const statReact = document.getElementById("stat-react");
const themeToggleBtn = document.getElementById("theme-toggle");

let activeCategory = "all";
let searchQuery = "";

// --- Theme Toggle ---
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    themeToggleBtn.setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
    );
  }
}

// --- Init ---
function init() {
  initTheme();
  renderStats();
  renderFilterButtons();
  renderCards();
  setupEventListeners();
}

// --- Stats ---
function renderStats() {
  statCards.textContent = wisdomData.length;
  statCategories.textContent = categories.length - 1;
  const reactCount = wisdomData.filter((w) => w.tags.includes("react")).length;
  statReact.textContent = reactCount;
}

// --- Filter Buttons ---
function renderFilterButtons() {
  filterBar.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-btn ${cat.id === activeCategory ? "active" : ""}"
            data-category="${cat.id}" id="filter-${cat.id}"
            aria-label="Filter by ${cat.label}" aria-pressed="${cat.id === activeCategory}">
      <span class="emoji">${cat.emoji}</span>${cat.label}
    </button>
  `,
    )
    .join("");
}

// --- Render Cards ---
function renderCards() {
  let filtered = wisdomData;

  if (activeCategory !== "all") {
    filtered = filtered.filter(
      (w) =>
        w.category === activeCategory ||
        (activeCategory === "react" && w.tags.includes("react")),
    );
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.body.toLowerCase().includes(q) ||
        w.tags.some((t) => t.includes(q)),
    );
  }

  if (filtered.length === 0) {
    cardsGrid.innerHTML = `
      <div class="no-results">
        <div class="no-results__icon">🔎</div>
        <p class="no-results__text">No wisdom found. Try a different search or category.</p>
      </div>`;
    return;
  }

  cardsGrid.innerHTML = filtered
    .map((w, i) => {
      const diffClass = `difficulty--${w.difficulty}`;
      const diffLabel =
        w.difficulty.charAt(0).toUpperCase() + w.difficulty.slice(1);

      return `
    <article class="wisdom-card" data-category="${w.category}" style="animation-delay: ${i * 0.05}s">
      <div class="wisdom-card__header">
        <div class="wisdom-card__icon">${w.icon}</div>
        <div>
          <h3 class="wisdom-card__title">${w.title}</h3>
          <div class="wisdom-card__category">${getCategoryLabel(w.category)}</div>
        </div>
      </div>
      <div class="wisdom-card__body">
        <p>${w.body}</p>
        ${w.code ? `<div class="wisdom-card__code"><pre>${w.code}</pre></div>` : ""}
      </div>
      <div class="wisdom-card__tags">
        <span class="difficulty ${diffClass}">${diffLabel}</span>
        ${w.tags.map((t) => `<span class="tag tag--${t}">${t === "react" ? "⚛️ React" : "🌍 General"}</span>`).join("")}
      </div>
    </article>`;
    })
    .join("");
}

function getCategoryLabel(id) {
  const cat = categories.find((c) => c.id === id);
  return cat ? cat.label : id;
}

// --- Event Listeners ---
function setupEventListeners() {
  // Theme toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  // Filter clicks
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    renderFilterButtons();
    renderCards();
  });

  // Search
  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value;
      renderCards();
    }, 250);
  });

  // Scroll to top
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hamburger
  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburgerBtn.textContent = mobileMenu.classList.contains("open")
      ? "✕"
      : "☰";
  });

  // Mobile menu links
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.remove("open");
      hamburgerBtn.textContent = "☰";
    }
  });

  // Nav link active state
  document
    .querySelectorAll(".navbar__links a, .mobile-menu a")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        const category = link.dataset.nav;
        if (category) {
          e.preventDefault();
          activeCategory = category;
          renderFilterButtons();
          renderCards();
          document
            .getElementById("wisdom-section")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    });
}

// --- Start ---
document.addEventListener("DOMContentLoaded", init);
