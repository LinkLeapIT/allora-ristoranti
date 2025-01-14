"use client";

import React, { useState, useEffect } from 'react';
import { Card, Form } from "react-bootstrap";
import { GoHeart } from "react-icons/go";
import { HiViewfinderCircle } from "react-icons/hi2";
import { ItemProps } from '../../../../type';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/shoppingSlice';
import toast, { Toaster } from 'react-hot-toast';

// 1) Import AnimatePresence & motion from Framer Motion
import { AnimatePresence, motion } from 'framer-motion';

import { Modal } from '@/components/modal'; // Your custom modal

const ProductsData = ({ product }: ItemProps) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0]?.size || ''
  );
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);
  const [withoutOptions, setWithoutOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const basePrice =
      product.sizes.find((size) => size.size === selectedSize)?.price || 0;

    const extrasPrice = extraIngredients.reduce((acc, ingredient) => {
      const ingredientPrice =
        product.extraIngredients.find((item) => item.ingredient === ingredient)
          ?.price || 0;
      return acc + ingredientPrice;
    }, 0);

    setTotalPrice((basePrice + extrasPrice) * quantity);
  }, [selectedSize, extraIngredients, quantity, product]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddToCart = () => {
    const options = {
      size: selectedSize,
      extraIngredients,
      withoutOptions,
    };
    dispatch(addToCart({ id: product.id, options, quantity, product }));
    toast.success(`${product.title.substring(0, 15)} added successfully!`);
    setExtraIngredients([]);
    setWithoutOptions([]);
    handleClose();
  };

  const handleCheckboxChange = (
    item: string,
    setOptions: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setOptions((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // 2) Motion variants for the modal container
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -40, opacity: 0 },
  };

  return (
    <>
      <Card className="mx-auto">
        {/* Image & Title */}
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center p-1 w-[260px] h-[260px] bg-gradient-to-t from-yellow to-orange rounded-t-full">
            <Image
              className="rounded-full w-[250px] h-[250px]"
              src={product.path || 'fallback-image-url'}
              alt="Product"
              width={250}
              height={250}
            />
          </div>
          <div className="flex flex-col justify-between gap-y-2 bg-gradient-to-t from-orange to-yellow rounded-b-lg min-h-[160px]">
            <div className='flex items-center justify-between p-2'>
              <Link href={{ pathname: '/product', query: { id: product?.id } }}>
                <HiViewfinderCircle className="text-lightText text-4xl p-[2px] rounded-full bg-yellow hover:bg-orange hover:text-hoverBg duration-200 cursor-pointer border-2 border-orange" />
              </Link>
              <h3 className="text-center text-2xl font-extrabold bg-gradient-to-r from-lightText to-orange bg-clip-text text-transparent p-1">
                {product.title}
              </h3>
              <GoHeart className="text-lightText text-4xl p-[2px] rounded-full hover:bg-orange bg-yellow hover:text-hoverBg duration-200 cursor-pointer border-2 border-orange" />
            </div>

            <p className="line-clamp-3 text-center max-w-[240px] mx-auto">
              {product.description}
            </p>

            <div className="flex flex-row items-center justify-between p-2">
              <h3 className="text-lg font-extrabold text-lightText">
                {totalPrice.toFixed(2)} €
              </h3>
              <button
                onClick={handleShow}
                className="flex items-center justify-center w-1/2 h-6 bg-hoverBg hover:bg-orange hover:text-white duration-300 hover:border-yellow border-[2px] border-orange rounded-lg"
                aria-label="Add to cart"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <Toaster />
      </Card>

      {/* 3) AnimatePresence: for mounting/unmounting the modal with transitions */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2"
            onClick={handleClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Modal
                isOpen={show}
                onClose={handleClose}
                title={product.title}
              >
                {/* product image */}
                <div className="mx-auto flex flex-col items-center justify-center my-4">
                  <Image
                    className="rounded-full w-[250px] h-[250px]"
                    src={product.path || 'fallback-image-url'}
                    alt="Product"
                    width={250}
                    height={250}
                  />
                </div>

                {/* product description */}
                <div className="flex flex-col items-center justify-center pb-4">
                  <p className="text-lg line-clamp-3 text-center max-w-[240px]">
                    {product.description}
                  </p>
                </div>

                {/* Modal Body */}
                <div className="text-lightText scroll-smooth">
                  <Form className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-8">
                    {/* Extra Ingredients */}
                    <Form.Group>
                      <Form.Label className="text-lg font-extrabold bg-gradient-to-r from-lightText to-orange bg-clip-text text-transparent">
                      Choose extra ingredients:
                      </Form.Label>
                      {product.extraIngredients.map((ingredient) => {
                      const checked = extraIngredients.includes(ingredient.ingredient);

                      return (
                        <Form.Check key={ingredient.ingredient} className="flex items-center gap-2 mb-1">
                        {/* Custom-styled checkbox input */}
                        <Form.Check.Input
                          type="checkbox"
                          id={ingredient.ingredient}
                          value={ingredient.ingredient}
                          checked={checked}
                          onChange={() => handleCheckboxChange(ingredient.ingredient, setExtraIngredients)}
                          className="
                          appearance-none
                          relative
                          w-5 h-5
                          rounded-full
                          bg-yellow
                          border-2 border-orange-500
                          checked:bg-orange-500
                          checked:border-orange-500
                          cursor-pointer
                          after:content-['✓']
                          after:text-lightText
                          after:text-sm
                          after:font-bold
                          after:hidden
                          checked:after:block
                          after:absolute
                          after:top-1/2
                          after:left-1/2
                          after:-translate-x-1/2
                          after:-translate-y-1/2
                          "
                        />

                        {/* Label text */}
                        <Form.Check.Label
                          htmlFor={ingredient.ingredient}
                          className="text-sm text-text cursor-pointer"
                        >
                          {ingredient.ingredient} (+{ingredient.price})
                        </Form.Check.Label>
                        </Form.Check>
                      );
                      })}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-lg font-extrabold bg-gradient-to-r from-lightText to-orange bg-clip-text text-transparent">
                        Choose without options:
                      </Form.Label>

                      {product.withoutOptions.map((option) => {
                        const checked = withoutOptions.includes(option);

                        return (
                          <Form.Check key={option} className="flex items-center gap-2 mb-1">
                            {/* Custom-styled checkbox input */}
                            <Form.Check.Input
                              type="checkbox"
                              id={option}
                              value={option}
                              checked={checked}
                              onChange={() => handleCheckboxChange(option, setWithoutOptions)}
                              className="
                                appearance-none
                                relative
                                w-5 h-5
                                rounded-full
                                bg-yellow
                                border-2 border-orange-500
                                checked:bg-orange-500
                                checked:border-orange-500
                                cursor-pointer
                                after:content-['✓']
                                after:text-lightText
                                after:text-sm
                                after:font-bold
                                after:hidden
                                checked:after:block
                                after:absolute
                                after:top-1/2
                                after:left-1/2
                                after:-translate-x-1/2
                                after:-translate-y-1/2
                              "
                            />

                            {/* Label text */}
                            <Form.Check.Label
                              htmlFor={option}
                              className="text-sm text-text cursor-pointer"
                            >
                              {option}
                            </Form.Check.Label>
                          </Form.Check>
                        );
                      })}
                    </Form.Group>

                    {/* Quantity - with +/- buttons */}
                    <Form.Group>
                      <Form.Label className="text-lg font-extrabold bg-gradient-to-r from-lightText to-orange bg-clip-text text-transparent">
                        Quantity:
                      </Form.Label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                          className="px-3 py-1 bg-lightText text-orange font-semibold rounded-lg hover:bg-orange hover:text-white transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="text-xl font-semibold">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1 bg-lightText text-orange font-semibold 
                                     rounded-lg hover:bg-orange hover:text-white 
                                     transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                    </Form.Group>

                    {/* Size Selection */}
                    <Form.Group>
                      <Form.Label className="text-lg font-extrabold bg-gradient-to-r from-lightText to-orange bg-clip-text text-transparent mr-2">
                        Choose a size:
                      </Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="bg-yellow border-2 border-orange rounded-lg text-lightText"
                      >
                        {product.sizes.map((size) => (
                          <option key={size.size} value={size.size}>
                            {size.size} (+€{size.price})
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </div>

                {/* Modal Footer */}
                <div className="w-full flex items-center justify-around mt-4">
                  <h3 className="text-lg font-extrabold text-lightText">
                    {totalPrice.toFixed(2)} €
                  </h3>
                  <button
                    className="bg-hoverBg border-2 border-orange py-1 px-4 rounded-lg text-lightText 
                               hover:bg-orange hover:text-white transition-colors duration-300"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Close Button (X) */}
                <button
                  className="text-red-700 absolute top-8 right-8 text-2xl font-sans 
                             hover:text-red-500 duration-300"
                  onClick={handleClose}
                >
                  X
                </button>
              </Modal>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsData;
