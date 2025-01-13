import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Products, StateProps } from '../../../../type';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { decreaseQuantity, increaseQuantity, calculateTotalPrice, deleteProduct } from '@/redux/shoppingSlice';

const CartItem = () => {
    const { productData } = useSelector((state: StateProps) => state.shopping);
    const dispatch = useDispatch();

    return (
        <div className='flex flex-col gap-y-2'>
            <div className='hidden lg:inline-flex items-center justify-between font-semibold bg-white p-2'>
                <p className='w-1/3'>Product</p>
                <p className='w-1/3 flex items-center justify-center'>Quantity</p>
                <p className='w-1/3 flex items-center justify-end'>Subtotal</p>
            </div>
            <div className='flex flex-col gap-y-2'>
                {
                    productData?.map((product: Products) => {
                        const subtotal = calculateTotalPrice(product, product.options, product.quantity);
                        return (
                            <div key={product.id} className='w-full bg-white p-4 flex flex-col md:flex-row items-center justify-between gap-4'>
                                <div className='flex items-center gap-x-3 w-full md:w-1/3'>
                                    <span onClick={() => dispatch(deleteProduct({ id: product.id, options: product.options }))} className='text-lg hover:text-red-600 cursor-pointer duration-200'>
                                        <AiOutlineClose />
                                    </span>
                                    <Image
                                        src={product.path || 'fallback-image-url'}
                                        width={500}
                                        height={500}
                                        alt='product image'
                                        className='w-20 h-20 object-cover'
                                    />
                                </div>
                                <div className='flex flex-col w-full md:w-1/3'>
                                    <p><strong>{product.title}</strong></p>
                                    <p>Size: {product.options.size || 'N/A'}</p>
                                    <p>Extra Ingredients: {product.options.extraIngredients?.join(', ') || 'None'}</p>
                                    <p>Without: {product.options.withoutOptions?.join(', ') || 'None'}</p>
                                </div>
                                <div className='flex items-center justify-start gap-x-3 border-[1px] border-slate-300 py-2 px-4 w-full md:w-auto'>
                                    <p>Quantity</p>
                                    <div className='flex items-center text-lg'>
                                        <span onClick={() => dispatch(decreaseQuantity({ id: product.id, options: product.options }))} className='cursor-pointer'><FiChevronLeft /></span>
                                        <span>{product.quantity}</span>
                                        <span onClick={() => dispatch(increaseQuantity({ id: product.id, options: product.options }))} className='cursor-pointer'><FiChevronRight /></span>
                                    </div>
                                </div>
                                <div className='w-full md:w-1/3 flex justify-end'>
                                    <p className='text-lg font-semibold'>{subtotal.toFixed(2)} €</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default CartItem;
