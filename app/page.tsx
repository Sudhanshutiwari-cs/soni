import { BeautyHero } from "@/components/beauty-hero"
import { BeautyShowcase } from "@/components/beauty-showcase"
import { BeautyServices } from "@/components/beauty-services"
import { BeautyGallery } from "@/components/beauty-gallery"
import { BeautyAcademySlider } from "@/components/beauty-academy-slider"
import { BeautyOffers } from "@/components/beauty-offers"
import { BeautyReviews } from "@/components/beauty-reviews"
import { BeautyFooter } from "@/components/beauty-footer"

export default function Page() {
  return (
    <main>
      <section id="home">
        <BeautyHero />
      </section>
      <section id="about">
        <BeautyShowcase />
      </section>
      <section id="services">
        <BeautyServices />
      </section>
      <BeautyGallery />
      <BeautyAcademySlider />
      <section id="category">
        <BeautyOffers />
      </section>
      <BeautyReviews />
      <section id="contact">
        <BeautyFooter />
      </section>
    </main>
  )
}
