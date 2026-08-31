// write the search logic here
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
  limit?: number
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


export async function getProductByCategory(category:string){
  const result = await fetch(`${PRODUCTS_URL}/category/${category}`,{
    credentials:"include"
  })
  if(!result.ok){
    const text = await result.text().catch(()=>"")
    throw new Error(`Failed to fetch product by category: ${result.status} ${text}`)
  }
  return result.json()

}
export async function getProductByIdApi(id: string) {
  const res = await fetch(`${PRODUCTS_URL}/${id}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch product: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getCategoriesApi() {
  const res = await fetch(`${PRODUCTS_URL}/categories`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch categories: ${res.status} ${text}`);
  }
  return res.json();
}
export async function getLatestProduct(){
  const res = await fetch(`${PRODUCTS_URL}/latest`,{
    credentials:"include"
  })
  if(!res.ok){
    const text = await res.text().catch(()=>"");
    throw new Error(`Failed to fetch latest product: ${res.status} ${text}`)
  }
  return res.json()
}

export async function getFeaturedProduct(){
  const res = await fetch(`${PRODUCTS_URL}/featured`,{
    credentials:"include"
  })
  if(!res.ok){
    const text = await res.text().catch(()=>"")
    throw new Error(`Failed to fetch featured product : ${res.status} ${text}`)
  }
  return res.json()
}
