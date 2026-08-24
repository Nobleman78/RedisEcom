"use client";

import {
  fetchProductById,
  selectProductStatus,
  selectSingleProduct,
} from "@/feature/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import ProductDetails from "./ProductDetails";
import RelatedProduct from "./RelatedProduct";

interface Props {
  id: string;
}

export default function ProductClient({ id }: Props) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSingleProduct);
  const status = useAppSelector(selectProductStatus);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const isProductForCurrentRoute = product?._id === id;

  if (
    !isProductForCurrentRoute &&
    (status === "loading" || status === "idle")
  ) {
    return <div>Loading product...</div>;
  }

  if (!isProductForCurrentRoute || !product) {
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
