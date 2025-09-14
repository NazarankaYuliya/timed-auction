"use client";

import Image from "next/image";
import IMG from "@public/assets/images/placeholder-image.jpg";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import SwiperComponent from "./Swiper";

interface ImageComponentProps {
  itemImage: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ itemImage }) => {
  const linksArray = itemImage ? itemImage.split(",") : [];
  const [isImageFull, setIsImageFull] = useState(false);
  const openImageFull = () => setIsImageFull(true);

  const originalUrl = linksArray[0];

  const [src, setSrc] = useState(originalUrl || IMG);

  return (
    <div className="relative w-full h-full">
      {linksArray.length > 0 ? (
        <Image
          src={originalUrl}
          alt="image of item"
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
          className="cursor-pointer object-cover"
          quality={80}
          onClick={openImageFull}
          unoptimized
          onError={() => setSrc(IMG)}
        />
      ) : (
        <Image
          src={IMG}
          alt="image placeholder"
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          className="object-cover"
          unoptimized
        />
      )}

      <Dialog
        open={isImageFull}
        onClose={() => setIsImageFull(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity items-center justify-center p-4" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
          <DialogPanel className="relative bg-white w-full h-full md:w-5/6 md:h-5/6 p-4 shadow-lg overflow-auto touch-auto touch-pinch-zoom">
            <button
              onClick={() => setIsImageFull(false)}
              className="text-3xl absolute z-40 right-5 top-0 text-grafit hover:text-gold cursor-pointer"
            >
              &times;
            </button>
            <SwiperComponent images={itemImage} />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageComponent;
