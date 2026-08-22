import Image from "next/image"

const IMAGES = [
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375212/IMG_20250603_141039.jpg_fd4fk5.jpg",
    alt: "Students learning professional makeup techniques at Soni Makeover Academy",
  },
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375210/IMG_20250211_122453.jpg_a5vzyt.jpg",
    alt: "Academy students practising bridal makeup",
  },
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375207/IMG_20250505_120827.jpg_hojopc.jpg",
    alt: "Hands-on training session at Soni Makeover Academy",
  },
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375193/IMG_20250603_141051.jpg_qoahri.jpg",
    alt: "Student completing a full bridal transformation",
  },
  {
    src: "https://res.cloudinary.com/df01whs60/image/upload/v1784375182/IMG_20250630_154522.jpg_oett1o.jpg",
    alt: "Expert instructor guiding academy students",
  },
]

export function BeautyAcademySlider() {
  return (
    <section className="bg-[#f6f1e7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Beauty Academy</p>
          <h2 className="mt-1 text-3xl font-light leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Where <span className="font-bold">Experts</span> Are Made
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
            Watch our students transform into skilled makeup artists — trained personally by Soni with 25+ years of expertise.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
