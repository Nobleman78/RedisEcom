"use client";
import { michroma, Nimbus, spaceMono } from "@/fonts/Fonts";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => {
  const router = useRouter();
  const navs = [
    { label: "LOGIN", href: "/login" },
    { label: "SEARCH" },
    { label: "CART" },
  ];
  const menuItemsOne = [
    { label: "LATEST", href: "/latest" },
    { label: "BRAND", href: "/brand" },
    { label: "CATEGORIES", href: "/categories" },
  ];
  const menuItemsTwo = [
    {
      label: "SALE",
      href: "/sale",
    },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];
  const [isOpenMenubar, setIsOpenMenubar] = useState(false);

  const toggleMenuBar = () => {
    setIsOpenMenubar(!isOpenMenubar);
  };

  return (
    <div className="fixed left-0 top-0 z-[100] w-full bg-black text-white shadow-sm">
      <div className="flex flex-col items-center justify-center">
        <button className="group ml-10 mt-5 cursor-pointer text-center text-xs italic">
          <span className="block">SUMMER SALE - NOW UP TO 50% OFF</span>
          <span className="mt-1 block h-[1px] w-full overflow-hidden">
            <span className="block h-full w-full bg-white transition-all duration-500 group-hover:w-0" />
          </span>
        </button>
      </div>

      <div className="mx-15  flex flex-row items-center  py-5">
        <button
          className=" rounded-full p-2 transition  w-2/4"
          aria-expanded={isOpenMenubar}
          aria-controls="mobile-menu"
        >
          <FiMenu
            onClick={toggleMenuBar}
            size={25}
            className="cursor-pointer"
          />
        </button>

        <div className="w-2/3 flex flex-row justify-between ">
          <Link
            href="/"
            onClick={() => router.push("/")}
            className={`${michroma.className} cursor-pointer text-3xl`}
          >
            NEVER NEVER
          </Link>
          {/* nav items */}
          <div className="flex flex-row items-center gap-5">
            {navs.map((nav, index) => (
              <div key={index}>
                {nav.href ? (
                  <Link
                    href={nav.href}
                    className={`${spaceMono.className} cursor-pointer`}
                  >
                    {nav.label}
                  </Link>
                ) : (
                  <span className={`${spaceMono.className} cursor-pointer`}>
                    {nav.label === "CART" ? `CART (${0})` : nav.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpenMenubar ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleMenuBar}
      />

      <aside
        id="mobile-menu"
        className={`fixed left-0 top-0 z-50 flex h-full w-96 flex-col bg-black p-6 shadow-2xl transition-all duration-300 ${
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
        <nav className="mt-15 flex flex-col ">
          {menuItemsOne.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpenMenubar(false)}
              className={`${Nimbus.className} rounded-md px-2 py-3 text-3xl uppercase tracking-[0.1em] transition-all duration-500 ease-out hover:text-gray-400 ${
                isOpenMenubar
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Menubar two */}
        <nav className="mt-15 flex flex-col">
          {menuItemsTwo.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpenMenubar(false)}
              className={`${Nimbus.className} rounded px-2 p-3 text-3xl tracking-[0.1em] transition-all duration-500 ease-out hover:text-gray-400 ${
                isOpenMenubar
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Navbar;
