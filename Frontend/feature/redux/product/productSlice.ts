import { Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoriesApi, getFeaturedProduct, getLatestProduct, getProductByCategory, getProductByIdApi, searchProducts } from "./productApi";

export interface FetchProductsArgs {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total?: number;
  page?: number;
  totalPages?: number;
}

export interface CategoriesResponse {
  categories: string[];
}

export interface CategoryProductsResponse {
  products: Product[];
  total?: number;
}

export type StatusResponse = Product[];

export interface FeatureProductResponse {
  products: Product[];
}
// fetch search result 
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
// fetch product by id
export const fetchProductById = createAsyncThunk<Product, string, { rejectValue: string }>(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductByIdApi(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred while fetching product";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategories = createAsyncThunk<CategoriesResponse, void, { rejectValue: string }>(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoriesApi();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred while fetching categories";
      return rejectWithValue(errorMessage);
    }
  }
);
// fetch product by category
export const fetchProductByCategory = createAsyncThunk<CategoryProductsResponse, string, { rejectValue: string }>(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      return await getProductByCategory(category);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return rejectWithValue(errorMessage);
    }
  },
);
// fetch product by product status 
export const fetchProductByStatus = createAsyncThunk<StatusResponse, void,{rejectValue:string}>(
  "products/fetchByStatus",
  async (_, {rejectWithValue})=>{
    try {
      return await getLatestProduct()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      return rejectWithValue(errorMessage)
      
    }
  }
)
// fetch featured product
export const fetchFeaturedProduct = createAsyncThunk<FeatureProductResponse, void, {rejectValue:string}>(
  "products/fetchByFeature",
  async(_,{rejectWithValue})=>{
    try {
      return await getFeaturedProduct()
    } catch (error) {
      const errorMessage = error instanceof  Error ? error.message :" Unknown error"
      return rejectWithValue(errorMessage)
    }
  }
)

export interface ProductState {
  items: Product[];
  singleProduct: Product | null;
  categories: string[];
  total: number;
  page: number;
  totalPages: number;
  search: string;
  category: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  featuredItems: Product[];
}

const initialState: ProductState = {
  items: [],
  singleProduct: null,
  categories: [],
  total: 0,
  page: 1,
  totalPages: 0,
  search: "",
  category: "",
  status: "idle",
  error: null,
  featuredItems: [],
};
// sdde
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
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.singleProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch product";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories ?? [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch categories";
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.items = [];
        state.total = 0;
        state.page = 1;
        state.totalPages = 0;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products ?? [];
        state.total = action.payload.total ?? action.payload.products?.length ?? 0;
        state.page = 1;
        state.totalPages = 1;
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch products by category";
      })
      .addCase(fetchProductByStatus.pending, (state)=>{
        state.status ="loading"
        state.error = null
        state.items = []
        state.total = 0
        state.page = 1
        state.totalPages = 0
      })
      .addCase(fetchProductByStatus.fulfilled, (state,action)=>{
        state.status = "succeeded"
        state.items = action.payload ?? []
      })
      .addCase(fetchProductByStatus.rejected, (state,action)=>{
        state.status ="failed"
        state.error = action.payload ?? "Failed to fetch product by status"
      })
      .addCase(fetchFeaturedProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFeaturedProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.featuredItems = action.payload.products ?? [];
      })
      .addCase(fetchFeaturedProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch featured products";
      })
      
  },
});

export const { setSearch, setCategory, setPage, clearProducts } =
  productSlice.actions;

// selectors
export const selectProducts =(state: { products: ProductState }) => state.products.items;
export const selectSingleProduct = (state: { products: ProductState }) => state.products.singleProduct;
export const selectCategories = (state: { products: ProductState }) => state.products.categories;
export const selectProductStatus = (state: { products: ProductState }) => state.products.status;
export const selectProductError = (state: { products: ProductState })=> state.products.error;
export const selectProductByStatus = (state: { products: ProductState }) =>
  state.products.items;
export const selectFeaturedProducts = (state: { products: ProductState }) =>
  state.products.featuredItems;
export const selectPagination = (state: { products: ProductState }) => ({
  page: state.products.page,
  totalPages: state.products.totalPages,
  total: state.products.total,
});

export default productSlice.reducer;
