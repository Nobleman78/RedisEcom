import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const page = () => {
  return (
    <div className="mx-auto min-h-[60vh] max-w-2xl space-y-6 px-4 pt-32 text-center sm:pt-40">
      <p className={`${spaceMono.className} text-xl sm:text-2xl`}>404</p>
      <p className={`${spaceMono.className} text-sm leading-6 sm:text-base`}>
        We could not find the page you were looking for. Please use the
        navigation or the button below to go back to our website.
      </p>
      <Link
        href="/collections/all"
        className={`${spaceMono.className} bg-black text-white px-5 py-2`}
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
};

export default page;
