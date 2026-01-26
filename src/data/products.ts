import { Products, ProductStatus, ProductCategory } from "@/types";
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

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

export async function getProducts(options?: GetProductsOptions): Promise<{ data: Products[]; totalPages: number }> {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, category, status, addedNew } = options?.filters || {};

  const productsDirectory = path.join(process.cwd(), 'src', 'content', 'products');
  const filenames = await fs.readdir(productsDirectory);

  let products: Products[] = await Promise.all(filenames.map(async (filename) => {
    const filePath = path.join(productsDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.mdx$/, '');

    return {
      id: slug,
      slug: slug,
      title: data.title ?? "",
      images: data.images ?? [],
      description: data.description ?? "",
      price: data.price ?? 0,
      createdAt: data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString(),
      quantity: data.quantity ?? 0,
      updateAt: data.updatedAt ? new Date(data.updatedAt).toISOString() : new Date().toISOString(),
      category: data.category ?? "",
      status: data.status ?? "available",
      ratings: data.ratings || [],
      isFeatured: data.isFeatured ?? false,
      isNew: data.isNew ?? false,
      allergy: data.allergy || [],
    };
  }));

  // Apply filters
  if (minPrice !== null && minPrice !== undefined) {
    products = products.filter(p => p.price >= minPrice);
  }
  if (maxPrice !== null && maxPrice !== undefined) {
    products = products.filter(p => p.price <= maxPrice);
  }
  if (category && category.length > 0) {
    products = products.filter(p => p.category && category.includes(p.category as ProductCategory));
  }
  if (status && status.length > 0) {
    products = products.filter(p => p.status && status.includes(p.status as ProductStatus));
  }
  if (addedNew) {
    products = products.filter(p => p.createdAt && new Date(p.createdAt) >= addedNew);
  }

  // Apply sorting
  products.sort((a, b) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0));

  const totalPages = Math.ceil(products.length / pageSize);
  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

  return { data: paginatedProducts, totalPages };
}

// Single product by ID
export async function getProductById(productId: string): Promise<Products | null> {
  const filePath = path.join(process.cwd(), 'src', 'content', 'products', `${productId}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id: productId,
      slug: productId,
      title: data.title ?? "",
      images: data.images ?? [],
      description: data.description ?? "",
      price: data.price ?? 0,
      createdAt: data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString(),
      quantity: data.quantity ?? 0,
      updateAt: data.updatedAt ? new Date(data.updatedAt).toISOString() : new Date().toISOString(),
      category: data.category ?? "",
      status: data.status ?? "available",
      ratings: data.ratings || [],
      isFeatured: data.isFeatured ?? false,
      isNew: data.isNew ?? false,
      allergy: data.allergy || [],
    };
  } catch (error) {
    console.error(`Error reading product ${productId}:`, error);
    return null;
  }
}

// Multiple by IDs
export async function getProductsById(productIds: string[]): Promise<Products[]> {
  if (!productIds.length) return [];
  const products = await Promise.all(productIds.map(id => getProductById(id)));
  return products.filter(p => p !== null) as Products[];
}
