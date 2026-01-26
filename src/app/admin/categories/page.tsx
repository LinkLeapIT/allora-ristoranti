'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        setMessage('Failed to fetch categories');
      }
    } catch (error) {
      setMessage('An error occurred while fetching categories.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the category "${name}"?`)) {
      try {
        const response = await fetch(`/api/categories?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage(`Category "${name}" deleted successfully.`);
          fetchCategories();
        } else {
          const result = await response.json();
          setMessage(result.message || 'An error occurred while deleting the category.');
        }
      } catch (error) {
        setMessage('An error occurred while deleting the category.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link href="/admin/categories/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          New Category
        </Link>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="p-4">{category.name}</td>
                <td className="p-4 flex justify-end space-x-2">
                  <Link href={`/admin/categories/edit/${category.id}`} className="text-blue-600 hover:text-blue-800">
                    <Edit />
                  </Link>
                  <button onClick={() => handleDelete(category.id, category.name)} className="text-red-600 hover:text-red-800">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
