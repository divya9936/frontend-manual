const wisdomData = [
  {
    id: 1, category: "data-integrity", icon: "🛡️", difficulty: "beginner",
    title: "Empty Is Better Than Fake",
    body: "When the backend doesn't send a value, show nothing — don't invent placeholder data. Displaying \"N/A\", an empty string, or a dash is always safer than showing a wrong default like \"0\" or \"Unknown\". Fake data erodes user trust.",
    code: `<span class="code-comment">// ❌ Bad — inventing data</span>\n<span class="code-bad">const userName = user.name || "John Doe";</span>\n\n<span class="code-comment">// ✅ Good — be honest about missing data</span>\n<span class="code-good">const userName = user.name || "—";</span>`,
    tags: ["react", "general"]
  },
  {
    id: 2, category: "data-integrity", icon: "🛡️", difficulty: "beginner",
    title: "Never Trust the API Response Shape",
    body: "APIs change. Fields get renamed, nested objects become null, arrays come back as undefined. Always use optional chaining and fallbacks. One missing field shouldn't crash your entire page.",
    code: `<span class="code-comment">// ❌ Will crash if address is null</span>\n<span class="code-bad">const city = user.address.city;</span>\n\n<span class="code-comment">// ✅ Safe access</span>\n<span class="code-good">const city = user?.address?.city ?? "—";</span>`,
    tags: ["general"]
  },
  {
    id: 3, category: "data-integrity", icon: "🛡️", difficulty: "intermediate",
    title: "Normalize Backend Data at the Boundary",
    body: "Create a single transformation layer where API data enters your app. Don't sprinkle data-fixing logic across 15 components. One adapter function per API entity keeps your components clean and your bugs in one place.",
    code: `<span class="code-comment">// ✅ Single normalization point</span>\n<span class="code-good">function normalizeUser(raw) {\n  return {\n    id: raw.id,\n    name: raw.name?.trim() || "—",\n    email: raw.email?.toLowerCase() || null,\n    avatar: raw.profile_pic || raw.avatar || null,\n  };\n}</span>`,
    tags: ["general"]
  },
  {
    id: 4, category: "api-network", icon: "🌐", difficulty: "beginner",
    title: "Always Handle All 3 States",
    body: "Every API call has three states: loading, success, and error. Most beginners only code the success state. Your users will see broken UIs, empty screens, and infinite spinners if you skip the other two.",
    code: `<span class="code-comment">// ✅ Handle all states</span>\n<span class="code-good">if (isLoading) return &lt;Skeleton /&gt;;\nif (error) return &lt;ErrorCard msg={error} /&gt;;\nif (!data?.length) return &lt;EmptyState /&gt;;\nreturn &lt;UserList users={data} /&gt;;</span>`,
    tags: ["react", "general"]
  },
  {
    id: 5, category: "api-network", icon: "🌐", difficulty: "intermediate",
    title: "Race Conditions Are Silent Killers",
    body: "User clicks tab A, then quickly clicks tab B. Tab A's slow response arrives AFTER tab B's fast response. Now tab B shows tab A's data. This happens way more than you think. Always cancel outdated requests.",
    code: `<span class="code-comment">// ✅ AbortController in useEffect</span>\n<span class="code-good">useEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData)\n    .catch(e => {\n      if (e.name !== 'AbortError') setError(e);\n    });\n  return () => controller.abort();\n}, [url]);</span>`,
    tags: ["react"]
  },
  {
    id: 6, category: "api-network", icon: "🌐", difficulty: "beginner",
    title: "Don't Show Raw Error Messages to Users",
    body: "\"TypeError: Cannot read properties of undefined\" means nothing to your user. Map technical errors to human-friendly messages. Log the real error to your monitoring tool.",
    code: `<span class="code-comment">// ❌ Scary for users</span>\n<span class="code-bad">&lt;p&gt;{error.message}&lt;/p&gt;</span>\n\n<span class="code-comment">// ✅ User-friendly</span>\n<span class="code-good">&lt;p&gt;Something went wrong. Please try again.&lt;/p&gt;\n{/* Log actual error to Sentry/DataDog */}</span>`,
    tags: ["general"]
  },
  {
    id: 7, category: "state-management", icon: "⚡", difficulty: "intermediate",
    title: "Don't Sync State — Derive It",
    body: "If you can calculate a value from existing state, don't store it in another useState. Two sources of truth = two chances to be wrong. Derived values should be computed inline or memoized.",
    code: `<span class="code-comment">// ❌ Synced state — will go out of sync</span>\n<span class="code-bad">const [items, setItems] = useState([]);\nconst [count, setCount] = useState(0);\n// You'll forget to update count somewhere</span>\n\n<span class="code-comment">// ✅ Derived — always correct</span>\n<span class="code-good">const [items, setItems] = useState([]);\nconst count = items.length; // auto-correct</span>`,
    tags: ["react"]
  },
  {
    id: 8, category: "state-management", icon: "⚡", difficulty: "beginner",
    title: "URL Is State Too",
    body: "Filters, pagination, search queries, active tabs — these belong in the URL, not just in useState. If a user can't share the link and see the same view, your state management is broken.",
    code: `<span class="code-comment">// ❌ Lost on refresh or share</span>\n<span class="code-bad">const [page, setPage] = useState(1);\nconst [search, setSearch] = useState("");</span>\n\n<span class="code-comment">// ✅ Survives refresh & sharing</span>\n<span class="code-good">const searchParams = useSearchParams();\nconst page = Number(searchParams.get("page")) || 1;\nconst search = searchParams.get("q") || "";</span>`,
    tags: ["react", "general"]
  },
  {
    id: 9, category: "state-management", icon: "⚡", difficulty: "intermediate",
    title: "Not Everything Belongs in Global State",
    body: "New devs throw everything into Redux/Context. A modal's open/close state, a form input, a dropdown selection — these are LOCAL state. Global state is for data shared across unrelated components. Start local, promote to global only when needed.",
    tags: ["react"]
  },
  {
    id: 10, category: "performance", icon: "🚀", difficulty: "intermediate",
    title: "Re-renders Aren't Evil — Unnecessary Ones Are",
    body: "React re-rendering a component is normal and cheap. The problem is when it re-renders 50 child components because you passed a new object/array/function reference every render. Understand referential equality.",
    code: `<span class="code-comment">// ❌ New object every render = child re-renders</span>\n<span class="code-bad">&lt;Child style={{ color: "red" }} /&gt;</span>\n\n<span class="code-comment">// ✅ Stable reference</span>\n<span class="code-good">const style = useMemo(() => ({ color: "red" }), []);\n&lt;Child style={style} /&gt;</span>`,
    tags: ["react"]
  },
  {
    id: 11, category: "performance", icon: "🚀", difficulty: "beginner",
    title: "Keys in Lists Aren't Just to Shut Up Warnings",
    body: "React uses keys to track which items changed, were added, or removed. Using array index as key causes bugs: reordering breaks, inputs lose values, animations glitch. Use a unique, stable ID.",
    code: `<span class="code-comment">// ❌ Index as key — breaks on reorder</span>\n<span class="code-bad">{items.map((item, i) => &lt;Card key={i} /&gt;)}</span>\n\n<span class="code-comment">// ✅ Stable unique key</span>\n<span class="code-good">{items.map(item => &lt;Card key={item.id} /&gt;)}</span>`,
    tags: ["react"]
  },
  {
    id: 12, category: "performance", icon: "🚀", difficulty: "advanced",
    title: "Debounce Search, Throttle Scroll",
    body: "Debounce waits until the user STOPS typing, then fires once. Throttle fires at regular intervals while action continues. Search input = debounce (wait 300ms after last keystroke). Scroll handler = throttle (fire every 100ms max).",
    tags: ["general"]
  },
  {
    id: 13, category: "css-layout", icon: "🎨", difficulty: "beginner",
    title: "100vh Is Broken on Mobile",
    body: "On mobile browsers, 100vh includes the address bar area, causing content to hide behind it. Use 100dvh (dynamic viewport height) instead, or set min-height with a fallback.",
    code: `<span class="code-comment">/* ❌ Overflows on mobile */</span>\n<span class="code-bad">.hero { height: 100vh; }</span>\n\n<span class="code-comment">/* ✅ Respects mobile browser chrome */</span>\n<span class="code-good">.hero {\n  height: 100dvh;\n  /* Fallback */\n  height: -webkit-fill-available;\n}</span>`,
    tags: ["general"]
  },
  {
    id: 14, category: "css-layout", icon: "🎨", difficulty: "intermediate",
    title: "z-index Doesn't Work How You Think",
    body: "z-index only works within a stacking context. A child with z-index: 9999 still can't escape a parent with z-index: 1 if the parent creates a new stacking context. Things that create stacking contexts: opacity < 1, transform, filter, position: fixed.",
    tags: ["general"]
  },
  {
    id: 15, category: "css-layout", icon: "🎨", difficulty: "beginner",
    title: "Don't Use Pixels for Font Sizes",
    body: "px ignores user accessibility settings. If someone sets their browser to large fonts, your px sizes won't scale. Use rem for fonts (relative to root) and em for spacing relative to parent font-size.",
    code: `<span class="code-comment">/* ❌ Ignores user preferences */</span>\n<span class="code-bad">h1 { font-size: 32px; }</span>\n\n<span class="code-comment">/* ✅ Respects accessibility settings */</span>\n<span class="code-good">h1 { font-size: 2rem; }</span>`,
    tags: ["general"]
  },
  {
    id: 16, category: "react", icon: "⚛️", difficulty: "intermediate",
    title: "useEffect Is Not componentDidMount",
    body: "useEffect runs AFTER render, not before. It runs on every render by default. It's for synchronizing with external systems (APIs, DOM, timers), NOT for transforming data. If you're setting state inside useEffect based on props — you probably don't need an effect.",
    code: `<span class="code-comment">// ❌ Unnecessary effect</span>\n<span class="code-bad">const [fullName, setFullName] = useState("");\nuseEffect(() => {\n  setFullName(first + " " + last);\n}, [first, last]);</span>\n\n<span class="code-comment">// ✅ Just compute it</span>\n<span class="code-good">const fullName = first + " " + last;</span>`,
    tags: ["react"]
  },
  {
    id: 17, category: "react", icon: "⚛️", difficulty: "intermediate",
    title: "Refs Don't Cause Re-renders — That's the Point",
    body: "useRef gives you a mutable container that persists across renders WITHOUT triggering re-renders when changed. Use it for DOM elements, interval IDs, previous values, or any value you need to track but don't want to trigger UI updates for.",
    tags: ["react"]
  },
  {
    id: 18, category: "react", icon: "⚛️", difficulty: "beginner",
    title: "Controlled vs Uncontrolled — Pick One",
    body: "A controlled input gets its value from React state. An uncontrolled input manages its own state via the DOM. Mixing them (setting value without onChange, or defaultValue with state) causes bugs. Pick one pattern per input and stick to it.",
    tags: ["react"]
  },
  {
    id: 19, category: "react", icon: "⚛️", difficulty: "advanced",
    title: "Children as Props Is a Performance Win",
    body: "When you pass JSX as children, those children are created in the parent scope. When the wrapper component re-renders, the children DON'T re-render if their props haven't changed — because they were created outside.",
    code: `<span class="code-comment">// ✅ ExpensiveChild won't re-render\n//    when Wrapper's state changes</span>\n<span class="code-good">&lt;Wrapper&gt;\n  &lt;ExpensiveChild /&gt;\n&lt;/Wrapper&gt;</span>\n\n<span class="code-comment">// ❌ ExpensiveChild re-renders every time</span>\n<span class="code-bad">function Wrapper() {\n  const [count, setCount] = useState(0);\n  return &lt;ExpensiveChild /&gt;; // re-created\n}</span>`,
    tags: ["react"]
  },
  {
    id: 20, category: "debugging", icon: "🔍", difficulty: "beginner",
    title: "console.log Is Just the Beginning",
    body: "console.table() for arrays/objects, console.group() to organize logs, console.time() to measure performance, console.trace() to find who called a function. These save hours of debugging.",
    code: `<span class="code-good">console.table(users);        // Pretty table\nconsole.group("API Call");   // Collapsible group\nconsole.time("render");      // Start timer\nconsole.timeEnd("render");   // End timer\nconsole.trace("Called by");  // Stack trace</span>`,
    tags: ["general"]
  },
  {
    id: 21, category: "debugging", icon: "🔍", difficulty: "beginner",
    title: "The Network Tab Is Your Best Friend",
    body: "Before blaming your code, check the Network tab. Is the API even being called? What's the response status? What data came back? Is CORS blocking it? 80% of 'my code isn't working' bugs are actually API/network issues.",
    tags: ["general"]
  },
  {
    id: 22, category: "security", icon: "🔒", difficulty: "intermediate",
    title: "dangerouslySetInnerHTML Means Dangerous",
    body: "If you render user-supplied HTML without sanitization, anyone can inject scripts that steal cookies, redirect users, or worse. Always sanitize with a library like DOMPurify before rendering raw HTML.",
    code: `<span class="code-comment">// ❌ XSS vulnerability</span>\n<span class="code-bad">&lt;div dangerouslySetInnerHTML=\n  {{ __html: userComment }} /&gt;</span>\n\n<span class="code-comment">// ✅ Sanitized</span>\n<span class="code-good">import DOMPurify from "dompurify";\n&lt;div dangerouslySetInnerHTML=\n  {{ __html: DOMPurify.sanitize(userComment) }} /&gt;</span>`,
    tags: ["react"]
  },
  {
    id: 23, category: "security", icon: "🔒", difficulty: "beginner",
    title: "localStorage Is Not a Safe",
    body: "Never store tokens, passwords, or sensitive data in localStorage. Any JavaScript on the page (including third-party scripts) can read it. Use httpOnly cookies for auth tokens — they can't be accessed via JS.",
    tags: ["general"]
  },
  {
    id: 24, category: "architecture", icon: "🏗️", difficulty: "intermediate",
    title: "Colocate Files by Feature, Not by Type",
    body: "Don't put all components in /components, all hooks in /hooks, all utils in /utils. Put everything related to 'user profile' in /features/user-profile. Finding code should be like looking in a filing cabinet, not a scavenger hunt.",
    code: `<span class="code-comment">// ❌ Hunting across folders</span>\n<span class="code-bad">src/components/UserCard.jsx\nsrc/hooks/useUser.js\nsrc/utils/formatUser.js\nsrc/styles/user.css</span>\n\n<span class="code-comment">// ✅ Everything together</span>\n<span class="code-good">src/features/user/\n  ├── UserCard.jsx\n  ├── useUser.js\n  ├── formatUser.js\n  └── user.css</span>`,
    tags: ["react", "general"]
  },
  {
    id: 25, category: "architecture", icon: "🏗️", difficulty: "intermediate",
    title: "A Component Should Do One Thing",
    body: "If your component file is 400+ lines, it's doing too much. Extract sub-components, custom hooks, and utility functions. A component should be easy to read top-to-bottom without scrolling forever.",
    tags: ["react"]
  },
  {
    id: 26, category: "ux-engineering", icon: "✨", difficulty: "intermediate",
    title: "Optimistic Updates Make Apps Feel Instant",
    body: "Don't wait for the server to confirm before updating the UI. Update immediately, then roll back if the server says no. Like/unlike, add to cart, toggle settings — all should feel instant.",
    code: `<span class="code-comment">// ✅ Optimistic update pattern</span>\n<span class="code-good">const handleLike = async () => {\n  setLiked(true);  // Instant UI feedback\n  try {\n    await api.likePost(id);\n  } catch {\n    setLiked(false); // Rollback on failure\n    toast.error("Couldn't like post");\n  }\n};</span>`,
    tags: ["react", "general"]
  },
  {
    id: 27, category: "ux-engineering", icon: "✨", difficulty: "beginner",
    title: "Skeleton Screens > Spinners",
    body: "Spinners tell users 'wait, something is happening.' Skeleton screens tell users 'content is coming and it will look like THIS.' Skeletons feel faster because the brain starts processing the layout early.",
    tags: ["general"]
  },
  {
    id: 28, category: "ux-engineering", icon: "✨", difficulty: "beginner",
    title: "Disable Buttons After Click",
    body: "If a user clicks 'Submit Order' and nothing happens for 2 seconds, they'll click again. Now you have duplicate orders. Always disable the button and show a loading state during async operations.",
    code: `<span class="code-good">&lt;button\n  onClick={handleSubmit}\n  disabled={isSubmitting}\n&gt;\n  {isSubmitting ? "Submitting..." : "Submit"}\n&lt;/button&gt;</span>`,
    tags: ["react", "general"]
  },
  {
    id: 29, category: "react", icon: "⚛️", difficulty: "advanced",
    title: "Closures Bite in Event Handlers & Timers",
    body: "State inside setTimeout, setInterval, or event listeners captures the value AT THE TIME it was created, not the latest value. This is the 'stale closure' problem. Use refs or functional updates to get around it.",
    code: `<span class="code-comment">// ❌ Stale closure — always logs old count</span>\n<span class="code-bad">useEffect(() => {\n  const id = setInterval(() => {\n    console.log(count); // Always 0!\n  }, 1000);\n  return () => clearInterval(id);\n}, []);</span>\n\n<span class="code-comment">// ✅ Ref always has latest value</span>\n<span class="code-good">const countRef = useRef(count);\ncountRef.current = count;\nuseEffect(() => {\n  const id = setInterval(() => {\n    console.log(countRef.current); // Fresh!\n  }, 1000);\n  return () => clearInterval(id);\n}, []);</span>`,
    tags: ["react"]
  },
  {
    id: 30, category: "react", icon: "⚛️", difficulty: "intermediate",
    title: "Don't Fetch in useEffect for Production Apps",
    body: "Raw useEffect + fetch has no caching, no deduplication, no retry, no race condition handling. Use React Query (TanStack Query) or SWR. They solve all of this out of the box and your code becomes 10x cleaner.",
    code: `<span class="code-comment">// ❌ Reinventing the wheel</span>\n<span class="code-bad">const [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);\nconst [error, setError] = useState(null);\nuseEffect(() => { /* 20 lines */ }, []);</span>\n\n<span class="code-comment">// ✅ One line with React Query</span>\n<span class="code-good">const { data, isLoading, error } =\n  useQuery(["users"], fetchUsers);</span>`,
    tags: ["react"]
  },
  {
    id: 31, category: "api-network", icon: "🌐", difficulty: "intermediate",
    title: "CORS Is Not a Security Feature",
    body: "CORS doesn't protect your API — it protects the USER's browser. Your API is still callable from Postman, curl, or any server. CORS just prevents random websites from making requests using your user's cookies. Don't rely on it for security.",
    tags: ["general"]
  },
  {
    id: 32, category: "performance", icon: "🚀", difficulty: "intermediate",
    title: "Lazy Load What's Not Visible",
    body: "Don't load the entire app upfront. Route-level code splitting with React.lazy() means users only download the code they need. Below-the-fold images should use loading='lazy'. Import heavy libraries dynamically.",
    code: `<span class="code-comment">// ✅ Route-level code splitting</span>\n<span class="code-good">const Dashboard = lazy(\n  () => import("./pages/Dashboard")\n);\n\n// ✅ Lazy image\n&lt;img src={url} loading="lazy" alt="..." /&gt;</span>`,
    tags: ["react"]
  },
  {
    id: 33, category: "debugging", icon: "🔍", difficulty: "intermediate",
    title: "React DevTools Profiler Will Change Your Life",
    body: "Stop guessing why your app is slow. The React DevTools Profiler shows you exactly which components re-rendered, why they re-rendered, and how long each render took. It's like X-ray vision for performance.",
    tags: ["react"]
  },
  {
    id: 34, category: "ux-engineering", icon: "✨", difficulty: "intermediate",
    title: "Handle the Empty State With Care",
    body: "An empty dashboard after first login is depressing. Show helpful content: a getting started guide, sample data, or clear CTAs. An empty state is a teaching moment, not a dead end.",
    tags: ["general"]
  },
  {
    id: 35, category: "css-layout", icon: "🎨", difficulty: "intermediate",
    title: "Use min() max() clamp() for Fluid Design",
    body: "Stop writing 10 media queries. clamp(min, preferred, max) gives you fluid sizing in one line. Font sizes, padding, widths — all can scale smoothly between breakpoints without a single @media rule.",
    code: `<span class="code-comment">/* ❌ Multiple breakpoints */</span>\n<span class="code-bad">h1 { font-size: 1.5rem; }\n@media (min-width: 768px) { h1 { font-size: 2rem; } }\n@media (min-width: 1024px) { h1 { font-size: 3rem; } }</span>\n\n<span class="code-comment">/* ✅ One fluid line */</span>\n<span class="code-good">h1 { font-size: clamp(1.5rem, 4vw, 3rem); }</span>`,
    tags: ["general"]
  },
  {
    id: 36, category: "architecture", icon: "🏗️", difficulty: "advanced",
    title: "Abstract What Changes, Not What's Similar",
    body: "Don't create a 'generic' component because two things LOOK similar. Abstract when two things BEHAVE the same way and will change for the same reasons. Premature abstraction is worse than duplication.",
    tags: ["general"]
  },

  // ======== .ENV & CONFIG ========
  {
    id: 37, category: "env-config", icon: "🔐", difficulty: "beginner",
    title: ".env Files Are NOT Secret on the Frontend",
    body: "In React/Vite/Next.js, environment variables are injected at BUILD TIME into the JavaScript bundle. Anyone can open DevTools and see them. Never put API secrets, database passwords, or private keys in frontend .env files. They are only for public config like API base URLs.",
    code: `<span class="code-comment">// ❌ NEVER do this in frontend .env</span>\n<span class="code-bad">REACT_APP_DB_PASSWORD=super_secret\nREACT_APP_STRIPE_SECRET_KEY=sk_live_xxx</span>\n\n<span class="code-comment">// ✅ Only public values</span>\n<span class="code-good">REACT_APP_API_URL=https://api.myapp.com\nREACT_APP_GOOGLE_MAPS_KEY=pk_public_xxx</span>`,
    tags: ["react", "general"]
  },
  {
    id: 38, category: "env-config", icon: "🔐", difficulty: "beginner",
    title: "REACT_APP_ Prefix Is Required in CRA",
    body: "In Create React App, env variables MUST start with REACT_APP_ or they're silently ignored. In Vite it's VITE_. In Next.js it's NEXT_PUBLIC_. Every framework has its own prefix — check the docs or spend 2 hours wondering why your variable is undefined.",
    code: `<span class="code-comment">// .env in Create React App</span>\n<span class="code-bad">API_URL=https://api.com   // ❌ Ignored!</span>\n<span class="code-good">REACT_APP_API_URL=https://api.com  // ✅</span>\n\n<span class="code-comment">// .env in Vite</span>\n<span class="code-good">VITE_API_URL=https://api.com  // ✅</span>\n\n<span class="code-comment">// .env in Next.js (client-side)</span>\n<span class="code-good">NEXT_PUBLIC_API_URL=https://api.com  // ✅</span>`,
    tags: ["react"]
  },
  {
    id: 39, category: "env-config", icon: "🔐", difficulty: "beginner",
    title: ".env.local Should Be in .gitignore",
    body: "Your .env.local file contains values specific to YOUR machine or has sensitive keys. If you commit it, everyone on the team gets your config (or worse — your keys leak on GitHub). Always gitignore it and provide a .env.example with placeholder values.",
    code: `<span class="code-comment"># .gitignore</span>\n<span class="code-good">.env.local\n.env.development.local\n.env.production.local</span>\n\n<span class="code-comment"># .env.example (commit this!)</span>\n<span class="code-good">REACT_APP_API_URL=your_api_url_here\nREACT_APP_MAPS_KEY=your_maps_key_here</span>`,
    tags: ["general"]
  },
  {
    id: 40, category: "env-config", icon: "🔐", difficulty: "intermediate",
    title: "You Must Restart the Dev Server After Changing .env",
    body: "Environment variables are read at BUILD time, not runtime. Changing a .env value while the dev server is running won't take effect. You MUST restart the server. This trips up every developer at least once.",
    tags: ["react", "general"]
  },
  {
    id: 41, category: "env-config", icon: "🔐", difficulty: "intermediate",
    title: ".env Priority Order Matters",
    body: "React/Vite loads multiple .env files with a priority order. .env.local overrides .env, and .env.development overrides .env for dev builds. Understanding this prevents 'it works on my machine' bugs.",
    code: `<span class="code-comment">// Priority (highest to lowest):</span>\n<span class="code-good">.env.development.local  // Dev, your machine\n.env.local              // All envs, your machine\n.env.development        // Dev, everyone\n.env                    // All envs, everyone</span>\n\n<span class="code-comment">// For production builds:</span>\n<span class="code-good">.env.production.local\n.env.local\n.env.production\n.env</span>`,
    tags: ["react", "general"]
  },

  // ======== GIT & WORKFLOW ========
  {
    id: 42, category: "env-config", icon: "🔐", difficulty: "beginner",
    title: "Git Tracks Files Forever — Even Deleted Ones",
    body: "If you accidentally commit a secret and then delete it in the next commit, it's still in your Git history. Anyone can see it. You need to use git filter-branch or BFG Repo-Cleaner to purge it. Better yet: never commit secrets.",
    tags: ["general"]
  },
  {
    id: 43, category: "env-config", icon: "🔐", difficulty: "intermediate",
    title: "package.json vs package-lock.json — Know the Difference",
    body: "package.json says 'I need React ^18.0.0' (any 18.x). package-lock.json says 'I installed React 18.2.1 specifically.' Always commit package-lock.json — it ensures everyone on the team gets the EXACT same versions. Without it, 'works on my machine' is guaranteed.",
    tags: ["general"]
  },
  {
    id: 44, category: "env-config", icon: "🔐", difficulty: "beginner",
    title: "node_modules Should NEVER Be Committed",
    body: "node_modules can be 500MB+ with thousands of files. It's generated from package.json. Always add it to .gitignore. If someone asks for your project, they run 'npm install' — that's it.",
    code: `<span class="code-comment"># .gitignore — bare minimum</span>\n<span class="code-good">node_modules/\n.env.local\n.DS_Store\nbuild/\ndist/</span>`,
    tags: ["general"]
  },

  // ======== MORE FRESHER KNOWLEDGE ========
  {
    id: 45, category: "debugging", icon: "🔍", difficulty: "beginner",
    title: "Read the Error Message — Actually Read It",
    body: "Most beginners see red text and panic. Error messages tell you EXACTLY what's wrong and often which file and line number. 'Cannot read property X of undefined' means the thing BEFORE .X is undefined. Start there.",
    tags: ["general"]
  },
  {
    id: 46, category: "debugging", icon: "🔍", difficulty: "beginner",
    title: "Google the Error Message, Not Your Problem",
    body: "Don't Google 'React not working.' Copy-paste the exact error message (minus your file paths). Someone on StackOverflow has had the exact same error. The more specific your search, the faster the fix.",
    tags: ["general"]
  },
  {
    id: 47, category: "architecture", icon: "🏗️", difficulty: "beginner",
    title: "Don't Install a Library for Everything",
    body: "Need to format a date? Maybe you don't need moment.js (80KB). Intl.DateTimeFormat is built into the browser. Need a UUID? crypto.randomUUID() exists. Check if the browser already does what you need before adding 50KB to your bundle.",
    code: `<span class="code-comment">// ❌ Adding a 70KB library</span>\n<span class="code-bad">import moment from "moment";\nmoment().format("MMM DD");</span>\n\n<span class="code-comment">// ✅ Built into the browser (0KB)</span>\n<span class="code-good">new Intl.DateTimeFormat("en", {\n  month: "short", day: "2-digit"\n}).format(new Date());</span>`,
    tags: ["general"]
  },
  {
    id: 48, category: "security", icon: "🔒", difficulty: "beginner",
    title: "Don't Put Secrets in Frontend Code",
    body: "Your React/JS code is sent to the browser as plain text. Minification is NOT encryption. Anyone can open DevTools > Sources and read your code. API keys, passwords, and secrets must live on the backend.",
    tags: ["react", "general"]
  },
  {
    id: 49, category: "ux-engineering", icon: "✨", difficulty: "beginner",
    title: "Always Show Feedback for User Actions",
    body: "User clicked a button? Show a loading indicator. Form submitted? Show a success message. Something failed? Show an error toast. Silence after a user action feels broken. Every action deserves a reaction.",
    tags: ["general"]
  },
  {
    id: 50, category: "css-layout", icon: "🎨", difficulty: "beginner",
    title: "Flexbox Gap > Margin Hacks",
    body: "Stop using margin-right on every child except :last-child. Use 'gap' in Flexbox and Grid. It handles spacing between items automatically, doesn't affect the first/last item, and is way cleaner.",
    code: `<span class="code-comment">/* ❌ Margin hacks */</span>\n<span class="code-bad">.item { margin-right: 16px; }\n.item:last-child { margin-right: 0; }</span>\n\n<span class="code-comment">/* ✅ Clean and simple */</span>\n<span class="code-good">.container {\n  display: flex;\n  gap: 16px;\n}</span>`,
    tags: ["general"]
  },
  {
    id: 51, category: "react", icon: "⚛️", difficulty: "beginner",
    title: "setState Is Asynchronous — Don't Read It Immediately",
    body: "After calling setState, the state doesn't update on the very next line. React batches updates. If you need to do something with the new value, use useEffect to react to state changes, or use the functional form of setState.",
    code: `<span class="code-comment">// ❌ count is still the old value</span>\n<span class="code-bad">setCount(count + 1);\nconsole.log(count); // Still old value!</span>\n\n<span class="code-comment">// ✅ Use functional update for consecutive</span>\n<span class="code-good">setCount(prev => prev + 1);\nsetCount(prev => prev + 1); // Actually +2</span>`,
    tags: ["react"]
  },
  {
    id: 52, category: "react", icon: "⚛️", difficulty: "beginner",
    title: "Stop Prop Drilling — Use Context or Composition",
    body: "Passing props through 5 levels of components that don't use them is called prop drilling. It makes code fragile. Use React Context for truly global data, or restructure with component composition (passing components as props/children).",
    tags: ["react"]
  },
  {
    id: 53, category: "performance", icon: "🚀", difficulty: "beginner",
    title: "Images Are Usually Your Biggest Performance Problem",
    body: "A single unoptimized PNG can be 5MB. Compress images (TinyPNG, Squoosh), use modern formats (WebP, AVIF), specify width and height to prevent layout shift, and always use loading='lazy' for off-screen images.",
    code: `<span class="code-comment">// ✅ Optimized image</span>\n<span class="code-good">&lt;img\n  src="photo.webp"\n  alt="Description"\n  width="400"\n  height="300"\n  loading="lazy"\n/&gt;</span>`,
    tags: ["general"]
  },
  {
    id: 54, category: "api-network", icon: "🌐", difficulty: "beginner",
    title: "HTTP Status Codes You Must Know",
    body: "200 = Success. 201 = Created. 400 = You sent bad data. 401 = Not logged in. 403 = Logged in but not allowed. 404 = Doesn't exist. 500 = Server broke. Knowing these helps you debug API issues in seconds instead of hours.",
    tags: ["general"]
  },
  {
    id: 55, category: "architecture", icon: "🏗️", difficulty: "beginner",
    title: "Name Things by What They DO, Not What They ARE",
    body: "handleSubmit is better than onClick. formatCurrency is better than helper. fetchUserProfile is better than getData. Good names eliminate the need for comments and make code self-documenting.",
    code: `<span class="code-comment">// ❌ Vague names</span>\n<span class="code-bad">const data = getData();\nconst result = process(data);\nconst x = format(result);</span>\n\n<span class="code-comment">// ✅ Self-documenting</span>\n<span class="code-good">const users = fetchActiveUsers();\nconst sorted = sortByJoinDate(users);\nconst display = formatForTable(sorted);</span>`,
    tags: ["general"]
  },
  {
    id: 56, category: "debugging", icon: "🔍", difficulty: "intermediate",
    title: "Use the Elements Tab to Debug CSS, Not Your Code",
    body: "When CSS isn't working, don't keep editing your CSS file and refreshing. Right-click the element > Inspect. The Elements tab shows computed styles, which rules are being applied, and which are crossed out (overridden). Fix it live, THEN update your code.",
    tags: ["general"]
  },
  {
    id: 57, category: "ux-engineering", icon: "✨", difficulty: "intermediate",
    title: "Form Validation Should Be Instant, Not After Submit",
    body: "Don't wait until the user clicks Submit to tell them their email is invalid. Validate on blur (when they leave the field). Show errors inline, next to the field, in red. Don't clear the entire form on error — that's cruel.",
    tags: ["react", "general"]
  },
  {
    id: 58, category: "env-config", icon: "🔐", difficulty: "intermediate",
    title: "Different .env for Different Environments",
    body: "Your local dev API is localhost:3001. Staging is api-staging.myapp.com. Production is api.myapp.com. Use separate .env files (.env.development, .env.production) so you never accidentally point your prod app to a dev server.",
    code: `<span class="code-comment">// .env.development</span>\n<span class="code-good">REACT_APP_API_URL=http://localhost:3001</span>\n\n<span class="code-comment">// .env.production</span>\n<span class="code-good">REACT_APP_API_URL=https://api.myapp.com</span>\n\n<span class="code-comment">// In your code — works everywhere</span>\n<span class="code-good">fetch(process.env.REACT_APP_API_URL + "/users")</span>`,
    tags: ["react", "general"]
  },
  {
    id: 59, category: "security", icon: "🔒", difficulty: "intermediate",
    title: "Validate on the Backend Too — Always",
    body: "Frontend validation is for UX (instant feedback). Backend validation is for security. A user can disable JavaScript, modify requests with Postman, or bypass your form entirely. Never trust frontend validation alone.",
    tags: ["general"]
  },
  {
    id: 60, category: "css-layout", icon: "🎨", difficulty: "beginner",
    title: "margin: auto Is a Centering Superpower",
    body: "For block elements with a set width, margin: 0 auto centers horizontally. For flexbox, margin: auto absorbs all available space in any direction. It's simpler than complex flexbox just for centering one element.",
    tags: ["general"]
  },
  {
    id: 61, category: "react", icon: "⚛️", difficulty: "beginner",
    title: "Conditional Rendering — Beware of 0 and Empty String",
    body: "Using && for conditional rendering? If count is 0, {count && <Component />} renders '0' on screen, not nothing. That's because 0 is falsy but still a renderable value in JSX. Use explicit comparisons instead.",
    code: `<span class="code-comment">// ❌ Renders "0" on screen when count is 0</span>\n<span class="code-bad">{count && &lt;ItemList /&gt;}</span>\n\n<span class="code-comment">// ✅ Explicit check</span>\n<span class="code-good">{count > 0 && &lt;ItemList /&gt;}</span>\n\n<span class="code-comment">// ✅ Or use ternary</span>\n<span class="code-good">{count ? &lt;ItemList /&gt; : null}</span>`,
    tags: ["react"]
  },
  {
    id: 62, category: "architecture", icon: "🏗️", difficulty: "beginner",
    title: "README.md Is Not Optional",
    body: "Every project needs a README that answers: What is this? How do I install it? How do I run it? What env variables do I need? Where's the deployed version? A new dev should go from git clone to running app in under 5 minutes.",
    tags: ["general"]
  },
  {
    id: 63, category: "performance", icon: "🚀", difficulty: "intermediate",
    title: "Bundle Size Matters More Than You Think",
    body: "Every KB of JavaScript must be downloaded, parsed, and executed. A 2MB bundle on a 3G connection takes 10+ seconds. Use tools like bundlephobia.com to check library sizes BEFORE installing. Import only what you need.",
    code: `<span class="code-comment">// ❌ Imports entire library (70KB)</span>\n<span class="code-bad">import _ from "lodash";\n_.debounce(fn, 300);</span>\n\n<span class="code-comment">// ✅ Import only what you need (4KB)</span>\n<span class="code-good">import debounce from "lodash/debounce";\ndebounce(fn, 300);</span>`,
    tags: ["general"]
  },
  {
    id: 64, category: "ux-engineering", icon: "✨", difficulty: "beginner",
    title: "Placeholder Text Is Not a Label",
    body: "Placeholder text disappears when the user starts typing. If it's the only indicator of what the field is for, users lose context mid-typing. Always use a visible <label> above the input. Placeholders are for hints, not labels.",
    tags: ["general"]
  },
  {
    id: 65, category: "env-config", icon: "🔐", difficulty: "beginner",
    title: "npm install vs npm ci — Use the Right One",
    body: "npm install reads package.json and may update versions. npm ci reads package-lock.json and installs EXACT versions. Use npm ci in CI/CD pipelines and production. Use npm install only when adding new packages locally.",
    code: `<span class="code-comment"># Local development — adding packages</span>\n<span class="code-good">npm install axios</span>\n\n<span class="code-comment"># CI/CD or fresh clone — exact versions</span>\n<span class="code-good">npm ci</span>\n\n<span class="code-comment"># npm ci is faster, stricter, and\n# deletes node_modules first</span>`,
    tags: ["general"]
  },
  {
    id: 66, category: "debugging", icon: "🔍", difficulty: "beginner",
    title: "console.log the Type, Not Just the Value",
    body: "Is '5' a string or a number? Is that empty-looking thing null, undefined, or an empty string? Always log typeof alongside the value when debugging type-related bugs. JavaScript's loose typing will trick you.",
    code: `<span class="code-comment">// ❌ Misleading output</span>\n<span class="code-bad">console.log(value); // Shows: 5\n// But is it "5" (string) or 5 (number)?</span>\n\n<span class="code-comment">// ✅ Log with type</span>\n<span class="code-good">console.log(value, typeof value);\n// Shows: 5 "string" — AHA!</span>`,
    tags: ["general"]
  },

  // ======== CODE HYGIENE ========
  {
    id: 67, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Remove console.logs Before Merging",
    body: "Debugging with console.log is fine. Shipping 47 console.logs to production is not. They clutter the console, leak internal data, and scream 'nobody reviewed this code.' Clean them up before every PR. Use a linter rule (no-console) to catch stragglers.",
    code: `<span class="code-comment">// ❌ Left in production code</span>\n<span class="code-bad">console.log("here");\nconsole.log("user data:", user);\nconsole.log("WHY IS THIS NOT WORKING");\nconsole.log("todo: remove this");</span>\n\n<span class="code-comment">// ✅ Use proper logging if needed</span>\n<span class="code-good">logger.info("User fetched", { userId: user.id });\n// Or just delete them entirely</span>`,
    tags: ["general"]
  },
  {
    id: 68, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Commented-Out Code Is Dead Code — Delete It",
    body: "That block you commented out 'just in case'? You'll never uncomment it. It confuses everyone who reads it. Git has the history if you ever need it back. Commented code is visual clutter that makes files harder to read and review.",
    code: `<span class="code-comment">// ❌ Code graveyard</span>\n<span class="code-bad">function getUsers() {\n  // const oldApi = "/v1/users";\n  // if (useNewApi) {\n  //   return fetch("/v2/users");\n  // }\n  // const temp = users.filter(u => u.active);\n  return fetch("/v2/users");\n}</span>\n\n<span class="code-comment">// ✅ Clean — Git remembers the rest</span>\n<span class="code-good">function getUsers() {\n  return fetch("/v2/users");\n}</span>`,
    tags: ["general"]
  },
  {
    id: 69, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Magic Numbers Make Code Unreadable",
    body: "What does 86400000 mean? Or 1.15? Or 3? Nobody knows without context. Extract magic numbers into named constants. Future you (and your teammates) will be grateful when reading the code 6 months later.",
    code: `<span class="code-comment">// ❌ What do these numbers mean?</span>\n<span class="code-bad">if (retries > 3) return;\nsetTimeout(fn, 86400000);\nconst total = price * 1.18;</span>\n\n<span class="code-comment">// ✅ Self-documenting</span>\n<span class="code-good">const MAX_RETRIES = 3;\nconst ONE_DAY_MS = 24 * 60 * 60 * 1000;\nconst GST_RATE = 1.18;\n\nif (retries > MAX_RETRIES) return;\nsetTimeout(fn, ONE_DAY_MS);\nconst total = price * GST_RATE;</span>`,
    tags: ["general"]
  },
  {
    id: 70, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Be Consistent With Naming Conventions",
    body: "camelCase or snake_case? handleClick or onClick or onClickHandler? Pick a convention for your project and stick to it everywhere. Mixing styles makes code look like 5 different people wrote it at 3 AM — even if it was just you.",
    code: `<span class="code-comment">// ❌ Naming chaos</span>\n<span class="code-bad">const user_name = "Ash";\nconst userAge = 25;\nconst UserEmail = "a@b.com";\nfunction GetData() {}\nfunction fetch_users() {}</span>\n\n<span class="code-comment">// ✅ Consistent camelCase</span>\n<span class="code-good">const userName = "Ash";\nconst userAge = 25;\nconst userEmail = "a@b.com";\nfunction getData() {}\nfunction fetchUsers() {}</span>`,
    tags: ["general"]
  },
  {
    id: 71, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Don't Leave TODO Comments Forever",
    body: "// TODO: fix this later — 2 years ago. TODOs are fine as short-term reminders, but they shouldn't live in your codebase forever. Track them in your issue tracker (Jira, GitHub Issues) where they'll actually get assigned and done.",
    tags: ["general"]
  },
  {
    id: 72, category: "code-hygiene", icon: "🧹", difficulty: "intermediate",
    title: "Functions Over 30 Lines Probably Need Splitting",
    body: "If you need to scroll to read a function, it's doing too much. Extract logical chunks into helper functions with descriptive names. A function called validateAndFormatAndSaveUser() should be 3 separate functions.",
    code: `<span class="code-comment">// ❌ One giant function doing everything</span>\n<span class="code-bad">function handleSubmit(data) {\n  // 15 lines of validation\n  // 10 lines of formatting\n  // 20 lines of API call + error handling\n  // 10 lines of UI updates\n}</span>\n\n<span class="code-comment">// ✅ Clear, testable pieces</span>\n<span class="code-good">function handleSubmit(data) {\n  const errors = validate(data);\n  if (errors.length) return showErrors(errors);\n  const formatted = formatForApi(data);\n  await saveUser(formatted);\n  showSuccess();\n}</span>`,
    tags: ["general"]
  },
  {
    id: 73, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Unused Imports and Variables Are Red Flags",
    body: "Unused imports increase bundle size. Unused variables signal incomplete refactoring. ESLint's no-unused-vars rule catches these automatically. Enable it and fix every warning — a clean codebase starts with zero warnings.",
    code: `<span class="code-comment">// ❌ Leftover imports nobody cleaned up</span>\n<span class="code-bad">import React, { useState, useEffect,\n  useCallback, useMemo, useRef } from "react";\nimport axios from "axios";\nimport _ from "lodash";\n// Only useState is actually used!</span>\n\n<span class="code-comment">// ✅ Import only what you use</span>\n<span class="code-good">import { useState } from "react";</span>`,
    tags: ["react", "general"]
  },
  {
    id: 74, category: "code-hygiene", icon: "🧹", difficulty: "intermediate",
    title: "Hardcoded Strings Belong in Constants",
    body: "API endpoints, error messages, route paths, storage keys — if a string appears more than once or could change, extract it into a constant. When the API path changes, you update ONE file, not hunt through 20.",
    code: `<span class="code-comment">// ❌ Scattered across files</span>\n<span class="code-bad">fetch("/api/v2/users");\n// In another file...\nfetch("/api/v2/users/" + id);</span>\n\n<span class="code-comment">// ✅ Centralized constants</span>\n<span class="code-good">// constants/api.js\nexport const API = {\n  USERS: "/api/v2/users",\n  USER: (id) => \`/api/v2/users/\${id}\`,\n};</span>`,
    tags: ["general"]
  },
  {
    id: 75, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Format Your Code Automatically — Use Prettier",
    body: "Stop arguing about tabs vs spaces, semicolons, or quote styles. Install Prettier, configure it once, and let it format on save. Every file looks the same, every PR diff shows only real changes, and code reviews focus on logic instead of style.",
    tags: ["general"]
  },
  {
    id: 76, category: "code-hygiene", icon: "🧹", difficulty: "intermediate",
    title: "Avoid Deeply Nested If-Else Blocks",
    body: "If your code indents 5 levels deep, it's unreadable. Use early returns (guard clauses) to handle edge cases first, then put the happy path at the top level. Flat code is readable code.",
    code: `<span class="code-comment">// ❌ Pyramid of doom</span>\n<span class="code-bad">function processOrder(order) {\n  if (order) {\n    if (order.items.length > 0) {\n      if (order.payment) {\n        if (order.payment.verified) {\n          // Finally, the actual logic\n        }\n      }\n    }\n  }\n}</span>\n\n<span class="code-comment">// ✅ Guard clauses — flat and clear</span>\n<span class="code-good">function processOrder(order) {\n  if (!order) return;\n  if (!order.items.length) return;\n  if (!order.payment?.verified) return;\n\n  // Happy path — no nesting\n}</span>`,
    tags: ["general"]
  },
  {
    id: 77, category: "code-hygiene", icon: "🧹", difficulty: "intermediate",
    title: "Write Self-Documenting Code, Not More Comments",
    body: "Comments that say WHAT the code does are noise — the code already says that. Comments should say WHY. If you need a comment to explain what a block does, rename your variables and functions instead.",
    code: `<span class="code-comment">// ❌ Comments restating the code</span>\n<span class="code-bad">// Get the users\nconst u = getU();\n// Filter active users\nconst a = u.filter(x => x.s === 1);\n// Sort by date\na.sort((x, y) => x.d - y.d);</span>\n\n<span class="code-comment">// ✅ No comments needed — code speaks</span>\n<span class="code-good">const users = fetchAllUsers();\nconst activeUsers = users.filter(\n  user => user.status === ACTIVE\n);\nactiveUsers.sort(byJoinDateAsc);</span>`,
    tags: ["general"]
  },
  {
    id: 78, category: "code-hygiene", icon: "🧹", difficulty: "beginner",
    title: "Don't Copy-Paste Code — Abstract It",
    body: "If you copy-paste a block of code to 3 places, you now have 3 places to update when requirements change — and you WILL forget one. Extract shared logic into a function, hook, or component. DRY (Don't Repeat Yourself) is rule #1.",
    tags: ["react", "general"]
  }
];

const categories = [
  { id: "all", label: "All", emoji: "📚" },
  { id: "data-integrity", label: "Data Integrity", emoji: "🛡️" },
  { id: "api-network", label: "API & Network", emoji: "🌐" },
  { id: "state-management", label: "State Management", emoji: "⚡" },
  { id: "react", label: "React Patterns", emoji: "⚛️" },
  { id: "performance", label: "Performance", emoji: "🚀" },
  { id: "css-layout", label: "CSS & Layout", emoji: "🎨" },
  { id: "env-config", label: "Env & Config", emoji: "🔐" },
  { id: "code-hygiene", label: "Code Hygiene", emoji: "🧹" },
  { id: "debugging", label: "Debugging", emoji: "🔍" },
  { id: "security", label: "Security", emoji: "🔒" },
  { id: "architecture", label: "Architecture", emoji: "🏗️" },
  { id: "ux-engineering", label: "UX Engineering", emoji: "✨" }
];

