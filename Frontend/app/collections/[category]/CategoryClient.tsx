"use client";
import { ProductGridSkeleton } from "@/components/ui/ProductSkeleton";
import {
  useGetFeaturedProductsQuery,
  useGetLatestProductsQuery,
  useGetProductsByCategoryQuery,
  useGetSaleProductsQuery,
} from "@/feature/redux/product/productApi";
import { spaceMono } from "@/fonts/Fonts";
import {
  filterProducts,
  getUniqueValues,
  sortProducts,
} from "@/lib/productCatalog";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Breadcrumb from "./BreadCrumb";
import ProductGrid from "./ProductGrid";
import SortAndFilter from "./SortAndFilter";

interface Props {
  category: string;
}

const CategoryClient = ({ category }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Compute initial filter state from URL params
  const initialFilters = useMemo(() => {
    const sortParam = searchParams.get("sort") || "most-relevant";
    const typeParam = searchParams.get("type");
    const sizeParam = searchParams.get("size");

    return {
      sort: sortParam,
      types: typeParam ? typeParam.split(",") : [],
      sizes: sizeParam ? sizeParam.split(",") : [],
    };
  }, [searchParams]);

  const [sortValue, setSortValue] = useState(initialFilters.sort);
  const [draftProductTypes, setDraftProductTypes] = useState<string[]>(
    initialFilters.types,
  );
  const [draftSizes, setDraftSizes] = useState<string[]>(initialFilters.sizes);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    initialFilters.types,
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialFilters.sizes,
  );

  const isFeatured = category.toLowerCase() === "featured";
  const isLatest = category.toLowerCase() === "latest";
  const isSales = category.toLowerCase() === "sale";
  const isRegularCategory = !isFeatured && !isLatest && !isSales;

  const featuredQuery = useGetFeaturedProductsQuery(undefined, {
    skip: !isFeatured,
  });
  const latestQuery = useGetLatestProductsQuery(undefined, {
    skip: !isLatest,
  });
  const categoryQuery = useGetProductsByCategoryQuery(category, {
    skip: !isRegularCategory,
  });
  const salesQuery = useGetSaleProductsQuery(undefined, {
    skip: !isSales,
  });

  const products = useMemo(() => {
    if (isFeatured) {
      return featuredQuery.data?.products ?? [];
    }
    if (isLatest) {
      return latestQuery.data ?? [];
    }
    if (isSales) {
      return salesQuery.data?.products ?? [];
    }
    return categoryQuery.data?.products ?? [];
  }, [
    isFeatured,
    isLatest,
    isSales,
    featuredQuery.data,
    latestQuery.data,
    salesQuery.data,
    categoryQuery.data,
  ]);

  const isLoading =
    (isFeatured && !featuredQuery.isSuccess) ||
    (isLatest && !latestQuery.isSuccess) ||
    (isSales && !salesQuery.isSuccess) ||
    (isRegularCategory && !categoryQuery.isSuccess);

  const availableProductTypes = useMemo(
    () => getUniqueValues(products, "productType"),
    [products],
  );
  const availableSizes = useMemo(
    () => getUniqueValues(products, "size"),
    [products],
  );

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(
      products,
      selectedProductTypes,
      selectedSizes,
    );
    return sortProducts(filtered, sortValue);
  }, [products, selectedProductTypes, selectedSizes, sortValue]);

  const slogan = isFeatured
    ? "Discover our handpicked featured items!"
    : isSales
      ? "Check out our exclusive sales!"
      : "Find the best deals on our products!";

  const displayCategory = isFeatured
    ? "Featured Products"
    : isSales
      ? "Sale"
      : category.charAt(0).toUpperCase() + category.slice(1);

  // Helper function to update URL with current filters
  const updateUrlParams = (sort: string, types: string[], sizes: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (sort && sort !== "most-relevant") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    if (types.length > 0) {
      params.set("type", types.join(","));
    } else {
      params.delete("type");
    }

    if (sizes.length > 0) {
      params.set("size", sizes.join(","));
    } else {
      params.delete("size");
    }

    const queryString = params.toString();
    const url = queryString
      ? `/collections/${category}?${queryString}`
      : `/collections/${category}`;

    router.push(url);
  };

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
        onSortChange={(value) => {
          setSortValue(value);
          updateUrlParams(value, draftProductTypes, draftSizes);
        }}
        onApplyFilters={() => {
          setSelectedProductTypes(draftProductTypes);
          setSelectedSizes(draftSizes);
          updateUrlParams(sortValue, draftProductTypes, draftSizes);
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

      {isLoading ? (
        <ProductGridSkeleton count={6} />
      ) : (
        <ProductGrid products={visibleProducts} />
      )}
    </div>
  );
};

export default CategoryClient;
