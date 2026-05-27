// ─── EXERCISE 5: Global state without Redux ──────────────────────────────────
//
// TASK
//   Build a shopping cart using only React Context + useReducer.
//   No external state library allowed.
//
// Requirements:
//   - CartProvider wraps the app and exposes cart state + dispatch.
//   - useCart() is a convenience hook that throws if used outside the provider.
//   - Supported actions:
//       ADD_ITEM    { type, payload: { id, name, price } }
//       REMOVE_ITEM { type, payload: { id } }
//       UPDATE_QTY  { type, payload: { id, qty } }   – remove item if qty <= 0
//       CLEAR_CART  { type }
//   - State shape: { items: [{ id, name, price, qty }] }
//   - Derived values (total, count) should be computed inside the hook, not stored.
//
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  // YOUR CODE HERE
  return state;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  // YOUR CODE HERE — provide state + dispatch through context
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  // YOUR CODE HERE — return state, dispatch, and derived total + count
  return ctx;
}
