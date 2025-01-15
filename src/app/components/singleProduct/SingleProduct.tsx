"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {  Form, Row, Col, Button } from "react-bootstrap";
import { IoMdCart } from 'react-icons/io';
import { MdFavoriteBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addToCart, calculateTotalPrice } from '@/redux/shoppingSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Products } from '../../../../type';

const SingleProduct = ({ product }: { product: Products }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || '');
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
      setExtraIngredients(prev =>
        prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option]
      );
    } else {
      setWithoutOptions(prev =>
        prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option]
      );
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const getSizePrice = () => {
    const selectedSizeObj = product.sizes.find(size => size.size === selectedSize);
    return selectedSizeObj ? selectedSizeObj.price : 0;
  };

  return (
    <div className='grid lg:grid-cols-2 gap-5 bg-white p-4 rounded-lg'>
      <div>
        <Image
          src={product?.path || 'fallback-image-url'}
          alt="Product Image"
          width={500}
          height={500}
          className='w-full max-h-[700px] object-cover rounded-lg'
        />
      </div>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-col gap-y-10'>
          <p className='text-2xl text-orange font-semibold'>{product?.title}</p>
          <p>{product?.description}</p>
          <Form.Group>
            <Form.Label>
              <strong>Without Options</strong>
            </Form.Label>
            {product.withoutOptions.map((option: any) => (
              <Form.Check
                key={option}
                type="checkbox"
                label={option}
                onChange={() => handleCheckboxChange(option, false)}
              />
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <strong>Extra</strong>
            </Form.Label>
            {product.extraIngredients.map(({ ingredient, price }: any) => (
              <Form.Check
                key={ingredient}
                type="checkbox"
                label={`${ingredient} (+€${price})`}
                onChange={() => handleCheckboxChange(ingredient, true)}
              />
            ))}
          </Form.Group>
          <div className='flex gap-4'>
            <Form.Label>
              <strong>Sizes</strong>
            </Form.Label>
            <Form.Group className='flex gap-4'>
              {product.sizes.map(({ size }: any) => (
                <Form.Check
                  key={size}
                  type="radio"
                  id={`size-${size}`}
                  label={size}
                  name="size"
                  checked={selectedSize === size}
                  onChange={() => handleSizeChange(size)}
                />
              ))}
            </Form.Group>
          </div>
          <Form as={Row} className='flex gap-4 mb-10'>
            <Form.Label>
              <strong>Quantity</strong>
            </Form.Label>
            <Col>
              <div>
                <input
                  type="number"
                  min="1"
                  className='bg-orange rounded-lg'
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </Col>
          </Form>
        </div>
        <div className='flex flex-col mb-10'>
          <span>
            <strong>SKU:</strong> <span>{product?.id}</span>
          </span>
          <span>
            <strong>Category:</strong> <span>Drinks</span>
          </span>
        </div>
        <div className='flex items-center justify-between mb-10'>
          <div className='text-2xl text-orange font-semibold'>
            Total Price: {totalPrice.toFixed(2)} €
          </div>
          <div
            onClick={handleAddToCart}
            className='flex items-center cursor-pointer group'
          >
            <Button className='px-6 py-3 text-sm bg-orange text-slate-100 uppercase flex items-center border-r-[1px] border-r-slate-500'>
              Add to Cart
            </Button>
            <span className='bg-orange text-xl text-slate-100 w-12 flex items-center justify-center group-hover:bg-yellow duration-200 py-3'>
              <IoMdCart />
            </span>
          </div>
        </div>
        <p className='flex items-center gap-x-2 text-sm'>
          <MdFavoriteBorder className='text-xl ' />
          Add to wishlist
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default SingleProduct;
