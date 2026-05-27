// ─── SOLUTION: REST CRUD API with Express ────────────────────────────────────

const express = require("express");
const app = express();
app.use(express.json());

let users = [];
let nextId = 1;

app.get("/users", (req, res) => {
  const { search } = req.query;
  const result = search
    ? users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    : users;
  res.json(result);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: "Not found" });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });
  if (!email.includes("@")) return res.status(400).json({ error: "invalid email" });
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
  const idx = users.findIndex((u) => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  users[idx] = { ...users[idx], ...req.body, id: users[idx].id };
  res.json(users[idx]);
});

app.delete("/users/:id", (req, res) => {
  const idx = users.findIndex((u) => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  users.splice(idx, 1);
  res.status(204).send();
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
