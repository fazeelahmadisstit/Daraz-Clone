import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/Context/CartContext"; // ✅ path looks good

export const metadata = {
  title: "Daraz Clone",
  description: "Daraz.pk Clone in Next.js",
  openGraph: {
    images: [
      "https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
