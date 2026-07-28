import { spaceMono } from "@/fonts/Fonts";
import Breadcrumb from "./BreadCrumb";
import ProductGrid from "./ProductGrid";
import SortAndFilter from "./SortAndFilter";

import {
  demoProductApi,
  getSlogan,
} from "@/hook/demoProductApiHook/demoProductApi";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const products = demoProductApi({ category });
  const slogan = getSlogan();

  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mt-32">
      <Breadcrumb displayCategory={displayCategory} />

      <hr className="text-gray-200 my-3" />

      <div className="border-b border-gray-200">
        <p
          className={`text-center pb-3 max-w-4xl mx-auto ${spaceMono.className}`}
        >
          {displayCategory} {slogan}
        </p>
      </div>

      <SortAndFilter totalProducts={products.length} />

      <ProductGrid products={products} />
    </div>
  );
}
