// app/my-favourites/page.tsx
import React from 'react'
import MyFavourite from './MyFavourite.server'
import bgImage from "../../../public/assets/images/baground.jpg";
import Container from '@/app/components/navbar/Container';

export const dynamic = "force-dynamic";

function MyFavorite() {
  return (
    <div className='min-h-screen relative'>
      <div
        className={`
          relative w-full mx-auto overflow-hidden flex flex-col items-center
          bg-no-repeat bg-cover bg-center md:bg-fixed min-h-screen
        `}
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <Container>
          <MyFavourite />
        </Container>
      </div>
    </div>
  )
}

export default MyFavorite;
