'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

const productsDirectory = path.join(process.cwd(), 'src/content/products');

export async function addRating(productId: string, rating: number, comment: string) {
  const productPath = path.join(productsDirectory, `${productId}.mdx`);

  try {
    const fileContents = await fs.readFile(productPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!data.ratings) {
      data.ratings = [];
    }

    data.ratings.push({ id: uuidv4(), rating, comment });

    const newContent = matter.stringify(content, data);
    await fs.writeFile(productPath, newContent);

    revalidatePath(`/menu/${productId}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to add rating.' };
  }
}
