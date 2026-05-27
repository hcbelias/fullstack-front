// ─── EXERCISE 8: JWT Auth Flow ───────────────────────────────────────────────
//
// TASK
//   Implement a minimal JWT authentication system.
//
//   Endpoints:
//     POST /register  { name, email, password } → 201 + { id, name, email }
//     POST /login     { email, password }        → 200 + { token }
//     GET  /me        (Authorization: Bearer <token>) → 200 + user object
//     GET  /profile   (Authorization: Bearer <token>) → same (use middleware)
//
//   Rules:
//     - Passwords must be hashed (use bcryptjs, rounds = 10).
//     - Tokens must expire in 1h (use jsonwebtoken).
//     - Create an `authenticate` middleware that validates the token and attaches
//       `req.user` — reuse it on any protected route.
//     - Return 401 on missing/invalid/expired token.
//     - Return 409 if email already registered.
//
// Install: npm install express bcryptjs jsonwebtoken
// Run:     node server.js
// ────────────────────────────────────────────────────────────────────────────

const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");

const app    = express();
const SECRET = "super-secret-dev-key"; // use process.env.JWT_SECRET in prod
app.use(express.json());

const users = [];
let nextId = 1;

// ---------- Middleware -------------------------------------------------------
function authenticate(req, res, next) {
  // YOUR CODE HERE
}

// ---------- Routes ----------------------------------------------------------
app.post("/register", async (req, res) => {
  // YOUR CODE HERE
});

app.post("/login", async (req, res) => {
  // YOUR CODE HERE
});

app.get("/me", authenticate, (req, res) => {
  // YOUR CODE HERE
});

// ── Solution ──────────────────────────────────────────────────────────────────
/*
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
  try {
    req.user = jwt.verify(auth.slice(7), SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });
  if (users.find((u) => u.email === email)) return res.status(409).json({ error: "Email taken" });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: nextId++, name, email, hash };
  users.push(user);
  res.status(201).json({ id: user.id, name, email });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.hash)))
    return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/me", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json({ id: user.id, name: user.name, email: user.email });
});
*/

app.listen(3000, () => console.log("Auth server on http://localhost:3000"));
