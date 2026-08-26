import { spaceMono } from "@/fonts/Fonts";
import Fullsleves from "@/public/shirtvariation/Full.avif";
import Halfsleves from "@/public/shirtvariation/Half.avif";
import Image from "next/image";
import Link from "next/link";

const Shirtvariation = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full max-w-6xl px-4 mx-auto my-10 md:my-20">
        <Link href="/collections/never-full-sleves" className="relative">
          <Image
            alt="bristol-image"
            height={1000}
            width={1000}
            src={Fullsleves}
          />
          <h2
            className={`absolute bottom-5 left-1/2 max-w-[calc(100%-1rem)] -translate-x-1/2 bg-black px-3 py-1.5 text-center text-xs uppercase text-white sm:px-5 sm:py-2 sm:text-sm ${spaceMono.className}`}
          >
            NEVER FULL SLEVES
          </h2>
        </Link>
        <Link href="/collections/never-half-sleves" className="relative">
          <Image alt="cmf-image" height={1000} width={1000} src={Halfsleves} />
          <h2
            className={`absolute bottom-5 left-1/2 max-w-[calc(100%-1rem)] -translate-x-1/2 bg-black px-3 py-1.5 text-center text-xs uppercase text-white sm:px-5 sm:py-2 sm:text-sm ${spaceMono.className}`}
          >
            NEVER HALF SLEVES
          </h2>
        </Link>
      </div>
      <hr className="text-gray-200" />
    </div>
  );
};

export default Shirtvariation;
