"use client";
import { useAppSelector } from "@/feature/redux/store";
import { useRouter } from "next/navigation";

export interface PendingCartItem {
  productId: string;
  quantity: number;
  size: string | null;
}

const PENDING_CART_KEY = "pendingCartItem";

/**
 * Saves a pending cart item to sessionStorage (survives a login redirect).
 */
export const savePendingCartItem = (item: PendingCartItem) => {
  sessionStorage.setItem(PENDING_CART_KEY, JSON.stringify(item));
};

/**
 * Retrieves and removes the pending cart item from sessionStorage.
 * Returns null if nothing is pending.
 */
export const popPendingCartItem = (): PendingCartItem | null => {
  const raw = sessionStorage.getItem(PENDING_CART_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(PENDING_CART_KEY);
  try {
    return JSON.parse(raw) as PendingCartItem;
  } catch {
    return null;
  }
};

/**
 * useCartGuard — returns a wrapped `addToCart` handler.
 *
 * Usage:
 *   const guardedAddToCart = useCartGuard(handleAddToCart);
 *   <button onClick={() => guardedAddToCart({ productId, quantity, size })}>
 *     ADD TO CART
 *   </button>
 *
 * - If logged in:  calls the real addToCart handler immediately.
 * - If guest:      saves the item to sessionStorage, then redirects to
 *                  /login?addToCart=1 so after login the item auto-adds.
 */
const useCartGuard = (
  onAddToCart: (item: PendingCartItem) => void,
) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  return (item: PendingCartItem) => {
    if (isLoggedIn) {
      onAddToCart(item);
    } else {
      savePendingCartItem(item);
      router.push("/login?addToCart=1");
    }
  };
};

export default useCartGuard;
