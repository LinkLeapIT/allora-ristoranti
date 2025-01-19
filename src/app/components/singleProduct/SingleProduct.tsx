"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoMdCart } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart, calculateTotalPrice } from "@/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";
import { Products } from "../../../../type";

const SingleProduct = ({ product }: { product: Products }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0]?.size || ""
  );
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);
  const [withoutOptions, setWithoutOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const options = {
      size: selectedSize,
      extraIngredients,
      withoutOptions,
    };
    const calculatedPrice = calculateTotalPrice(product, options, quantity);
    setTotalPrice(calculatedPrice);
  }, [selectedSize, extraIngredients, withoutOptions, quantity, product]);

  const handleAddToCart = () => {
    const options = {
      size: selectedSize,
      extraIngredients,
      withoutOptions,
    };
    dispatch(addToCart({ id: product.id, options, quantity, product }));
    toast.success(`${product.title.substring(0, 15)} added successfully!`);
  };

  const handleCheckboxChange = (option: string, isExtra: boolean) => {
    if (isExtra) {
      setExtraIngredients((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    } else {
      setWithoutOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const getSizePrice = () => {
    const selectedSizeObj = product.sizes.find(
      (size) => size.size === selectedSize
    );
    return selectedSizeObj ? selectedSizeObj.price : 0;
  };

  return (
    <div className="max-w-contentContainer mx-auto flex flex-col items-center justify-center my-4 md:my-8 bg-darkBg">
      {/* Top Section: Image & Details */}
      <div className="py-4 px-4 md:py-8 flex flex-col items-center lg:grid lg:grid-cols-2 gap-4 md:gap-8">
        {/* Product Image */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src={product?.path || "fallback-image-url"}
            alt="Product Image"
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Product Basic Info */}
        <div className="flex flex-col items-center space-y-4 md:space-y-8 text-center">
          <p className="text-2xl md:text-4xl">{product?.title}</p>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {product?.description}
          </p>
          <div className="flex flex-row items-center gap-8 md:gap-16 lg:gap-24">
            <span className="text-lg md:text-xl">
              <strong>SKU:</strong> <span>{product?.id}</span>
            </span>
            <span className="text-lg md:text-xl">
              <strong>Category:</strong> <span>Drinks</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Options & Add-to-cart */}
      <div className="w-full py-4 md:py-8 px-4 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Without Options */}
        <div className="flex flex-col gap-2">
          <label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent pb-2">
            Senza Opzioni
          </label>
          {product.withoutOptions.map((option) => {
            const checked = withoutOptions.includes(option);
            return (
              <label key={option} className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={checked}
                  onChange={() => handleCheckboxChange(option, false)}
                  className="
                    appearance-none relative w-5 h-5 rounded-full bg-white
                    border-2 border-lightText cursor-pointer
                    after:content-['✓'] after:text-white after:text-sm after:font-bold
                    after:hidden checked:after:block after:absolute
                    after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                    checked:bg-lightText checked:border-lightText
                    transition-all duration-300 ease-in-out
                  "
                />
                <span className="cursor-pointer select-none">{option}</span>
              </label>
            );
          })}
        </div>

        {/* Extra Ingredients */}
        <div className="flex flex-col gap-2">
          <label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent pb-2">
            Opzioni Extra
          </label>
          {product.extraIngredients.map(({ ingredient, price }) => {
            const checked = extraIngredients.includes(ingredient);
            return (
              <label
                key={ingredient}
                className="flex items-center gap-2 mt-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxChange(ingredient, true)}
                  className="
                    appearance-none relative w-5 h-5 rounded-full bg-white
                    border-2 border-lightText cursor-pointer
                    after:content-['✓'] after:text-white after:text-sm after:font-bold
                    after:hidden checked:after:block after:absolute
                    after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                    checked:bg-lightText checked:border-lightText
                    transition-all duration-300 ease-in-out
                  "
                />
                <div className="grid grid-cols-2 gap-2">
                  <span>{ingredient}</span>
                  <span className="ml-2">+ €{price}</span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent pb-2">
            Scegli una taglia
          </label>
          <div className="flex flex-col gap-2">
            {product.sizes.map(({ size }) => {
              const checked = selectedSize === size;
              return (
                <label
                  key={size}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    checked={checked}
                    onChange={() => handleSizeChange(size)}
                    className="
                      appearance-none relative w-5 h-5 rounded-sm bg-white
                      border-2 border-lightText cursor-pointer
                      after:content-['✓'] after:text-white after:text-sm after:font-bold
                      after:hidden checked:after:block after:absolute
                      after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                      checked:bg-lightText checked:border-lightText
                      transition-all duration-300 ease-in-out
                    "
                  />
                  <span>{size}</span>
                </label>
              );
            })}
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent block mb-2">
              Quantità
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                className="px-3 py-1 bg-lightText text-white font-semibold rounded-lg 
                           hover:bg-hoverBg transition-colors duration-300"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-lightText text-white font-semibold rounded-lg 
                           hover:bg-hoverBg transition-colors duration-300"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right column (or if you want 3-col layout) */}
        <div className="flex flex-col gap-6 items-start">
          {/* Price */}
          <div className="text-2xl font-semibold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent">
            Total Price: € {totalPrice.toFixed(2)}
          </div>

          {/* Add to Cart button */}
          <div
            onClick={handleAddToCart}
            className="flex items-center cursor-pointer group"
          >
            <button
              className="px-6 py-3 text-sm bg-lightText text-white 
                         uppercase flex items-center border-r-2 border-white
                         rounded-l-lg"
            >
              Add to Cart
            </button>
            <span
              className="bg-link text-xl text-lightText w-12 flex items-center 
                         justify-center group-hover:text-white group-hover:bg-hoverBg 
                         transition-colors duration-300 py-3 rounded-r-lg"
            >
              <IoMdCart />
            </span>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default SingleProduct;
