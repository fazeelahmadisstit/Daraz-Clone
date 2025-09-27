"use client";
import Link from "next/link";
import categories from "@/app/data/categories.json";

export default function Categories() {
  if (!categories.length) {
    return null; // ✅ avoid rendering empty grid
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-lg font-semibold mb-4">📂 Categories</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-7 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center bg-white p-3 rounded shadow-sm hover:shadow-md transition"
          >
            <img
              src={cat.icon || "/images/placeholder.png"}
              alt={cat.name}
              className="w-16 h-16 object-contain"
            />
            <p className="text-xs mt-2 text-center truncate w-full">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
