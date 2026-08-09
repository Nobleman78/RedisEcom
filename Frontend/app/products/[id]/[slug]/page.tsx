"use client";

import BreadCrumb from "./BreadCrumb";
import ProductDetails from "./ProductDetails";
import RelatedProduct from "./RelatedProduct";
import { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { fetchProductById, selectSingleProduct } from "@/feature/redux/product/productSlice";

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default function ProductPage({ params }: Props) {
  const { id, slug } = use(params);
  
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSingleProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const category = product?.category;
  const name = product?.name;
  const description = product?.description;
  const price = product?.price;
  const size = product?.size?.map((size: string) => size);
  const img = product?.image;
  const discount = product?.isDiscount ?? false;

  // We have to handle the edge case also
  if (!category) {
    return <div>Product not found</div>;
  }
  if (!name) {
    return <div>Name not found</div>;
  }
  if (!price) {
    return <div>Price not found</div>;
  }
  if (!description) {
    return <div>Description not found</div>;
  }
  if (!img) {
    return <div>Image not found</div>;
  }
  if (!discount) {
    return <div>Please add a valid discount</div>;
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
        image={img}
        discount={Number(discount)}
      />
      <RelatedProduct category={category} />
    </div>
  );
}
