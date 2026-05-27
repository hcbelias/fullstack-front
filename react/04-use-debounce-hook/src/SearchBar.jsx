import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

// Mock API — simulates network latency
function fetchResults(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        query
          ? ["apple", "banana", "cherry", "date", "elderberry"].filter((f) =>
              f.includes(query.toLowerCase())
            )
          : []
      );
    }, 400);
  });
}

// ─── TASK ────────────────────────────────────────────────────────────────────
// Complete this component so that:
//  1. It uses useDebounce to delay API calls by 400 ms.
//  2. It shows "Searching…" while a fetch is in flight.
//  3. It cancels stale fetches (race condition fix) using a cleanup flag.
//  4. It renders the results as a <ul> list.
// ─────────────────────────────────────────────────────────────────────────────

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // YOUR CODE HERE
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fruit…"
      />
      {/* YOUR JSX HERE */}
    </div>
  );
}

// ── Solution ──────────────────────────────────────────────────────────────────
/*
  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return; }
    let cancelled = false;
    setLoading(true);
    fetchResults(debouncedQuery).then((data) => {
      if (!cancelled) { setResults(data); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search fruit…" />
      {loading && <p>Searching…</p>}
      <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>
    </div>
  );
*/
