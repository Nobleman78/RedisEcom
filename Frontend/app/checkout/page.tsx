"use client";

import { fetchCart } from "@/feature/redux/cart/cartApi";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { spaceMono } from "@/fonts/Fonts";
import Image from "next/image";
import { useEffect } from "react";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalPrice, shipping, totalAmount } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <main className="min-h-screen  px-5 pb-16 pt-28 mt-20 text-black sm:px-8 sm:pt-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between border-b border-gray-300 pb-5">
          <div>
            <h1
              className={`${spaceMono.className} text-2xl uppercase tracking-tight sm:text-4xl lg:text-5xl`}
            >
              Checkout
            </h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:gap-10">
          <section>
            <div className="mb-8 flex items-center justify-between">
              <h2
                className={`${spaceMono.className} text-sm uppercase tracking-widest`}
              >
                Your order
              </h2>
              <span className={`${spaceMono.className} text-xs text-gray-500`}>
                {cartItems.length} items
              </span>
            </div>

            <div className="divide-y divide-gray-300 border-y border-gray-300">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-5 py-6">
                    <div className="h-28 w-24 shrink-0 overflow-hidden bg-gray-200">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={160}
                        height={180}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between gap-4">
                      <div>
                        <h3
                          className={`${spaceMono.className} text-lg uppercase`}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={`${spaceMono.className} mt-3 text-xs uppercase text-gray-500`}
                        >
                          Size: {item.size ?? "One size"}
                        </p>
                        <p
                          className={`${spaceMono.className} mt-1 text-xs uppercase text-gray-500`}
                        >
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className={`${spaceMono.className} text-sm`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p
                  className={`${spaceMono.className} py-12 text-sm uppercase text-gray-500`}
                >
                  Your cart is empty
                </p>
              )}
            </div>
          </section>

          <aside className="h-fit bg-black border border-gray-50 text-white p-6 sm:p-8">
            <h2
              className={`${spaceMono.className} mb-8 text-sm uppercase tracking-widest`}
            >
              Order summary
            </h2>
            <div
              className={`${spaceMono.className} space-y-4 text-xs uppercase`}
            >
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between ">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="my-8 border-t border-gray-300" />
            <div className="mb-8 flex items-center justify-between">
              <span className={`${spaceMono.className} text-sm uppercase`}>
                Total
              </span>
              <span className={`${spaceMono.className} text-xl sm:text-2xl`}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              className={`${spaceMono.className} cursor-pointer w-full bg-white px-5 py-4 text-xs uppercase tracking-[0.18em]  text-black`}
            >
              Pay with Stripe
            </button>
            <p
              className={`${spaceMono.className} mt-5 text-center text-[10px] uppercase leading-relaxed `}
            >
              Payment details will be collected securely.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
