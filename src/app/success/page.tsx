import React from 'react'
import Container from '../components/navbar/Container'
import { Button } from 'react-bootstrap'
import Link from 'next/link'

const SuccessPage = () => {
  return (
    <Container className='flex items-center justify-center py-20'>
        <div className='min-h-[400px] flex flex-col items-center justify-center gap-y-5'>
            <h2 className='text-4xl font-bold text-center'>Your Payment Accepted by Allora Restaurant</h2>
            <p>Now you can view your orders or continue shopping with us</p>
            <div className='flex items-center gap-x-5'>
                <Link href={'/order'}>
                    <Button className='bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange duration-300'>View Orders</Button>
                </Link>
                <Link href={'/'}>
                    <Button className='bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange duration-300'>Continue Shopping</Button>
                </Link>
            </div>
        </div>
    </Container>
  )
}

export default SuccessPage
