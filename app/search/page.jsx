"use client";
import { useSearchParams } from "next/navigation";
import products from "@/app/data/products.json";
import ProductCard from "@/app/components/ProductCard"; // ✅ correct path

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // ✅ Use "title" instead of "name"
  const filteredProducts = products.filter((product) =>
    product?.title?.toLowerCase().includes(query)
  );

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
        {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
