"use client";

import { Navigation, Pagination, A11y, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IMG from "@public/assets/images/placeholder-image.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperFullScreenProps {
  images: string[];
}

export default function SwiperFullScreen({ images }: SwiperFullScreenProps) {
  return (
    <div className="absolut top-5 right-5 bg-gray-100 w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, A11y, Zoom]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={false}
        className=""
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
    </div>
  );
}
