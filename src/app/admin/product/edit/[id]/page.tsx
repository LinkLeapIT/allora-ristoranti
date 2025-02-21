// app/products/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import { getProductForEdit } from "@/app/actions/createProduct";
import EditProductForm from "./EditProductForm";

interface PageProps {
  params: {
    id?: string;
  };
}

// By default, App Router page files are "server" components
export default async function EditProductPage({ params }: PageProps) {
  // 1) Validate the ID
  if (!params?.id) {
    notFound(); // Or redirect("/404");
  }

  try {
    // 2) Attempt to fetch product data
    const product = await getProductForEdit(params.id!);

    // 3) If no product found, go to 404
    if (!product) {
      notFound();
    }

    // 4) Render your form with the product data
    return (
      <div className="container mx-auto px-4 py-8">
        <EditProductForm product={product} />
      </div>
    );
  } catch (error) {
    // If fetch fails or any error:
    notFound(); // or throw new Error("something"); to show error boundary
  }
}

// For SEO
export async function generateMetadata({ params }: PageProps) {
  try {
    const product = await getProductForEdit(params.id!);

    if (product) {
      return {
        title: `Edit ${product.title} | My Store`,
        description: `Edit details for ${product.title}`,
      };
    }
    return {
      title: "Edit Product | My Store",
      description: "Edit product details",
    };
  } catch {
    return {
      title: "Edit Product | My Store",
      description: "Edit product details",
    };
  }
}
