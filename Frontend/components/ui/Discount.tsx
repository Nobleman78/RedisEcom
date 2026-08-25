import { Nimbus, spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const Discount = () => {
  return (
    <div>
      <Link
        href="/collections/sale"
        className="block bg-[#CEF25E] max-w-6xl mx-4 md:mx-auto h-[300px] md:h-150 my-10 md:my-20 relative"
      >
        <h2
          className={`uppercase absolute top-1/3 text-4xl md:text-6xl text-center w-full left-1/2 -translate-x-1/2 text-white italic font-bold ${Nimbus.className}`}
        >
          Summer sale
        </h2>
        <button
          className={`${spaceMono.className} uppercase absolute top-2/3 md:top-2/3 -translate-x-1/2 left-1/2 px-5 py-2 bg-black text-white cursor-pointer w-max`}
        >
          Now up to 70% off
        </button>
      </Link>
    </div>
  );
};

export default Discount;
