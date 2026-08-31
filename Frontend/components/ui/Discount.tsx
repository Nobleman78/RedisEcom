import { Nimbus, spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const Discount = () => {
  return (
    <div>
      <Link
        href="/collections/sale"
        className="relative mx-4 my-10 block h-56 max-w-6xl bg-[#CEF25E] sm:h-72 md:mx-auto md:my-20 md:h-96 lg:h-[600px]"
      >
        <h2
          className={`absolute left-1/2 top-1/3 w-full max-w-[90%] -translate-x-1/2 text-center text-2xl font-bold uppercase italic text-white sm:text-4xl md:text-6xl ${Nimbus.className}`}
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
