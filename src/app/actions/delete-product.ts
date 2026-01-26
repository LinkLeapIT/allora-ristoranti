'use server'

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(productId: string) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'products', `${productId}.mdx`);

  try {
    await fs.unlink(filePath);
    revalidatePath('/admin/product');
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw new Error('Failed to delete product.');
  }
}
