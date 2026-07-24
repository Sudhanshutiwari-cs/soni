"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react"

const CATEGORIES = ["Skin Care", "Hair", "Bridal", "Academy"]

const PRODUCTS = [
  {
    title: "Korean Glass Skin Facial",
    price: "Premium Treatment",
    image: "/product-group.png",
  },
  {
    title: "Hydra Facial — Deep Glow Therapy",
    price: "Signature Service",
    image: "/product-group.png",
  },
  {
    title: "Hair Botox Repair Therapy",
    price: "Premium Treatment",
    image: "/product-group.png",
  },
  {
    title: "HD Airbrush Bridal Makeup",
    price: "Bridal Package",
    image: "/product-group.png",
  },
]

const RING_TEXT =
  "Soni Makeover • 25+ Years of Excellence • Expert Beauty Services • "

export function BeautyProduct() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [index, setIndex] = useState(0)

  const product = PRODUCTS[index]

  const next = () => setIndex((i) => (i + 1) % PRODUCTS.length)
  const prev = () => setIndex((i) => (i - 1 + PRODUCTS.length) % PRODUCTS.length)

  return (
    <section className="bg-[#f6f1e7] text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Header row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-pretty text-3xl leading-tight md:text-4xl">
              Premium Signature
              <br />
              <span className="font-bold">Treatments</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              Personally performed by an expert with 25+ years of experience
            </p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(i)}
                className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  activeCategory === i
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-center">

          {/* Center: rotating ring with product image */}
          <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-md lg:flex-1">
            {/* outer thin ring */}
            <div className="absolute inset-0 rounded-full border border-neutral-200" />
            {/* rotating text ring */}
            <svg
              viewBox="0 0 300 300"
              className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite]"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="ring-path"
                  d="M150,150 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1 -236,0"
                />
              </defs>
              <text className="fill-neutral-400 text-[9px] uppercase tracking-[0.15em]">
                <textPath href="#ring-path" startOffset="0">
                  {RING_TEXT}
                </textPath>
              </text>
            </svg>
            {/* product image */}
            <div className="absolute inset-[16%] overflow-hidden rounded-full ring-1 ring-neutral-200">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 320px"
                priority
              />
            </div>
          </div>

          {/* Right: product details */}
          <div className="w-full max-w-xs text-center lg:text-left">
            <div className="mb-6 flex justify-center gap-2 lg:justify-start">
              <button
                onClick={prev}
                aria-label="Previous product"
                className="flex h-11 w-14 items-center justify-center rounded-full border border-neutral-300 text-neutral-800 transition-colors hover:border-neutral-900"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next product"
                className="flex h-11 w-14 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform hover:scale-105"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <h3 className="text-pretty text-2xl leading-snug text-neutral-800">
              {product.title}
            </h3>
            <p className="mt-4 text-3xl font-bold text-neutral-900">{product.price}</p>
            <a
              href="tel:+918130767220"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
            >
              Book Now
              <ShoppingBag className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
