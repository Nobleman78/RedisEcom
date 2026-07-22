import { spaceMono } from "@/fonts/Fonts";
import Fullsleves from "@/public/shirtvariation/Full.avif";
import Halfsleves from "@/public/shirtvariation/Half.avif";
import Image from "next/image";
import Link from "next/link";

const Shirtvariation = () => {
  return (
    <div>
      <div className="flex flex-row items-center gap-8 w-6xl mx-auto my-20">
        <Link href="/collections/never-full-sleves" className="relative">
          <Image alt="bristol-image" height={1000} width={1000} src={Fullsleves} />
          <h2
            className={`absolute bottom-5 -translate-x-1/2 bg-black text-white left-1/2 px-5 py-2 uppercase ${spaceMono.className}`}
          >
            NEVER FULL SLEVES
          </h2>
        </Link>
        <Link href="/collections/never-half-sleves" className="relative">
          <Image alt="cmf-image" height={1000} width={1000} src={Halfsleves} />
          <h2
            className={`absolute bottom-5 -translate-x-1/2 bg-black text-white left-1/2 px-5 py-2 uppercase ${spaceMono.className}`}
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
