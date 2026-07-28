import { demoProducts } from "@/public/DemoProducts/demoproducts";

interface ProductFilters {
  id?: string;
  category?: string;
  discount?: number;
  featured?: boolean;
  slogan?: string;
}

export function demoProductApi(filters: ProductFilters = {}) {
  let products = [...demoProducts];

  if (filters.id) {
    products = products.filter((item) => item._id === filters.id);
  }

  if (filters.category) {
    const normalizedCategory = filters.category.trim().toLowerCase();
    products = products.filter(
      (item) => item.category.toLowerCase() === normalizedCategory
    );
  }

  if (typeof filters.discount === "number") {
    products = products.filter((item) => item.isDiscount === filters.discount);
  }

  if (typeof filters.featured === "boolean") {
    products = products.filter((item) => item.isFeatured === filters.featured);
  }

  return products;
}
// Function for to get all category 
export function getCategories() {
  return [...new Set(demoProducts.map((product)=>product.category))]
}
export function getSlogan(){
    return [...new Set(demoProducts.map((product)=>product.slogan))]
}
export function getProductById(id: string) {
  return demoProducts.find((product) => product._id === id);
}
