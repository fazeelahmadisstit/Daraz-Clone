"use client";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // ✅ Load order from localStorage
  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  // ✅ Send confirmation email
  const handleConfirm = async () => {
    if (!order) return;

    setLoading(true);
    setStatusMessage("");

    try {
      // Prepare email content
      const productList = order.items
        .map(
          (item) =>
            `${item.title} (x${item.quantity || 1}) - $${(
              item.price * (item.quantity || 1)
            ).toFixed(2)}`
        )
        .join("<br/>");

      const emailBody = `
        <h3>Hi ${order.customer.name},</h3>
        <p>Thank you for your order!</p>
        <p><strong>Shipping Address:</strong> ${order.customer.address}</p>
        <p><strong>Ordered Products:</strong><br/>${productList}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p>We will ship your items soon!</p>
      `;

      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: order.customer.email,
          subject: "Order Confirmation",
          html: emailBody,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage("📧 Confirmation email sent successfully!");
      } else {
        setStatusMessage(`⚠️ Failed to send email: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Email error:", error);
      setStatusMessage("❌ Error sending email.");
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">📦 Order Summary</h1>
        <p>No recent order found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📦 Order Summary</h1>

      {/* Customer Info */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Address:</strong> {order.customer.address}</p>
      </div>

      {/* Products */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Ordered Products</h2>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title} (x{item.quantity || 1})</span>
              <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right font-bold text-lg">
          Total: ${order.total.toFixed(2)}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "📨 Sending..." : "✅ Confirm Order"}
      </button>

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`mt-4 p-3 rounded text-center font-medium ${
            statusMessage.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
}
