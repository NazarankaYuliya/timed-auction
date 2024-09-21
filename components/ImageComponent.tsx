"use client";

import Image from "next/image";
import IMG from "@public/assets/images/placeholder-image.jpg";
import PIC from "@public/assets/images/download.png";
import { useState } from "react";
import SwiperComponent from "./Swiper";

interface ImageComponentProps {
  itemImage: string[];
}

const ImageComponent: React.FC<ImageComponentProps> = ({ itemImage }) => {
  const [isImageFull, setIsImageFull] = useState(false);
  const openImageFull = () => setIsImageFull(true);
  const closeImage = () => setIsImageFull(false);
  return (
    <div className="relative w-full h-full">
      {itemImage.length > 0 ? (
        <Image
          src={itemImage[0]}
          alt="image of item"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onClick={openImageFull}
        />
      ) : (
        <Image
          src={IMG}
          alt="image of item"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      )}
      {isImageFull && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 size-full">
          <div className="bg-white sm:px-4 sm:py-6 w-full h-screen md:w-5/6 md:h-5/6 relative">
            <button
              onClick={closeImage}
              className="text-3xl md:text-4xl absolute z-40 right-0 top-0 text-grafit hover:text-gold bg-white w-12 cursor-pointer"
            >
              &times;
            </button>
            <SwiperComponent images={itemImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
