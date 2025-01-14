"use server";

import { revalidatePath } from "next/cache";
import Firestore from "@/app/handlers/firestore";
import { Products } from "../../../type";
import Storage from "@/app/handlers/Storage";

// We'll assume these fields for demonstration:
// - title, description, price
// - optional: quantity
// - an uploaded image (file input named "image")
// If you want to handle extraIngredients, sizes, or withoutOptions in the same form, parse them similarly.

export async function createProduct(formData: FormData) {
  try {
    // Parse form fields
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const quantity = parseInt(formData.get("quantity")?.toString() || "1", 10);

    // Validate required fields
    if (!title) {
      throw new Error("Title is required.");
    }

    // Grab the image file (if provided)
    const imageFile = formData.get("image") as File | null;

    // We'll store the path from Firebase Storage (if we successfully upload a file)
    let path: string | null = null;

        // snippet from createProduct
    if (imageFile && imageFile.size > 0) {
      const media = { title, file: imageFile };
      const uploadResult = (await Storage.uploadFile(media)) as {
        path?: string;
        url?: string;
        name?: string;
      };

      if (uploadResult.url) {
        path = uploadResult.url;
      }
    }


    // Build the data for Firestore
    const productData = {
      title,
      description,
      price,
      quantity,
      path, // the image path in Firebase Storage
      withoutOptions: [],
      extraIngredients: [],
      sizes: [],
    };

    // Write doc to Firestore (adjust "products" if you have a different collection)
    await Firestore.writeDoc(productData, "products");

    // If you have a page that lists products, you can revalidate it:
    // revalidatePath("/menu"); // or wherever you list products

    // Return something to the client side
    return { success: true, message: "Product created successfully!" };
  } catch (error: any) {
    // Bubble up the error message
    throw new Error(error?.message || "An error occurred while creating product.");
  }
}
