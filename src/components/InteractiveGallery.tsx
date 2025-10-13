"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery_1.png",
    alt: "PSR Infinity Mall Overview",
    title: "Mall Overview",
    description: "Comprehensive view of the 9-floor premium retail and entertainment destination",
  },
  {
    src: "/images/gallery_2.png",
    alt: "Entertainment Zone",
    title: "Entertainment Hub",
    description: "5-screen multiplex with 1280+ seating capacity and premium cine lounge",
  },
  {
    src: "/images/gallery_3.png",
    alt: "Shopping Experience",
    title: "Retail Zones",
    description: "Premium shopping experience with luxury brands and lifestyle outlets",
  },
  {
    src: "/images/gallery_4.png",
    alt: "Grand Atrium",
    title: "Central Atrium",
    description: "4,500 sq. ft. grand atrium connecting all floors with open spaces",
  },
  {
    src: "/images/gallery_5.png",
    alt: "Location Map",
    title: "Location Advantage",
    description: "Strategically located across Warangal-Hanamkonda-Kazipet triangle",
  },
  {
    src: "/images/gallery_6.png",
    alt: "Architectural Design",
    title: "Modern Architecture",
    description: "Contemporary design with premium finishes and aesthetic appeal",
  },
  {
    src: "/images/gallery_7.png",
    alt: "Retail Layout",
    title: "Shopping Layout",
    description: "Multi-level retail zones catering to diverse shopping needs",
  },
  {
    src: "/images/gallery_8.png",
    alt: "Parking Facilities",
    title: "Parking & Access",
    description: "300+ car parking capacity with easy accessibility",
  },
];

export default function InteractiveGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const nextImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  }, [currentIndex]);

  const prevImage = useCallback(() => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentIndex, nextImage, prevImage]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group from-brand-gold/10 relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br to-transparent p-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => openModal(image, index)}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute right-2 bottom-2 left-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-sm font-semibold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative max-h-[90vh] max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>

            {/* Image */}
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="max-h-[70vh] w-auto object-contain"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="mt-2 text-sm opacity-80">{selectedImage.description}</p>
              <p className="mt-2 text-xs opacity-60">
                {currentIndex + 1} of {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
