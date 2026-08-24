import ProductClient from "./ProductClient";

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return <ProductClient id={id} />;
}
