import { useState } from "react";

import type { ImageGalleryProps } from "../../types/product";

const ImageGallery = ({ thumbnails }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? thumbnails.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === thumbnails.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const maxVisibleThumbnails = 5;
  const startIndex = Math.max(
    0,
    Math.min(
      currentImageIndex - Math.floor(maxVisibleThumbnails / 2),
      thumbnails.length - maxVisibleThumbnails
    )
  );
  const endIndex = startIndex + maxVisibleThumbnails;

  const visibleThumbnails = thumbnails.slice(startIndex, endIndex);

  return (
    <div
      className="flex gap-6 md:flex-nowrap flex-wrap-reverse"
      data-testid="product-gallery"
    >
      <div className="flex lg:flex-col md:flex-row md:w-[12%] justify-between overflow-hidden">
        {visibleThumbnails.map((thumbnail, index) => {
          const thumbnailIndex = index + startIndex;
          const isSelected = thumbnailIndex === currentImageIndex;

          return (
            <img
              key={thumbnailIndex}
              src={thumbnail}
              alt={`Thumbnail ${thumbnailIndex + 1}`}
              className={`w-[7rem] h-[7rem] object-cover p-1 cursor-pointer ${
                isSelected ? "border" : "border-2 border-transparent"
              }`}
              onClick={() => handleThumbnailClick(thumbnailIndex)}
            />
          );
        })}
      </div>

      <div className="relative w-[700px] flex justify-center">
        <img
          src="/assets/icons/arrow-left.svg"
          alt="Previous"
          className="w-[32px] h-[32px] absolute left-10 top-1/2 transform -translate-y-1/2 cursor-pointer bg-[#000000BA] hover:bg-[#000000e3] p-2"
          onClick={handlePreviousImage}
        />
        <img
          src={thumbnails[currentImageIndex]}
          alt="Product"
          className="w-full h-full object-fill max-h-[700px]"
        />
        <img
          src="/assets/icons/arrow-right.svg"
          alt="Next"
          className="w-[32px] h-[32px] absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer bg-[#000000BA] hover:bg-[#000000e3] p-2"
          onClick={handleNextImage}
        />
      </div>
      
    </div>
  );
};

export default ImageGallery;
