// ─── EXERCISE 1: Debounce & Throttle ────────────────────────────────────────
//
// TASK A – debounce
//   Implement `debounce(fn, delay)`.
//   The returned function must delay invoking `fn` until `delay` ms have passed
//   since the last call. Each new call resets the timer.
//
// TASK B – throttle
//   Implement `throttle(fn, limit)`.
//   The returned function may only invoke `fn` once per `limit` ms window.
//   Additional calls within that window are ignored (leading-edge behaviour).
//
// TASK C – wire up (browser / Node REPL)
//   Attach a debounced handler to a search <input> that logs the value,
//   and a throttled handler to a scroll event that logs the scroll position.
//
// ────────────────────────────────────────────────────────────────────────────

// ---------- TASK A ----------------------------------------------------------
function debounce(fn, delay) {
  // YOUR CODE HERE
}

// ---------- TASK B ----------------------------------------------------------
function throttle(fn, limit) {
  // YOUR CODE HERE
}

// ---------- TASK C (Node smoke test — no DOM needed) ------------------------
const log = (label) => (value) => console.log(`[${label}]`, value);

const debouncedSearch = debounce(log("search"), 300);
const throttledScroll = throttle(log("scroll"), 500);

// Simulate rapid calls
for (let i = 0; i < 5; i++) {
  setTimeout(() => debouncedSearch(`query-${i}`), i * 100); // expect: only "query-4" fires
  setTimeout(() => throttledScroll(i * 100), i * 100);      // expect: only first fires per 500ms window
}
