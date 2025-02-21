"use server";

import { revalidatePath } from "next/cache";
import Storage from "@/app/handlers/storage";
import { firestore } from '../../firebase/server';
import { Products } from "../../type/productType";
import { Timestamp } from 'firebase-admin/firestore';

// Helper function to convert Firestore Timestamp to ISO string
function convertTimestampToString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Timestamp) {
    return obj.toDate().toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertTimestampToString);
  }

  if (typeof obj === 'object') {
    const converted: { [key: string]: any } = {};
    for (const key in obj) {
      converted[key] = convertTimestampToString(obj[key]);
    }
    return converted;
  }

  return obj;
}

export async function createProduct(formData: FormData) {
  try {
    // Parse form fields
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const quantity = parseInt(formData.get("quantity")?.toString() || "1", 10);
    const category = formData.get("category")?.toString() || "";

    // Validate required fields
    if (!title) throw new Error("Title is required.");
    if (!category) throw new Error("Category is required.");

    // Handle multiple image files
    const imageFiles = formData.getAll("images") as File[];
    const imagePaths: string[] = [];

    // Upload each image
    for (const imageFile of imageFiles) {
      if (imageFile instanceof File && imageFile.size > 0) {
        const media = { title, file: imageFile };
        const uploadResult = await Storage.uploadFile(media) as {
          path?: string;
          url?: string;
          name?: string;
        };

        if (uploadResult.url) {
          imagePaths.push(uploadResult.url);
        }
      }
    }

    // Parse arrays and objects from form data
    const withoutOptionsStr = formData.get("withoutOptions")?.toString() || "";
    const withoutOptions = withoutOptionsStr ? withoutOptionsStr.split(",").map(item => item.trim()).filter(Boolean) : [];

    const extraIngredientsStr = formData.get("extraIngredientsJSON")?.toString();
    const sizesStr = formData.get("sizesJSON")?.toString();
    const extraIngredients = extraIngredientsStr ? JSON.parse(extraIngredientsStr) : [];
    const sizes = sizesStr ? JSON.parse(sizesStr) : [];

    // Build the data for Firestore
    const productData = {
      title,
      description,
      price,
      quantity,
      category,
      images: imagePaths,
      withoutOptions,
      extraIngredients,
      sizes,
      createdAt: Timestamp.now(),
    };

    // Write doc to Firestore
    const productsRef = firestore.collection('products');
    await productsRef.add(productData);
    // Revalidate the products page
    revalidatePath("/menu");
    return { success: true, message: "Product created successfully!" };
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw new Error(error?.message || "An error occurred while creating product.");
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const productRef = firestore.collection('products').doc(productId);

    // Parse form fields
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const price = formData.get("price") ? parseFloat(formData.get("price")?.toString() || "0") : undefined;
    const quantity = formData.get("quantity") ? parseInt(formData.get("quantity")?.toString() || "1", 10) : undefined;
    const category = formData.get("category")?.toString();

    // Handle existing and new images
    const existingImagesStr = formData.get("existingImages")?.toString() || "[]";
    const existingImages = JSON.parse(existingImagesStr);
    
    const imageFiles = formData.getAll("images") as File[];
    const newImagePaths: string[] = [];

    // Upload new images
    for (const imageFile of imageFiles) {
      if (imageFile instanceof File && imageFile.size > 0) {
        const media = { title: title || "product", file: imageFile };
        const uploadResult = await Storage.uploadFile(media) as {
          path?: string;
          url?: string;
          name?: string;
        };

        if (uploadResult.url) {
          newImagePaths.push(uploadResult.url);
        }
      }
    }

    // Combine existing and new images
    const allImages = [...existingImages, ...newImagePaths];

    // Parse arrays and objects from form data
    const withoutOptionsStr = formData.get("withoutOptions")?.toString() || "";
    const withoutOptions = withoutOptionsStr ? withoutOptionsStr.split(",").map(item => item.trim()).filter(Boolean) : [];

    const extraIngredientsStr = formData.get("extraIngredientsJSON")?.toString();
    const sizesStr = formData.get("sizesJSON")?.toString();
    const extraIngredients = extraIngredientsStr ? JSON.parse(extraIngredientsStr) : [];
    const sizes = sizesStr ? JSON.parse(sizesStr) : [];

    // Build update data
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(price !== undefined && { price }),
      ...(quantity !== undefined && { quantity }),
      ...(category && { category }),
      images: allImages,
      withoutOptions,
      extraIngredients,
      sizes,
      updatedAt: Timestamp.now(),
    };

    // Update doc in Firestore
    await productRef.update(updateData);

    // Revalidate the products page
    revalidatePath("/menu");

    return { success: true, message: "Product updated successfully!" };
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error(error?.message || "An error occurred while updating product.");
  }
}

export async function getProducts() {
  try {
    const productsSnapshot = await firestore.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products.map(convertTimestampToString);
  } catch (error: any) {
    throw new Error(error?.message || "An error occurred while fetching products.");
  }
}

export async function getProduct(productId: string) {
  try {
    const productDoc = await firestore.collection('products').doc(productId).get();
    if (!productDoc.exists) {
      throw new Error("Product not found");
    }
    const product = {
      id: productDoc.id,
      ...productDoc.data()
    };
    return convertTimestampToString(product);
  } catch (error: any) {
    throw new Error(error?.message || "An error occurred while fetching the product.");
  }
}

export async function deleteProduct(id: string) {
  try {
    await firestore.collection('products').doc(id).delete();
    revalidatePath("/admin/product");
    return { success: true, message: "Product deleted successfully!" };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw new Error(error?.message || "An error occurred while deleting product.");
  }
}


export async function fetchProducts(limitCount = 10) {
  try {
    const productsSnapshot = await firestore.collection('products').limit(limitCount).get();

    return productsSnapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        ...JSON.parse(JSON.stringify(data)), // Ensures all Firestore fields are converted to plain objects
        createdAt: data?.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null, // Convert to string
        updatedAt: data?.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null, // Convert to string
      };
    }) as Products[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductForEdit(productId: string) {
  try {
    const productDoc = await firestore.collection('products').doc(productId).get();
    if (!productDoc.exists) {
      throw new Error("Product not found");
    }

    const data = productDoc.data();
    
    const product = {
      id: productDoc.id,
      ...JSON.parse(JSON.stringify(data)), // Ensures serialization
      createdAt: data?.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      updatedAt: data?.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null,
    } as Products;

    return product;
  } catch (error: any) {
    throw new Error(error?.message || "Error fetching product");
  }
}
