// ─── SOLUTION: Rate Limiter Middleware ───────────────────────────────────────
// Strategy: fixed window per IP

const express = require("express");
const app = express();

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

app.use(rateLimiter({ windowMs: 60_000, max: 10 }));

app.get("/ping", (req, res) => res.json({ pong: true }));

app.listen(3000, () => console.log("Rate limiter demo on http://localhost:3000"));
