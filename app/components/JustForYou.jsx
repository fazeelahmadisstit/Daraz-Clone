'use client'

import ProductCard from './ProductCard'

export default function JustForYou({ items }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-lg font-semibold mb-4">✨ Just For You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  )
}
