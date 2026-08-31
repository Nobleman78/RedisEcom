"use client";

import { useGetProductByIdQuery } from "@/feature/redux/product/productApi";
import BreadCrumb from "./BreadCrumb";
import ProductDetails from "./ProductDetails";
import RelatedProduct from "./RelatedProduct";

interface Props {
  id: string;
}

export default function ProductClient({ id }: Props) {
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { category, name, description, price, image } = product;
  const size = product.size ?? [];
  const discount = product.isDiscount ?? false;

  if (!category || !name || price == null || !description || !image) {
    return <div>Product data is incomplete</div>;
  }

  return (
    <div className="mt-32">
      <BreadCrumb category={category} name={name} />
      <ProductDetails
        id={id}
        category={category}
        name={name}
        description={description}
        price={price}
        size={size}
        image={image}
        discount={Number(discount)}
      />
      <RelatedProduct category={category} />
    </div>
  );
}
