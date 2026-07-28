import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  category: string;
  name: string;
}

const BreadCrumb = ({ category, name }: Props) => {
  return (
    <div
      className={`${spaceMono.className} flex flex-row  items-center gap-2 max-w-6xl mx-auto`}
    >
      <Link className="hover:underline" href="/">
        Home
      </Link>
      <MdKeyboardArrowRight className="text-gray-400" />
      <Link className="hover:underline" href={`/collections/${category}`}>
        {category}
      </Link>
      <MdKeyboardArrowRight className="text-gray-400" />
      <h2 className="">{name}</h2>
    </div>
  );
};

export default BreadCrumb;
