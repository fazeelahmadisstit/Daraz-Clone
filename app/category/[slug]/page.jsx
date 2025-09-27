import products from "@/app/data/products.json";
import categories from "@/app/data/categories.json";
import ProductCard from "@/app/components/ProductCard"; // ✅ make sure the path is correct

export default async function CategoryPage({ params }) {
  const { slug } = await params; // correct way to get slug

  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.slugCategory === slug);

  if (!category) {
    return <h1 className="text-center py-10">Category not found</h1>;
  }

  if (categoryProducts.length === 0) {
    return <h1 className="text-center py-10">No products in this category</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoryProducts.map(product => (
          <ProductCard key={product.id} p={product} />
        ))}
      </div>
    </div>
  );
}
