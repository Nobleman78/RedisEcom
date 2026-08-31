import type { Product } from "@/types/product";

export const normalizeMenuSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getUniqueValues = (
  products: Product[],
  key: "category" | "productType" | "size",
) => {
  const values = products.flatMap((product) => {
    if (key === "size") {
      return product.size ?? [];
    }

    const value = product[key];
    return value ? [value] : [];
  });

  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
};

export const sortProducts = (products: Product[], sortKey: string) => {
  const sorted = [...products];

  switch (sortKey) {
    case "alphabetically-a-z":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "alphabetically-z-a":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-low-to-high":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high-to-low":
      return sorted.sort((a, b) => b.price - a.price);
    case "date-old-to-new":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime(),
      );
    case "date-new-to-old":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      );
    case "featured":
      return sorted.sort(
        (a, b) =>
          Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false) ||
          new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime(),
      );
    case "most-relevant":
    default:
      return sorted;
  }
};

export const filterProducts = (
  products: Product[],
  productTypes: string[],
  sizes: string[],
) => {
  if (!productTypes.length && !sizes.length) {
    return products;
  }

  return products.filter((product) => {
    const matchesProductType =
      !productTypes.length || productTypes.includes(product.productType);
    const matchesSize =
      !sizes.length ||
      (product.size ?? []).some((size) => sizes.includes(size));

    return matchesProductType && matchesSize;
  });
};
