// 'use server'
import { firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import { Products } from "@/type/productType";

// Converts Firestore Timestamps to strings
function convertTimestampToString(product: any): Products {
  const convertTimestamp = (timestamp: Timestamp | undefined) =>
    timestamp ? timestamp.toDate().toISOString() : undefined;

  return {
    ...product,
    createdAt: convertTimestamp(product.createdAt),
    updatedAt: convertTimestamp(product.updatedAt),
  };
}

export async function getProduct(productId: string): Promise<Products | null> {
  try {
    const productDoc = await firestore.collection("products").doc(productId).get();

    if (!productDoc.exists) {
      console.warn(`Product with ID ${productId} not found.`);
      return null;
    }

    const productData = {
      id: productDoc.id,
      ...productDoc.data(),
    };

    return convertTimestampToString(productData);
  } catch (error: any) {
    console.error("Error fetching product:", error.message);
    return null;
  }
}
