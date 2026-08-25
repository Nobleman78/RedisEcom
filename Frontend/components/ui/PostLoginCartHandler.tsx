"use client";

import { addToCart } from "@/feature/redux/cart/cartApi";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { popPendingCartItem } from "@/hook/useCartGuard";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

/**
 * PostLoginCartHandler
 *
 * Mounted once in the root layout. Works for BOTH auth flows:
 *   - Email/password  → loginAction() redirects to "/"
 *   - Google OAuth    → /auth/callback redirects to "/"
 *
 * It does NOT rely on ?addToCart=1 query params (which get stripped on
 * redirect). Instead it watches the Redux auth status transition:
 *
 *   idle/loading  →  succeeded + isLoggedIn
 *
 * When that transition fires AND there is a pending item in sessionStorage,
 * it pops the item, dispatches addToCart, then shows a SweetAlert2 toast.
 */
const PostLoginCartHandler = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const authStatus = useAppSelector((state) => state.auth.status);

  // Track the previous status to detect the idle/loading → succeeded transition
  const prevStatus = useRef<string>("idle");
  const hasProcessed = useRef(false);

  useEffect(() => {
    const wasNotSucceeded = prevStatus.current !== "succeeded";
    const isNowSucceeded = authStatus === "succeeded";

    // Always keep prevStatus in sync 
    prevStatus.current = authStatus;

    // Only proceed when we just crossed into "succeeded" + logged in
    if (!wasNotSucceeded || !isNowSucceeded || !isLoggedIn) return;

    // Guard against double-firing (React StrictMode / concurrent renders)
    if (hasProcessed.current) return;

    // Check if there's a pending item saved before the login redirect
    const pending = popPendingCartItem();
    if (!pending) return;

    hasProcessed.current = true;

    // Small toast helper — reusable for both success and error
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      background: "#111",
      color: "#fff",
      iconColor: "#fff",
      customClass: {
        popup: "swal-toast-popup",
      },
    });

    dispatch(addToCart(pending))
      .unwrap()
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Added to cart!",
          text: "Item successfully added to your cart.",
        });
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "Failed to add item",
          text: "Please try again.",
        });
      });
  }, [authStatus, isLoggedIn, dispatch]);

  return null;
};

export default PostLoginCartHandler;
