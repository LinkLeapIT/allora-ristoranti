import React from 'react'
import Link from 'next/link';
import notFoundImg from "../../public/assets/images/notFond.jpg";

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center relative'>
      <div
        className={`w-screen overflow-hidden flex flex-col items-center justify-center gap-5 mx-auto
          bg-no-repeat bg-cover bg-center md:bg-fixed min-h-screen
        `}
        style={{ backgroundImage: `url(${notFoundImg.src})` }}
      >
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
        <div className='flex flex-col items-center gap-5 p-4 mx-auto relative text-lightText'>
          <h2 className='text-2xl md:text-5xl font-bold'>Your pages not found</h2>
          <p className='text-base md:text-2xl font-medium text-center text-link'>
              Oops! The page you are looking for is not available. It might have been moved or deleted.
          </p>
          <Link href={"/"} className='bg-lightText text-white w-44 h-12 rounded-full text-base font-semibold flex items-center justify-center hover:bg-link duration-200'>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage;
