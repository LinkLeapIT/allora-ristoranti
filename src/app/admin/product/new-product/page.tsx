'use client';

import React, { useState, ChangeEvent, useTransition, useEffect } from 'react';
import { createProduct } from '@/app/actions/productActions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PRODUCT_STATUS = ['available', 'unavailable', 'hidden'] as const;

interface Category {
  id: string;
  name: string;
}

export default function NewProductPage() {
  const [message, setMessage] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const removeImage = (index: number) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsSubmitting(true);
    setMessage('');

    startTransition(async () => {
      try {
        const result = await createProduct(formData);
        setMessage(result.message || 'Product created successfully!');
        setTimeout(() => {
          router.push('/admin/product');
        }, 2000);
      } catch (error: any) {
        setMessage(error.message || 'An error occurred while creating product.');
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Create a New Product</h1>
      {message && (
        <div className={`mb-4 p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 space-y-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <label htmlFor='title' className='block text-lg font-semibold mb-2'>Product Title</label>
            <input type='text' name='title' id='title' className='w-full border border-gray-300 rounded-md px-4 py-2' placeholder='Enter product title' required />
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <label htmlFor='description' className='block text-lg font-semibold mb-2'>Product Description</label>
            <textarea name='description' id='description' rows={5} className='w-full border border-gray-300 rounded-md px-4 py-2' placeholder='Enter product description' />
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <label htmlFor='images' className='block text-lg font-semibold mb-2'>Product Images</label>
            <input type='file' name='images' id='images' accept='image/*' multiple onChange={handleImageChange} className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' />
            {previewUrls.length > 0 && (
              <div className='grid grid-cols-2 gap-4 mt-4'>
                {previewUrls.map((url, index) => (
                  <div key={index} className='relative'>
                    <Image src={url} alt={`Product ${index + 1}`} width={200} height={200} className='rounded-md' />
                    <button type='button' onClick={() => removeImage(index)} className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='space-y-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <label htmlFor='price' className='block text-lg font-semibold mb-2'>Price</label>
            <input type='number' step='0.01' min='0' name='price' id='price' className='w-full border border-gray-300 rounded-md px-4 py-2' placeholder='0.00' required />
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <label htmlFor='category' className='block text-lg font-semibold mb-2'>Category</label>
            <select name='category' id='category' className='w-full border border-gray-300 rounded-md px-4 py-2' required>
              <option value=''>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <label htmlFor='allergy' className='block text-lg font-semibold mb-2'>Allergy Information</label>
            <input type='text' name='allergy' id='allergy' className='w-full border border-gray-300 rounded-md px-4 py-2' placeholder='e.g., contains nuts, gluten-free' />
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <label htmlFor='status' className='block text-lg font-semibold mb-2'>Status</label>
            <select name='status' id='status' className='w-full border border-gray-300 rounded-md px-4 py-2' required>
              {PRODUCT_STATUS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold' disabled={isSubmitting || isPending}> {isSubmitting || isPending ? 'Creating Product...' : 'Create Product'}</button>
        </div>
      </form>
    </div>
  );
}
