// ─── EXERCISE 2: Promise.all from scratch ───────────────────────────────────
//
// TASK
//   Implement `myPromiseAll(promises)`.
//   - Resolves with an array of results (in input order) when ALL promises settle successfully.
//   - Rejects immediately with the first rejection reason.
//   - Must handle: empty array, synchronous values mixed with promises, rejection.
//   - You may NOT use Promise.all, Promise.allSettled, or Promise.race internally.
//
// BONUS
//   Implement `myPromiseAllSettled(promises)` — never rejects; resolves with
//   [{ status: 'fulfilled', value } | { status: 'rejected', reason }].
//
// ────────────────────────────────────────────────────────────────────────────

function myPromiseAll(promises) {
  // YOUR CODE HERE
}

function myPromiseAllSettled(promises) {
  // YOUR CODE HERE (bonus)
}

// ── Tests ────────────────────────────────────────────────────────────────────
async function runTests() {
  // Test 1: all resolve
  const r1 = await myPromiseAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ]);
  console.assert(JSON.stringify(r1) === "[1,2,3]", "Test 1 failed", r1);

  // Test 2: empty array
  const r2 = await myPromiseAll([]);
  console.assert(JSON.stringify(r2) === "[]", "Test 2 failed", r2);

  // Test 3: rejects on first failure
  try {
    await myPromiseAll([Promise.resolve(1), Promise.reject("boom"), Promise.resolve(3)]);
    console.assert(false, "Test 3 should have thrown");
  } catch (e) {
    console.assert(e === "boom", "Test 3 wrong rejection reason", e);
  }

  // Test 4: mixed sync values
  const r4 = await myPromiseAll([1, Promise.resolve(2), 3]);
  console.assert(JSON.stringify(r4) === "[1,2,3]", "Test 4 failed", r4);

  console.log("All tests passed ✓");
}

runTests().catch(console.error);

// ────────────────────────────────────────────────────────────────────────────
// SOLUTION
// ────────────────────────────────────────────────────────────────────────────
/*
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results = new Array(promises.length);
    let remaining = promises.length;
    promises.forEach((p, i) => {
      Promise.resolve(p).then((val) => {
        results[i] = val;
        if (--remaining === 0) resolve(results);
      }, reject);
    });
  });
}
*/
