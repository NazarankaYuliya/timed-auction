"use client";

import { Navigation, Pagination, A11y, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IMG from "@public/assets/images/placeholder-image.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperComponentProps {
  images: string[];
}

export default function SwiperComponent({ images }: SwiperComponentProps) {
  return images.length > 0 ? (
    <Swiper
      modules={[Navigation, Pagination, A11y, Zoom]}
      spaceBetween={10}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      loop={false}
      className="w-full h-full "
    >
      {images.map((imgUrl: string, index: number) => (
        <SwiperSlide key={index}>
          <img
            src={imgUrl}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-contain rounded-lg "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <img
      src={IMG.src}
      alt="Placeholder"
      className="w-full h-48 md:h-64 object-contain rounded-lg "
    />
  );
}