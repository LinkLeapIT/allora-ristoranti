"use client";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

type TableProps<T> = {
  data: T[];
  columns: { title: string; key: keyof T }[];
  rowKey: keyof T;
  loading: boolean;
  pagination?: { pageSize: number };
};

export const Table = <T,>({
  data,
  columns,
  rowKey,
  loading,
  pagination,
  ...props
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = pagination?.pageSize || 10;
  // If there's no data, we consider it 1 page to avoid totalPages = 0
  const totalPages = Math.max(Math.ceil(data.length / pageSize), 1);

  // Sliced data for the current page
  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    // Quick safety check for out-of-range page
    if (page < 1) return;
    if (page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div {...props}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-xl text-white flex items-center gap-3">
            <FaSpinner className="animate-spin text-4xl" />
            Loading Table...
          </div>
        </div>
      ) : (
        <>
          <table className="w-full overflow-auto">
            <TableHeader>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key as string}
                    className="text-text text-lg border-b border-button bg-darkBg p-2 font-bold"
                    scope="col"
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </TableHeader>
            <TableBody>
              {currentData.map((item) => (
                <TableRow key={String(item[rowKey])}>
                  {columns.map((col) => (
                    <TableCell key={col.key as string}>
                      {item[col.key] != null
                        ? (item[col.key] as React.ReactNode)
                        : "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </table>

          <div className="flex justify-between items-center mt-6 text-sm">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="bg-lightText text-white px-4 py-2 rounded-md hover:bg-button-foreground duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous Page"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-lightText text-white px-4 py-2 rounded-md hover:bg-button-foreground duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Table sub-components
export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ children, ...props }) => (
  <thead className="bg-lightBg" {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ children, ...props }) => (
  <tbody className="divide-y divide-darkText" {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => (
  <tr className="bg-lightBg text-text" {...props}>
    {children}
  </tr>
);

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ children, ...props }) => (
  <td className="py-4 px-6 text-sm text-text" {...props}>
    {children}
  </td>
);
