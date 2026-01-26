'use server';

import { revalidatePath } from 'next/cache';
import { writeFile, mkdir, unlink, readdir, readFile } from 'fs/promises';
import { join } from 'path';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import matter from 'gray-matter';
import { Products } from '@/types';

const createSlug = (text: string) => slugify(text, { lower: true, strict: true });

const productsDir = join(process.cwd(), 'src', 'content', 'products');

export async function getProducts(): Promise<Products[]> {
  const productFiles = await readdir(productsDir);

  const products = await Promise.all(
    productFiles.map(async (filename) => {
      const filePath = join(productsDir, filename);
      const fileContent = await readFile(filePath, 'utf-8');
      const { data } = matter(fileContent);
      const slug = filename.replace(/\.mdx?$/, '');
      return {
        id: slug,
        title: data.title,
        images: data.images,
        description: data.description,
        price: data.price,
        isFeatured: data.isFeatured,
        isNew: data.isNew,
        category: data.category,
        ratings: data.ratings || [],
        slug,
        allergy: data.allergy || [],
        status: data.status || '',
      } as Products;
    })
  );

  return products;
}

export async function getProduct(slug: string): Promise<Products | null> {
  const filePath = join(productsDir, `${slug}.mdx`);
  try {
    const fileContent = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      id: slug,
      title: data.title,
      images: data.images,
      description: content,
      price: data.price,
      isFeatured: data.isFeatured,
      isNew: data.isNew,
      category: data.category,
      ratings: data.ratings || [],
      slug,
      allergy: data.allergy || [],
      status: data.status || '',
    } as Products;
  } catch (error) {
    return null;
  }
}

export async function createProduct(formData: FormData) {
  try {
    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const price = parseFloat(formData.get('price')?.toString() || '0');
    const category = formData.get('category')?.toString() || '';
    const status = formData.get('status')?.toString() || '';

    if (!title) throw new Error('Title is required.');
    if (!category) throw new Error('Category is required.');

    const imageFiles = formData.getAll('images') as File[];
    const imagePaths: string[] = [];

    const productSlug = createSlug(title);
    const imageDir = join(process.cwd(), 'public', 'images', 'products', productSlug);
    await mkdir(imageDir, { recursive: true });

    for (const imageFile of imageFiles) {
      if (imageFile instanceof File && imageFile.size > 0) {
        const imageName = `${uuidv4()}-${imageFile.name}`;
        const imagePath = join(imageDir, imageName);
        const imageUrl = `/images/products/${productSlug}/${imageName}`;

        const imageBuffer = await imageFile.arrayBuffer();
        await writeFile(imagePath, Buffer.from(imageBuffer));
        imagePaths.push(imageUrl);
      }
    }

    const allergyStr = formData.get('allergy')?.toString() || '';
    const allergy = allergyStr ? allergyStr.split(',').map(item => item.trim()).filter(Boolean) : [];

    const mdxContent = `---
title: '${title}'
description: '${description}'
price: ${price}
category: '${category}'
status: '${status}'
images:
${imagePaths.map(path => `  - ${path}`).join('\n')}
allergy:
${allergy.map(option => `  - ${option}`).join('\n')}
createdAt: '${new Date().toISOString()}'
---

${description}
`;

    const mdxFilePath = join(process.cwd(), 'src', 'content', 'products', `${productSlug}.mdx`);
    await writeFile(mdxFilePath, mdxContent);

    revalidatePath('/menu');
    return { success: true, message: 'Product created successfully!' };
  } catch (error: any) {
    console.error('Error creating product:', error);
    throw new Error(error?.message || 'An error occurred while creating product.');
  }
}

export async function updateProduct(slug: string, formData: FormData) {
  try {
    const product = await getProduct(slug);
    if (!product) {
      throw new Error('Product not found.');
    }

    const title = formData.get('title')?.toString() || product.title;
    const description = formData.get('description')?.toString() || product.description;
    const priceValue = formData.get('price');
    const price = priceValue ? parseFloat(priceValue.toString()) : product.price;
    const category = formData.get('category')?.toString() || product.category;
    const status = formData.get('status')?.toString() || product.status;

    const productSlug = createSlug(title);
    const imageDir = join(process.cwd(), 'public', 'images', 'products', productSlug);
    await mkdir(imageDir, { recursive: true });

    const imageFiles = formData.getAll('images') as File[];
    const newImagePaths: string[] = [];

    for (const imageFile of imageFiles) {
      if (imageFile instanceof File && imageFile.size > 0) {
        const imageName = `${uuidv4()}-${imageFile.name}`;
        const imagePath = join(imageDir, imageName);
        const imageUrl = `/images/products/${productSlug}/${imageName}`;

        const imageBuffer = await imageFile.arrayBuffer();
        await writeFile(imagePath, Buffer.from(imageBuffer));
        newImagePaths.push(imageUrl);
      }
    }

    const existingImagesValue = formData.get('existingImages');
    const existingImages = existingImagesValue ? JSON.parse(existingImagesValue.toString()) : product.images || [];
    const allImages = [...existingImages, ...newImagePaths];

    const allergyStr = formData.get('allergy')?.toString() || '';
    const allergy = allergyStr ? allergyStr.split(',').map(item => item.trim()).filter(Boolean) : product.allergy;

    const mdxContent = `---
title: '${title}'
description: '${description}'
price: ${price}
category: '${category}'
status: '${status}'
images:
${allImages.map(path => `  - ${path}`).join('\n')}
allergy:
${allergy.map(option => `  - ${option}`).join('\n')}
updatedAt: '${new Date().toISOString()}'
---

${description}
`;

    const newMdxFilePath = join(process.cwd(), 'src', 'content', 'products', `${productSlug}.mdx`);
    if (slug !== productSlug) {
      const oldMdxFilePath = join(process.cwd(), 'src', 'content', 'products', `${slug}.mdx`);
      await unlink(oldMdxFilePath);
    }
    await writeFile(newMdxFilePath, mdxContent);

    revalidatePath('/menu');
    return { success: true, message: 'Product updated successfully!' };
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw new Error(error?.message || 'An error occurred while updating product.');
  }
}

export async function deleteProduct(slug: string) {
  try {
    const mdxFilePath = join(process.cwd(), 'src', 'content', 'products', `${slug}.mdx`);
    await unlink(mdxFilePath);

    revalidatePath('/menu');
    return { success: true, message: 'Product deleted successfully!' };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    throw new Error(error?.message || 'An error occurred while deleting product.');
  }
}
