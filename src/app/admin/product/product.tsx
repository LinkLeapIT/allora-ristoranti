"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Pencil, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import useToast from "@/components/use-toast";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { deleteProduct, getProducts } from "@/app/actions/productActions";
import { Products } from "@/types";

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<{ name: string; description: string } | null>(null);

  const { toast, ToastContainer } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts as unknown as Products[]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      }
    };
    loadProducts();
  }, [toast]);

  const handleDelete = useCallback(
    async (slug: string) => {
      if (!slug) {
        toast({
          title: "Missing Product Slug",
          description: "Cannot delete product without a valid slug.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Are you sure?",
        description: "Click below to confirm deletion of this product.",
        variant: "warning",
        action: (
          <button
            onClick={async () => {
              setDeletingSlug(slug);
              toast({
                title: "Deleting Product",
                description: "Please wait while we delete the product.",
                variant: "default",
              });

              try {
                await deleteProduct(slug);
                setProducts((prev) => prev.filter((product) => product.slug !== slug));
                toast({
                  title: "Product Deleted",
                  description: "The product has been deleted successfully.",
                  variant: "success",
                });
              } catch (error) {
                toast({
                  title: "Deletion Failed",
                  description: "Failed to delete the product. Please try again.",
                  variant: "destructive",
                });
              } finally {
                setDeletingSlug(null);
              }
            }}
            style={{
              padding: "10px 15px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Confirm Delete
          </button>
        ),
        position: "top-center",
        duration: Infinity,
        isClosable: true,
      });
    },
    [toast]
  );

  const columns = useMemo(
    () => [
      { title: "Product Name", key: "title" as const },
      { title: "Description", key: "description" as const },
      { title: "Price (USD)", key: "price" as const },
      { title: "Stock Quantity", key: "quantity" as const },
      { title: "Extra Ingredients", key: "extraIngredients" as const },
      { title: "Actions", key: "actions" as const },
    ],
    []
  );

  const tableData = useMemo(
    () =>
      products.map((product) => ({
        ...product,
        createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : null,
        updateAt: product.updateAt ? new Date(product.updateAt).toISOString() : null,
        extraIngredients: (
          <ul className="list-disc list-inside">
            {(product.extraIngredients || []).map((ingredient, index) => (
              <li key={index}>
                {ingredient.ingredient} - ${ingredient.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ),
        actions: (
          <div className="flex items-center justify-center gap-3 min-w-[200px]">
            <Button
              onClick={() => handleDelete(product.slug as string)}
              variant="destructive"
              size="sm"
              disabled={deletingSlug === product.slug}
              className="inline-flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4 shrink-0" strokeWidth={2} />
              {deletingSlug === product.slug ? "Deleting..." : "Delete"}
            </Button>
            <Button
              size="sm"
              className="inline-flex items-center gap-2"
              onClick={() =>
                setSelectedDescription({
                  name: product.title,
                  description: product.description || "No description available",
                })
              }
            >
              <Info className="h-4 w-4" />
              View Description
            </Button>
            <Link href={`/admin/product/edit/${product.slug}`}>
              <Button size="sm" className="inline-flex items-center gap-2">
                <Pencil className="h-4 w-4 shrink-0" strokeWidth={2} />
                Edit
              </Button>
            </Link>
          </div>
        ),
      })),
    [products, handleDelete, deletingSlug]
  );

  return (
    <Card className="bg-background p-4 shadow-lg overflow-auto lg:overflow-visible text-center">
      <ToastContainer />
      <Table
        data={tableData}
        columns={columns}
        rowKey="slug"
        loading={!products.length}
        pagination={{ pageSize: 10 }}
      />

      {selectedDescription && (
        <Modal
          isOpen={!!selectedDescription}
          onClose={() => setSelectedDescription(null)}
          title={`Description for ${selectedDescription.name}`}
        >
          <p className="p-4">{selectedDescription.description}</p>
        </Modal>
      )}
    </Card>
  );
};

export default React.memo(ProductTable);
