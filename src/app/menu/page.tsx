//app/menu/page.tsx
"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Product from "../components/products/Products";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import bgImage from "../../../public/assets/images/FrameBackground.jpg";
import { AnimatePresence, motion } from "framer-motion";
import PrudectSearch from "../product-search/page";

// Example data
const categories = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Sides",
  "Specials",
];

const random = "random";


// Updated sort options with more choices
const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export default function Page() {
  // State for search/filter/sort
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [randomSelect, setRandomSelect] = useState("");
  const [sortBy, setSortBy] = useState<
    "" | "price-asc" | "price-desc" | "newest"
  >("");

  // For the search modal
  const [showSearchModal, setShowSearchModal] = useState(false);
  const handleShowSearch = () => setShowSearchModal(true);
  const handleCloseSearch = () => setShowSearchModal(false);

  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handlers for search/filter/sort
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategoryFilter(e.target.value);
  
  const handleRandomSelect = () => {
    setRandomSelect("random");
  };


  const handleSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value as
      | ""
      | "price-asc"
      | "price-desc"
      | "newest");

  // Reset all filters
  const handleViewAllProducts = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSortBy("");
    setRandomSelect("");
  };

  // Renders filter controls (inside the sidebar)
  const renderControls = () => (
    <div className="flex flex-col gap-4 p-4">
      {/* View All Products */}
      <button
        onClick={() => {
          handleViewAllProducts();
          setSidebarOpen(!sidebarOpen);
        }}
        className="hover:bg-darkBg border border-lightText rounded-lg transition-colors duration-300 py-2 px-4 bg-white"
      >
        View All Products
      </button>

      {/* Filter by Category */}
      <select
        value={categoryFilter}
        onChange={handleCategorySelect}
        className="border border-lightText rounded-lg py-2 px-2 focus:outline-none focus:ring-1 focus:ring-lightText"
      >
        <option value="">Filter by category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sort Options */}
      <select
        value={sortBy}
        onChange={handleSortSelect}
        className="border border-lightText rounded-md py-2 px-2 focus:outline-none focus:ring-1 focus:ring-lightText"
      >
        <option value="">Sort by</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <div className="relative">
        <input
          className="w-full h-9 pl-4 rounded-lg border border-lightText focus:outline-none focus:ring-1 focus:ring-lightText"
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="absolute top-[10px] right-3">
          <CiSearch />
        </span>
      </div>

      {/* Close sidebar button */}
      <button
        onClick={() => {
          handleRandomSelect();
          setSidebarOpen(!sidebarOpen);
        }}
        className="p-2 border border-lightText rounded-lg bg-white hover:bg-darkBg transition-colors hover:text-darkText duration-300 text-lightText"
      >
        struck of luck
      </button>

      {/* Close sidebar button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 border border-lightText rounded-lg bg-white hover:bg-darkBg transition-colors hover:text-darkText duration-300 text-lightText"
      >
        OK
      </button>
    </div>
  );

  // Closes sidebar if user clicks on the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div className="min-h-screen relative">
        {/* Overlay (for sidebar) */}
        <div
          onClick={handleOverlayClick}
          className={`
            fixed inset-0 z-50
            bg-black/50
            ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
            transition-opacity duration-500
          `}
        >
          {/* Sidebar */}
          <div
            className={`
              absolute top-0 left-0 h-full w-64 bg-darkBg shadow-lg
              transform transition-transform duration-500
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <h2 className="text-lg font-bold p-4 border-b">Filters</h2>
            {renderControls()}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className="p-2 border border-lightText rounded-lg bg-white
            hover:bg-darkBg hover:text-darkText transition-colors duration-300 
            fixed top-[140px] md:top-[140px] left-4 text-lightText z-20 cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <TbLayoutSidebarLeftCollapseFilled />
          ) : (
            <TbLayoutSidebarLeftExpandFilled />
          )}
        </button>

        {/* Main Content */}
        <main
          className={`
            relative w-full mx-auto overflow-hidden flex flex-col items-center
            bg-no-repeat bg-cover bg-center md:bg-fixed min-h-screen
          `}
          style={{ backgroundImage: `url(${bgImage.src})` }}
        >
          <div className="flex flex-col items-center max-w-6xl p-4 mx-auto relative mt-10">
            {/* Row of category buttons for quick filter */}
            <div
              className="
                fixed 
                top-[100px] md:top-[140px] 
                left-0 right-0 
                px-4 
                overflow-x-auto 
                scrollbar-hide 
                scroll-smooth 
                whitespace-nowrap 
                flex 
                gap-2
                z-10
                md:items-center
                md:justify-center
              "
            >
              {/* "All" button to reset category */}
              <button
                onClick={() => setCategoryFilter("")}
                className={`px-3 py-1 rounded-lg font-semibold border ${
                  !categoryFilter
                    ? "bg-lightText text-white"
                    : "bg-white text-darkText"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg font-semibold border ${
                    categoryFilter === cat
                      ? "bg-lightText text-white"
                      : "bg-white text-darkText"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Pass filters to the Product component */}
            <Product
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
              sortBy={sortBy}
              random={randomSelect}
            />
          </div>
        </main>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2"
            onClick={handleCloseSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-white p-4 rounded-lg"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Search your item!</h2>
              <div>
                {/* Possibly your separate search component */}
                <PrudectSearch />
              </div>
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={handleCloseSearch}
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}