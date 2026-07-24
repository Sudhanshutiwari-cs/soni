"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Sparkles, X } from "lucide-react"
import { ImageModal } from "@/components/image-modal"
import { ExpandPanel } from "@/components/expand-panel"

const EXCLUSIVE_IMAGES = [
  { src: "/exclusive-featured.png", alt: "Woman with bold makeup and voluminous afro" },
  { src: "/exclusive-man.png",      alt: "Man applying face cream" },
  { src: "/exclusive-pout.png",     alt: "Woman with glowing makeup" },
]

const IMAGE_INTERVAL = 10000

export function BeautyExclusive() {
  const [modalOpen, setModalOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [expandedImg, setExpandedImg] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setExpandedImg((prev) => (prev + 1) % EXCLUSIVE_IMAGES.length)
    }, IMAGE_INTERVAL)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHover = (i: number) => {
    setExpandedImg(i)
    startTimer()
  }

  return (
    <>
    {modalOpen && (
      <ImageModal
        src="/exclusive-featured.png"
        alt="Woman with bold makeup and voluminous afro"
        title="Holistic Approach"
        subtitle="HD Bridal, Airbrush & 3D Makeup — every bridal look is personally created by Soni with 25+ years of expertise."
        onClose={() => setModalOpen(false)}
      />
    )}
    <section className="bg-[#f6f1e7] px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-pretty text-3xl leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            <span className="font-normal">Expert </span>
            <span className="font-bold">Bridal</span>
            <br />
            <span className="font-normal">Transformation Awaits</span>
          </h2>

          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-300 px-5 py-3 text-sm text-neutral-800 transition-colors hover:bg-neutral-100"
          >
            {moreOpen ? "Show Less" : "More Services"}
            {moreOpen ? <X className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
          </button>
        </div>

        <ExpandPanel open={moreOpen}>
          <div className="mb-8 grid grid-cols-1 gap-4 rounded-3xl bg-[#dce7e2] p-6 sm:grid-cols-3 md:p-8">
            {[
              { title: "Hair Services", desc: "Keratin, Botox, Balayage, Smoothing & advanced colour treatments." },
              { title: "Nail Art & Care", desc: "Gel nails, extensions, nail art designs & luxury manicure-pedicure." },
              { title: "Beauty Academy", desc: "Professional bridal makeup & hair courses with hands-on expert training." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/60 p-5">
                <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.desc}</p>
                <a href="tel:+918130767220" className="mt-3 inline-flex items-center gap-1 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-80">
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </ExpandPanel>

        {/* Cards — accordion: one expands big, others stay narrow */}
        <div className="flex h-[280px] gap-3 overflow-hidden rounded-3xl sm:h-[360px] md:h-[420px] lg:h-[480px]">
          {EXCLUSIVE_IMAGES.map((img, i) => {
            const isExpanded = expandedImg === i
            return (
              <div
                key={i}
                onMouseEnter={() => handleHover(i)}
                className={`relative overflow-hidden rounded-3xl transition-all duration-700 ease-in-out cursor-pointer ${
                  isExpanded ? "flex-[3]" : "flex-[0.7]"
                }`}
                style={{ minWidth: 0 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Gradient overlay on expanded */}
                {isExpanded && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                )}

                  {/* More Details button on expanded */}
                {isExpanded && (
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="absolute right-3 top-3 flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full bg-neutral-900/60 text-[10px] text-white backdrop-blur-md transition-all hover:bg-neutral-900/80 hover:scale-105 active:scale-95 sm:right-5 sm:top-5 sm:h-20 sm:w-20 sm:gap-1 sm:text-xs"
                  >
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:block">More Details</span>
                  </button>
                )}

                {/* Bottom content on expanded */}
                {isExpanded && (
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div className="max-w-xs">
                      <h3 className="mb-1 text-xl font-bold text-white md:text-2xl">Bridal Expertise</h3>
                      <p className="text-sm leading-relaxed text-white/80">
                        HD, Airbrush, 3D &amp; Lifting Makeup — Every Bridal Look Personally Created
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neutral-900/70 px-5 py-3 text-sm text-white backdrop-blur-md transition-colors hover:bg-neutral-900"
                    >
                      <Sparkles className="h-4 w-4" />
                      Skin Care
                    </button>
                  </div>
                )}

                {/* Dot indicators */}
                {isExpanded && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ bottom: "4.5rem" }}>
                    {EXCLUSIVE_IMAGES.map((_, di) => (
                      <span
                        key={di}
                        className={`block h-1.5 rounded-full transition-all duration-500 ${
                          di === expandedImg ? "w-6 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
    </>
  )
}
