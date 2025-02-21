"use client";

import React, { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { Trash2, Info, Pencil } from "lucide-react";

import { Products } from "@/type/productType";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import useToast from "@/components/use-toast";

interface ProductsTableClientProps {
  products: Products[];
  totalPages: number;
}

export default function ProductsTableClient({
  products,
  totalPages,
}: ProductsTableClientProps) {
  const [list, setList] = useState<Products[]>(products);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const { toast, ToastContainer } = useToast();

  // ✅ Wrapped handleDelete with useCallback
  const handleDelete = useCallback(
    (id: string) => {
      if (!id) {
        toast({
          title: "Missing Product ID",
          description: "Cannot delete product without a valid ID.",
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
              setDeletingId(id);
              toast({
                title: "Deleting Product",
                description: "Please wait while we delete the product.",
                variant: "default",
              });

              try {
                // Mock API call or action to delete the product
                setList((prev) => prev.filter((p) => p.id !== id));

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
                setDeletingId(null);
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
    [toast] // Only re-create handleDelete when toast changes
  );

  // Define columns
  const columns = useMemo(
    () => [
      { title: "Product Name", key: "title" as const },
      { title: "Description", key: "description" as const },
      { title: "Price (USD)", key: "price" as const },
      { title: "Stock Quantity", key: "quantity" as const },
      { title: "Actions", key: "actions" as const },
    ],
    []
  );

  // Transform for <Table />
  const tableData = useMemo(() => {
    return list.map((product) => ({
      ...product,
      actions: (
        <div className="flex items-center justify-center gap-3 min-w-[200px]">
          <Button
            onClick={() => handleDelete(product.id)}
            variant="destructive"
            size="sm"
            disabled={deletingId === product.id}
            className="inline-flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4 shrink-0" strokeWidth={2} />
            {deletingId === product.id ? "Deleting..." : "Delete"}
          </Button>

          <Button
            size="sm"
            className="inline-flex items-center gap-2 bg-lightText hover:bg-lightText/80"
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

          <Link href={`/admin/product/edit/${product.id}`}>
            <Button
              size="sm"
              className="inline-flex items-center gap-2 bg-lightText hover:bg-lightText/80"
            >
              <Pencil className="h-4 w-4 shrink-0" strokeWidth={2} />
              Edit
            </Button>
          </Link>
        </div>
      ),
    }));
  }, [list, handleDelete, deletingId]);

  return (
    <Card className="bg-lightBg p-4 shadow-lg overflow-auto lg:overflow-visible text-center">
      <ToastContainer />

      <h2 className="text-xl font-bold mb-2">Total Pages: {totalPages}</h2>

      {list.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <Table
          data={tableData}
          columns={columns}
          rowKey="id"
          loading={false}
        />
      )}

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
}
