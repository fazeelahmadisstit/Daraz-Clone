"use client";
import React from "react";
import Link from "next/link";

export default function ProductCard({ p }) {
  return (
    <Link
      href={`/products/${p.id}`}
      className="border rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src={p.image}
        alt={p.title}
        className="h-40 w-40 object-contain mb-2"
      />
      <h2 className="text-sm font-semibold text-center truncate w-full">
        {p.title}
      </h2>
      <div className="flex items-center gap-2">
        <p className="text-orange-500 font-semibold">
          Rs. {p.price?.toLocaleString()}
        </p>
        {p.oldPrice && (
          <span className="line-through text-gray-400 text-xs">
            Rs. {p.oldPrice.toLocaleString()}
          </span>
        )}
        {p.discount && (
          <span className="text-green-600 text-xs">{p.discount}</span>
        )}
      </div>
    </Link>
  );
}
