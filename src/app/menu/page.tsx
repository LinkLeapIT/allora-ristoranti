"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Product from "../components/products/Products";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

// Example data
const categories = ["Pasta", "Pizza", "Salad", "Desserts"];
const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Rating: Low to High", value: "rating-asc" },
];

export default function Page() {
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategoryFilter(e.target.value);

  const handleSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value);

  const handleViewAllProducts = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSortBy("");
  };

  // Renders filter controls
  const renderControls = () => (
    <div className="flex flex-col gap-4 p-4">
      {/* close button  */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 border border-lightText rounded-lg bg-white hover:bg-darkBg transition-colors hover:text-darkText duration-300 fixed top-4 right-4 text-lightText"
      >
        <TbLayoutSidebarLeftCollapseFilled />
      </button>
      {/* View All Products */}
      <button
        onClick={handleViewAllProducts}
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

      {/* Sort by */}
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
          className="w-full h-9 pl-4 rounded-lg border border-lightText focus:outline-none focus:ring-1 focus:ring-lightText transition-all duration-300"
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="absolute top-[10px] right-3">
          <CiSearch />
        </span>
      </div>
    </div>
  );

  // Closes sidebar if user clicks on the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if user clicks *directly* on the overlay, not the sidebar.
    if (e.target === e.currentTarget) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* 
        Overlay 
        - show/hide via sidebarOpen
        - covers entire screen
        - fade in/out with opacity
      */}
      <div
        onClick={handleOverlayClick}
        className={`
          fixed inset-0 z-50
          bg-black/50
          ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          transition-opacity duration-500
        `}
      >
        {/* 
          Sidebar 
          - slid in from the left with translate-x-0 or -translate-x-full
          - smooth animation with transition-transform
        */}
        <div
          className={`
            absolute top-0 left-0 h-full w-64
            bg-darkBg shadow-lg
            transform transition-transform duration-500
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <h2 className="text-lg font-bold p-4 border-b">Filters</h2>
          {renderControls()}
        </div>
      </div>

      {/* 
        Toggle Button 
        - sits above everything else
      */}
      <button
        className="p-2 border border-lightText rounded-lg bg-white
                   hover:bg-darkBg transition-colors hover:text-darkText duration-300 
                   fixed top-24 md:top-28 xl:top-[138px] left-2 text-lightText"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarLeftExpandFilled />}
      </button>

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300
          ${sidebarOpen ? "ml-0" : "ml-0"}
        `}
      >
        <div className="p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Allora Menu</h1>
          <Product
            // searchTerm={searchTerm}
            // categoryFilter={categoryFilter}
            // sortBy={sortBy}
          />
        </div>
      </main>
    </div>
  );
}
