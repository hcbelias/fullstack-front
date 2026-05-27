// ─── EXERCISE 4: useDebounce custom hook ────────────────────────────────────
//
// TASK A – implement the hook
//   `useDebounce(value, delay)` returns a debounced copy of `value`.
//   The returned value only updates after `delay` ms of no new changes.
//
// TASK B – wire it up in SearchBar.jsx
//   - Show results from a mock async `fetchResults(query)` function.
//   - Only call fetchResults when the debounced query changes (not on every keystroke).
//   - Show a loading indicator while the fetch is in flight.
//   - Handle the race condition: if a newer fetch starts before an older one
//     resolves, ignore the older result.
//
// ────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  // YOUR CODE HERE
}

// ────────────────────────────────────────────────────────────────────────────
// SOLUTION
// ────────────────────────────────────────────────────────────────────────────
/*
export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
*/
