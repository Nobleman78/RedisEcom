import { getProductById } from "@/hook/demoProductApiHook/demoProductApi";
import BreadCrumb from "./BreadCrumb";
import ProductDetails from "./ProductDetails";
import RelatedProduct from "./RelatedProduct";

interface Props {
  params: Promise<{
    id: string;
    category: string | undefined;
    name: string;
    price: number;
    size: string[];
    img: string;
    discount: number;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  const category = product?.category;
  const name = product?.name;
  const description = product?.description;
  const price = product?.price;
  const size = product?.size?.map((size) => size);
  const img = product?.image;
  const discount = product?.isDiscount;

  // We have to handle the edge case also
  if (!category) {
    return <div>Product not found</div>;
  }
  if (!name) {
    return <div>Name not found</div>;
  }
  if (!price) {
    return <div>Price not found</div>;
  }
  if (!description) {
    return <div>Description not found</div>;
  }
  if (!img) {
    return <div>Image not found</div>;
  }
  if (!discount) {
    return <div>Please add a valid discount</div>;
  }

  return (
    <div className="mt-32">
      <BreadCrumb category={category} name={name} />
      <ProductDetails
        category={category}
        name={name}
        description={description}
        price={price}
        size={size}
        image={img}
        discount={Number(discount)}
      />
      <RelatedProduct category={category}/>
      
    </div>
  );
}
