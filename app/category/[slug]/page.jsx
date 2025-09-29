
"use client";

import { useState, useMemo, useEffect } from "react";
import products from "@/app/data/products.json";
import categories from "@/app/data/categories.json";
import ProductCard from "@/app/components/ProductCard";
import FilterSidebar from "@/app/components/Sidebar";

export default function CategoryPage({ params }) {
  const { slug } = params;

  // ✅ Find category
  const category = categories.find((c) => c.slug === slug);

  // ✅ Match products by checking multiple possible keys
  const categoryProducts = products.filter(
    (p) =>
      p.categorySlug === slug ||
      p.slug === slug ||
      p.category === slug ||
      p.category?.toLowerCase().replace(/\s+/g, "-") === slug
  );

  // ✅ Filters state
  const [filters, setFilters] = useState({
    category: slug || "",
    brands: [],
    minPrice: "",
    maxPrice: "",
    delivery: false,
    material: "",
    color: "",
    warranty: "",
  });

  // ✅ Reset filters when slug changes
  useEffect(() => {
    setFilters({
      category: slug || "",
      brands: [],
      minPrice: "",
      maxPrice: "",
      delivery: false,
      material: "",
      color: "",
      warranty: "",
    });
  }, [slug]);

  // ✅ Filtering logic
  const filteredProducts = useMemo(() => {
    if (!categoryProducts.length) return []; // no products in this category

    return categoryProducts.filter((p) => {
      const productPrice = Number(p.price) || 0;

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;

      // Price filter (handles empty inputs gracefully)
      if (filters.minPrice && productPrice < Number(filters.minPrice)) return false;
      if (filters.maxPrice && productPrice > Number(filters.maxPrice)) return false;

      // Delivery filter
      if (filters.delivery && !p.freeDelivery) return false;

      // Material filter
      if (filters.material && p.material !== filters.material) return false;

      // Color filter
      if (filters.color && p.color !== filters.color) return false;

      // Warranty filter
      if (filters.warranty && p.warranty !== filters.warranty) return false;

      return true;
    });
  }, [categoryProducts, filters]);

  if (!category) {
    return <h1 className="text-center py-10">Category not found</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Sidebar */}
      <FilterSidebar onFilterChange={setFilters} initialCategory={slug} />

      {/* Product List */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

        {filteredProducts.length === 0 ? (
          <h2 className="text-center py-10">
            No products match your filters in "{category.name}"
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} p={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
