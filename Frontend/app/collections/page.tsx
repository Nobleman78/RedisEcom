import { spaceMono } from "@/fonts/Fonts";
import { getCategories } from "@/hook/demoProductApiHook/demoProductApi";
import Link from "next/link";

const page = () => {
  const categoris = getCategories();
  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
  ];
  return (
    <div className="mt-40  py-10 mx-10">
      <p className={`${spaceMono.className} uppercase text-center text-2xl`}>
        All Collections
      </p>
      <div className="mt-8 flex flex-col gap-3 grid grid-cols-3">
        {categoris.map((category, index) => (
          <Link
            key={index}
            href={`/collections/${category.toLowerCase()}`}
            className={`text-lg uppercase ${colors[index % colors.length]} ${spaceMono.className} text-white py-40 px-10`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
