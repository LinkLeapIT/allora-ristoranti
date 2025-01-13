"use client";

import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          /** 
           * BACKDROP OVERLAY 
           * Full-screen backdrop that fades in/out 
           */
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            /** 
             * MODAL CONTENT 
             * Gradient background, scrollable area
             */
            className="bg-gradient-to-tr from-green via-yellow to-green 
                       rounded-lg shadow-lg p-6 w-full max-w-md 
                       overflow-auto max-h-[90vh] relative 
                       scrollbar-hide scroll-smooth"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title && (
              <h2 className="text-2xl bg-gradient-to-r from-lightText to-yellow 
                             bg-clip-text text-transparent font-extrabold 
                             mb-4 p-1"
              >
                {title}
              </h2>
            )}

            {/* Modal Body (Children) */}
            <div className="mb-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
