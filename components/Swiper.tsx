"use client";

import { Navigation, Pagination, A11y, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import IMG from "@public/assets/images/placeholder-image.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperComponentProps {
  images: string;
}

export default function SwiperComponent({ images }: SwiperComponentProps) {
  const linksArray = images.split(",");
  return linksArray.length > 0 ? (
    <Swiper
      modules={[Navigation, Pagination, A11y, Zoom]}
      spaceBetween={1}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      loop={false}
      zoom={true}
      className="w-full h-full"
    >
      {linksArray.map((imgUrl: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            src={imgUrl}
            alt={`Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={65}
            className="w-full h-full object-contain"
            unoptimized
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <img
      src={IMG.src}
      alt="Placeholder"
      loading="lazy"
      className="w-full h-48 md:h-64 object-contain rounded-lg "
    />
  );
}
