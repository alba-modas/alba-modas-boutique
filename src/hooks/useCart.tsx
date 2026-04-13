import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartCtx {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("alba-cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("alba-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, size?: string, color?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color === color);
      if (existing) return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1, size, color }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  };
  const clearCart = () => setItems([]);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
