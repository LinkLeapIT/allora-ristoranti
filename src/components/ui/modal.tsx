'use client';

import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-20" onClick={onClose}>
      <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <div className="mb-4">{children}</div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
