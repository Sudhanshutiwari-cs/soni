"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ArrowUpRight } from "lucide-react"

interface ImageModalProps {
  src: string
  alt: string
  title: string
  subtitle?: string
  onClose: () => void
}

export function ImageModal({ src, alt, title, subtitle, onClose }: ImageModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Bottom text */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
          <div>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{title}</h3>
            {subtitle && (
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/80">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/20 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            <ArrowUpRight className="h-4 w-4" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
