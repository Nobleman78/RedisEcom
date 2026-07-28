"use client";
import { michroma, Nimbus, spaceMono } from "@/fonts/Fonts";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "../search/Search";

import { FaSearch } from "react-icons/fa";
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
    {
      label: "BRAND",
      dropdown: [
        "ACMH",
        "Aries",
        "BoTT",
        "BRAIN DEAD",
        "By Parra",
        "Carhartt WIP",
        "Cav Empt",
        "CMF Comfy Outdoor Garment",
        "F.C. Real Bristol",
        "Gramicci",
        "Idea",
        "Is-Ness",
        "Never Never",
        "No Problemo",
        "PHINGERIN",
        "ROA",
        "Rostersox",
        "Salomon",
        "SAN SAN GEAR",
        "SOPHNET",
        "Sub Sun",
        "SUICOKE",
        "The Trilogy Tapes",
        "The Salvages",
        "UMBRO BY SLAM JAM",
        "Uniform",
      ],
    },
    {
      label: "CATEGORIES",
      dropdown: [
        "SALE",
        "Accessories",
        "Apothecary",
        "Bags",
        "Denim",
        "Footwear",
        "Gift Cards",
        "Headwear",
        "Homeware",
        "Jewellery",
        "Outerwear",
        "Print",
        "Scarves & Gloves",
        "Shirts",
        "Shorts",
        "Socks",
        "Sunglasses",
        "Sweats & Hoodies",
        "T-Shirts",
        "Trousers",
        "Underwear",
      ],
    },
    {
      label: "Collections",
      href:"/collections"
    }
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const active = isOpenMenubar || isSearchOpen;
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
  }, [isOpenMenubar, isSearchOpen]);

  const toggleMenuBar = () => {
    setActiveDropdown(null);
    if (isSearchOpen) setIsSearchOpen(false);
    setIsOpenMenubar((prev) => !prev);
  };

  const openSearch = () => {
    setIsOpenMenubar(false);
    setActiveDropdown(null);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
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

      <div className="relative mx-4 flex items-center justify-center py-5">
        <button
          className="absolute left-4 rounded-full p-2 transition"
          aria-expanded={isOpenMenubar}
          aria-controls="mobile-menu"
          onClick={toggleMenuBar}
        >
          <FiMenu size={25} className="cursor-pointer" />
        </button>

        <Link
          href="/"
          onClick={() => router.push("/")}
          className={`${michroma.className} cursor-pointer text-3xl`}
        >
          NEVER NEVER
        </Link>

        <div className="absolute right-4 hidden items-center gap-5 md:flex">
          {navs.map((nav, index) => (
            <div key={index}>
              {nav.href ? (
                <Link
                  href={nav.href}
                  className={`${spaceMono.className} cursor-pointer`}
                >
                  {nav.label}
                </Link>
              ) : nav.label === "SEARCH" ? (
                <button
                  type="button"
                  onClick={openSearch}
                  className={`${spaceMono.className} cursor-pointer`}
                >
                  SEARCH
                </button>
              ) : (
                <span className={`${spaceMono.className} cursor-pointer`}>
                  {nav.label === "CART" ? `CART (${0})` : nav.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpenMenubar || isSearchOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => {
          if (isSearchOpen) closeSearch();
          if (isOpenMenubar) toggleMenuBar();
        }}
      />

      {isSearchOpen && (
        <div className="fixed inset-x-0 top-27.5 z-50 mx-auto w-full bg-black  border-t border-gray-500 ">
          <div className=" flex flex-row items-center p-6 shadow-2xl gap-10 mx-5">
            <FaSearch size={20} />
            <Search />
          </div>
        </div>
      )}

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
        <nav className="mt-15 flex flex-col gap-3">
          {menuItemsOne.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpenMenubar(false)}
                className={`${Nimbus.className} rounded-md px-2 py-3 text-3xl uppercase tracking-widest transition-all duration-500 ease-out hover:text-gray-400 ${
                  isOpenMenubar
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.label)}
                  className={`${Nimbus.className} cursor-pointer w-full text-left rounded-md px-2 py-3 text-3xl uppercase tracking-widest transition-all duration-500 ease-out hover:text-gray-400 ${
                    isOpenMenubar
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {item.label}
                </button>
              </div>
            ),
          )}
        </nav>
        {/* Menubar two */}
        <nav className="mt-15 flex flex-col gap-3">
          {menuItemsTwo.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpenMenubar(false)}
              className={`${Nimbus.className} rounded px-2 p-3 text-3xl tracking-widest transition-all duration-500 ease-out hover:text-gray-400 ${
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
          <div className="absolute left-full top-0 z-50 flex h-full w-105 flex-col gap-4 overflow-y-auto border-l border-white/10 bg-black p-8 text-left shadow-2xl">
            <div className="grid gap-4 text-2xl font-semibold uppercase text-white">
              {menuItemsOne
                .find((item) => item.label === activeDropdown)
                ?.dropdown?.map((dropdownItem) => (
                  <Link
                    key={dropdownItem}
                    href={`/collections/${dropdownItem.toLowerCase().trim().replace(/\s+/g, "-")}`}
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
    </div>
  );
};

export default Navbar;
