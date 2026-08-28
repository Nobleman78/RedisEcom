import { use } from "react";
import CategoryClient from "./CategoryClient";
interface Props {
  params: Promise<{
    category: string;
  }>;
}
export default function CategoryPage({ params }: Props) {
  const { category } = use(params);
  return (
    <div className="mt-32">
      <CategoryClient category={category} />
    </div>
  );
}
