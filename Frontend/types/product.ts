export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  size?: string[];
  isDiscount: number;
  isFeatured?: boolean;
  productType:string
}