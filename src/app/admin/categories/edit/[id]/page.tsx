'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCategoryPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const id = useParams()?.id;

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/categories?id=${id}`);
          if (response.ok) {
            const data = await response.json();
            setName(data.name);
          } else {
            setMessage('Failed to fetch category');
          }
        } catch (error) {
          setMessage('An error occurred while fetching category.');
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    startTransition(async () => {
      try {
        const response = await fetch(`/api/categories?id=${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        const result = await response.json();

        if (response.ok) {
          setMessage(`Category updated successfully!`);
          setTimeout(() => {
            router.push('/admin/categories');
          }, 2000);
        } else {
          setMessage(result.message || 'An error occurred while updating the category.');
        }
      } catch (error: any) {
        setMessage(error.message || 'An error occurred.');
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className='max-w-xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Edit Category</h1>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        {message && (
          <div className={`mb-4 p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='name' className='block text-lg font-semibold mb-2'>Category Name</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-4 py-2'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold'
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? 'Updating Category...' : 'Update Category'}
          </button>
        </form>
      </div>
    </div>
  );
}
