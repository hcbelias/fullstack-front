// ─── SOLUTION: Compound Component – Tabs ─────────────────────────────────────

import { createContext, useContext, useState } from "react";

const TabsContext = createContext(null);

function Tabs({ defaultTab, children }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button
      role="tab"
      aria-selected={active === id}
      style={{ fontWeight: active === id ? "bold" : "normal" }}
      onClick={() => setActive(id)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ id, children }) {
  const { active } = useContext(TabsContext);
  return active === id ? <div role="tabpanel">{children}</div> : null;
};

export default Tabs;
