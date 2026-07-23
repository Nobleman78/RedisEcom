// write the search logic here
const PRODUCTS_URL = "/api/products";

export async function searchProducts({
  search = "",
  category = "",
  page = 1,
  limit = 20,
} = {}) {
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }
  if (category) {
    params.set("category", category);
  }
  params.set("page", page);
  params.set("limit", limit);

  const res = await fetch(`${PRODUCTS_URL}?${params.toString()}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to search products: ${res.status} ${text}`);
  }
  return res.json();
}
