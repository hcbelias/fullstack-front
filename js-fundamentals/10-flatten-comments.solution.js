// ─── SOLUTION: Flatten nested comments tree ───────────────────────────────────

// Recursive approach
function flattenComments(node, depth = 0) {
  const { children, ...rest } = node;
  return [
    { ...rest, depth },
    ...children.flatMap((child) => flattenComments(child, depth + 1)),
  ];
}

// Iterative approach (stack-based, depth-first)
function flattenCommentsIterative(root) {
  const result = [];
  const stack = [{ node: root, depth: 0 }];
  while (stack.length) {
    const { node, depth } = stack.shift();
    const { children, ...rest } = node;
    result.push({ ...rest, depth });
    for (let i = children.length - 1; i >= 0; i--) {
      stack.unshift({ node: children[i], depth: depth + 1 });
    }
  }
  return result;
}

// Test
const tree = {
  id: 1, text: "Root",
  children: [
    { id: 2, text: "Child A", children: [{ id: 4, text: "Nested", children: [] }] },
    { id: 3, text: "Child B", children: [] },
  ],
};

console.log(JSON.stringify(flattenComments(tree)));
console.log(JSON.stringify(flattenCommentsIterative(tree)));
// Both should output:
// [{"id":1,"text":"Root","depth":0},{"id":2,"text":"Child A","depth":1},{"id":4,"text":"Nested","depth":2},{"id":3,"text":"Child B","depth":1}]
