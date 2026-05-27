// ─── EXERCISE 10: Flatten nested comments tree ───────────────────────────────
//
// TASK
//   Given a nested comment tree, flatten it into a depth-annotated list,
//   preserving depth-first order (parent before children).
//
//   Input shape:
//     { id, text, children: [...] }
//
//   Output shape:
//     [{ id, text, depth }, ...]
//
//   Example:
//     flattenComments(tree) →
//     [
//       { id: 1, text: "Root",    depth: 0 },
//       { id: 2, text: "Child A", depth: 1 },
//       { id: 4, text: "Nested",  depth: 2 },
//       { id: 3, text: "Child B", depth: 1 },
//     ]
//
// BONUS: implement iteratively (no recursion) using a stack.
//
// ────────────────────────────────────────────────────────────────────────────

const tree = {
  id: 1,
  text: "Root",
  children: [
    {
      id: 2,
      text: "Child A",
      children: [{ id: 4, text: "Nested", children: [] }],
    },
    { id: 3, text: "Child B", children: [] },
  ],
};

function flattenComments(node, depth = 0) {
  // YOUR CODE HERE
}

function flattenCommentsIterative(root) {
  // YOUR CODE HERE (bonus — use a stack, no recursion)
}

// ── Tests ────────────────────────────────────────────────────────────────────
const result = flattenComments(tree);
console.log(JSON.stringify(result));
// Expected: [{"id":1,"text":"Root","depth":0},{"id":2,"text":"Child A","depth":1},{"id":4,"text":"Nested","depth":2},{"id":3,"text":"Child B","depth":1}]
