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

app.listen(3000, () => console.log("Auth server on http://localhost:3000"));
