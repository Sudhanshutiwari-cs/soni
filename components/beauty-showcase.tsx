"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, X } from "lucide-react"
import { ExpandPanel } from "@/components/expand-panel"

export function BeautyShowcase() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [readMoreOpen, setReadMoreOpen] = useState(false)

  return (
    <section className="bg-[#f6f1e7] text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-pretty text-3xl font-light leading-tight md:text-5xl">
            Your Beauty &amp; Confidence
            <br />
            <span className="font-bold">Start Here!</span>
          </h2>

          <button
            type="button"
            onClick={() => setAboutOpen((v) => !v)}
            aria-expanded={aboutOpen}
            className="group flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-full bg-[#dce7e2] text-neutral-800 transition-colors hover:bg-[#c9dbd3] md:h-28 md:w-28"
            aria-label="About Us"
          >
            {aboutOpen
              ? <X className="h-5 w-5" />
              : <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
            <span className="text-xs font-medium md:text-sm">About Us</span>
          </button>
        </div>

        {/* About Us expandable panel */}
        <ExpandPanel open={aboutOpen}>
          <div className="mt-6 rounded-3xl bg-[#dce7e2] p-6 md:p-8">
            <h3 className="text-xl font-bold text-neutral-900 md:text-2xl">About Soni Makeover</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700">
              With over 25 years of experience, Soni Makeover is a leading professional beauty salon specializing in bridal makeup, advanced hair treatments, premium skin care, nail art, and a certified beauty academy. Every service is personally performed by an expert — no compromises, no delegation. Located in Delhi, we have built a reputation for flawless results, one client at a time.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-neutral-600">
              {["Bridal Makeup", "Hair Services", "Skin & Facials", "Nail Art", "Body Care", "Beauty Academy"].map((tag) => (
                <span key={tag} className="rounded-full border border-[#5e8478] px-3 py-1 text-[#5e8478]">{tag}</span>
              ))}
            </div>
          </div>
        </ExpandPanel>

        {/* Image grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Card 1: facial mask + caption + button */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src="https://res.cloudinary.com/df01whs60/image/upload/v1784375205/IMG-20231203-WA0045.jpg_w3cfzl.jpg"
                alt="Beauty transformation at Soni Makeover"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="mt-6 max-w-xs text-pretty text-base leading-relaxed text-neutral-600">
              Revitalize Your Skin and Spirit at Soni Makeover — 25+ years of
            personalized expert care.
            </p>
            <button
              type="button"
              onClick={() => setReadMoreOpen((v) => !v)}
              aria-expanded={readMoreOpen}
              className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              {readMoreOpen ? "Show Less" : "Reed More"}
              {readMoreOpen
                ? <X className="h-4 w-4" />
                : <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
            </button>
            <ExpandPanel open={readMoreOpen} className="mt-4">
              <p className="max-w-xs text-sm leading-relaxed text-neutral-600">
                At Soni Makeover we believe every person deserves to feel radiant. Our treatments combine the latest techniques — Korean Glass Skin, Hydra Facial, Keratin, Nano Brows, and HD Bridal makeup — with 25+ years of hands-on expertise. Book a consultation and let us craft your perfect look.
              </p>
              <a href="tel:+918130767220" className="mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-80">
                Call to Book
              </a>
            </ExpandPanel>
          </div>

          {/* Card 2: cream texture */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl md:mt-2">
            <Image
              src="https://res.cloudinary.com/df01whs60/image/upload/v1784375199/IMG_20251224_144604.jpg_bjt3dg.jpg"
              alt="Bridal look by Soni Makeover"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Card 3: heading + salon interior */}
          <div className="flex flex-col justify-end">
            <h3 className="text-pretty text-2xl font-normal leading-snug text-neutral-800 md:text-3xl">
              Discover Your Beauty Potential at Our Professional Salon
            </h3>
            <div className="relative mt-6 w-full overflow-hidden rounded-3xl">
              <Image
                src="https://res.cloudinary.com/df01whs60/image/upload/v1784375196/IMG-20230724-WA0000.jpg_nnp6ba.jpg"
                alt="Expert beauty service at Soni Makeover"
                width={800}
                height={1000}
                className="w-full h-auto object-cover rounded-3xl"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
