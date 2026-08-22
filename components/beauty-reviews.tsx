import Image from "next/image"
import { Star } from "lucide-react"

type Review = {
  name: string
  rating: string
  avatar: string
  pink: boolean
  text: string
}

const reviews: Review[] = [
  { name: "Priya Sharma", rating: "5.0", avatar: "/avatar-alice.png", pink: false, text: "Soni ma'am did my bridal makeup and I looked absolutely stunning. Every guest complimented the look. Truly an expert!" },
  { name: "Neha Gupta", rating: "4.8", avatar: "/avatar-mella.png", pink: true, text: "Got the Hydra Facial and my skin has never glowed like this. One-on-one attention makes all the difference." },
  { name: "Anjali Verma", rating: "4.9", avatar: "/avatar-sara.png", pink: true, text: "The hair keratin treatment was flawless. 25 years of experience really shows — the best salon I have visited!" },
  { name: "Ritika Jain", rating: "4.7", avatar: "/avatar-lucy.png", pink: false, text: "Enrolled in the bridal makeup course and it was life-changing. Practical training with real salon techniques." },
]

const stackAvatars = ["/avatar-alice.png", "/avatar-sara.png", "/avatar-lucy.png"]

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        review.pink ? "bg-[#dce7e2]" : "bg-[#ece5d6]"
      }`}
    >
      <p className="text-sm leading-relaxed text-neutral-600">{review.text}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={review.avatar || "/placeholder.svg"}
            alt={review.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-neutral-800">{review.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-neutral-800 text-neutral-800" />
          <span className="text-sm font-medium text-neutral-800">{review.rating}</span>
        </div>
      </div>
    </div>
  )
}

export function BeautyReviews() {
  return (
    <section className="bg-[#f6f1e7] px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
        {/* Left column */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-light leading-tight text-neutral-900 md:text-5xl">
            Glowing <span className="font-bold">Reviews</span>
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500 text-pretty">
            25+ years of beauty excellence. Trusted by hundreds of brides, clients &amp; beauty students.
          </p>
          <div className="mt-8 flex items-center">
            {stackAvatars.map((src, i) => (
              <Image
                key={src}
                src={src || "/placeholder.svg"}
                alt="Happy customer"
                width={56}
                height={56}
                className={`h-14 w-14 rounded-full border-4 border-[#f6f1e7] object-cover ${
                  i > 0 ? "-ml-4" : ""
                }`}
              />
            ))}
            <div className="-ml-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#f6f1e7] bg-neutral-900 text-sm font-medium text-white">
              +42
            </div>
          </div>
        </div>

        {/* Right masonry grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-5">
            <ReviewCard review={reviews[0]} />
            <ReviewCard review={reviews[2]} />
          </div>
          <div className="flex flex-col gap-5 sm:pt-10">
            <ReviewCard review={reviews[1]} />
            <ReviewCard review={reviews[3]} />
          </div>
        </div>
      </div>
    </section>
  )
}
