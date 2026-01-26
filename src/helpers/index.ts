import { Products } from "@/types";
import { getProductById } from '@/data/products';

export const getSingleProduct = async (id: string): Promise<Products | null> => {
  try {
    const product = await getProductById(id);
    if (!product) {
      return null;
    }
    return product;
  } catch (error: any) {
    throw new Error(error?.message || "Error fetching product");
  }
}
