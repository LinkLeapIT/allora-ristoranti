import React from 'react'
import Container from './components/navbar/Container';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <Container className='flex items-center justify-center py-20'>
      <div className='max-w-2xl min-h-[300px] flex flex-col items-center justify-center gap-y-5'>
        <h2 className='text-2xl font-bold'>Your pages not found</h2>
        <p className='text-base font-medium text-center'>
            Oops! The page you are looking for is not available. It might have been moved or deleted.
        </p>
        <Link href={"/"} className='bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold flex items-center justify-center hover:bg-orange hover:text-white duration-200'>
        Back to Home
        </Link>
      </div>
    </Container>
  )
}

export default NotFoundPage;
