// ─── SOLUTION: JWT Auth Flow ──────────────────────────────────────────────────

const express = require("express");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");

const app    = express();
const SECRET = "super-secret-dev-key"; // use process.env.JWT_SECRET in prod
app.use(express.json());

const users = [];
let nextId = 1;

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

app.listen(3000, () => console.log("Auth server on http://localhost:3000"));
