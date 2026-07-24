"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ExpandPanelProps {
  open: boolean
  children: ReactNode
  className?: string
}

/**
 * Smoothly anidmates height from 0 → auto when `open` toggles.
 * Uses a ref to read the real scrollHeight so no fixed heights are needed.
 */
export function ExpandPanel({ open, children, className = "" }: ExpandPanelProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) {
      // Expand: measure content height and animate up, then release to auto
      el.style.height = "0px"
      void el.offsetHeight // force reflow so transition fires
      el.style.height = el.scrollHeight + "px"
      const onTransitionEnd = () => {
        el.style.height = "auto"
      }
      el.addEventListener("transitionend", onTransitionEnd, { once: true })
    } else {
      // Collapse: pin to explicit pixel height first (even if currently "auto"), then animate to 0
      el.style.height = el.getBoundingClientRect().height + "px"
      void el.offsetHeight // force reflow
      el.style.height = "0px"
    }
  }, [open])

  return (
    <div
      ref={ref}
      style={{ height: "0px" }}
      className={`overflow-hidden transition-[height] duration-500 ease-in-out ${className}`}
    >
      {children}
    </div>
  )
}
