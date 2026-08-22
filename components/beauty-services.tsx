"use client"

import { useState } from "react"
import { ArrowUpRight, X } from "lucide-react"
import Image from "next/image"
import { ExpandPanel } from "@/components/expand-panel"

type Service = {
  name: string
  thumb: string
  main: string
  secondary: string
  items: string[]
}

const services: Service[] = [
  {
    name: "Hair Services",
    thumb: "/thumb-cleaner.png",
    main: "/mask-facial.png",
    secondary: "/salon-interior.png",
    items: [
      "Hair Consultation", "Hair Cut (Basic & Advance)", "Hair Wash & Blow Dry",
      "Hair Styling", "Hair Spa", "Hair Coloring", "Global Hair Color",
      "Root Touch-Up", "Highlights & Balayage", "Hair Smoothening",
      "Hair Straightening", "Keratin Treatment", "Cysteine Treatment",
      "Hair Botox", "Hair Rebonding", "Scalp Detox", "Anti Hair Fall Treatment",
      "Anti Dandruff Treatment", "Hair Repair Therapy", "Hair Extensions",
    ],
  },
  {
    name: "Skin & Facial Treatments",
    thumb: "/thumb-facial.png",
    main: "/service-smile.png",
    secondary: "/service-cream.png",
    items: [
      "Skin Consultation", "Classic Facial", "Fruit Facial", "Gold Facial",
      "Diamond Facial", "Pearl Facial", "Hydra Facial", "O3+ Facial",
      "Anti-Aging Facial", "Brightening Facial", "Acne Treatment",
      "Pigmentation Treatment", "De-Tan Treatment", "Skin Polishing",
      "Clean-Up", "Bleach", "Under Eye Treatment", "Skin Rejuvenation",
    ],
  },
  {
    name: "Makeup Services",
    thumb: "/thumb-pedicure.png",
    main: "/exclusive-featured.png",
    secondary: "/service-smile.png",
    items: [
      "Bridal Makeup", "HD Bridal Makeup", "Airbrush Makeup", "3D Makeup",
      "Lifting Makeup", "Engagement Makeup", "Reception Makeup", "Party Makeup",
      "Cocktail Makeup", "Sagan Makeup", "Fashion Makeup", "Hair Styling",
      "Saree Draping", "Dupatta Draping",
    ],
  },
  {
    name: "Nail Services",
    thumb: "/thumb-manicure.png",
    main: "/service-smile.png",
    secondary: "/service-cream.png",
    items: [
      "Classic Manicure", "Luxury Manicure", "Classic Pedicure", "Spa Pedicure",
      "Gel Nail Extensions", "Acrylic Nail Extensions", "Nail Art", "3D Art",
      "French Nails", "Nail Refill", "Nail Repair", "Nail Removal",
    ],
  },
  {
    name: "Eye Beauty",
    thumb: "/thumb-facial.png",
    main: "/service-cream.png",
    secondary: "/service-smile.png",
    items: [
      "Eyebrow Threading", "Upper Lip", "Full Face Threading",
      "Eyebrow Shaping", "Eyebrow Tinting", "Brow Lamination",
      "Eyelash Extensions", "Lash Lift", "Lash Tint",
    ],
  },
  {
    name: "Body Care",
    thumb: "/thumb-cleaner.png",
    main: "/salon-interior.png",
    secondary: "/service-cream.png",
    items: [
      "Full Body Waxing", "Rica Wax", "Chocolate Wax", "Roll-On Wax",
      "Body Polishing", "Body Spa", "Back Polish", "Hand & Foot Spa",
    ],
  },
  {
    name: "Bridal Services",
    thumb: "/thumb-pedicure.png",
    main: "/exclusive-featured.png",
    secondary: "/mask-facial.png",
    items: [
      "Bridal Consultation", "Pre-Bridal Packages", "Bridal Skin Care",
      "Bridal Hair Care", "HD Bridal Makeup", "Airbrush Bridal Makeup",
      "Bridal Hairstyling", "Bridal Mhendi", "Saree / Lehenga Draping",
      "Touch-Up Kit", "Nail Makeover",
    ],
  },
  {
    name: "Beauty Academy",
    thumb: "/thumb-facial.png",
    main: "/salon-interior.png",
    secondary: "/mask-facial.png",
    items: [
      "Professional Makeup Course", "Advanced Bridal Makeup Course",
      "Hair Styling Course", "Hair Chemical Course", "Hair Color Course",
      "Skin & Facial Course", "Nail Art Course", "Eyelash Extension Course",
      "Salon Management Training", "Professional Certification",
      "Practical Hands-on Training",
    ],
  },
  {
    name: "Premium Signature Treatments",
    thumb: "/thumb-cleaner.png",
    main: "/service-cream.png",
    secondary: "/salon-interior.png",
    items: [
      "Korean Glass Skin Facial", "Hydra Facial", "Hair Botox Therapy",
      "Keratin Therapy", "Cysteine Therapy", "Scalp Detox",
      "Skin Brightening Therapy", "Anti-Aging Skin Therapy",
      "Hair Repair Treatment", "Head Spa",
    ],
  },
]

const BASE_COUNT = 5

export function BeautyServices() {
  const [moreOpen, setMoreOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState<number | null>(null)
  const visibleServices = moreOpen ? services : services.slice(0, BASE_COUNT)

  return (
    <>
    <section className="w-full bg-[#f6f1e7] px-6 py-16 text-neutral-900 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-pretty text-3xl font-light tracking-tight md:text-4xl">
            Service We <span className="font-bold">Provide</span>
          </h2>
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100"
          >
            {moreOpen ? "Show Less" : "More Services"}
            {moreOpen ? <X className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Content */}
        <div className="mt-10">
          <ul className="flex flex-col divide-y divide-neutral-200">
            {visibleServices.map((service, index) => {
              const isDetailOpen = detailOpen === index
              return (
                <li key={service.name}>
                  <div className="flex w-full items-center gap-3 py-4">
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={service.thumb || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex-1 text-lg font-medium">{service.name}</span>
                    <button
                      type="button"
                      aria-expanded={isDetailOpen}
                      onClick={() => setDetailOpen(isDetailOpen ? null : index)}
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isDetailOpen
                          ? "bg-neutral-900 text-white"
                          : "border border-neutral-300 text-neutral-900"
                      }`}
                    >
                      {isDetailOpen
                        ? <X className="h-4 w-4" />
                        : <ArrowUpRight className="h-4 w-4" />}
                    </button>
                  </div>
                  <ExpandPanel open={isDetailOpen}>
                    <div className="pb-4 pl-14 pr-2">
                      <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="text-xs text-neutral-500 before:mr-1.5 before:content-['·']"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="tel:+918130767220"
                        className="mt-3 inline-flex items-center gap-1 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-80"
                      >
                        Book Now
                      </a>
                    </div>
                  </ExpandPanel>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
    </>
  )
}
