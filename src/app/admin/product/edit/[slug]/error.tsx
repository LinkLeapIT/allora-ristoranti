// app/products/[id]/edit/error.tsx
"use client"; // This file is a Client Component for error UI

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error("Error in edit product page:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600 mb-4">
          {error.message || "Something went wrong while loading the product."}
        </p>
        <a
          href="/products"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Return to Products
        </a>
      </div>
    </div>
  );
}
