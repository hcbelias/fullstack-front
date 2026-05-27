// ─── SOLUTION: Shopping cart with Context + useReducer ───────────────────────

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return { items: state.items.map((i) => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) return { items: state.items.filter((i) => i.id !== id) };
      return { items: state.items.map((i) => i.id === id ? { ...i, qty } : i) };
    }
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  const { state, dispatch } = ctx;
  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);
  return { items: state.items, dispatch, total, count };
}
