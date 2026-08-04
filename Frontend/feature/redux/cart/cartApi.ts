import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export interface FetchCartResponse {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

const parseResponse = async (res: Response) => {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Cart request failed: ${res.status} ${text}`);
  }
  return (await res.json()) as FetchCartResponse;
};

export const fetchCart = createAsyncThunk<
  FetchCartResponse,
  void,
  { rejectValue: string }
>("cart/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/cart", {
      credentials: "include",
    });
    return await parseResponse(res);
  } catch (err) {
    return rejectWithValue(
      err instanceof Error
        ? err.message
        : "Unknown error occurred while fetching cart",
    );
  }
});

export const addToCart = createAsyncThunk<
  FetchCartResponse,
  { productId: string; quantity: number },
  { rejectValue: string }
>("cart/add", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await parseResponse(res);
  } catch (err) {
    return rejectWithValue(
      err instanceof Error
        ? err.message
        : "Unknown error occurred while adding to cart",
    );
  }
});

export const updateCartQuantity = createAsyncThunk<
  FetchCartResponse,
  { productId: string; quantity: number },
  { rejectValue: string }
>("cart/updateQuantity", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/cart/${productId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    return await parseResponse(res);
  } catch (err) {
    return rejectWithValue(
      err instanceof Error
        ? err.message
        : "Unknown error occurred while updating cart quantity",
    );
  }
});

export const removeCartItem = createAsyncThunk<
  FetchCartResponse,
  { productId: string },
  { rejectValue: string }
>("cart/remove", async ({ productId }, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    return await parseResponse(res);
  } catch (err) {
    return rejectWithValue(
      err instanceof Error
        ? err.message
        : "Unknown error occurred while removing cart item",
    );
  }
});
