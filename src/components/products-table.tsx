
import { getProducts } from "@/data/products"; 
import ProductsTableClient from "@/components/ProductsTableClient"; 
// (We’ll create ProductsTableClient below)

export default async function ProductsTablePage() {
  // 1) Server fetch
  const { data, totalPages } = await getProducts({
    pagination: { page: 1, pageSize: 10 },
  });

  // 2) Render Client Component, pass data
  return (
    <div className="p-4">
      <ProductsTableClient products={data} totalPages={totalPages} />
    </div>
  );
}
