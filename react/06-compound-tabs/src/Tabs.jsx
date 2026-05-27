// ─── EXERCISE 6: Compound Component – Tabs ───────────────────────────────────
//
// TASK
//   Build a <Tabs> component using the compound component pattern.
//   The consumer API should look like this (no props drilling):
//
//   <Tabs defaultTab="a">
//     <Tabs.List>
//       <Tabs.Tab id="a">Tab A</Tabs.Tab>
//       <Tabs.Tab id="b">Tab B</Tabs.Tab>
//     </Tabs.List>
//     <Tabs.Panel id="a">Content A</Tabs.Panel>
//     <Tabs.Panel id="b">Content B</Tabs.Panel>
//   </Tabs>
//
// Rules:
//   - <Tabs> holds the active tab state internally.
//   - <Tabs.Tab> and <Tabs.Panel> receive no explicit state props from the parent —
//     they read from context implicitly.
//   - <Tabs.Tab id="a"> is highlighted when active.
//   - <Tabs.Panel id="a"> renders its children only when active.
//
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState } from "react";

const TabsContext = createContext(null);

function Tabs({ defaultTab, children }) {
  // YOUR CODE HERE
}

Tabs.List = function TabsList({ children }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }) {
  // YOUR CODE HERE
};

Tabs.Panel = function Panel({ id, children }) {
  // YOUR CODE HERE
};

export default Tabs;
