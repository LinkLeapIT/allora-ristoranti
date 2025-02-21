'use client';

import React from 'react';
import { Skeleton } from './ui/skeleton';
import alloraLogo from "../../public/assets/images/logo.png";
import Image from 'next/image';
interface LoadingSpinnerProps {
  text?: string;       // Optional prop for custom loading text
  showText?: boolean;  // Optional prop to show or hide the loading text
  size?: 'small' | 'medium' | 'large'; // Optional spinner size
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  return (
    <div
      className="
        fixed inset-0 z-50 flex flex-col items-center justify-center bg-darkBg bg-opacity-90 transition-opacity duration-300
      "
    >
      {/* Icon for loading animation with dynamic size */}
      <Skeleton className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
        <Image src={alloraLogo} alt='Allora Logo' width={100} height={100} priority className='w-[100px] h-[100px]'/>
      </Skeleton>
    </div>
  );
};

export default LoadingSpinner;
