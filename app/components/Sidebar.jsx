"use client";

import categories from "@/app/data/categories.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  const handleCategoryClick = slug => router.push(`/category/${slug}`);

  return (
    <aside className="p-4 border rounded-lg bg-white shadow">
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
        <select
          className="w-full border p-1 rounded"
          value={filters.material}
          onChange={e => handleChange("material", e.target.value)}
        >
          <option value="">Select Material</option>
          {materials.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Color */}
      <div className="mb-4">
        <select
          className="w-full border p-1 rounded"
          value={filters.color}
          onChange={e => handleChange("color", e.target.value)}
        >
          <option value="">Select Color</option>
          {colors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Warranty */}
      <div className="mb-4">
        <select
          className="w-full border p-1 rounded"
          value={filters.warranty}
          onChange={e => handleChange("warranty", e.target.value)}
        >
          <option value="">Select Warranty</option>
          {warranties.map(w => <option key={w} value={w}>{w}</option>)}
        </select>
      </div>
    </aside>
  );
}
