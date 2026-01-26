// app/menu/[id]/ProductDetails.tsx
"use server";

import { notFound } from "next/navigation";
import ProductClient from "./ProductClient"; // Client Component
import { getProduct } from "@/app/actions/productActions";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { id } = params;

  try {
    const product = await getProduct(id);

    if (!product) {
      notFound(); // Show 404 page if no product found
    }

    return <ProductClient product={product} />;
  } catch (error) {
    console.error("Error in ProductDetails component:", error);
    notFound(); // Redirect to 404 on error
  }
};

export default ProductDetails;
