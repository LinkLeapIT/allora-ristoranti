import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Products, StateProps } from '../../../../type';
import Image from 'next/image';
import { TfiTrash } from "react-icons/tfi";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { decreaseQuantity, increaseQuantity, calculateTotalPrice, deleteProduct } from '@/redux/shoppingSlice';

const CartItem = () => {
    const { productData } = useSelector((state: StateProps) => state.shopping);
    const dispatch = useDispatch();

    return (
        <div className='flex flex-col gap-y-2'>
            <div className='flex flex-col gap-y-2'>
                {
                    productData?.map((product: Products) => {
                        const subtotal = calculateTotalPrice(product, product.options, product.quantity);
                        return (
                            <div key={product.id} className='w-full bg-darkBg rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative'>
                                <span onClick={() => dispatch(deleteProduct({ id: product.id, options: product.options }))} className='text-lg hover:text-red-600 transition-colors cursor-pointer duration-300 absolute top-2 right-2'>
                                    <TfiTrash />
                                </span>
                                <div className='flex items-center gap-x-3 w-full md:w-1/3'>
                                    <Image
                                        src={product.path || 'fallback-image-url'}
                                        width={500}
                                        height={500}
                                        alt='product image'
                                        className='w-20 h-20 object-cover rounded-lg'
                                    />
                                </div>
                                <div className='flex flex-col w-full md:w-1/3'>
                                    <p><strong>{product.title}</strong></p>
                                    <p>Misurare: {product.options.size || 'N/A'}</p>
                                    <p>Opzioni Extra: {product.options.extraIngredients?.join(', ') || 'None'}</p>
                                    <p>Senza Opzioni: {product.options.withoutOptions?.join(', ') || 'None'}</p>
                                </div>

                                <div className='flex flex-row items-center gap-4 w-full md:w-1/3'>
                                    <p>Quantity</p>
                                    <div className="flex items-start gap-4">
                                        <button
                                            type="button"
                                            onClick={() => dispatch(decreaseQuantity({ id: product.id, options: product.options }))}
                                            className="px-3 py-1 bg-lightText text-white font-semibold rounded-lg hover:bg-hoverBg transition-colors duration-300"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-semibold">{product.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => dispatch(increaseQuantity({ id: product.id, options: product.options }))}
                                            className="px-3 py-1 bg-lightText text-white font-semibold rounded-lg hover:bg-hoverBg transition-colors duration-300"
                                        >
                                            +
                                        </button>
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