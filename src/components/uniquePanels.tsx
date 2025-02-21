

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Panel {
  link: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  hover: string;
}
const shapes = {
    romanianArch: {
      width: '100%',
      height: '400px',  // Taller arch
      backgroundColor: '#e5cfc3',  // Stone-like color
      position: 'relative' as any,
      borderRadius: '50% 50% 0 0',  // Classic Roman arch shape
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',  // Adds a stone-like shadow effect
    },
  };
  
  const ShapePanel = ({ panel, index }: { panel: Panel; index: number }) => {
    const animations = {
      hover: {
        scale: 1.05,
        rotate: index % 2 === 0 ? 5 : -5,
        transition: { type: 'spring', stiffness: 300 },
      },
      tap: { scale: 0.95 },
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    };
  
    return (
      <Link href={panel.link} className="no-underline group perspective-1000">
        <motion.div
          className="relative h-[400px] w-full transform-style-3d"
          initial={animations.initial}
          animate={animations.animate}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className={`absolute inset-0 ${panel.color} group-hover:${panel.hover} backdrop-blur-lg shadow-2xl overflow-hidden`}
            style={shapes.romanianArch}
            whileHover={animations.hover}
            whileTap={animations.tap}
          >
            <div className="relative h-full p-6 flex flex-col items-center justify-center text-center space-y-4">
              <motion.div
                className="text-5xl mb-4 p-4 rounded-full bg-white/10 backdrop-blur-md"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {panel.icon}
              </motion.div>
  
              <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.h2
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 
                            bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  {panel.title}
                </motion.h2>
  
                <motion.p
                  className="text-white/80 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {panel.description}
                </motion.p>
              </div>
  
              {/* Roman Calligraphy Text */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <motion.p
                  className="text-4xl font-serif text-white opacity-90"
                  style={{ fontFamily: "'Cinzel', serif" }} // Using a classical Roman font
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
               
                </motion.p>
              </div>
  
              <motion.div
                className="absolute bottom-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </Link>
    );
  };

interface UniquePanelsProps {
  panels: Panel[];
}

const UniquePanels = ({ panels }: UniquePanelsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-8">
      {panels.map((panel, index) => (
        <ShapePanel key={panel.title} panel={panel} index={index} />
      ))}
    </div>
  );
};

export default UniquePanels;
