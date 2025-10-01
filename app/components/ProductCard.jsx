"use client";
import React from "react";
import Link from "next/link";

export default function ProductCard({ p }) {
  // ⭐ helper function to render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gold"
            className="w-3 h-3"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.64a1 
            1 0 00.95.69h3.831c.969 0 1.371 
            1.24.588 1.81l-3.102 2.253a1 1 
            0 00-.364 1.118l1.18 3.64c.3.922-.755 
            1.688-1.54 1.118l-3.102-2.253a1 
            1 0 00-1.176 0l-3.102 
            2.253c-.784.57-1.838-.196-1.539-1.118l1.18-3.64a1 
            1 0 00-.364-1.118L2.5 
            9.067c-.783-.57-.38-1.81.588-1.81h3.83a1 
            1 0 00.951-.69l1.18-3.64z" />
          </svg>
        ))}

        {halfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gold"
            className="w-3 h-3"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="gold" />
                <stop offset="50%" stopColor="lightgray" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 
              0l1.18 3.64a1 1 0 00.95.69h3.831c.969 
              0 1.371 1.24.588 1.81l-3.102 
              2.253a1 1 0 00-.364 1.118l1.18 
              3.64c.3.922-.755 1.688-1.54 
              1.118l-3.102-2.253a1 1 0 
              00-1.176 0l-3.102 
              2.253c-.784.57-1.838-.196-1.539-1.118l1.18-3.64a1 
              1 0 00-.364-1.118L2.5 
              9.067c-.783-.57-.38-1.81.588-1.81h3.83a1 
              1 0 00.951-.69l1.18-3.64z"
            />
          </svg>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="lightgray"
            className="w-3 h-3"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 
            1.902 0l1.18 3.64a1 1 0 00.95.69h3.831c.969 
            0 1.371 1.24.588 1.81l-3.102 
            2.253a1 1 0 00-.364 1.118l1.18 
            3.64c.3.922-.755 1.688-1.54 
            1.118l-3.102-2.253a1 1 0 
            00-1.176 0l-3.102 
            2.253c-.784.57-1.838-.196-1.539-1.118l1.18-3.64a1 
            1 0 00-.364-1.118L2.5 
            9.067c-.783-.57-.38-1.81.588-1.81h3.83a1 
            1 0 00.951-.69l1.18-3.64z" />
          </svg>
        ))}
      </div>
    );
  };

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
      <h2 className="text-sm font-semibold text-center w-full line-clamp-2">
        {p.title}
      </h2>


      <div className="flex items-center gap-2">
        <p className="text-orange-500 font-semibold">
          Rs. {p.price?.toLocaleString()}
        </p>
        {p.discount && (
          <span className="text-green-600 text-xs">{p.discount}</span>
        )}
      </div>

      {/* ⭐ Rating Section */}
      {p.rate && (
        <div className="flex items-center gap-1 mt-1">
          {renderStars(p.rate)}
          <span className="text-xs text-gray-500">({p.reviews})</span>
        </div>
      )}
    </Link>
  );
}
