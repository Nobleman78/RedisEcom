import { spaceMono } from "@/fonts/Fonts";
import Bristol from "@/public/banner/Bristol.webp";
import Cmf from "@/public/banner/CMF.webp";
import Goggles from "@/public/banner/Googgles.webp";
import Tr from "@/public/banner/TR-808.webp";
import Image from "next/image";
import Link from "next/link";
const Banner = () => {
  return (
    <div>
      <div className="flex flex-row items-center gap-8 w-6xl mx-auto my-20">
        <Link href="/collections/fc-real-bristol" className="relative">
          <Image alt="bristol-image" src={Bristol} />
          <h2
            className={`absolute bottom-5 -translate-x-1/2 bg-black text-white left-1/2 px-5 py-2 uppercase ${spaceMono.className}`}
          >
            F.C Real Bristol
          </h2>
        </Link>
        <Link href="/collections/cmf-outdoor-garment" className="relative">
          <Image alt="cmf-image" src={Cmf} />
          <h2
            className={`absolute bottom-5 -translate-x-1/2 bg-black text-white left-1/2 px-5 py-2 uppercase ${spaceMono.className}`}
          >
            CMF Outdoor Garment
          </h2>
        </Link>
      </div>
      <hr className="text-gray-200" />
      <div className="flex flex-row items-center gap-8 w-6xl mx-auto my-20">
        <Link href="/collections/fc-real-bristol" className="relative">
          <Image alt="bristol-image" src={Tr} />
          <h2
            className={`absolute bottom-5 -translate-x-1/2 bg-black text-white left-1/2 px-5 py-2 uppercase ${spaceMono.className}`}
          >
            I.S NEXT X ROLAND
          </h2>
        </Link>
        <Link href="/collections/cmf-outdoor-garment" className="relative">
          <Image alt="cmf-image" src={Goggles} />
          <h2
            className={`absolute bottom-5 -translate-x-1/2 bg-black text-white left-1/2 px-5 py-2 uppercase ${spaceMono.className}`}
          >
            SUB SUN
          </h2>
        </Link>
      </div>
      <hr className="text-gray-200" />
    </div>
  );
};

export default Banner;
