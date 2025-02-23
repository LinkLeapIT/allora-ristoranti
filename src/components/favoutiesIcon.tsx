

import { Link } from 'lucide-react'
import React from 'react'
import { RiHeart2Fill } from 'react-icons/ri'
import FavouritesCount from './FavouritesCount.server'

function FavoutiesIcon() {
  return (
    <Link href="/account/my-favourites" className="relative">
        <RiHeart2Fill className="text-3xl text-lightText hover:text-hoverBg duration-300 hover:scale-110 transition-transform cursor-pointer" />
        <FavouritesCount />
    </Link>
  )
}

export default FavoutiesIcon
