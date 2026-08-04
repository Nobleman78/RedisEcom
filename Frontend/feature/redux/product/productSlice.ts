import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "./productApi";

export interface FetchProductsArgs {
  search?: string;
  category?: string;
  page?: number;
  limit?: number; 
}
// Thunk: fetch a page of products (with optional search/category)
export const fetchProducts = createAsyncThunk<Awaited<ReturnType<typeof searchProducts>>,FetchProductsArgs,{ rejectValue: string }>(
  "products/fetch",
  async (
    { search = "", category = "", page = 1, limit = 20 } = {},
    { rejectWithValue },
  ) => {
    try {
      // returns { products, total, page, totalPages }
      return await searchProducts({ search, category, page, limit });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred while fetching products";
      return rejectWithValue(errorMessage);
    }
  },
);

export interface ProductState {
  items:[];
  total : number;
  page :number;
  totalPages: number;
  search :string;
  category :string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  total: 0,
  page: 1,
  totalPages: 0,
  search: "",
  category: "",
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1; // reset to first page on a new search
    },
    setCategory(state, action) {
      state.category = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearProducts() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products ?? [];
        state.total = action.payload.total ?? 0;
        state.page = action.payload.page ?? 1;
        state.totalPages = action.payload.totalPages ?? 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch products";
      });
  },
});

export const { setSearch, setCategory, setPage, clearProducts } =
  productSlice.actions;

// selectors
export const selectProducts =(state: { products: ProductState }) => state.products.items;
export const selectProductStatus = (state: { products: ProductState }) => state.products.status;
export const selectProductError = (state: { products: ProductState })=> state.products.error;
export const selectPagination = (state: { products: ProductState }) => ({
  page: state.products.page,
  totalPages: state.products.totalPages,
  total: state.products.total,
});

export default productSlice.reducer;
