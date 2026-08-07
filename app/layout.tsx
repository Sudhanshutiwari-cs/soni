import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const siteUrl = 'https://soni-phi.vercel.app'

export const metadata: Metadata = {
  title: 'Best Bridal Makeup Artist in Najafgarh Delhi | Soni Makeovers',
  description:
    'Soni Makeovers is a trusted beauty parlour in Najafgarh, Delhi offering bridal makeup, party makeup, HD makeup, engagement makeup, hair styling, saree draping and complete makeover services. Book your appointment today.',
  keywords: [
    'Soni Makeovers',
    'Soni Makeover Najafgarh',
    'Beauty Parlour Najafgarh',
    'Best Beauty Parlour in Najafgarh',
    'Bridal Makeup Artist Najafgarh',
    'Bridal Makeup Delhi',
    'Party Makeup Najafgarh',
    'HD Makeup Artist Delhi',
    'Airbrush Makeup Delhi',
    'Engagement Makeup',
    'Reception Makeup',
    'Wedding Makeup',
    'Hair Styling Najafgarh',
    'Saree Draping',
    'Makeup Studio Najafgarh',
    'Makeup Artist Near Me',
    'Bridal Makeup Near Me',
    'Beauty Salon Najafgarh',
    'Makeup Services Delhi',
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Soni Makeovers | Best Beauty Parlour in Najafgarh',
    description:
      'Professional Bridal Makeup, Party Makeup, Hair Styling & Complete Makeover Services in Najafgarh, Delhi.',
    url: siteUrl,
    siteName: 'Soni Makeovers',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Soni Makeovers — Best Bridal Makeup Artist in Najafgarh Delhi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soni Makeovers | Best Bridal Makeup Artist in Najafgarh',
    description:
      'Book professional bridal, party & HD makeup services in Najafgarh, Delhi.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'hvWpTQAibdxdiGGHsTL7XtV5COkxWLUP2GrG-HnlePk',
  },
  other: {
    'geo.region': 'IN-DL',
    'geo.placename': 'Najafgarh, Delhi',
    'geo.position': '28.609;76.985',
    ICBM: '28.609,76.985',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f1e7',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Soni Makeovers',
  image: `${siteUrl}/logo.png`,
  url: `${siteUrl}/`,
  telephone: '+91-8130767220',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No D, 28 Feet Road, Main Gopal Nagar, Prem Nagar',
    addressLocality: 'Najafgarh',
    addressRegion: 'Delhi',
    postalCode: '110043',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 10:00-20:00',
  priceRange: '₹₹',
  areaServed: ['Najafgarh', 'Dwarka', 'Uttam Nagar', 'Delhi'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} bg-background light`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
