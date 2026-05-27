// ─── SOLUTION: SearchBar with useDebounce + race condition fix ────────────────

import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce.solution";

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

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
}
