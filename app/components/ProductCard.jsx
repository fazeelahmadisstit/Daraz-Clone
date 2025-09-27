"use client";
import Link from "next/link";

export default function ProductCard({ p }) {
  return (
    <Link
      href={`/products/${p.id}`}
      className="border rounded-lg shadow p-4 flex flex-col items-center"
    >
      <img
        src={p.image}
        alt={p.title}
        className="h-90 w-90 object-contain mb-2"
      />
      <h2 className="text-sm font-semibold text-center line-clamp-1">
        {p.title}
      </h2>
      <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
      <p className="mt-2 font-bold">Rs.{p.price}</p>
    </Link>
  );
}
