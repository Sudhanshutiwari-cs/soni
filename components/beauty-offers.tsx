"use client"

import { useState } from "react"


const OFFERS = [
  { tag: "New Visitors",  title: "Welcome Beauty Offer",      desc: "Flat 15% OFF on Your First Visit",                                                                                          highlight: true  },
  { tag: "Bridal",        title: "Bridal Exclusive",           desc: "Book Your Bridal Makeup & Get a Complimentary Bridal Consultation",                                                         highlight: false },
  { tag: "Refer & Earn",  title: "Refer & Earn",               desc: "Refer a Friend and Both of You Enjoy Exclusive Discounts",                                                                  highlight: false },
  { tag: "Birthday",      title: "Birthday Beauty Treat",      desc: "Celebrate Your Birthday Month with Special Beauty Offers & Surprise Gifts",                                                 highlight: false },
  { tag: "Membership",    title: "Premium Membership",         desc: "Priority Appointments · Exclusive Member Discounts · Birthday Rewards · Early Access to Festive Offers · Loyalty Reward Points", highlight: true  },
  { tag: "Combo",         title: "Self-Care Combo Offers",     desc: "Save More with Hair + Skin + Nail Combo Packages",                                                                          highlight: false },
  { tag: "Hair",          title: "Hair Transformation Offer",  desc: "Book Any Premium Hair Treatment & Get a Complimentary Hair Consultation",                                                   highlight: false },
  { tag: "Skin",          title: "Skin Glow Offer",            desc: "Book Any Premium Facial & Enjoy a Free Skin Analysis",                                                                      highlight: false },
  { tag: "Family",        title: "Mother & Daughter Special",  desc: "Enjoy Special Combo Pricing When You Visit Together",                                                                       highlight: false },
  { tag: "Friends",       title: "Best Friends Beauty Day",    desc: "Visit with Your Best Friend & Unlock Exclusive Combo Savings",                                                              highlight: false },
  { tag: "Wedding",       title: "Wedding Season Offers",      desc: "Special Bridal & Pre-Bridal Packages for Wedding Bookings",                                                                 highlight: false },
  { tag: "Festive",       title: "Festive Beauty Deals",       desc: "Exclusive Offers During Holi · Diwali · Karwa Chauth · Teej · Raksha Bandhan · Eid · Christmas · New Year",               highlight: false },
  { tag: "Nails",         title: "Nail Studio Special",        desc: "Get Premium Nail Art at Special Combo Prices with Nail Extensions",                                                         highlight: false },
  { tag: "Academy",       title: "Beauty Academy Offer",       desc: "Free Career Counselling · Easy Installment Facility · Practical Training · Professional Certificate · Internship Guidance", highlight: true  },
  { tag: "Loyalty",       title: "Loyalty Rewards",            desc: "Every Visit Brings You Closer to Special Rewards & Exclusive Member Benefits",                                              highlight: false },
]

const BASE_COUNT = 6

export function BeautyOffers() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? OFFERS : OFFERS.slice(0, BASE_COUNT)

  return (
    <section className="bg-[#f6f1e7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24" id="offers">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Limited Time</p>
            <h2 className="mt-1 text-3xl font-light leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Exclusive <span className="font-bold">Offers</span>
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Special deals crafted for every occasion — book now & save.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm text-neutral-800 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            {showAll ? "Show Less" : "See All Offers"}
          </button>
        </div>

        {/* Cards grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((offer) => (
            <div
              key={offer.title}
              className={`flex flex-col rounded-2xl p-6 transition-shadow hover:shadow-md ${
                offer.highlight
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-900"
              }`}
            >
              {/* Tag */}
              <span
                className={`mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  offer.highlight
                    ? "bg-white/15 text-white"
                    : "bg-[#f6f1e7] text-neutral-600"
                }`}
              >
                {offer.tag}
              </span>

              {/* Content */}
              <div>
                <h3 className={`text-lg font-bold leading-snug ${offer.highlight ? "text-white" : "text-neutral-900"}`}>
                  {offer.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${offer.highlight ? "text-white/70" : "text-neutral-500"}`}>
                  {offer.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
