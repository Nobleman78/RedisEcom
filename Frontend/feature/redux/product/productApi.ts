// write the search logic here
const PRODUCTS_URL = "/api/products";

export async function searchProducts({
  search = "",
  category = "",
  page = 1,
  limit = 20,
} : {
  search?:string;
  category?:string;
  page?:number;
  limit?:number
}) {
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }
  if (category) {
    params.set("category", category);
  }
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
