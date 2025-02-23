// app/menu/[id]/page.tsx
import ProductDetails from "./ProductDetails";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const resolvedParams = await params; // Awaiting the promise to safely access 'id'
  
  return <ProductDetails params={resolvedParams} />;
};

export default ProductPage;
