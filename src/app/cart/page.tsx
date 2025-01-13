"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateProps } from '../../../type'
import Container from '../components/navbar/Container';
import CartItem from '../components/cartItem/CartItem';
import { Button } from 'react-bootstrap';
import { resetCart } from '@/redux/shoppingSlice';
import PaymentForm from '../components/paymentForm/PaymentForm';
import Link from 'next/link';

const CartPage = () => {
  const { productData } = useSelector((state: StateProps) => state.shopping);
  const dispatch = useDispatch();
  return (
    <Container>
      {
        productData.length > 0 ?     
        <Container>
          <h2 className='text-2xl font-semibold mb-2'>Cart</h2>
          <div className='flex flex-col gap-5'>
            < CartItem />
            <div className='flex items-center justify-end'>
              <Button
                onClick={()=> dispatch(resetCart())}
                className='bg-red-500 text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-700 hover:text-white duration-200'>
                reset cart
              </Button>
            </div>
            <PaymentForm/>
          </div>
        </Container> 
        : 
        <div className='flex flex-col gap-y-6 items-center justify-center bg-white h-96 px-4'>
          <p className='border-[1px] border-orange w-full p-2 text-center'>Your product cart is currently empty</p>
          <Link href={'/'}>
            <Button className='bg-green text-white py-2 px-6 rounded-md hover:bg-orange duration-200'>Return to shop</Button>
          </Link>
        </div>
      }
    </Container>
  )
}

export default CartPage
