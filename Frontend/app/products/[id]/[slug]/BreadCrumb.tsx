import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  category: string;
  name: string;
}

const BreadCrumb = ({ category, name }: Props) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${spaceMono.className} flex flex-wrap items-center gap-2 pt-5 max-w-6xl mx-auto px-4 md:px-8 text-sm text-gray-500`}
    >
      <Link className="hover:text-black transition-colors" href="/">
        Home
      </Link>
      <MdKeyboardArrowRight className="text-gray-400 shrink-0" />
      <Link className="hover:text-black transition-colors capitalize" href={`/collections/${category}`}>
        {category}
      </Link>
      <MdKeyboardArrowRight className="text-gray-400 shrink-0" />
      <h2 className="text-black font-medium">{name}</h2>
    </nav>
  );
};

export default BreadCrumb;
