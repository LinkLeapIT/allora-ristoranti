import Firestore from "@/app/handlers/firestore";
import { Products } from "../../type";

export const getProducts = async (): Promise<Products[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    if (!Array.isArray(data.items)) {
      throw new Error("API did not return an array");
    }
    return data.items;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching products: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching products");
    }
  }
};

export const getSingleProduct = async (id: string): Promise<Products | undefined> => {
  try {
    if (!id) {
      throw new Error("Invalid product ID");
    }
    const items: Products[] = await Firestore.readDocs('products');
    const product = items.find((item) => item.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching the product: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the product");
    }
  }
};



  