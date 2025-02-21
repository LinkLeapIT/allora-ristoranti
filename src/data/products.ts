import { firestore, getTotalPages } from "@/firebase/server";
import { Products } from "@/type/productType";
import { ProductStatus, ProductCategory } from "@/type/productStatus";
import { Timestamp } from "firebase-admin/firestore";

type GetProductsOptions = {
  filters?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    category?: ProductCategory[] | null;
    status?: ProductStatus[] | null;
    addedNew?: Date | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export async function getProducts(options?: GetProductsOptions) {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, category, status, addedNew } = options?.filters || {};

  // 1) Build a query
  let productsQuery = firestore.collection("products").orderBy("createdAt", "desc");

  if (minPrice !== null && minPrice !== undefined) {
    productsQuery = productsQuery.where("price", ">=", minPrice);
  }
  if (maxPrice !== null && maxPrice !== undefined) {
    productsQuery = productsQuery.where("price", "<=", maxPrice);
  }
  if (category && category.length > 0) {
    // For array-based categories, use array-contains or array-contains-any
    // But if your doc has a simple "category" field, in is correct:
    productsQuery = productsQuery.where("category", "in", category);
  }
  if (status && status.length > 0) {
    productsQuery = productsQuery.where("status", "in", status);
  }
  if (addedNew) {
    productsQuery = productsQuery.where("createdAt", "==", addedNew);
  }

  // 2) Count total docs for pagination
  const totalPages = await getTotalPages(productsQuery, pageSize);

  // 3) Grab docs with limit/offset
  const productsSnapshot = await productsQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  // 4) Convert docs to array (and transform any Date/Timestamp fields)
  const products: Products[] = productsSnapshot.docs.map((doc) => {
    const data = doc.data();

    // Convert Firestore timestamps / JS Date to string
    let createdAt = null;
    if (data.createdAt instanceof Timestamp) {
      createdAt = data.createdAt.toDate().toISOString();
    } else if (data.createdAt instanceof Date) {
      createdAt = data.createdAt.toISOString();
    }
  
    let updatedAt = null;
    if (data.updatedAt instanceof Timestamp) {
      updatedAt = data.updatedAt.toDate().toISOString();
    } else if (data.updatedAt instanceof Date) {
      updatedAt = data.updatedAt.toISOString();
    }
  
    // Now return a full `Products` object
    return {
      id: doc.id,
      title: data.title ?? "", 
      file: null,                       // if you never store `File` in Firestore
      path: data.path ?? null,
      images: data.images ?? [],
      description: data.description ?? "",
      price: data.price ?? 0,
      createdAt: createdAt ? new Date(createdAt) : null, // or keep as string if you prefer
      withoutOptions: data.withoutOptions ?? [],
      extraIngredients: data.extraIngredients ?? [],
      sizes: data.sizes ?? [],
      quantity: data.quantity ?? 0,
      options: data.options ?? {},
      updateAt: updatedAt ? new Date(updatedAt) : null,  // or keep as string
      category: data.category ?? null,
      status: data.status ?? "available",
    };

  });

  return { data: products, totalPages };
}

// Single product by ID
export async function getProductById(productId: string) {
  const snapshot = await firestore.collection("products").doc(productId).get();
  if (!snapshot.exists) return null;

  const data = snapshot.data();

  // Convert Timestamps if needed
  let createdAt = null;
  if (data?.createdAt instanceof Timestamp) {
    createdAt = data.createdAt.toDate().toISOString();
  }

  let updatedAt = null;
  if (data?.updatedAt instanceof Timestamp) {
    updatedAt = data.updatedAt.toDate().toISOString();
  }

  return {
    id: snapshot.id,
    title: data?.title ?? "", 
    file: null,                       
    path: data?.path ?? null,
    images: data?.images ?? [],
    description: data?.description ?? "",
    price: data?.price ?? 0,
    createdAt: createdAt ? new Date(createdAt) : null,
    withoutOptions: data?.withoutOptions ?? [],
    extraIngredients: data?.extraIngredients ?? [],
    sizes: data?.sizes ?? [],
    quantity: data?.quantity ?? 0,
    options: data?.options ?? {},
    updateAt: updatedAt ? new Date(updatedAt) : null,
    status: data?.status ?? "available",
  } as Products;
}

// Multiple by IDs
export async function getProductsById(productIds: string[]) {
  if (!productIds.length) return [];

  // Example: if your doc ID is the product name, you can do:
  // .where("__name__", "in", productIds)
  const snapshot = await firestore
    .collection("products")
    .where("__name__", "in", productIds)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    let createdAt = null;
    if (data?.createdAt instanceof Timestamp) {
      createdAt = data.createdAt.toDate().toISOString();
    }

    let updatedAt = null;
    if (data?.updatedAt instanceof Timestamp) {
      updatedAt = data.updatedAt.toDate().toISOString();
    }

    return {
      id: doc.id,
      title: data?.title ?? "", 
      file: null,                       
      path: data?.path ?? null,
      images: data?.images ?? [],
      description: data?.description ?? "",
      price: data?.price ?? 0,
      createdAt: createdAt ? new Date(createdAt) : null,
      withoutOptions: data?.withoutOptions ?? [],
      extraIngredients: data?.extraIngredients ?? [],
      sizes: data?.sizes ?? [],
      quantity: data?.quantity ?? 0,
      options: data?.options ?? {},
      updateAt: updatedAt ? new Date(updatedAt) : null,
      status: data?.status ?? "available",
    } as Products;
  });
}
