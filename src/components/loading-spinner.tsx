'use client';

import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon from react-icons

interface LoadingSpinnerProps {
  text?: string;       // Optional prop for custom loading text
  showText?: boolean;  // Optional prop to show or hide the loading text
  size?: 'small' | 'medium' | 'large'; // Optional spinner size
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Loading...',
  showText = true,
  size = 'medium',
}) => {
  // Define spinner icon sizes based on the `size` prop
  const spinnerSize = {
    small: 'text-3xl',    // Slightly smaller spinner icon
    medium: 'text-5xl',   // Default medium size
    large: 'text-7xl',    // Larger spinner
  };

  // Define text sizes for matching the spinner
  const textSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl',
  };

  return (
    <div
      className="
        fixed inset-0 z-50 
        flex flex-col items-center justify-center 
        bg-green bg-opacity-90  /* Semi-transparent white overlay */
        transition-opacity duration-300
      "
    >
      {/* Icon for loading animation with dynamic size */}
      <FaSpinner
        className={`
          ${spinnerSize[size]} 
          text-button  /* Tailwind color class (customize as needed) */
          animate-spin 
          mb-3
        `}
      />
      
      {/* Conditionally render loading text below the spinner */}
      {showText && (
        <p
          className={`
            ${textSize[size]} 
            font-semibold 
            text-text   /* Tailwind color class (customize as needed) */
            animate-pulse
          `}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
