# Frontend / Fullstack Interview Exercises

A collection of hands-on coding challenges to prepare for frontend and fullstack engineering interviews. Each exercise ships as a clean stub (your starting point) paired with a `.solution` file you can check after attempting it.

## Structure

```
js-fundamentals/   Vanilla JavaScript challenges
react/             React patterns and hooks
fullstack/         Node.js / Express backend challenges
```

Each folder follows the naming convention:

| File | Purpose |
|---|---|
| `<name>.js` / `.html` / `.jsx` | Exercise stub — implement here |
| `<name>.solution.js` / `.solution.html` / `.solution.jsx` | Reference solution — open after attempting |

---

## Challenges

### JavaScript Fundamentals

#### 01 — Debounce & Throttle
**File:** [js-fundamentals/01-debounce-throttle.js](js-fundamentals/01-debounce-throttle.js)

Implement `debounce(fn, delay)` and `throttle(fn, limit)` from scratch without using any libraries.

- `debounce` delays invoking `fn` until `delay` ms have passed since the last call — each new call resets the timer.
- `throttle` limits `fn` to at most once per `limit` ms window (leading-edge).
- A Node smoke test is included so you can run `node 01-debounce-throttle.js` and verify the timing behaviour.

**Why it matters:** Almost every search input, scroll handler, or resize listener in production uses one of these. Interviewers frequently ask you to implement them live.

---

#### 02 — Promise.all from Scratch
**File:** [js-fundamentals/02-promise-all.js](js-fundamentals/02-promise-all.js)

Implement `myPromiseAll(promises)` without using `Promise.all`, `Promise.allSettled`, or `Promise.race`.

- Resolves with results in input order when all promises fulfil.
- Rejects immediately on the first rejection.
- Handles empty arrays and mixed synchronous values.
- **Bonus:** implement `myPromiseAllSettled` — never rejects, returns `{ status, value | reason }` objects.

Run the included test suite: `node 02-promise-all.js`

**Why it matters:** Tests deep understanding of the Promise spec and async coordination — a common senior-level question.

---

#### 03 — Event Delegation
**File:** [js-fundamentals/03-event-delegation.html](js-fundamentals/03-event-delegation.html)

Build a dynamic todo list using a single delegated event listener on the parent `<ul>` — no listeners on individual items.

- "Add" button appends a new `<li>` with the typed text and a Delete button.
- Clicking Delete removes that item.
- **Bonus:** clicking the item text toggles a "done" strikethrough style.

Open the file directly in a browser — no build step needed.

**Why it matters:** Event delegation is a core DOM performance pattern and a near-universal interview topic.

---

#### 10 — Flatten a Nested Comments Tree
**File:** [js-fundamentals/10-flatten-comments.js](js-fundamentals/10-flatten-comments.js)

Given a tree of nested comment objects, flatten it into a depth-annotated array in depth-first order.

- Input: `{ id, text, children: [...] }`
- Output: `[{ id, text, depth }, ...]`
- Implement the recursive version first, then the iterative (stack-based) version as a bonus.

Run: `node 10-flatten-comments.js`

**Why it matters:** Tree traversal shows up constantly in frontend work (virtual DOM, menus, file trees) and is a favourite algorithm question for UI roles.

---

### React

#### 04 — useDebounce Hook + Search with Race Condition Fix
**Files:**
- [react/04-use-debounce-hook/src/useDebounce.js](react/04-use-debounce-hook/src/useDebounce.js)
- [react/04-use-debounce-hook/src/SearchBar.jsx](react/04-use-debounce-hook/src/SearchBar.jsx)

Two-part exercise:

1. Implement `useDebounce(value, delay)` — a custom hook that returns a debounced copy of `value`.
2. Wire it into `SearchBar`: call a mock async `fetchResults` only when the debounced query changes, show a loading state, and fix the race condition so stale responses from slower fetches are discarded.

**Why it matters:** Custom hooks and cancellation patterns are asked in almost every React interview. The race condition is the part most candidates miss.

---

