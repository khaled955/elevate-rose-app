"use client";

import { CartItemUI } from "@/lib/types/cart";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

//product snapshot stored in localStorage
export type GuestCartProductSnapshot = {
  _id: string;
  title: string;
  imgCover?: string;
  rateAvg?: number;
  rateCount?: number;
  quantity: number; // stock
};

type StoredProduct = {
  _id?: string;
  title?: string;
  imgCover?: string;
  rateAvg?: number;
  rateCount?: number;
  quantity?: number; // stock
};

type StoredCartItem = {
  _id?: string;
  quantity?: number; // cart quantity
  price?: number; // unit price
  product?: StoredProduct;
};

// ===== Context Types =====
type GuestCartContextValue = {
  cartItems: CartItemUI[];
  totalItems: number;
  totalQuantity: number;
  totalPrice: number;
  getQuantity: (productId: string) => number;

  addItem: (
    product: GuestCartProductSnapshot,
    quantity?: number,
    price?: number,
  ) => void;

  setQuantity: (productId: string, quantity: number) => void;
  increase: (productId: string, step?: number) => void;
  decrease: (productId: string, step?: number) => void;

  removeItem: (productId: string) => void;
  clear: () => void;

  isReady: boolean;
};

export const GuestCartContext = createContext<GuestCartContextValue | null>(
  null,
);

type GuestCartProviderProps = {
  children: React.ReactNode;
  storageKey?: string; // default: "guest_cart"
};

// ===== Utils =====
function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function clampInt(n: number, min = 1) {
  const v = Math.trunc(Number(n));
  if (Number.isNaN(v)) return min;
  return Math.max(min, v);
}

// ✅ product guard
function isStoredProduct(
  p: StoredProduct | undefined,
): p is Required<Pick<StoredProduct, "_id" | "title" | "quantity">> &
  StoredProduct {
  return (
    !!p &&
    typeof p._id === "string" &&
    typeof p.title === "string" &&
    typeof p.quantity === "number"
  );
}

// ✅ cart item guard
type StoredCartItemValid = Required<
  Pick<StoredCartItem, "quantity" | "price" | "product">
> & {
  _id?: string;
  product: Required<Pick<StoredProduct, "_id" | "title" | "quantity">> &
    StoredProduct;
};

function isStoredCartItemValid(x: StoredCartItem): x is StoredCartItemValid {
  return (
    typeof x.quantity === "number" &&
    typeof x.price === "number" &&
    isStoredProduct(x.product)
  );
}

function normalize(items: StoredCartItem[]): CartItemUI[] {
  return items.filter(isStoredCartItemValid).map((x) => {
    const id = x.product._id;

    return {
      _id: x._id ?? `guest-${id}`,
      quantity: clampInt(x.quantity, 1),
      price: x.price,
      product: {
        _id: id,
        title: x.product.title,
        imgCover: x.product.imgCover,
        rateAvg: x.product.rateAvg ?? 0,
        rateCount: x.product.rateCount ?? 0,
        quantity: clampInt(x.product.quantity, 0),
      },
    };
  });
}

// ===== Provider =====
export function GuestCartProvider({
  children,
  storageKey = "guest_cart",
}: GuestCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItemUI[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load once
  useEffect(() => {
    const stored = safeParse<StoredCartItem[]>(
      localStorage.getItem(storageKey),
      [],
    );
    setCartItems(normalize(stored));
    setIsReady(true);
  }, [storageKey]);

  // Persist after ready
  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey, isReady]);

  // Sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== storageKey) return;

      const next = safeParse<StoredCartItem[]>(e.newValue, []);
      setCartItems(normalize(next));
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  // Helpers
  const getQuantity = useCallback(
    (productId: string) =>
      cartItems.find((x) => x.product._id === String(productId))?.quantity ?? 0,
    [cartItems],
  );

  // Actions
  const addItem = useCallback(
    (product: GuestCartProductSnapshot, quantity = 1, price = 0) => {
      const id = String(product._id);
      const q = clampInt(quantity, 1);
      const p = Number.isFinite(price) ? price : 0;

      setCartItems((prev) => {
        const idx = prev.findIndex((x) => x.product._id === id);

        if (idx === -1) {
          return [
            ...prev,
            {
              _id: `guest-${id}`,
              quantity: q,
              price: p,
              product: {
                _id: id,
                title: product.title,
                imgCover: product.imgCover,
                rateAvg: product.rateAvg ?? 0,
                rateCount: product.rateCount ?? 0,
                quantity: product.quantity,
              },
            },
          ];
        }

        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + q,
          price: p,
          product: {
            ...next[idx].product,
            title: product.title,
            imgCover: product.imgCover,
            rateAvg: product.rateAvg ?? 0,
            rateCount: product.rateCount ?? 0,
            quantity: product.quantity,
          },
        };
        return next;
      });
    },
    [],
  );

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const id = String(productId);
    const q = clampInt(quantity, 1);

    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.product._id === id);
      if (idx === -1) return prev;

      const next = [...prev];
      next[idx] = { ...next[idx], quantity: q };
      return next;
    });
  }, []);

  const increase = useCallback((productId: string, step = 1) => {
    const id = String(productId);
    const s = clampInt(step, 1);

    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.product._id === id);
      if (idx === -1) return prev;

      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + s };
      return next;
    });
  }, []);

  const decrease = useCallback((productId: string, step = 1) => {
    const id = String(productId);
    const s = clampInt(step, 1);

    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.product._id === id);
      if (idx === -1) return prev;

      const nextQty = prev[idx].quantity - s;
      if (nextQty <= 0) return prev.filter((x) => x.product._id !== id);

      const next = [...prev];
      next[idx] = { ...next[idx], quantity: nextQty };
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    const id = String(productId);
    setCartItems((prev) => prev.filter((x) => x.product._id !== id));
  }, []);

  const clear = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  // Derived
  const totalItems = useMemo(() => cartItems.length, [cartItems]);
  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, x) => sum + x.quantity, 0),
    [cartItems],
  );
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const value = useMemo<GuestCartContextValue>(
    () => ({
      cartItems,
      totalItems,
      totalQuantity,
      getQuantity,
      addItem,
      setQuantity,
      increase,
      decrease,
      removeItem,
      totalPrice,
      clear,
      isReady,
    }),
    [
      cartItems,
      totalItems,
      totalQuantity,
      getQuantity,
      addItem,
      setQuantity,
      increase,
      decrease,
      removeItem,
      clear,
      isReady,
      totalPrice,
    ],
  );

  return (
    <GuestCartContext.Provider value={value}>
      {children}
    </GuestCartContext.Provider>
  );
}
