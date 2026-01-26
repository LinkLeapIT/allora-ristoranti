'use client';

import React, { useState, ChangeEvent, useTransition, useEffect } from 'react';
import { updateProduct } from "@/app/actions/productActions";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
  slug: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  images: string[];
  allergy?: string[];
  status?: 'available' | 'unavailable' | 'hidden';
}

interface Category {
  id: string;
  name: string;
}

const PRODUCT_STATUS = ['available', 'unavailable', 'hidden'] as const;

export default function EditProductForm({ product }: { product: Product }) {
  const [message, setMessage] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(product.images);
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviewUrls: string[] = [];
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        newPreviewUrls.push(url);
      });
      setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
    }
  };

  const removeNewImage = (index: number) => {
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
    const fileInput = document.getElementById('images') as HTMLInputElement;
    if (fileInput) {
      const newFiles = new DataTransfer();
      const existingFiles = Array.from(fileInput.files || []);
      existingFiles.splice(index, 1);
      existingFiles.forEach(file => newFiles.items.add(file));
      fileInput.files = newFiles.files;
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  async function handleUpdateProduct(formData: FormData) {
    if (!product.slug) {
      setMessage('Error: Product slug is missing.');
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      formData.append('existingImages', JSON.stringify(existingImages));
      const result = await updateProduct(product.slug, formData);
      setMessage(result.message || 'Product updated successfully!');
    } catch (error: any) {
      setMessage(error.message || 'An error occurred while updating product.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await handleUpdateProduct(formData);

      await new Promise(resolve => setTimeout(resolve, 2000));

      router.push('/admin/product');
    });
  };

  return (
    <div className='max-w-lg mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Product</h1>

      {message && (
        <p className={`mb-4 p-2 ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className='grid gap-4'>
        <div>
          <label htmlFor='title' className='block font-semibold mb-1'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            className='w-full border border-gray-300 rounded px-3 py-2'
            defaultValue={product.title}
            required
          />
        </div>

        <div>
          <label htmlFor='description' className='block font-semibold mb-1'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            rows={3}
            className='w-full border border-gray-300 rounded px-3 py-2'
            defaultValue={product.description}
          />
        </div>

        <div>
          <label htmlFor='price' className='block font-semibold mb-1'>
            Price
          </label>
          <input
            type='number'
            step='0.01'
            min='0'
            name='price'
            id='price'
            className='w-full border border-gray-300 rounded px-3 py-2'
            defaultValue={product.price}
            required
          />
        </div>

        <div>
          <label htmlFor='category' className='block font-semibold mb-1'>
            Category
          </label>
          <select
            name='category'
            id='category'
            className='w-full border border-gray-300 rounded px-3 py-2'
            defaultValue={product.category}
            required
          >
            <option value=''>Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-3'>
          <label htmlFor='allergy' className='block font-semibold mb-1'>Allergy Information</label>
          <input type='text' name='allergy' id='allergy' className='w-full border border-gray-300 rounded px-3 py-2' placeholder='e.g., contains nuts, gluten-free' defaultValue={product.allergy?.join(', ')} />
        </div>
        <div className='mb-3'>
          <label htmlFor='status' className='block font-semibold mb-1'>Item Status</label>
          <select name='status' id='status' className='w-full border border-gray-300 rounded px-3 py-2' defaultValue={product.status} required>
            {PRODUCT_STATUS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {existingImages.length > 0 && (
          <div>
            <label className='block font-semibold mb-1'>Current Images</label>
            <div className='grid grid-cols-2 gap-4'>
              {existingImages.map((image, index) => (
                <div key={index} className='relative'>
                  <Image
                    src={image}
                    alt={`Product ${index + 1}`}
                    width={200}
                    height={200}
                    className='rounded'
                  />
                  <button
                    type='button'
                    onClick={() => removeExistingImage(index)}
                    className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor='images' className='block font-semibold mb-1'>
            Add New Images
          </label>
          <input
            type='file'
            name='images'
            id='images'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100'
          />
        </div>

        {previewUrls.length > 0 && (
          <div className='grid grid-cols-2 gap-4'>
            {previewUrls.map((url, index) => (
              <div key={index} className='relative'>
                <Image
                  src={url}
                  alt={`New Product ${index + 1}`}
                  width={200}
                  height={200}
                  className='rounded'
                />
                <button
                  type='button'
                  onClick={() => removeNewImage(index)}
                  className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}
