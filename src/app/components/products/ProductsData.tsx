//app/components/productsData.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoBagAdd } from "react-icons/io5";
import { ItemProps } from "../../../type/productType";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "@/components/modal";
import IsFavourite from "@/app/product-search/is-favourite.server.tsx";

const ProductsData = ({ product }: ItemProps) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0]?.size || ""
  );
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);
  const [withoutOptions, setWithoutOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [zoomed, setZoomed] = useState(false);

  const handleOpenZoom = () => setZoomed(true);
  const handleCloseZoom = () => setZoomed(false);

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
    setQuantity(1);
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
          <div className="flex flex-col items-center justify-center p-1 w-[260px] h-[260px] bg-darkBg rounded-t-full cursor-zoom-in">
            <Image
              className="rounded-full w-[250px] h-[250px]"
              src={product.images?.[0] || "/allor-bbq.jpg"}
              onClick={handleOpenZoom}
              alt="Product"
              width={250}
              height={250}
            />
          </div>
          <div className="flex flex-col justify-between gap-y-2 bg-darkBg rounded-b-lg min-h-[160px]">
            <div className="flex items-center justify-between p-2">
            <Link href={`/menu/${product?.id}`}>
              <HiViewfinderCircle className="text-darkText text-2xl hover:text-lightText duration-300 cursor-pointer" />
            </Link>

              <h3 className="text-center text-2xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent p-1 line-clamp-1 max-w-[192px]">
                {product.title}
              </h3>
              <IsFavourite product={product} />
            </div>

            <p className="line-clamp-3 text-center max-w-[240px] h-[66px] mx-auto">
              {product.description}
            </p>

            <div className="flex flex-row items-center justify-between p-2">
              <h3 className="text-lg font-extrabold text-lightText">
                {product.sizes[0].price} €
              </h3>
              <button
                onClick={handleShow}
                className="text-2xl hover:text-lightText duration-300 "
                aria-label="Add to cart"
              >
                <IoBagAdd />
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
              <Modal isOpen={show} onClose={handleClose} title={product.title}>
                {/* product image */}
                <div className="mx-auto flex flex-col items-center justify-center my-4 cursor-zoom-in">
                  <Image
                    className="rounded-full w-[250px] h-[250px]"
                    src={product.images?.[0] || "/allor-bbq.jpg"}
                    onClick={handleOpenZoom}
                    alt="Product"
                    width={250}
                    height={250}
                  />
                </div>

                {/* product description */}
                <div className="flex flex-col items-center justify-center pb-4">
                  <p className="text-lg text-center">{product.description}</p>
                </div>

                {/* Modal Body */}
                <div className="scroll-smooth">
                  <Form className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-8">
                    {/* Extra Ingredients */}
                    <Form.Group>
                      <Form.Label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent pb-2">
                        Opzioni Extra:
                      </Form.Label>
                      {product.extraIngredients.map((ingredient) => {
                        const checked = extraIngredients.includes(
                          ingredient.ingredient
                        );

                        return (
                          <Form.Check
                            key={ingredient.ingredient}
                            className="flex items-center gap-2 mt-4"
                          >
                            {/* Custom-styled checkbox input */}
                            <Form.Check.Input
                              type="checkbox"
                              id={ingredient.ingredient}
                              value={ingredient.ingredient}
                              checked={checked}
                              onChange={() =>
                                handleCheckboxChange(
                                  ingredient.ingredient,
                                  setExtraIngredients
                                )
                              }
                              className="
                          appearance-none
                          relative
                          w-5 h-5
                          rounded-full
                          bg-white
                          border-2 border-lightText
                          checked:bg-lightText
                          checked:border-lightText
                          cursor-pointer
                          after:content-['✓']
                          after:text-white
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
                              className="cursor-pointer"
                            >
                              {ingredient.ingredient} (+{ingredient.price})
                            </Form.Check.Label>
                          </Form.Check>
                        );
                      })}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent pb-2">
                        Senza Opzioni
                      </Form.Label>

                      {product.withoutOptions.map((option) => {
                        const checked = withoutOptions.includes(option);

                        return (
                          <Form.Check
                            key={option}
                            className="flex items-center gap-2 mt-4"
                          >
                            {/* Custom-styled checkbox input */}
                            <Form.Check.Input
                              type="checkbox"
                              id={option}
                              value={option}
                              checked={checked}
                              onChange={() =>
                                handleCheckboxChange(option, setWithoutOptions)
                              }
                              className="
                                appearance-none
                                relative
                                w-5 h-5
                                rounded-full
                                bg-white
                                border-2 border-lightText
                                checked:bg-lightText
                                checked:border-lightText
                                cursor-pointer
                                after:content-['✓']
                                after:text-white
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
                              className="cursor-pointer"
                            >
                              {option}
                            </Form.Check.Label>
                          </Form.Check>
                        );
                      })}
                    </Form.Group>

                    {/* Quantity - with +/- buttons */}
                    <Form.Group className="flex flex-col">
                      <Form.Label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent pb-2">
                        Quantità:
                      </Form.Label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                          className="px-3 py-1 bg-lightText text-white font-semibold rounded-lg hover:bg-hoverBg transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="text-xl font-semibold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1 bg-lightText text-white font-semibold rounded-lg hover:bg-hoverBg transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                    </Form.Group>

                    {/* Size Selection */}
                    <Form.Group className="flex flex-col">
                      <Form.Label className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent pb-2">
                        Scegli una taglia:
                      </Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className=" border-2 border-lightText rounded-lg text-lightText cursor-pointer"
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
                <div className="w-full flex items-center justify-between mt-4">
                  <h3 className="text-lg font-extrabold text-lightText">
                    {totalPrice.toFixed(2)} €
                  </h3>
                  <button
                    onClick={handleAddToCart}
                    className="text-2xl hover:text-lightText duration-300 "
                    aria-label="Add to cart"
                  >
                    <IoBagAdd />
                  </button>
                </div>

                {/* Close Button (X) */}
                <button
                  className="text-lightText absolute top-8 right-8 text-2xl font-sans hover:text-hoverBg duration-300"
                  onClick={handleClose}
                >
                  X
                </button>
              </Modal>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ZOOM MODAL OVERLAY */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-4xl w-full h-auto">
            <Image
              onClick={handleOpenZoom}
              src={product.images?.[0] || "/allor-bbq.jpg"}
              alt="Zoomed Image"
              className="object-contain w-full max-h-[90vh]"
              priority={false}
              width={250}
              height={250}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsData;
