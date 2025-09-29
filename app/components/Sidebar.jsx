"use client";

import categories from "@/app/data/categories.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiFilter } from "react-icons/fi";

const brands = ["Philips", "Prestige", "Tefal", "Anex", "Westpoint"];
const materials = ["Stainless Steel", "Aluminum", "Glass", "Ceramic", "Plastic"];
const colors = ["Black", "White", "Silver", "Red", "Blue", "Green"];
const warranties = ["No Warranty", "6 Months", "1 Year", "2 Years"];

export default function FilterSidebar({ onFilterChange, initialCategory }) {
  const router = useRouter();

  const [filters, setFilters] = useState({
    category: initialCategory || "",
    brands: [],
    minPrice: "",
    maxPrice: "",
    delivery: false,
    material: "",
    color: "",
    warranty: "",
  });

  const [isOpen, setIsOpen] = useState(false); // for mobile

  useEffect(() => {
    setFilters({
      category: initialCategory || "",
      brands: [],
      minPrice: "",
      maxPrice: "",
      delivery: false,
      material: "",
      color: "",
      warranty: "",
    });
  }, [initialCategory]);

  useEffect(() => {
    onFilterChange && onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const handleCheckbox = (key, value) => {
    const updatedValues = filters[key].includes(value)
      ? filters[key].filter(v => v !== value)
      : [...filters[key], value];
    handleChange(key, updatedValues);
  };

  const handleCategoryClick = slug => {
    router.push(`/category/${slug}`);
    setIsOpen(false); // close drawer on mobile
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow bg-white"
        >
          <FiFilter />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r shadow-lg p-4 transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:sticky md:top-20 md:block md:translate-x-0 md:w-64 md:rounded-lg`}
      >
        {/* Close button mobile */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h3 className="font-semibold">Filters</h3>
          <button onClick={() => setIsOpen(false)} className="text-red-500">✕</button>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Categories</h3>
          <ul className="space-y-1">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:text-orange-600 ${
                    filters.category === cat.slug ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Brand</h3>
          {brands.map(brand => (
            <label key={brand} className="block">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleCheckbox("brands", brand)}
                className="mr-2"
              />
              {brand}
            </label>
          ))}
        </div>

        {/* Price */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price (PKR)</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 border p-1 rounded"
              value={filters.minPrice}
              onChange={e => handleChange("minPrice", e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 border p-1 rounded"
              value={filters.maxPrice}
              onChange={e => handleChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        {/* Delivery */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Delivery Options</h3>
          <label className="block">
            <input
              type="checkbox"
              checked={filters.delivery}
              onChange={e => handleChange("delivery", e.target.checked)}
              className="mr-2"
            />
            Free Delivery
          </label>
        </div>

        {/* Material */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Cookware Material</h3>
          <select
            className="w-full border p-1 rounded"
            value={filters.material}
            onChange={e => handleChange("material", e.target.value)}
          >
            <option value="">Select</option>
            {materials.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Color Family</h3>
          <select
            className="w-full border p-1 rounded"
            value={filters.color}
            onChange={e => handleChange("color", e.target.value)}
          >
            <option value="">Select</option>
            {colors.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Warranty */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Warranty Period</h3>
          <select
            className="w-full border p-1 rounded"
            value={filters.warranty}
            onChange={e => handleChange("warranty", e.target.value)}
          >
            <option value="">Select</option>
            {warranties.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
