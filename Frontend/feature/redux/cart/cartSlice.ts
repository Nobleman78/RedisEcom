import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCart,
  removeCartItem,
  updateCartQuantity,
} from "./cartApi";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
  size: string | null;
  productId: string;
}

export interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  shipping: number;
  totalAmount: number;
  totalQuantity: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  shipping: 0,
  totalAmount: 0,
  totalQuantity: 0,
  status: "idle",
  error: null,
};

const updateCartState = (
  state: CartState,
  payload: {
    cartItems: CartItem[];
    totalPrice: number;
    totalQuantity: number;
  },
) => {
  state.cartItems = payload.cartItems ?? [];
  state.totalPrice = payload.totalPrice ?? 0;
  state.shipping = state.cartItems.length > 0 ? 10 : 0;
  state.totalAmount = state.totalPrice + state.shipping;
  state.totalQuantity = payload.totalQuantity ?? 0;
  state.status = "succeeded";
  state.error = null;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Synchronously resets cart to empty — dispatched on logout so the
    // count drops to 0 immediately without waiting for a page reload.
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.shipping = 0;
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        updateCartState(state, action.payload);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        updateCartState(state, action.payload);
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        updateCartState(state, action.payload);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        updateCartState(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;