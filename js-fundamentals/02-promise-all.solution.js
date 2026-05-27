// ─── SOLUTION: Promise.all from scratch ──────────────────────────────────────

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

function myPromiseAllSettled(promises) {
  return myPromiseAll(
    promises.map((p) =>
      Promise.resolve(p)
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );
}

// Tests
async function runTests() {
  const r1 = await myPromiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
  console.assert(JSON.stringify(r1) === "[1,2,3]", "Test 1 failed", r1);

  const r2 = await myPromiseAll([]);
  console.assert(JSON.stringify(r2) === "[]", "Test 2 failed", r2);

  try {
    await myPromiseAll([Promise.resolve(1), Promise.reject("boom"), Promise.resolve(3)]);
    console.assert(false, "Test 3 should have thrown");
  } catch (e) {
    console.assert(e === "boom", "Test 3 wrong rejection reason", e);
  }

  const r4 = await myPromiseAll([1, Promise.resolve(2), 3]);
  console.assert(JSON.stringify(r4) === "[1,2,3]", "Test 4 failed", r4);

  console.log("All tests passed ✓");
}

runTests().catch(console.error);
