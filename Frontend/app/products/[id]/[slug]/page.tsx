"use client";

import BreadCrumb from "./BreadCrumb";
import ProductDetails from "./ProductDetails";
import RelatedProduct from "./RelatedProduct";
import { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import {
  fetchProductById,
  selectProductStatus,
  selectSingleProduct,
} from "@/feature/redux/product/productSlice";

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);

  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSingleProduct);
  const status = useAppSelector(selectProductStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (!product && (status === "loading" || status === "idle")) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const category = product.category;
  const name = product.name;
  const description = product.description;
  const price = product.price;
  const size = product.size?.map((size: string) => size) ?? [];
  const img = product.image;
  const discount = product.isDiscount ?? false;

  if (!category || !name || price == null || !description || !img) {
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
        image={img}
        discount={Number(discount)}
      />
      <RelatedProduct category={category} />
    </div>
  );
}
