"use client"

type IconProps = { className?: string }

function Instagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function Pinterest({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2 .03-2.87.19-.8 1.2-5.09 1.2-5.09s-.31-.61-.31-1.52c0-1.42.82-2.48 1.85-2.48.87 0 1.29.65 1.29 1.44 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.85 1.52 1.85 1.83 0 3.23-1.93 3.23-4.71 0-2.46-1.77-4.18-4.29-4.18-2.93 0-4.65 2.19-4.65 4.46 0 .88.34 1.83.76 2.34.08.1.1.19.07.29-.08.32-.25 1.02-.29 1.16-.05.19-.15.23-.35.14-1.3-.61-2.11-2.51-2.11-4.04 0-3.29 2.39-6.31 6.89-6.31 3.62 0 6.43 2.58 6.43 6.02 0 3.59-2.27 6.49-5.41 6.49-1.06 0-2.05-.55-2.39-1.2l-.65 2.48c-.24.9-.87 2.03-1.3 2.72.98.3 2.02.47 3.1.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  )
}

function Twitter({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function Linkedin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function YouTube({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function Facebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Category", href: "#category" },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const socials = [
  { name: "Instagram", Icon: Instagram, href: "https://www.instagram.com/soni_makeup_artistt?igsh=eXIwdHVwazZpdzRp" },
  { name: "YouTube", Icon: YouTube, href: "https://youtube.com/@jeevikasoni7220?si=rIxv6I3MybeNQAXV" },
  { name: "Facebook", Icon: Facebook, href: "https://www.facebook.com/share/1JUsx8Sm46/" },
]

export function BeautyFooter() {
  return (
    <footer className="bg-[#f6f1e7] text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-5">
            <img
              src="https://res.cloudinary.com/df01whs60/image/upload/v1784270772/logo-transparent-png_zpzyfr.png"
              alt="Soni Makeover"
              className="h-24 w-auto object-contain"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-neutral-500">
              &ldquo;Beauty is not about changing who you are — it&rsquo;s about
              enhancing the confidence you already have.&rdquo;
            </p>
            <p className="mt-3 text-xs font-medium text-[#5e8478]">25+ Years of Beauty Excellence</p>
          </div>

          {/* Nav links */}
          <nav className="md:col-span-4" aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.querySelector(link.href)
                      target?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="text-sm text-neutral-600 capitalize transition-colors hover:text-neutral-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="md:col-span-3 md:flex md:justify-end">
            <div className="flex items-center gap-2">
              {socials.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dce7e2] text-neutral-700 transition-colors hover:bg-[#c9dbd3]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col gap-4 text-xs text-neutral-500 md:mt-24 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-10">
            <a href="tel:+918130767220" className="transition-colors hover:text-neutral-900">+91 81307 67220</a>
            <a href="tel:+917982601373" className="transition-colors hover:text-neutral-900">+91 79826 01373</a>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-10">
            <a href="#" className="transition-colors hover:text-neutral-900">
              Privacy Policy
            </a>
            <span>&copy; 2025 Soni Makeover. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
