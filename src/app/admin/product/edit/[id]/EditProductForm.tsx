"use client";

import React, { useState, ChangeEvent, useTransition } from "react";
import { updateProduct } from "@/app/actions/createProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ExtraIngredient {
  ingredient: string;
  price: number;
}

interface Size {
  size: string;
  price: number;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category?: string;
  images: string[];
  withoutOptions: string[];
  extraIngredients: ExtraIngredient[];
  sizes: Size[];
}

interface InputsState {
  paths: string[];
  withoutOptions: string[];
  extraIngredients: ExtraIngredient[];
  sizes: Size[];
}

const CATEGORIES = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Sides",
  "Specials"
] as const;

export default function EditProductForm({ product }: { product: Product }) {
  const [message, setMessage] = useState("");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(product.images);
  const [isPending, startTransition] = useTransition();
const router = useRouter();

  // Initialize state with existing product data
  const [state, setState] = useState<{
    inputs: InputsState;
  }>({
    inputs: {
      paths: [],
      withoutOptions: product.withoutOptions || [],
      extraIngredients: product.extraIngredients || [],
      sizes: product.sizes || [],
    },
  });

  // Handle new image uploads
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

  // Remove new image preview
  const removeNewImage = (index: number) => {
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
    if (previewUrls.length === 1) {
      const fileInput = document.getElementById('images') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  // Remove existing image
  const removeExistingImage = (index: number) => {
    setExistingImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  async function handleUpdateProduct(formData: FormData) {
    if (!product.id) {
      setMessage("Error: Product ID is missing.");
      return;
    }
    setIsSubmitting(true);
    setMessage("");
    try {
      formData.append('existingImages', JSON.stringify(existingImages));
      const result = await updateProduct(product.id, formData);
      setMessage(result.message || "Product updated successfully!");
    } catch (error: any) {
      setMessage(error.message || "An error occurred while updating product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    startTransition(async () => {
      await handleUpdateProduct(formData);
  
      // Delay for 2 seconds before navigating
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      router.push("/admin/product");
    });
  };
  // Handle without options input (comma-separated)
  function handleArrayInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const values = value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);

    setState(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        withoutOptions: values,
      },
    }));
  }

  // Handle price changes for extraIngredients and sizes
  function handlePriceChange(
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: "extraIngredients" | "sizes"
  ) {
    const { value } = e.target;
    const numericVal = parseFloat(value);

    setState(prev => {
      const newList = [...prev.inputs[field]];
      newList[index] = {
        ...newList[index],
        price: isNaN(numericVal) ? 0 : numericVal,
      };
      return {
        ...prev,
        inputs: {
          ...prev.inputs,
          [field]: newList,
        },
      };
    });
  }

  // Handle extra ingredients name changes
  function handleSidesInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    setState(prev => {
      const newIngredients = [...prev.inputs.extraIngredients];
      newIngredients[index] = {
        ...newIngredients[index],
        ingredient: value,
      };
      return {
        ...prev,
        inputs: {
          ...prev.inputs,
          extraIngredients: newIngredients,
        },
      };
    });
  }

  // Handle size name changes
  function handleSizeInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    setState(prev => {
      const newSizes = [...prev.inputs.sizes];
      newSizes[index] = {
        ...newSizes[index],
        size: value,
      };
      return {
        ...prev,
        inputs: {
          ...prev.inputs,
          sizes: newSizes,
        },
      };
    });
  }

  // Add new extra ingredient
  function handleAddSides() {
    setState(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        extraIngredients: [
          ...prev.inputs.extraIngredients,
          { ingredient: "", price: 0 },
        ],
      },
    }));
  }

  // Add new size
  function handleAddSize() {
    setState(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        sizes: [...prev.inputs.sizes, { size: "", price: 0 }],
      },
    }));
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {message && (
        <p className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={product.title}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={product.description}
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            id="price"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={product.price}
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block font-semibold mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            name="quantity"
            id="quantity"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={product.quantity}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={product.category}
            required
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <label className="block font-semibold mb-1">Current Images</label>
            <div className="grid grid-cols-2 gap-4">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Product ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images Upload */}
        <div>
          <label htmlFor="images" className="block font-semibold mb-1">
            Add New Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
          />
        </div>

        {/* New Image Previews */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <Image
                  src={url}
                  alt={`New Product ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Without Options */}
        <div>
          <label htmlFor="withoutOptions" className="block font-semibold mb-1">
            Without Options (comma-separated)
          </label>
          <input
            type="text"
            id="withoutOptions"
            name="withoutOptions"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={state.inputs.withoutOptions.join(",")}
            onChange={handleArrayInputChange}
          />
        </div>

        {/* Extra Ingredients */}
        <div>
          <h4 className="font-semibold mb-2">Extra Ingredients</h4>
          {state.inputs.extraIngredients.map((ingredient, index) => (
            <div className="flex gap-2 mb-2" key={index}>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder="Enter Extra Ingredient"
                value={ingredient.ingredient}
                onChange={(e) => handleSidesInputChange(e, index)}
              />
              <input
                type="number"
                step="0.01"
                className="w-28 border border-gray-300 rounded px-3 py-2"
                placeholder="Price"
                value={ingredient.price || ""}
                onChange={(e) => handlePriceChange(e, index, "extraIngredients")}
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={handleAddSides}
          >
            Add Extra Ingredient
          </button>
        </div>

        {/* Sizes */}
        <div>
          <h4 className="font-semibold mb-2">Sizes</h4>
          {state.inputs.sizes.map((size, index) => (
            <div className="flex gap-2 mb-2" key={index}>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder="Enter Size"
                value={size.size}
                onChange={(e) => handleSizeInputChange(e, index)}
              />
              <input
                type="number"
                step="0.01"
                className="w-28 border border-gray-300 rounded px-3 py-2"
                placeholder="Price"
                value={size.price || ""}
                onChange={(e) => handlePriceChange(e, index, "sizes")}
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={handleAddSize}
          >
            Add Size
          </button>
        </div>
        <input
    type="hidden"
    name="extraIngredientsJSON"
    value={JSON.stringify(state.inputs.extraIngredients)}
  />
  <input
    type="hidden"
    name="sizesJSON"
    value={JSON.stringify(state.inputs.sizes)}
  />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting || isPending? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}