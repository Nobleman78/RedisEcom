import { demoProducts } from "@/public/DemoProducts/demoproducts";

interface ProductFilters {
  id?: string;
  category?: string;
  discount?: number;
  featured?: boolean;
  slogan?: string;
}

export function demoProductApi(filters:ProductFilters={}){
    let products = [...demoProducts]

    if(filters.id){
        products = products.filter((item)=>item._id === filters.id)
    }
    if(filters.category){
        products = products.filter((item)=>item.category.toLowerCase() === filters.category)
    }
    if(filters.discount){
        products = products.filter((item)=>item.isDiscount === filters.discount)
    }
    if(filters.featured){
        products = products.filter((item)=>item.isFeatured === filters.featured)
    }
    return products
  
}
// Function for to get all category 
export function getCategories() {
  return [...new Set(demoProducts.map((product)=>product.category))]
}
export function getSlogan(){
    return [...new Set(demoProducts.map((product)=>product.slogan))]
}