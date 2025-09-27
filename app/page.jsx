"use client";
import HeroCarousel from "@/app/components/HeroCarousel";
import Categories from "@/app/components/Categories";
import FlashSale from "@/app/components/FlashSale";
import ProductTrending from "@/app/components/ProductTrending";
import JustForYou from "@/app/components/JustForYou";
import products from "@/app/data/products.json";


export default function Home() {
  return (
    <div className="bg-gray-100">
      <HeroCarousel /> 
      <Categories />
      <FlashSale items={products.slice(0, 6)} />
      <ProductTrending items={products.slice(6, 12)} />
      <JustForYou items={products.slice(12, 20)} />
      
    </div>
  );
}
