import React from 'react'
import { BsFacebook, BsInstagram, BsWhatsapp, BsTiktok } from "react-icons/bs";
import { alloraLogo } from "@/../public/assets/images/index";
import Image from 'next/image';
import Container from '../navbar/Container';
import Link from 'next/link';


const Footer = () => {
  return (
    <div className=' mx-10'>
      <Container className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 '>
        <div className='flex flex-col gap-y-4 *:'>
            <Image className="w-44 border-[1px] border-white" src={alloraLogo} alt="logo"/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus omnis impedit alias voluptate voluptates quod veniam saepe iste necessitatibus veritatis.</p>
            <div className='flex items-center gap-x-4'>
              <a href='https://www.facebook.com/safwan.ali.altawil/about_overview' target='_blank' >
                <span className='socialLink'>
                  < BsFacebook />
                </span>
              </a>
              <a href='https://www.facebook.com/safwan.ali.altawil/about_overview' target='_blank' >
                <span className='socialLink'>
                < BsInstagram />
                </span>
              </a>
              <a href='https://www.facebook.com/safwan.ali.altawil/about_overview' target='_blank' >
                <span className='socialLink'>
                < BsWhatsapp />
                </span>
              </a>
              <a href='https://www.facebook.com/safwan.ali.altawil/about_overview' target='_blank' >
                <span className='socialLink'>
                < BsTiktok />
                </span>
              </a>
            </div>
        </div>
        <div>
          <p className='text-lg text-green'>Latast posts</p>
          <ul className='text-sm font-light mt-2 flex flex-col gap-y-2'>
            <li className='flex flex-col'>
              <span className='text-slate hover:text-orange cursor-pointer'>Where music is headed next</span>
              <span className='text-orange'>January 31, 2022</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-slate hover:text-orange cursor-pointer'>Where music is headed next</span>
              <span className='text-orange'>January 31, 2022</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-slate hover:text-orange cursor-pointer'>Where music is headed next</span>
              <span className='text-orange'>January 31, 2022</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-slate hover:text-orange cursor-pointer'>Where music is headed next</span>
              <span className='text-orange'>January 31, 2022</span>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-lg'>Links</p>
          <ul className='text-base font-medium mt-2 flex flex-col gap-y-2 '>
            <Link href={"/"}>
              <li className='hover:text-orange cursor-pointer duration-200'>Home</li>
            </Link>
            <Link href={"/cart"}>
              <li className='hover:text-orange cursor-pointer duration-200'>Cart</li>
            </Link>
            <li className='hover:text-orange cursor-pointer duration-200'>About</li>
            <li className='hover:text-orange cursor-pointer duration-200'>Menu</li>
            <li className='hover:text-orange cursor-pointer duration-200'>Contact</li>
          </ul>
        </div>
        <div>
          <p className='text-lg mb-2'>Pay us with your trusted services</p>
          <Image className="w-44 border-[1px] border-white object-cover" src={alloraLogo} alt="logo"/>
        </div>
      </Container>
    </div>
  )
}

export default Footer
