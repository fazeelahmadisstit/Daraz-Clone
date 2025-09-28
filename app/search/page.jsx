"use client";
import { useSearchParams } from "next/navigation";
import products from "@/app/data/products.json";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // 🔍 Filter products by title
  const filteredProducts = products.filter((product) => {
    if (!product || !product.title) return false;
    return product.title.toLowerCase().includes(query);
  });

  if (!query) {
    return <h1 className="p-10 text-center">Please enter a search term.</h1>;
  }

  if (filteredProducts.length === 0) {
    return <h1 className="p-10 text-center">No products found for "{query}"</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">
        Search results for "{query}"
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain"
            />
            <h3 className="mt-2 text-sm font-medium">{product.title}</h3>

            <div className="flex items-center gap-2">
              <p className="text-orange-500 font-semibold">
                Rs. {product.price.toLocaleString()}
              </p>
              <span className="line-through text-gray-400 text-xs">
                Rs. {product.oldPrice.toLocaleString()}
              </span>
              <span className="text-green-600 text-xs">{product.discount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
