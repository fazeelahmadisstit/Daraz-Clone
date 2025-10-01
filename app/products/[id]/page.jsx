"use client";
import * as React from "react";
import { use } from "react";
import products from "@/app/data/products.json";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";
import BuyNowButton from "@/app/components/BuyNowButton";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { id } = use(params);

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return <h1 className="p-6 text-xl">No product found for id: {id}</h1>;
  }

  const handleAddToCart = (item) => {
    addToCart({ ...item, selectedColor });
    router.push("/Cart");
  };

  // ✅ normalize colors
  const colors = Array.isArray(product.colors)
    ? product.colors
    : typeof product.colors === "string"
    ? product.colors.split(",").map((c) => c.trim())
    : [];

  const [selectedColor, setSelectedColor] = React.useState(colors[0] || null);

  // ✅ Rating & Review state
  const [rating, setRating] = React.useState(product.rating || 4); // default rating
  const [reviews, setReviews] = React.useState([
    { user: "Ali", text: "Great product!", stars: 5 },
    { user: "Sara", text: "Good quality for the price.", stars: 4 },
  ]);
  const [newReview, setNewReview] = React.useState("");
  const [newStars, setNewStars] = React.useState(5);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    setReviews([...reviews, { user: "Guest", text: newReview, stars: newStars }]);
    setNewReview("");
    setNewStars(5);
  };

  // ✅ Render stars helper
  const renderStars = (count) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < count ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
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
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-contain rounded-lg"
      />

      <div className="flex flex-col">
        {/* Title */}
        <h1 className="text-2xl font-bold py-2">{product.title}</h1>

        {/* ⭐ Rating */}
        <div className="flex items-center gap-2 mb-2">
          {renderStars(rating)}
          <span className="text-sm text-gray-600">
            ({reviews.length} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold mb-4 text-orange-500 py-2">
            Rs. {product.price?.toLocaleString()}
          </p>

          {product.oldPrice && (
            <span className="line-through text-gray-400 text-xs">
              Rs. {product.oldPrice.toLocaleString()}
            </span>
          )}

          {product.discount && (
            <span className="text-green-600 text-xs">{product.discount}</span>
          )}
        </div>

        {/* Colors */}
        {colors.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Available Colors:</p>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border cursor-pointer transition ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                ></button>
              ))}
            </div>
            {selectedColor && (
              <p className="text-xs mt-2">
                Selected Color:{" "}
                <span className="font-semibold">{selectedColor}</span>
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <BuyNowButton product={product} selectedColor={selectedColor} />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="col-span-2 mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="border p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{r.user}</span>
                {renderStars(r.stars)}
              </div>
              <p className="text-sm text-gray-700 mt-1">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-3">
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
          <div className="flex items-center gap-2">
            <label className="text-sm">Rating:</label>
            <select
              className="border p-1 rounded"
              value={newStars}
              onChange={(e) => setNewStars(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {val} Star{val > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
