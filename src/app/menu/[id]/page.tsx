// app/menu/[id]/page.tsx
import ProductDetails from "./ProductDetails";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  return <ProductDetails params={params} />;
};

export default ProductPage;