#### 05 — Global State without Redux
**File:** [react/05-cart-context/src/CartContext.jsx](react/05-cart-context/src/CartContext.jsx)

Build a shopping cart using only `React.createContext` and `useReducer` — no external state library.

- `CartProvider` wraps the app and owns the state.
- `useCart()` is a convenience hook that throws a clear error if used outside the provider.
- Supported actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY` (removes item if qty ≤ 0), `CLEAR_CART`.
- Derived values (`total`, `count`) are computed in the hook, not stored in state.

**Why it matters:** Demonstrates you understand when Redux is overkill and can design clean state architecture with built-in React primitives.

---

#### 06 — Compound Component Pattern (Tabs)
**File:** [react/06-compound-tabs/src/Tabs.jsx](react/06-compound-tabs/src/Tabs.jsx)

Build a `<Tabs>` component using the compound component pattern with implicit state sharing via context.

Consumer API (no prop drilling):
```jsx
<Tabs defaultTab="a">
  <Tabs.List>
    <Tabs.Tab id="a">Tab A</Tabs.Tab>
    <Tabs.Tab id="b">Tab B</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="a">Content A</Tabs.Panel>
  <Tabs.Panel id="b">Content B</Tabs.Panel>
</Tabs>
```

`Tabs.Tab` and `Tabs.Panel` read active state from context — they receive no explicit props from the parent.

**Why it matters:** The compound component pattern is a go-to for building flexible, composable UI libraries. It signals senior-level React knowledge.

---

### Fullstack (Node / Express)

#### 07 — REST CRUD API
**File:** [fullstack/07-express-crud/server.js](fullstack/07-express-crud/server.js)

Build a `/users` REST API with in-memory storage using Express.

| Method | Route | Description |
|---|---|---|
| GET | `/users` | List all users (bonus: `?search=` filter) |
| GET | `/users/:id` | Get one user or 404 |
| POST | `/users` | Create user, validate `name` + `email`, return 201 |
| PUT | `/users/:id` | Update user or 404 |
| DELETE | `/users/:id` | Delete user, return 204 or 404 |

Run: `node server.js` — test with `curl` or Postman.

**Why it matters:** CRUD APIs are the baseline for any fullstack role. Correct status codes and validation separate strong candidates.

---

#### 08 — JWT Authentication Flow
**File:** [fullstack/08-jwt-auth/server.js](fullstack/08-jwt-auth/server.js)

Implement a minimal but complete JWT auth system.

- `POST /register` — hash password with bcrypt (10 rounds), return user.
- `POST /login` — verify password, return signed JWT (1h expiry).
- `GET /me` — protected route; validate token via `authenticate` middleware, attach `req.user`.
- Returns 401 on missing/invalid/expired tokens, 409 on duplicate email.

Install deps: `npm install express bcryptjs jsonwebtoken`

**Why it matters:** Auth is asked in virtually every fullstack interview. Bcrypt + JWT is the industry-standard pattern for stateless auth.

---

#### 09 — Rate Limiter Middleware
**File:** [fullstack/09-rate-limiter/server.js](fullstack/09-rate-limiter/server.js)

Write `rateLimiter({ windowMs, max })` — an Express middleware factory using a fixed-window strategy.

- Tracks request counts per IP with a `Map`.
- Returns 429 with `{ error, retryAfter }` when the limit is exceeded.
- Sets standard headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- **Bonus:** make the store pluggable so a Redis client can replace the in-memory Map.

Test: `for i in {1..12}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/ping; done`

**Why it matters:** Rate limiting is a system design staple. Writing it as composable middleware tests understanding of Express internals and stateful server-side logic.

---

## How to Use

1. Open the exercise stub file.
2. Read the task description at the top.
3. Implement your solution where it says `// YOUR CODE HERE`.
4. Time yourself — aim for 30–45 minutes per exercise.
5. Compare against the `.solution` file only after you've made a genuine attempt.

## Recommended Order

```
01 → 02 → 03 → 10 → 04 → 05 → 06 → 07 → 08 → 09
```

Start with JS fundamentals (they underpin everything), then move to React patterns, then backend.
