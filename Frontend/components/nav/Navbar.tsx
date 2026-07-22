"use client";
import { michroma, spaceMono } from "@/fonts/Fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FiMenu } from "react-icons/fi";
const Navbar = () => {
  const router = useRouter();
  const navs = ["LOGIN", "SEARCH", "CART"];
  return (
    <div className=" bg-black text-white  ">
      {/* Header part */}
      <div className="group flex flex-col items-center justify-center">
        <button className="mt-5 mr-40 cursor-pointer text-xs italic  ">
          SUMMER SALE - NOW UP TO 50% OFF
        </button>
        <div className="mt-1 h-[1px] w-[220px] overflow-hidden mr-40">
          <div className="h-full w-full bg-white transition-all duration-500 group-hover:w-0" />
        </div>
      </div>

      {/* This is navbar and the logo items */}
      <div className="flex flex-row items-center justify-between mx-15 py-5 mt-[20px]">
        {/* menu bar */}
        <FiMenu className="cursor-pointer" size={25} />
        {/* Logo */}
        <div className="w-[900px]  flex flex-row items-center justify-center">
          <Link
            href=""
            onClick={() => router.push("/")}
            className={`${michroma.className} text-3xl cursor-pointer `}
          >
            {" "}
            NEVER NEVER
          </Link>
        </div>
        {/* nav item */}
        <div className="flex flex-row items-center gap-5 ">
          {navs.map((nav, index) => (
            <div key={index} className="">
              <button className={`${spaceMono.className} cursor-pointer `}>
                {nav}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
