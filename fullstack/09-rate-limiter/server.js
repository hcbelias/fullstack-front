// ─── EXERCISE 9: Rate Limiter Middleware ─────────────────────────────────────
//
// TASK
//   Write `rateLimiter({ windowMs, max })` — an Express middleware factory.
//
//   Behaviour:
//     - Tracks requests per IP address.
//     - Allows up to `max` requests per `windowMs` millisecond window.
//     - After the limit is hit: respond 429 { error: "Too many requests", retryAfter: <ms> }.
//     - Each window resets independently per IP (sliding or fixed — your choice, but state which).
//     - Add headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset.
//
//   BONUS: make the store pluggable so a Redis client can replace the in-memory Map.
//
// Run:  node server.js
// Test: for i in {1..12}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/ping; done
// ────────────────────────────────────────────────────────────────────────────

const express = require("express");
const app = express();

function rateLimiter({ windowMs, max }) {
  // YOUR CODE HERE — return an Express middleware function
}

app.use(rateLimiter({ windowMs: 60_000, max: 10 }));

app.get("/ping", (req, res) => res.json({ pong: true }));

// ── Solution ──────────────────────────────────────────────────────────────────
/*
function rateLimiter({ windowMs, max }) {
  const store = new Map(); // ip → { count, resetAt }

  return (req, res, next) => {
    const ip  = req.ip;
    const now = Date.now();
    let record = store.get(ip);

    if (!record || now > record.resetAt) {
      record = { count: 0, resetAt: now + windowMs };
      store.set(ip, record);
    }

    record.count++;
    const remaining = Math.max(0, max - record.count);

    res.set("X-RateLimit-Limit",     max);
    res.set("X-RateLimit-Remaining", remaining);
    res.set("X-RateLimit-Reset",     record.resetAt);

    if (record.count > max) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: record.resetAt - now,
      });
    }
    next();
  };
}
*/

app.listen(3000, () => console.log("Rate limiter demo on http://localhost:3000"));
