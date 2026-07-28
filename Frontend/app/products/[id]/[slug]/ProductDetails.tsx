"use client";
import { spaceMono } from "@/fonts/Fonts";
import { terms } from "@/public/terms/terms";
import Image from "next/image";
import { useState } from "react";

interface Props {
  category: string;
  name: string;
  description: string;
  price: number;
  size?: string[];
  image: string;
  discount: number;
}

const ProductDetails = ({
  category,
  price,
  description,
  name,
  size = [],
  image,
  discount,
}: Props) => {
  const [isSelectedSize, setIsSelectedSize] = useState(size[0]);
  const [productItem, setProductItem] = useState(1);
  const [openTerm, setOpenTerm] = useState<keyof typeof terms | null>(null);

  const handleOpenTermsForShippingAndTax = (term: keyof typeof terms) => {
    setOpenTerm((prev) => (prev === term ? null : term));
  };
  // event handler for productItem update
  const plusProduct = () => {
    setProductItem((prev) => prev + 1);
  };
  const minusProduct = () => {
    if (productItem > 0) {
      setProductItem((prev) => prev - 1);
    }
  };

  return (
    <div className="border-b border-gray-300 py-5">
      <div className="max-w-6xl mx-auto flex flex-row gap-20 my-10 ">
        <div>
          <Image src={image} alt={name} height={1000} width={1000} />
        </div>
        <div className={`${spaceMono.className}`}>
          <h2 className="text-2xl mb-2">{name}</h2>
          <div className="flex flex-row items-center gap-3">
            <p className="text-xl text-gray-500 mb-1 text-red-400">
              ${(price * discount) / 100}
            </p>
            <p className="text-lg line-through text-gray-500 mb-1 ">${price}</p>
          </div>
          <h2 className="text-md text-gray-600 mb-5">{category}</h2>
          <p className="mb-10">{description}</p>

          {/* Render sizes safely with interactivity */}
          {size.length > 0 && (
            <div>
              <h3 className="mb-5">Size:</h3>
              <div className="flex gap-2">
                {size.map((item) => {
                  const isActive = isSelectedSize === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setIsSelectedSize(item)}
                      className={`px-5 py-1 border  cursor-pointer ${
                        isActive ? "border-black " : "border-gray-300 "
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* Plus and minus button */}
          <div className="mt-10 flex gap-5">
            <button className="text-2xl cursor-pointer" onClick={minusProduct}>
              -
            </button>
            <span className="border px-5 py-2">{productItem}</span>
            <button className="cursor-pointer" onClick={plusProduct}>
              +
            </button>
          </div>

          {/* add to cart and buy now */}
          <div className="flex flex-col gap-5 mt-10">
            <button className="border-2 px-5 py-3 cursor-pointer hover:text-white hover:bg-black">
              ADD TO CART
            </button>
            <button className="bg-black text-white px-5 py-3 cursor-pointer">
              BUY NOW
            </button>
          </div>

          {/* Shipping and return tearm and conditions */}
          <div>
            <div className="border-t mt-10 border-b">
              <div className="flex items-center justify-between">
                <h2 className="uppercase py-2">Shipping & Returns</h2>
                <button
                  onClick={() => handleOpenTermsForShippingAndTax("shipping")}
                  className="cursor-pointer text-xl"
                >
                  {openTerm === "shipping" ? "-" : "+"}
                </button>
              </div>

              {openTerm === "shipping" && (
                <p className="pb-4 whitespace-pre-line text-sm text-gray-600 max-w-md mx-auto">
                  {terms.shipping}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="uppercase py-2">Tax</h2>
                <button
                  onClick={() => handleOpenTermsForShippingAndTax("tax")}
                  className="cursor-pointer text-xl"
                >
                  {openTerm === "tax" ? "-" : "+"}
                </button>
              </div>

              {openTerm === "tax" && (
                <p className="pb-4 whitespace-pre-line text-sm text-gray-600 max-w-md mx-auto">
                  {terms.tax}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
