"use client"
import React, { useEffect, useState } from 'react';
import { getProducts } from '@/helpers';
import ProductsData from './ProductsData';
import Container from '../navbar/Container';
import { Products } from '../../../../type';
import LoadingSpinner from '@/components/loading-spinner';

const Product = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('Quota exceeded')) {
            setError(new Error('Quota exceeded. Please try again later.'));
          } else {
            setError(error);
          }
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div> <LoadingSpinner /></div>;
  }

  if (error) {
    return <div className=''>Error: {error.message}</div>;
  }

  return (
    <Container className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((item, index) => (
          <ProductsData key={index} product={item} />
        ))
      ) : (
        <div>No products available</div>
      )}
    </Container>
  );
};

export default Product;
