"use client"
import { useDispatch, useSelector } from 'react-redux';
import { Products, StateProps } from '../../../../type';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { calculateTotalPrice, resetOrder } from '@/redux/shoppingSlice';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const OrderDetails = () => {
  const dispatch = useDispatch()
    const { orderData } = useSelector((state: StateProps) => state.shopping);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        let amt = 0;
        orderData?.order?.forEach((item: Products) => {
            amt += calculateTotalPrice(item, item.options, item.quantity);
        });
        setTotalAmount(amt);
    }, [orderData.order]);

    return (
      <div>
        {
          orderData?.order?.length > 0 ? 
          <div>
          <div className='grid grid-cols-11 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300'>
              <p className='col-span-6'>Items</p>
              <p className='flex items-center justify-center'>Quantity</p>
              <p className='flex items-center justify-center'>Sides</p>
              <p className='flex items-center justify-center'>Without</p>
              <p className='flex items-center justify-center'>Unit Price</p>
              <p className='flex items-center justify-center'>Amount</p>
          </div>
          <div className='py-2 flex flex-col justify-center gap-2'>
              {orderData?.order?.map((item: Products) => {
                  const unitPrice = calculateTotalPrice(item, item.options, 1);
                  const amount = unitPrice * item.quantity;
                  return (
                      <div key={item.id} className='py-2 border-b-[1px] border-gray-300 grid grid-cols-11 items-center'>
                          <div className='col-span-6 flex items-start gap-2 text-sm'>
                              <Image
                                  src={item.path || 'fallback-image-url'}
                                  alt='product image'
                                  width={500}
                                  height={500}
                                  className='w-12 h-12 object-cover'
                              />
                              <div>
                                  <h3 className='text-base font-semibold mb-.5'>{item?.title}</h3>
                                  <p>{item?.description}</p>
                              </div>
                          </div>
                          <p className='flex items-center justify-center'>{item?.quantity}</p>
                          <p className='flex items-center justify-center'>
                              {item?.options?.extraIngredients?.join(', ') || 'None'}
                          </p>
                          <p className='flex items-center justify-center'>
                              {item?.options?.withoutOptions?.join(', ') || 'None'}
                          </p>
                          <p className='flex items-center justify-center'>{unitPrice.toFixed(2)} €</p>
                          <p className='flex items-center justify-center'>{amount.toFixed(2)} €</p>
                      </div>
                  );
              })}
          </div>
          <div className='text-right text-lg font-semibold mt-4'>
              Total: {totalAmount.toFixed(2)} €
          </div>
          <Button onClick={()=>dispatch(resetOrder())} className='mt-5 border-[1px] border-gray-500 py-1 px-4 font-medium hover:border-orange cursor-pointer duration-200'>
            Reset Order
          </Button>
      </div> : ( 
            <div className='py-10 bg-white text-black text-2xl text-center'>
              <p>Nothing to show</p>
              <Link href={'/'}>
                <Button className='bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold mt-2 hover:bg-orange duration-300'>Continue Shopping</Button>
              </Link>
            </div>
        )}
      </div>
    );
}

export default OrderDetails;
