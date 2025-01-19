"use client"
import { getSingleProduct } from '@/helpers';
import React, { useEffect, useState } from 'react';
import { Products } from '../../../type';
import SingleProduct from '../components/singleProduct/SingleProduct';
import LoadingSpinner from '@/components/loading-spinner';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined },
}

const ProductPage: React.FC<Props> = ({ searchParams }) => {
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const _idString = searchParams?.id;
        if (typeof _idString !== 'string') {
          throw new Error("Invalid product ID");
        }
        const product = await getSingleProduct(_idString);
        setProduct(product || null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  if (loading) {
    return <div className='h-screen'><LoadingSpinner /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full'>
      {product && <SingleProduct product={product} />}
      <div>
        Most Popular products
      </div>
    </div>
  );
}

export default ProductPage;
