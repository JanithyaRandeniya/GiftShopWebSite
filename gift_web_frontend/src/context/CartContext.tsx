"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  emoji: string;
  qty: number;
  note?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty" | "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  cartCount: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "giftly_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  // Save to localStorage whenever items change (but only after initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, loaded]);

  const addToCart = (newItem: Omit<CartItem, "qty" | "id">) => {
    const id = `${newItem.productId}-${newItem.name.replace(/\s+/g, "")}`;
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...newItem, id, qty: 1 }];
    });
  };

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: string, delta: number) =>
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );

  const clearCart = () => setItems([]);
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  // Don't render children until cart is loaded to prevent flash of empty cart
  if (!loaded) return null;

  return (
    <CartContext.Provider value={{ items, addToCart, removeItem, updateQty, cartCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}