import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types/product";

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

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products",
  }),
  tagTypes: ["Products", "Product", "Categories"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, FetchProductsArgs | void>({
      query: (params = {}) => {
        const queryParams: Record<string, string | number> = {};
        if (params?.search) queryParams.search = params.search;
        if (params?.category) queryParams.category = params.category;
        if (params?.page !== undefined) queryParams.page = params.page;
        if (params?.limit !== undefined) queryParams.limit = params.limit;
        return {
          url: "",
          params: queryParams,
        };
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Products" as const, id: "LIST" },
            ]
          : [{ type: "Products" as const, id: "LIST" }],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    getProductsByCategory: builder.query<CategoryProductsResponse, string>({
      query: (category) => `/category/${category}`,
      providesTags: (result, error, category) => [
        { type: "Products", id: `CATEGORY_${category}` },
      ],
    }),

    getLatestProducts: builder.query<Product[], void>({
      query: () => "/latest",
      providesTags: [{ type: "Products", id: "LATEST" }],
    }),

    getFeaturedProducts: builder.query<FeatureProductResponse, void>({
      query: () => "/featured",
      providesTags: [{ type: "Products", id: "FEATURED" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetLatestProductsQuery,
  useGetFeaturedProductsQuery,
} = productApi;

// Backwards-compatible async helper functions
const PRODUCTS_URL = "/api/products";

export async function searchProducts({
  search = "",
  category = "",
  page = 1,
  limit = 20,
}: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
} = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  params.set("page", String(page));
  params.set("limit", String(limit));

  const res = await fetch(`${PRODUCTS_URL}?${params.toString()}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to search products: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getProductByCategory(
  category: string,
): Promise<CategoryProductsResponse> {
  const result = await fetch(`${PRODUCTS_URL}/category/${category}`, {
    credentials: "include",
  });
  if (!result.ok) {
    const text = await result.text().catch(() => "");
    throw new Error(
      `Failed to fetch product by category: ${result.status} ${text}`,
    );
  }
  return result.json();
}

export async function getProductByIdApi(id: string): Promise<Product> {
  const res = await fetch(`${PRODUCTS_URL}/${id}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch product: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getCategoriesApi(): Promise<CategoriesResponse> {
  const res = await fetch(`${PRODUCTS_URL}/categories`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch categories: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getLatestProduct(): Promise<Product[]> {
  const res = await fetch(`${PRODUCTS_URL}/latest`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch latest product: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getFeaturedProduct(): Promise<FeatureProductResponse> {
  const res = await fetch(`${PRODUCTS_URL}/featured`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch featured product : ${res.status} ${text}`);
  }
  return res.json();
}
