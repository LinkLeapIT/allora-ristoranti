"use server"
import { Products } from "../type/productType";
import { getProductById } from '@/data/products';

export const getSingleProduct = async (id: string): Promise<Products | undefined> => {
  try {
    const productDoc = await getProductById(id);
    if (!productDoc) {
      throw new Error("Product not found");
    }
    const product = {
      id: productDoc.id,
      ...(productDoc as any).data()
    } as Products;
    return product;
  } catch (error: any) {
    throw new Error(error?.message || "Error fetching product");
  }
}



  