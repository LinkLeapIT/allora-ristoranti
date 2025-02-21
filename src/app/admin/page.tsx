// export default Admin;
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaClipboardList, FaGift, FaChartLine, FaBox, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import UniquePanels from '@/components/uniquePanels';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import app from '@/app/firebase.config';

function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

//   const auth = getAuth(app);
//   const db = getFirestore(app);

  const panels = [
    {
      title: 'Orders',
      description: 'Manage all orders.',
      link: '/admin/order',
      color: 'bg-[#ff6b6b]',
      hover: 'hover:bg-[#ff8787]',
      icon: <FaClipboardList color='#ff8787' />, 
    
    },
    {
      title: 'Users',
      description: 'View and manage users.',
      link: '/admin/user',
      color: 'bg-[#6a4c93]',
      hover: 'hover:bg-[#9278c2]',
      icon: <FaUsers color='#9278c2' />, 

    },
    {
      title: 'Reservations',
      description: 'Manage table reservations.',
      link: '/admin/reservation',
      color: 'bg-[#3c91e6]',
      hover: 'hover:bg-[#70b7ff]',
      icon: <FaGift color='#70b7ff' />, 

    },
    {
      title: 'Reports',
      description: 'View analytics and reports.',
      link: '/admin/report',
      color: 'bg-[#ff9f1c]',
      hover: 'hover:bg-[#ffbf69]',
      icon: <FaChartLine  color='#ffbf69' />, 
      
    },
    {
      title: 'Inventory',
      description: 'Manage restaurant inventory.',
      link: '/admin/inventory',
      color: 'bg-[#2ec4b6]',
      hover: 'hover:bg-[#53e6d8]',
      icon: <FaBox color='#53e6d8' />, 
    
 
    },
    {
      title: 'Products',
      description: 'Create and manage products.',
      link: '/admin/product',
      color: 'bg-[#d72638]',
      hover: 'hover:bg-[#e04f5f]',
      icon: <FaHandshake  color='#e04f5f' />, 

  
    },
  ];

  if (loading) {
    return <p className='text-center text-text'>Loading...</p>;
  }

  if (!isAdmin) {
    return <p className='text-center text-red-500'>You are not authorized to access this page.</p>;
  }

  return (
    <div className='min-h-screen py-10 mx-auto'>
      <div className='max-w-7xl mx-auto bg-darkBg p-8 text-text rounded-lg shadow-md'>
        <Breadcrumbs item={[{ label: 'Dashboard' }]} />

        <motion.h1
          className='font-extrabold text-4xl bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent mt-6'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Restaurant Admin Dashboard
        </motion.h1>
        <UniquePanels panels={panels} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        </div>
      </div>
    </div>
  );
}

export default Admin;
