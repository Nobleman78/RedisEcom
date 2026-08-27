import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div className="w-full max-w-2xl space-y-6">
        <p className={`${spaceMono.className} text-xl sm:text-2xl`}>404</p>

        <p className={`${spaceMono.className} text-sm leading-6 sm:text-base`}>
          We could not find the page you were looking for. Please use the
          navigation or the button below to go back to our website.
        </p>

        <Link
          href="/collections/all"
          className={`${spaceMono.className} inline-block bg-black px-5 py-2 text-white`}
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
};

export default page;
