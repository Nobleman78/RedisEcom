import { spaceMono } from "@/fonts/Fonts";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <section className="grid grid-cols-3 mx-10 my-10 gap-10">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/products/${product._id}/${product.name
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          className={`text-center ${spaceMono.className}`}
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src={product.image}
              fill
              alt={product.name}
              className="object-cover"
              priority={true}
            />
          </div>

          <div className="mt-2">
            <h2>{product.name}</h2>

            <h3>${product.price}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
}
