"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Menu,
  Phone,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react"

// Mobile drawer nav
function MobileMenu({ open, onClose, activeSection }: { open: boolean; onClose: () => void; activeSection: string }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-900/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between px-5 py-5">
        <img
          src="https://res.cloudinary.com/df01whs60/image/upload/v1784270772/logo-transparent-png_zpzyfr.png"
          alt="Soni Makeover"
          className="h-14 w-auto object-contain brightness-0 invert"
        />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white"
        >
          <X className="size-5" />
        </button>
      </div>
      <nav className="flex flex-1 flex-col items-center justify-center gap-6">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "")
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                onClose()
              }}
              className={`text-2xl font-medium transition-colors ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
      <div className="px-5 pb-8">
        <a
          href="tel:+918130767220"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-neutral-900"
        >
          <Phone className="size-4" />
          Call Now — +91 81307 67220
        </a>
      </div>
    </div>
  )
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Category", href: "#category" },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const slides = [
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375185/IMG-20250903-WA0004.jpg_bkix97.jpg",
    alt: "Soni Makeover — beauty transformation",
    heading: "25+ Years of Beauty Excellence",
    sub: "Every service is personally performed by an expert. Bridal makeovers, advanced hair transformations, premium skin treatments — all tailored to your unique beauty.",
  },
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375202/IMG-20230413-WA0005.jpg_luad1b.jpg",
    alt: "Flawless bridal makeup by Soni Makeover",
    heading: "Flawless Bridal Makeovers",
    sub: "HD, Airbrush & 3D Bridal Makeup — every bridal look is personally crafted by Soni with 25+ years of bridal expertise.",
  },
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375199/1000804513.jpg_xdapdb.jpg",
    alt: "Premium hair transformation at Soni Makeover",
    heading: "Premium Hair Transformations",
    sub: "Keratin, Botox, Balayage, Smoothing & advanced colour correction — all expert-performed for hair that turns heads.",
  },
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375209/IMG-20231017-WA0011.jpg_bie0td.jpg",
    alt: "Advanced skin and facial treatment at Soni Makeover",
    heading: "Advanced Skin & Facial Treatments",
    sub: "Korean Glass Skin, Hydra Facial, Gold, Diamond & Anti-Aging — reveal your natural glow with treatments personally performed by an expert.",
  },
]

const services = [
  { label: "Hair Services" },
  { label: "Bridal Makeup" },
  { label: "Skin & Facial" },
  { label: "Nail Art" },
  { label: "Body Care" },
]

const SLIDE_INTERVAL = 5000

export function BeautyHero() {
  const [slide, setSlide] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const prev = useCallback(
    () => setSlide((s) => (s - 1 + slides.length) % slides.length),
    [],
  )
  const next = useCallback(
    () => setSlide((s) => (s + 1) % slides.length),
    [],
  )

  // Auto-advance every 5 s; reset timer on manual nav
  useEffect(() => {
    const id = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [next])

  return (
    <main className="relative min-h-svh w-full overflow-hidden bg-background text-foreground">
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
      {/* ─────────────────────────────────────────
          MOBILE HERO  (hidden on lg+)
          Compact navbar + image slider card
      ───────────────────────────────────────── */}
      <div className="flex w-full flex-col bg-background lg:hidden">
        {/* Navbar */}
        <header className="flex items-center justify-between px-4 py-3">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <img
              src="https://res.cloudinary.com/df01whs60/image/upload/v1784270772/logo-transparent-png_zpzyfr.png"
              alt="Soni Makeover"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-9 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 text-foreground"
          >
            <Menu className="size-4" />
          </button>
        </header>

        {/* Slider card */}
        <div className="mx-4 mb-4 overflow-hidden rounded-2xl">
          {/* Image frame — fixed height */}
          <div className="relative h-56 w-full">
            {slides.map((s, i) => (
              <div
                key={s.src}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === slide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                />
              </div>
            ))}

            {/* Bottom vignette for dot readability */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Dot indicators — inside image at bottom */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === slide ? "h-1.5 w-5 bg-white" : "h-1.5 w-1.5 bg-white/45"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next arrow buttons — sides of image */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          DESKTOP HERO  (hidden below lg)
          Original layout unchanged
      ───────────────────────────────────────── */}
      <div className="hidden lg:block">
        {/* Background slideshow */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === slide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                className="object-cover object-top"
              />
            </div>
          ))}
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-background/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          {/* Navbar */}
          <header className="flex items-center justify-between gap-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" }) }}>
              <img
                src="https://res.cloudinary.com/df01whs60/image/upload/v1784270772/logo-transparent-png_zpzyfr.png"
                alt="Soni Makeover"
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </a>

            <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 p-1.5 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-foreground text-primary"
                        : "text-primary-foreground/90 hover:bg-primary-foreground/15"
                    }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <a
              href="tel:+918130767220"
              className="flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              <Phone className="size-4" />
              Call Now
            </a>
          </header>

          {/* Hero body */}
          <div className="flex flex-1 flex-col justify-center py-10">
            <div className="max-w-2xl">
              <h1
                key={slide}
                className="animate-in fade-in slide-in-from-bottom-4 text-pretty text-4xl font-extrabold leading-tight text-primary-foreground duration-700 lg:text-6xl"
              >
                {slides[slide].heading}
              </h1>
              <p
                key={`sub-${slide}`}
                className="animate-in fade-in slide-in-from-bottom-3 mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/75 duration-700"
              >
                {slides[slide].sub}
              </p>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 pb-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur-md transition-colors hover:bg-primary-foreground/20"
                  >
                    <Sparkles className="size-4" />
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="tabular-nums text-sm font-medium text-primary-foreground">
                  0{slide + 1}
                </span>
                <div className="relative h-px w-40 bg-primary-foreground/30">
                  <span
                    className="absolute left-0 top-0 h-px bg-primary-foreground transition-all duration-500"
                    style={{ width: `${((slide + 1) / slides.length) * 100}%` }}
                  />
                </div>
                <span className="tabular-nums text-sm font-medium text-primary-foreground/60">
                  0{slides.length}
                </span>
                <div className="ml-2 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={prev}
                    className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md transition-colors hover:bg-primary-foreground/20"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={next}
                    className="flex size-10 items-center justify-center rounded-full bg-primary-foreground text-primary transition-opacity hover:opacity-90"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
