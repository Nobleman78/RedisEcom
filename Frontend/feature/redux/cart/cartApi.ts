import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBrowserClient } from "@supabase/ssr";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
  size: string | null;
  productId: string;
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

let backendSessionReady = false;
let backendSessionRequest: Promise<boolean> | null = null;

const ensureBackendSession = async () => {
  if (backendSessionReady) {
    return true;
  }

  if (backendSessionRequest) {
    return backendSessionRequest;
  }

  backendSessionRequest = (async () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
      return false;
  }

  const bridgeResponse = await fetch("/api/auth/google-login", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

    backendSessionReady = bridgeResponse.ok;
    return bridgeResponse.ok;
  })();

  try {
    return await backendSessionRequest;
  } finally {
    backendSessionRequest = null;
  }
};

const requestCart = async (input: RequestInfo | URL, init?: RequestInit) => {
  await ensureBackendSession();
  let response = await fetch(input, init);

  if (response.status !== 401) {
    return response;
  }

  backendSessionReady = false;
  if (await ensureBackendSession()) {
    response = await fetch(input, init);
  }
  return response;
};
// fetch the cart
export const fetchCart = createAsyncThunk<
  FetchCartResponse,
  void,
  { rejectValue: string }
>("cart/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await requestCart("/api/cart", {
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


// add to cart
export const addToCart = createAsyncThunk<
  FetchCartResponse,
  { productId: string; quantity: number; size?: string | null },
  { rejectValue: string }
>("cart/add", async (payload, { rejectWithValue }) => {
  try {
    const res = await requestCart("/api/cart", {
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
// update the cart quantity
export const updateCartQuantity = createAsyncThunk<
  FetchCartResponse,
  { productId: string; quantity: number; size?: string | null },
  { rejectValue: string }
>("cart/updateQuantity", async ({ productId, quantity, size = null }, { rejectWithValue }) => {
  try {
    const res = await requestCart(`/api/cart/${productId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity, size }),
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
// remove cart item
export const removeCartItem = createAsyncThunk<
  FetchCartResponse,
  { productId: string; size?: string | null },
  { rejectValue: string }
>("cart/remove", async ({ productId, size = null }, { rejectWithValue }) => {
  try {
    const res = await requestCart("/api/cart", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, size }),
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
