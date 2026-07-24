"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Heart, ArrowUpRight, X } from "lucide-react"
import { ExpandPanel } from "@/components/expand-panel"

type Product = {
  name: string
  price: string
  image: string
}

const products: Product[] = [
  { name: "Hydra Facial", price: "Book Now", image: "/cat-serum.png" },
  { name: "Keratin Treatment", price: "Book Now", image: "/cat-bbcream.png" },
  { name: "HD Bridal Makeup", price: "Book Now", image: "/cat-suncream.png" },
  { name: "Korean Glass Skin", price: "Book Now", image: "/mask-facial.png" },
  { name: "Nail Art & Extensions", price: "Book Now", image: "/cat-serum.png" },
  { name: "Hair Botox Therapy", price: "Book Now", image: "/cat-bbcream.png" },
]

const BASE_VISIBLE = 3

export function BeautyCatalogue() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const [query, setQuery] = useState("")
  const [showAll, setShowAll] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggleFav = (name: string) =>
    setFavorites((prev) => ({ ...prev, [name]: !prev[name] }))

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  )
  const visible = showAll ? filtered : filtered.slice(0, BASE_VISIBLE)

  return (
    <section className="bg-[#f6f1e7] text-neutral-900 px-6 py-16 md:px-12 lg:px-20">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl">
          Our <span className="font-bold">Services Catalogue</span>
        </h2>

        <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3 shadow-sm">
          <Search className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for product..."
            aria-label="Search for product"
            className="w-full bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Body grid */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2.4fr]">
        {/* Left intro */}
        <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start lg:justify-between">
          <p className="max-w-[16rem] text-sm leading-relaxed text-neutral-500">
            Hair, Skin, Bridal, Nail, Eye & Body — All Under One Roof at Soni Makeover
          </p>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm text-neutral-800 transition-colors hover:bg-neutral-900 hover:text-white lg:mt-8 lg:px-6 lg:py-3"
          >
            {showAll ? "Show Less" : "See All"}
            {showAll
              ? <X className="h-4 w-4" aria-hidden="true" />
              : <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visible.map((product) => {
            const isExpanded = expanded === product.name
            return (
            <article key={product.name} className="flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => toggleFav(product.name)}
                  aria-label={
                    favorites[product.name]
                      ? `Remove ${product.name} from favorites`
                      : `Add ${product.name} to favorites`
                  }
                  aria-pressed={!!favorites[product.name]}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites[product.name]
                        ? "fill-[#5e8478] text-[#5e8478]"
                        : "text-neutral-700"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h3 className="text-base font-medium text-neutral-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#5e8478]">
                    {product.price}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={isExpanded ? `Close ${product.name}` : `View ${product.name}`}
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? null : product.name)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700"
                >
                  {isExpanded
                    ? <X className="h-4 w-4" aria-hidden="true" />
                    : <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
              <ExpandPanel open={isExpanded}>
                <div className="mt-3 rounded-2xl bg-[#dce7e2] p-4">
                  <p className="text-sm leading-relaxed text-neutral-700">
                    Book <strong>{product.name}</strong> at Soni Makeover — personally performed by an expert with 25+ years of experience.
                  </p>
                  <a
                    href="tel:+918130767220"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80"
                  >
                    Call to Book — +91 81307 67220
                  </a>
                </div>
              </ExpandPanel>
            </article>
          )})}
        </div>
      </div>
    </section>
  )
}
