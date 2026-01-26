'use server'

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const categoriesDirectory = path.join(process.cwd(), 'src/content/categories');
const productsDirectory = path.join(process.cwd(), 'src/content/products');


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const filePath = path.join(categoriesDirectory, `${id}.mdx`);
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ message: 'Category not found' }, { status: 404 });
      }
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return NextResponse.json({ id, name: data.name });
    } else {
      const filenames = fs.readdirSync(categoriesDirectory);
      const categories = filenames.map((filename) => {
        const filePath = path.join(categoriesDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return {
          id: filename.replace(/\.mdx?$/, ''),
          name: data.name
        };
      });
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }

    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const filename = `${id}.mdx`;
    const filePath = path.join(categoriesDirectory, filename);

    if (fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'Category already exists' }, { status: 409 });
    }

    const fileContent = `---\nname: ${name}\n---`;

    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ id, name });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { name } = await req.json();

    if (!id || !name) {
      return NextResponse.json({ message: 'Category ID and name are required' }, { status: 400 });
    }

    const filePath = path.join(categoriesDirectory, `${id}.mdx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const fileContent = `---\nname: ${name}\n---`;

    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ id, name });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ message: 'Error updating category' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
    }

    // Check if the category is in use by any product
    const productFilenames = fs.readdirSync(productsDirectory);
    for (const filename of productFilenames) {
      const filePath = path.join(productsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      if (data.category === id) {
        return NextResponse.json({ message: 'This category is currently in use and cannot be deleted.' }, { status: 409 });
      }
    }

    const filePath = path.join(categoriesDirectory, `${id}.mdx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
  }
}
