import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  displayCategory: string;
}

export default function Breadcrumb({ displayCategory }: Props) {
  return (
    <div
      className={`${spaceMono.className} flex justify-center items-center gap-2`}
    >
      <Link
        href="/"
        className={`hover:underline cursor-pointer `}
      >
        Home
      </Link>

      <MdKeyboardArrowRight />

      <span className="hover:underline cursor-pointer">{displayCategory}</span>
    </div>
  );
}
