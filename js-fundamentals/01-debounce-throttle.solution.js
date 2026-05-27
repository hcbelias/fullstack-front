// ─── SOLUTION: Debounce & Throttle ───────────────────────────────────────────

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Smoke test
const log = (label) => (value) => console.log(`[${label}]`, value);

const debouncedSearch = debounce(log("search"), 300);
const throttledScroll = throttle(log("scroll"), 500);

for (let i = 0; i < 5; i++) {
  setTimeout(() => debouncedSearch(`query-${i}`), i * 100); // only "query-4" fires
  setTimeout(() => throttledScroll(i * 100), i * 100);      // only first fires per 500ms window
}
