"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // ✅ Import modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroCarousel() {
  const slides = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg",
    "/images/hero6.jpg",
    "/images/hero7.jpg",
    "/images/hero8.jpg",
    "/images/hero9.jpg",
  ];

  return (
    <div className="w-full"> {/* ✅ full width */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <img
              src={s}
              alt={`slide-${i}`}
              loading="lazy"
              className="w-full h-[400px] md:h-[500px] object-cover" // ✅ responsive height
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
