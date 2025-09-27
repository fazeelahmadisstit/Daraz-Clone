import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/Context/CartContext";

export const metadata = {
  image: "https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png",
  title: "Daraz Clone",
  description: "Daraz.pk Clone in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
