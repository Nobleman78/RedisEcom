"use client";
import { logoutAction } from "@/app/actions/auth";
import { fetchAuthProfile } from "@/feature/api/apiSlice";
import { clearAuth } from "@/feature/redux/auth/authSlice";
import {
  addToCart,
  fetchCart,
  removeCartItem,
  updateCartQuantity,
} from "@/feature/redux/cart/cartApi";
import type { CartItem } from "@/feature/redux/cart/cartSlice";
import { clearCart } from "@/feature/redux/cart/cartSlice";
import { searchProducts } from "@/feature/redux/product/productApi";
import {
  fetchCategories,
  selectCategories,
} from "@/feature/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { Eurostil, Nimbus, spaceMono } from "@/fonts/Fonts";
import { popPendingCartItem } from "@/hook/useCartGuard";
import { normalizeMenuSlug } from "@/lib/productCatalog";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  FiArrowLeft,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";
import Search from "../search/Search";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItems);
  const menuCategories = useAppSelector(selectCategories);
  const [menuBrands, setMenuBrands] = useState<string[]>([]);

  // ── Auth: read from Redux global state ─────────────────────────────────────
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  // Re-fetch auth profile on every route change so login/logout redirects
  // immediately update the Navbar (and any other subscriber) via Redux.
  useEffect(() => {
    dispatch(fetchAuthProfile());
  }, [dispatch, pathname]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    const loadBrandOptions = async () => {
      try {
        const data = await searchProducts({ page: 1, limit: 200 });
        if (!isMounted) return;

        const productList = (data.products ?? []) as Product[];
        const uniqueBrands = Array.from(
          new Set(
            productList
              .map((product) => product.productType)
              .filter(
                (value): value is string =>
                  typeof value === "string" && value.trim().length > 0,
              ),
          ),
        ) as string[];

        setMenuBrands(uniqueBrands.sort((a, b) => a.localeCompare(b)));
      } catch {
        if (isMounted) {
          setMenuBrands([]);
        }
      }
    };

    loadBrandOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Replay any pending cart item saved before the guest was redirected to login
  useEffect(() => {
    if (!isLoggedIn) return;
    const pending = popPendingCartItem();
    if (pending) {
      dispatch(addToCart(pending))
        .unwrap()
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: typeof error === "string" ? error : "Could not add to cart",
          });
        });
    }
  }, [isLoggedIn, dispatch]);

  const navs = [{ label: "SEARCH" }, { label: "CART" }];

  const menuItemsOne = [
    { label: "LATEST", href: "/collections/latest" },
    {
      label: "BRAND",
      dropdown: menuBrands.length > 0 ? menuBrands : ["Featured"],
    },
    {
      label: "CATEGORIES",
      dropdown:
        menuCategories.length > 0
          ? menuCategories
          : ["Accessories", "Footwear", "T-Shirts", "Outerwear"],
    },
    {
      label: "Collections",
      href: "/collections",
    },
  ];
  const menuItemsTwo = [
    {
      label: "SALE",
      href: "/collections/sale",
    },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];
  const [isOpenMenubar, setIsOpenMenubar] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const active = isOpenMenubar || isSearchOpen || isCartOpen || isAccountOpen;
    const scrolly = window.scrollY;

    if (active) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrolly}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrolly);
      };
    }
    return undefined;
  }, [isOpenMenubar, isSearchOpen, isCartOpen, isAccountOpen]);

  const toggleMenuBar = () => {
    setActiveDropdown(null);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isCartOpen) setIsCartOpen(false);
    if (isAccountOpen) setIsAccountOpen(false);
    setIsOpenMenubar((prev) => !prev);
  };

  const openSearch = () => {
    setIsOpenMenubar(false);
    setIsCartOpen(false);
    setIsAccountOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const openCart = () => {
    setIsOpenMenubar(false);
    setIsSearchOpen(false);
    setIsAccountOpen(false);
    setActiveDropdown(null);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openAccount = () => {
    setIsOpenMenubar(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setActiveDropdown(null);
    setIsAccountOpen(true);
  };

  const closeAccount = () => {
    setIsAccountOpen(false);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleQuantityChange = (
    productId: string,
    quantity: number,
    size: string | null,
  ) => {
    if (quantity <= 0) {
      dispatch(removeCartItem({ productId, size }));
      return;
    }

    dispatch(updateCartQuantity({ productId, quantity, size }));
  };

  return (
    <div className="fixed left-0 top-0 z-100 w-full bg-black text-white shadow-sm">
      <div className="flex flex-col items-center justify-center">
        <button className="group  mt-5 cursor-pointer text-center text-xs italic">
          <span className="block">SUMMER SALE - NOW UP TO 50% OFF</span>
          <span className="mt-1 block h-px w-full overflow-hidden">
            <span className="block h-full w-full bg-white transition-all duration-500 group-hover:w-0" />
          </span>
        </button>
      </div>

      <div className="mx-4 md:mx-8 flex items-center justify-between py-5">
        <div className="flex-1 flex justify-start">
          <button
            className="rounded-full p-2 transition"
            aria-expanded={isOpenMenubar}
            aria-controls="mobile-menu"
            onClick={toggleMenuBar}
          >
            <FiMenu size={25} className="cursor-pointer" />
          </button>
        </div>

        <div className="flex-none text-center">
          <Link
            href="/"
            onClick={() => router.push("/")}
            className={`${Eurostil.className} cursor-pointer text-xl lg:text-4xl`}
          >
            NEVER NEVER
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Open search"
            className="flex items-center gap-2 rounded-full p-2 transition hover:bg-white/10 lg:hidden"
          >
            <FiSearch size={20} />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className="flex items-center gap-2 rounded-full p-2 transition hover:bg-white/10 lg:hidden"
          >
            <FiShoppingBag size={20} />
          </button>

          <div className="hidden items-center gap-3 lg:gap-5 lg:flex">
            {navs.map((nav, index) => (
              <div key={index}>
                {nav.label === "SEARCH" ? (
                  <button
                    type="button"
                    onClick={openSearch}
                    className={`${spaceMono.className} cursor-pointer text-sm lg:text-base`}
                  >
                    SEARCH
                  </button>
                ) : (
                  <button
                    onClick={openCart}
                    className={`${spaceMono.className} cursor-pointer text-sm lg:text-base`}
                  >
                    {`CART (${cartCount})`}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpenMenubar || isSearchOpen || isCartOpen || isAccountOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => {
          if (isSearchOpen) closeSearch();
          if (isOpenMenubar) toggleMenuBar();
          if (isCartOpen) closeCart();
          if (isAccountOpen) closeAccount();
        }}
      />

      {isSearchOpen && (
        <div className="fixed inset-x-0 top-27.5 z-50 mx-auto w-full bg-black  border-t border-gray-500 ">
          <div className=" flex flex-row items-center p-6 shadow-2xl gap-10 mx-5">
            <FaSearch size={20} />
            <Search onProductSelect={closeSearch} />
          </div>
        </div>
      )}

      <aside
        id="mobile-menu"
        className={`fixed left-0 top-0 z-50 flex h-full w-[85vw] max-w-sm flex-col bg-black p-6 shadow-2xl transition-all duration-300 ${
          isOpenMenubar
            ? "translate-x-0 opacity-100"
            : "-translate-x-full pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMenuBar}
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label="Close menu"
          >
            <FiX size={30} className="cursor-pointer" />
          </button>
        </div>
        {/* Menubar One */}
        <nav className="mt-15 flex flex-col gap-3">
          {menuItemsOne.map((item) => {
            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpenMenubar(false)}
                  className={`${Nimbus.className} rounded-md px-2 py-2 text-base uppercase tracking-wide transition-all duration-500 ease-out hover:text-gray-400 sm:py-2 sm:text-xl ${
                    isOpenMenubar
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.label)}
                  className={`${Nimbus.className} w-full cursor-pointer rounded-md px-2 py-2 text-left text-base uppercase tracking-wide transition-all duration-500 ease-out hover:text-gray-400 sm:py-2 sm:text-xl ${
                    isOpenMenubar
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </nav>
        {/* Menubar two */}
        {user ? (
          <button
            type="button"
            onClick={() => {
              setIsOpenMenubar(false);
              openAccount();
            }}
            className={`md:hidden ${Nimbus.className} mt-15 rounded px-2 py-2 text-left text-base uppercase tracking-wide transition-all duration-500 ease-out hover:text-gray-400 sm:text-xl ${
              isOpenMenubar
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            ACCOUNT
          </button>
        ) : (
          <Link
            href="/login"
            onClick={() => setIsOpenMenubar(false)}
            className={`md:hidden ${Nimbus.className} mt-15 rounded px-2 py-2 text-left text-base uppercase tracking-wide transition-all duration-500 ease-out hover:text-gray-400 sm:text-xl ${
              isOpenMenubar
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            LOGIN
          </Link>
        )}

        <nav className="mt-15 flex flex-col gap-3">
          {menuItemsTwo.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpenMenubar(false)}
              className={`${Nimbus.className} rounded px-2 py-2 text-base tracking-wide transition-all duration-500 ease-out hover:text-gray-400 sm:text-xl ${
                isOpenMenubar
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* dropdown menu */}
        {activeDropdown && (
          <div className="absolute left-0 sm:left-full top-0 z-50 flex h-full w-full sm:w-[85vw] sm:max-w-sm flex-col gap-4 overflow-y-auto border-l border-white/10 bg-black p-8 text-left shadow-2xl">
            <button
              onClick={() => setActiveDropdown(null)}
              className="sm:hidden text-gray-400 text-sm uppercase mb-4 text-left hover:text-white flex items-center gap-2"
            >
              <FiArrowLeft size={16} /> BACK
            </button>
            <div className="grid gap-4 text-base font-semibold uppercase text-white sm:text-lg">
              {menuItemsOne
                .find((item) => item.label === activeDropdown)
                ?.dropdown?.map((dropdownItem) => (
                  <Link
                    key={dropdownItem}
                    href={`/collections/${normalizeMenuSlug(dropdownItem)}`}
                    onClick={() => setIsOpenMenubar(false)}
                    className={`${Nimbus.className} transition hover:text-gray-300`}
                  >
                    {dropdownItem}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </aside>

      {/* ── Account Drawer ─────────────────────────────────────────────── */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-black text-white shadow-2xl transition-all duration-300 ${
          isAccountOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full pointer-events-none opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-600 p-6">
          <h2
            className={`${spaceMono.className} text-lg uppercase tracking-widest`}
          >
            Account
          </h2>
          <button
            type="button"
            onClick={closeAccount}
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label="Close account"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
          {/* Greeting */}
          {user && (
            <p className={`${spaceMono.className} text-gray-400 text-sm`}>
              Hello, {user.name}
            </p>
          )}

          {/* Email */}
          <div className="border-b border-gray-700 pb-5">
            <p
              className={`${spaceMono.className} text-xs uppercase tracking-widest text-gray-500 mb-1`}
            >
              Email
            </p>
            <p className={`${spaceMono.className} text-sm`}>
              {user?.email ?? "—"}
            </p>
          </div>

          {/* Address */}
          <div className="border-b border-gray-700 pb-5">
            <p
              className={`${spaceMono.className} text-xs uppercase tracking-widest text-gray-500 mb-1`}
            >
              Address
            </p>
            <p className={`${spaceMono.className} text-sm text-gray-400`}>
              No address saved
            </p>
            <button
              className={`${spaceMono.className} mt-2 text-xs uppercase underline cursor-pointer hover:text-gray-300`}
            >
              Add Address
            </button>
          </div>

          {/* Contact */}
          <div className="border-b border-gray-700 pb-5">
            <p
              className={`${spaceMono.className} text-xs uppercase tracking-widest text-gray-500 mb-1`}
            >
              Contact
            </p>
            <Link
              href="/contact"
              onClick={closeAccount}
              className={`${spaceMono.className} text-sm uppercase underline hover:text-gray-300`}
            >
              Go to Contact Page
            </Link>
          </div>
        </div>

        {/* Sign Out */}
        <div className="border-t border-gray-600 p-6">
          <button
            type="button"
            onClick={async () => {
              // Instantly clear cart + auth from Redux so the UI updates
              // to 0 items / guest state before the redirect fires.
              dispatch(clearCart());
              dispatch(clearAuth());
              closeAccount();
              await logoutAction();
            }}
            className={`${spaceMono.className} w-full border border-white py-3 text-sm uppercase tracking-widest cursor-pointer hover:bg-white hover:text-black transition-colors duration-200`}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Cart Drawer ─────────────────────────────────────────────────── */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-black text-black shadow-2xl transition-all duration-300 ${
          isCartOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-600 p-6">
          <div className="">
            <h2
              className={`${spaceMono.className} text-white text-md uppercase tracking-widest`}
            >
              Cart
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 transition text-white"
            aria-label="Close cart"
          >
            <FiX
              size={20}
              className="text-gray-300 cursor-pointer hover:text-white"
            />
          </button>
        </div>
        {/* carts items section */}
        <div className="flex-1 overflow-y-auto border-b border-gray-600 p-6 ">
          {/* ── Guest gate: not logged in ─────────────────────────────────── */}
          {!isLoggedIn ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <FiShoppingBag size={40} className="text-gray-500" />
              <p
                className={`${spaceMono.className} text-sm uppercase tracking-wide text-white`}
              >
                Sign in to view your cart
              </p>
              <p className={`${spaceMono.className} text-xs text-gray-400`}>
                Your items will be saved once you log in.
              </p>
              <Link
                href="/login"
                onClick={closeCart}
                className={`${spaceMono.className} mt-2 border border-white px-6 py-2 text-xs uppercase tracking-widest text-white transition hover:bg-white hover:text-black`}
              >
                Login
              </Link>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4  pb-4"
                >
                  <div className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden border border-gray-700 bg-gray-900">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p
                        className={`${spaceMono.className} text-sm uppercase text-white`}
                      >
                        {item.name}
                      </p>
                      <p
                        className={`${spaceMono.className} text-white text-xs py-2`}
                      >
                        {" "}
                        {item.size}
                      </p>
                      <div className="flex flex-row items-center gap-5">
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1,
                                item.size,
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center border border-gray-600 text-white"
                          >
                            -
                          </button>
                          <span
                            className={`${spaceMono.className} text-sm text-white`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1,
                                item.size,
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center border border-gray-600 text-white"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              removeCartItem({
                                productId: item.productId,
                                size: item.size,
                              }),
                            )
                          }
                          className={`${spaceMono.className} mt-2 text-left text-xs uppercase cursor-pointer underline text-white`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className={`${spaceMono.className} text-sm text-white`}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p
                className={`${spaceMono.className} text-md uppercase tracking-wide text-white`}
              >
                Your cart is empty
              </p>
            </div>
          )}
        </div>
        {isLoggedIn && cartItems.length > 0 && (
          <div className="px-6 py-6">
            <div className="mb-10">
              <p className={`${spaceMono.className} text-white`}>
                Add order note
              </p>
              <p className={`${spaceMono.className} text-gray-400 `}>
                Taxes and shipping calculated at checkout
              </p>
            </div>
            <div className="">
              <Link
                href="/checkout"
                onClick={closeCart}
                className={`flex w-full items-center justify-center  bg-black py-3 text-sm font-semibold uppercase tracking-[0.2em]  transition hover:bg-gray-300 ${spaceMono.className} bg-white`}
              >
                {`CHECKOUT $${cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}`}
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Navbar;
