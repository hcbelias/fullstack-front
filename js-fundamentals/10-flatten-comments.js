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

// ── Solution ──────────────────────────────────────────────────────────────────
/*
function flattenComments(node, depth = 0) {
  const { children, ...rest } = node;
  return [
    { ...rest, depth },
    ...children.flatMap((child) => flattenComments(child, depth + 1)),
  ];
}

function flattenCommentsIterative(root) {
  const result = [];
  const stack = [{ node: root, depth: 0 }];
  while (stack.length) {
    const { node, depth } = stack.shift(); // shift = breadth-first; use pop() for depth-first
    const { children, ...rest } = node;
    result.push({ ...rest, depth });
    for (let i = children.length - 1; i >= 0; i--) {
      stack.unshift({ node: children[i], depth: depth + 1 }); // unshift preserves order with shift
    }
  }
  return result;
}
*/
