'use client';

import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Product from "../components/products/Products";
import bgImage from "../../../public/assets/images/FrameBackground.jpg";
import { AnimatePresence, motion } from "framer-motion";
import PrudectSearch from "../product-search/page";
import { Products } from "@/types";
import { getProducts } from "@/app/actions/productActions";
import { useI18n } from "@/i18n/I18nProvider";

export default function Page() {
  const { t } = useI18n();
  const sortOptions = [
    { label: t.menu.priceAsc, value: "price-asc" },
    { label: t.menu.priceDesc, value: "price-desc" },
    { label: t.menu.newest, value: "newest" },
  ];
  const categoryLabel = (cat: { id: string; name: string }) => t.categories[cat.id] ?? cat.name;
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [randomSelect, setRandomSelect] = useState("");
  const [sortBy, setSortBy] = useState<
    "" | "price-asc" | "price-desc" | "newest"
  >("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          const order = ['mezzah-fredda', 'mezzah-calda', 'arayes', 'pasti'];
          const rank = (id: string) => (order.indexOf(id) === -1 ? order.length : order.indexOf(id));
          setCategories([...data].sort((a: { id: string }, b: { id: string }) => rank(a.id) - rank(b.id)));
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchAndSetProducts();
    fetchCategories();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category);
  };

  const handleSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value as
      |""
      | "price-asc"
      | "price-desc"
      | "newest");

  return (
    <>
      <main
        className={`
          relative w-full mx-auto overflow-hidden flex flex-col items-center
          bg-no-repeat bg-cover bg-center md:bg-fixed min-h-screen
        `}
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-darkText text-center mb-8">
            {t.menu.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:flex-1">
              <input
                className="w-full h-12 ps-12 rounded-lg border border-lightText focus:outline-none focus:ring-2 focus:ring-lightText bg-white/80 backdrop-blur-sm"
                type="text"
                placeholder={t.menu.searchPlaceholder}
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="absolute top-1/2 start-4 -translate-y-1/2">
                <CiSearch className="text-gray-500" size={24} />
              </span>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={handleSortSelect}
                className="w-full sm:w-auto border border-lightText rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-lightText bg-white/80 backdrop-blur-sm h-12"
              >
                <option value="">{t.menu.sortBy}</option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
             <button
              onClick={() => handleCategorySelect("")}
              className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-300 whitespace-nowrap ${
                !categoryFilter
                  ? "bg-lightText text-white scale-105"
                  : "bg-white/80 text-darkText backdrop-blur-sm"
              }`}
            >
              {t.menu.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-300 whitespace-nowrap ${
                  categoryFilter === cat.id
                    ? "bg-lightText text-white scale-105"
                    : "bg-white/80 text-darkText backdrop-blur-sm"
                }`}
              >
                {categoryLabel(cat)}
              </button>
            ))}
          </div>

          <Product
            products={products}
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            sortBy={sortBy}
            random={randomSelect}
            loading={loading}
            error={error}
          />
        </div>
      </main>

      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2"
            onClick={() => setShowSearchModal(false)}
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
              <h2 className="text-2l font-bold mb-4">Search your item!</h2>
              <div>
                <PrudectSearch />
              </div>
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={() => setShowSearchModal(false)}
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
