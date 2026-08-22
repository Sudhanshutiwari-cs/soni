'use client'
import { BeautyHero } from "@/components/beauty-hero"
import { BeautyShowcase } from "@/components/beauty-showcase"
import { BeautyServices } from "@/components/beauty-services"
import { BeautyGallery } from "@/components/beauty-gallery"
import { BeautyAcademySlider } from "@/components/beauty-academy-slider"
import { BeautyOffers } from "@/components/beauty-offers"
import { BeautyReviews } from "@/components/beauty-reviews"
import { BeautyFooter } from "@/components/beauty-footer"
import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Review Modal Component
function ReviewModal({ isOpen, onClose, onReviewSubmitted }: { 
  isOpen: boolean, 
  onClose: () => void, 
  onReviewSubmitted: () => void 
}) {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Direct Supabase insert
      const { data, error: supabaseError } = await supabase
        .from('reviews')
        .insert([
          {
            name: formData.name,
            review: formData.review,
            rating: parseInt(formData.rating.toString())
          }
        ])
        .select()

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      setSuccess(true)
      setTimeout(() => {
        onReviewSubmitted()
        onClose()
        setSuccess(false)
        setFormData({ name: "", review: "", rating: 5 })
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Review submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-500">Your review has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Write a Review</h3>
            <p className="text-gray-500 mb-6">Share your experience with us</p>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="review-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="review-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="review-rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  <select
                    id="review-rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                    <option value="4">⭐⭐⭐⭐ - Very Good</option>
                    <option value="3">⭐⭐⭐ - Good</option>
                    <option value="2">⭐⭐ - Fair</option>
                    <option value="1">⭐ - Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  id="review-text"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your experience..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// Enhanced Reviews Section Component with Direct DB Connection
function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      // Direct Supabase query
      const { data, error: supabaseError } = await supabase
        .from('reviews')
        .select('*')
        .order('id', { ascending: false })

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      setReviews(data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load reviews')
      console.error('Error fetching reviews:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating)
  }

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-rose-500 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mt-3 mb-4">
            What Our <span className="font-medium bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Read reviews from our valued customers and share your own experience
          </p>
        </div>

        {/* Write Review Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-lg hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            <p className="text-gray-500 mt-4">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                      {review.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{review.name}</h3>
                      <div className="text-sm mt-1">{renderStars(review.rating)}</div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={fetchReviews}
      />
    </section>
  )
}

// Book Appointment Component
function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Send data to Google Sheets via API route
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          notes: formData.notes || 'N/A',
          timestamp: new Date().toISOString(),
          status: 'New'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }

      setSubmitted(true)
      console.log('Booking submitted successfully:', formData)
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.')
      console.error('Submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const services = [
    "Facial Treatment",
    "Hair Styling",
    "Makeup Application",
    "Manicure & Pedicure",
    "Massage Therapy",
    "Waxing",
    "Bridal Package",
    "Skin Consultation"
  ]

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM"
  ]

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-200 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-rose-500 text-sm font-semibold tracking-widest uppercase">Book Now</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mt-3 mb-4">
            Book an <span className="font-medium bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Appointment</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Reserve your spot for a pampering session. We&apos;ll confirm your booking within 1 hour.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Booking Info */}
          <div className="space-y-10">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
              <h3 className="text-2xl font-light text-gray-800 mb-6">Why Book With Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-lg">Flexible Scheduling</p>
                    <p className="text-gray-500 mt-1">Choose from morning to evening slots that fit your busy schedule</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-lg">Expert Professionals</p>
                    <p className="text-gray-500 mt-1">All our specialists are certified with 5+ years of experience</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-lg">Premium Products</p>
                    <p className="text-gray-500 mt-1">We use only top-tier, cruelty-free beauty products</p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="mt-8 pt-6 border-t border-pink-100">
                <p className="text-sm text-gray-500 mb-4">Prefer to book by phone?</p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+918130767220" className="flex items-center gap-3 text-rose-500 hover:text-rose-600 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium">+91 81307 67220</span>
                  </a>
                  <a href="tel:+917982601373" className="flex items-center gap-3 text-rose-500 hover:text-rose-600 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium">+91 79826 01373</span>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-6 p-4 bg-pink-50 rounded-xl border border-pink-100">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Monday - Saturday</span>
                    <span className="font-medium">10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-500 mb-6">We&apos;ve received your appointment request. Check your email for confirmation details.</p>
                <div className="bg-pink-50 rounded-xl p-4 text-left max-w-xs mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Service:</span>
                    <span className="font-medium text-gray-700">{formData.service}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium text-gray-700">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium text-gray-700">{formData.time}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="mt-6 text-rose-500 underline-offset-2 hover:underline"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-light text-gray-800 mb-2">Reserve Your Spot</h3>
                <p className="text-gray-500 text-sm mb-4">Select your preferred service and time. We&apos;ll confirm your booking shortly.</p>
                
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/50 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/50 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/50 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Select Service *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/50 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 text-gray-700 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f43f5e' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                  >
                    <option value="" disabled>Choose a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={today}
                      className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/50 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 text-gray-700 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/50 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 text-gray-700 appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f43f5e' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                    >
                      <option value="" disabled>Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any allergies, preferences, or special requests..."
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-pink-50/50 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-lg hover:from-rose-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Booking...
                    </span>
                  ) : (
                    <>
                      Book Appointment
                      <svg className="inline-block w-5 h-5 ml-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <main>
      <section id="home">
        <BeautyHero />
      </section>
      
      {/* Hindi Quote Strip */}
      <div className="w-full bg-white py-8 px-4 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 leading-relaxed">
            &ldquo;||ॐ नमः शिवाय जय बाबा||&rdquo;
          </p>
        </div>
      </div>
      
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
      <ReviewsSection />
      <section id="book">
        <BookAppointment />
      </section>
      <section id="contact">
        <BeautyFooter />
      </section>
    </main>
  )
}