import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const page = () => {
  return (
    <div className="text-center mt-[350px] space-y-10 max-w-2xl mx-auto">
      <p className={`${spaceMono.className} text-2xl`}>404 </p>
      <p className={`${spaceMono.className} text-lg`}>We could not find the page you were looking for. Please use the navigation or the button below to go back to our website.</p>
      <Link href="/collections/all" className={`${spaceMono.className} bg-black text-white px-5 py-2`}>
        CONTINUE SHOPPING
      </Link>
    </div>
  );
};

export default page;
