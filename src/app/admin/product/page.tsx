
import React from 'react'
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import LinkButton from '@/components/ui/LinkButton';
import PruductsTable from '../../../components/products-table';

const product = () => {

  return (
    <div className="max-w-7xl bg-darkBg p-8 rounded-lg mx-auto my-10">
      {/* Breadcrumb */}
      <Breadcrumbs
        item={[
          { href: "/admin", label: "Dashboard" },
          { label: "Product Management" },
        ]}
      />

      {/* Header */}
      <h1
        className="font-extrabold text-4xl bg-gradient-to-r from-text to-button bg-clip-text text-transparent mt-6"
      >
        Product Management
      </h1>
      <LinkButton title="Create Product" path="/admin/product/new-product" />
      <PruductsTable />
    </div> 
  )
}

export default product; 

