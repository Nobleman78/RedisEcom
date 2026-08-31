"use client";
import {
  fetchFeaturedProduct,
  fetchProductByCategory,
  fetchProductByStatus,
  selectProducts,
  selectProductStatus,
} from "@/feature/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { spaceMono } from "@/fonts/Fonts";
import { filterProducts, getUniqueValues, sortProducts } from "@/lib/productCatalog";
import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "./BreadCrumb";
import ProductGrid from "./ProductGrid";
import SortAndFilter from "./SortAndFilter";

interface Props {
  category: string;
}

const CategoryClient = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductStatus);
  const [sortValue, setSortValue] = useState("most-relevant");
  const [draftProductTypes, setDraftProductTypes] = useState<string[]>([]);
  const [draftSizes, setDraftSizes] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const isFeatured = category.toLowerCase() === "featured";
  const isLatest = category.toLowerCase() === "latest";

  useEffect(() => {
    setDraftProductTypes([]);
    setDraftSizes([]);
    setSelectedProductTypes([]);
    setSelectedSizes([]);
    setSortValue("most-relevant");
  }, [category, isFeatured, isLatest]);

  useEffect(() => {
    if (isFeatured) {
      dispatch(fetchFeaturedProduct());
    } else {
      dispatch(fetchProductByCategory(category));
    }
  }, [category, isFeatured, dispatch]);

  useEffect(() => {
    if (isLatest) {
      dispatch(fetchProductByStatus());
    }
  }, [dispatch, isLatest]);

  const availableProductTypes = useMemo(
    () => getUniqueValues(products, "productType"),
    [products],
  );
  const availableSizes = useMemo(() => getUniqueValues(products, "size"), [products]);

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(products, selectedProductTypes, selectedSizes);
    return sortProducts(filtered, sortValue);
  }, [products, selectedProductTypes, selectedSizes, sortValue]);

  const slogan = isFeatured
    ? "Discover our handpicked featured items!"
    : "Find the best deals on our products!";

  const displayCategory = isFeatured
    ? "Featured Products"
    : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mt-32">
      <Breadcrumb displayCategory={displayCategory} />

      <hr className="text-gray-200 my-3" />

      <div className="border-b border-gray-200">
        <p
          className={`text-center pb-3 max-w-4xl mx-auto ${spaceMono.className}`}
        >
          {displayCategory} - {slogan}
        </p>
      </div>

      <SortAndFilter
        totalProducts={visibleProducts.length}
        productTypes={availableProductTypes}
        sizes={availableSizes}
        selectedProductTypes={draftProductTypes}
        selectedSizes={draftSizes}
        onSortChange={setSortValue}
        onApplyFilters={() => {
          setSelectedProductTypes(draftProductTypes);
          setSelectedSizes(draftSizes);
        }}
        onToggleProductType={(value) =>
          setDraftProductTypes((prev) =>
            prev.includes(value)
              ? prev.filter((item) => item !== value)
              : [...prev, value],
          )
        }
        onToggleSize={(value) =>
          setDraftSizes((prev) =>
            prev.includes(value)
              ? prev.filter((item) => item !== value)
              : [...prev, value],
          )
        }
      />

      {status === "loading" ? (
        <div
          className={`flex h-60 items-center justify-center text-center text-gray-500 ${spaceMono.className}`}
        >
          Loading products...
        </div>
      ) : (
        <ProductGrid products={visibleProducts} />
      )}
    </div>
  );
};

export default CategoryClient;
