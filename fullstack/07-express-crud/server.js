// ─── EXERCISE 7: REST CRUD API with Express ──────────────────────────────────
//
// TASK
//   Build a /users API with in-memory storage.
//
//   Endpoints to implement:
//     GET    /users           – return all users
//     GET    /users/:id       – return one user or 404
//     POST   /users           – create user { name, email }, return 201 + created user
//     PUT    /users/:id       – replace user fields, return updated user or 404
//     DELETE /users/:id       – delete user, return 204 or 404
//
//   Validation rules:
//     - name and email are required on POST
//     - email must contain "@"
//     - Return 400 with { error: "..." } on validation failure
//
//   BONUS: add a GET /users?search=foo that filters by name (case-insensitive).
//
// Run: node server.js
// Test with: curl -s http://localhost:3000/users | jq
// ────────────────────────────────────────────────────────────────────────────

const express = require("express");
const app = express();
app.use(express.json());

let users = [];
let nextId = 1;

// YOUR CODE HERE

app.listen(3000, () => console.log("API running on http://localhost:3000"));
