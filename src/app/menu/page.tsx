"use client";

import React, { useState } from "react";
import Product from "../components/products/Products";
import { CiSearch } from "react-icons/ci";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Example categories
  const categories = ["Pasta", "Pizza", "Salad", "Desserts"];

  // Example sort options
  const sortOptions = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Rating: High to Low", value: "rating-desc" },
    { label: "Rating: Low to High", value: "rating-asc" },
  ];

  // Event handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchTerm(e.target.value);
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>): void => setCategoryFilter(e.target.value);
  const handleSortSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => setSortBy(e.target.value);
  const handleViewAllProducts = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSortBy("");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Common controls (used in both mobile dropdown & desktop grid)
  const renderControls = () => (
    <>
      {/* View All Products */}
      <button
        onClick={handleViewAllProducts}
        className="bg-yellow text-lightText hover:bg-orange hover:text-white border-2 border-orange rounded-lg transition-colors duration-200 shadow-sm"
      >
        View all products
      </button>

      {/* Filter by Category */}
      <select
        value={categoryFilter}
        onChange={handleCategorySelect}
        className="bg-yellow text-lightText hover:bg-orange hover:text-white border-2 border-orange py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer shadow-sm"
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
        className="bg-yellow text-lightText hover:bg-orange hover:text-white border-2 border-orange py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer shadow-sm"
      >
        <option value="">Sort by</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <div className="relative flex-1 w-full md:w-auto">
        <input
          className="w-full h-10 pl-4 pr-10 rounded-lg text-base bg-yellow text-lightText hover:bg-orange hover:text-white border-2 border-orange placeholder-lightText focus:outline-none focus:ring-2 focus:ring-orange transition-all duration-200 shadow-sm"
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="absolute top-3 right-3 text-lightText">
          <CiSearch />
        </span>
      </div>
    </>
  );

  return (
    <div className="min-h-screen container mx-auto rounded-lg  bg-gradient-to-tr from-green via-yellow to-green py-8 px-4 my-4 md:my-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-lightText to-orange bg-clip-text text-transparent">
          Allora Menu
        </h1>

        {/* MOBILE: Button to toggle dropdown (visible on small screens only) */}
        <div className="flex md:hidden justify-end mb-4">
          <button
            onClick={toggleMobileMenu}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md 
                       hover:bg-gray-300 transition-colors duration-200 shadow-sm"
          >
            {isMobileMenuOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* MOBILE: Dropdown container */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 bg-white p-4 rounded-md shadow-sm mb-6">
            {renderControls()}
          </div>
        )}

        {/* DESKTOP: Grid layout (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {renderControls()}
        </div>

        {/* Product List */}
        <Product
          // Example: pass searchTerm, categoryFilter, and sortBy as needed
          // searchTerm={searchTerm}
          // categoryFilter={categoryFilter}
          // sortBy={sortBy}
        />
      </div>
    </div>
  );
}
