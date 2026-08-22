"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ArrowUpRight } from "lucide-react"

const GALLERY_IMAGES = [
  { src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375219/_H247605.JPG_tkcgja.jpg",          alt: "Bridal makeup transformation" },
  { src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375211/1000600604.jpg_e1lr5s.jpg",        alt: "Glam beauty look" },
  { src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375211/1000802054.jpg_ncxllb.jpg",        alt: "Bridal hair styling" },
  { src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375205/IMG-20210826-WA0001.jpg_zppxkr.jpg", alt: "Bridal draping and look" },
  { src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375204/IMG_1632.JPG_rr06lt.jpg",          alt: "Makeup artistry close-up" },
  { src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375204/IMG-20231017-WA0012.jpg_ezmp0m.jpg", alt: "Wedding day transformation" },
]

export function BeautyGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section className="bg-[#f6f1e7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24 text-neutral-900">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">Our Work</p>
            <h2 className="mt-1 text-3xl font-light leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Beauty <span className="font-bold">Glimpse</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
            A glimpse of transformations personally crafted at Soni Makeover — every look tells a story.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:gap-5">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View ${img.alt}`}
              className="group relative overflow-hidden rounded-2xl bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <div className="aspect-[4/5] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
              width={800}
              height={1000}
              className="h-auto max-h-[85vh] w-full object-cover"
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="size-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {GALLERY_IMAGES.map((_, di) => (
                <button
                  key={di}
                  type="button"
                  aria-label={`View image ${di + 1}`}
                  onClick={() => setLightbox(di)}
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    di === lightbox ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
