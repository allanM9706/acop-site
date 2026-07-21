import { NewsCard } from '@/components/cards/NewsCard'
import { getAllNews, NewsArticle, formatDate, decodeHtmlEntities } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, ShieldCheck } from 'lucide-react'

// Metadata for the workshops listing page
export const metadata: Metadata = {
  title: 'Workshops & Events | Africana College of Professionals',
  description: 'Explore professional workshops, training programs, and events at Africana College of Professionals. Join our transformative learning experiences.',
  keywords: 'ACOP workshops, professional training Kenya, teacher workshops, mindful self-compassion, career development events',
  openGraph: {
    title: 'Workshops & Events | Africana College of Professionals',
    description: 'Explore professional workshops and training programs at Africana College of Professionals.',
    url: 'https://www.acop.co.ke/workshops',
    siteName: 'Africana College of Professionals',
    type: 'website',
    images: [
      {
        url: 'https://www.acop.co.ke/workshop.webp',
        width: 1200,
        height: 630,
        alt: 'ACOP Workshops and Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshops & Events | Africana College of Professionals',
    description: 'Explore professional workshops and training programs at ACOP.',
    images: ['https://www.acop.co.ke/workshops-og.jpg'],
    creator: '@acop_kenya',
    site: '@acop_kenya',
  },
  alternates: {
    canonical: 'https://www.acop.co.ke/workshops',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Enable ISR - revalidate every 1 month
export const revalidate = 2592000

// Helper function to clean excerpt (strip HTML tags and decode entities)
const cleanExcerpt = (text: string | null | undefined, maxLength: number = 150): string => {
  if (!text) return ''
  
  const decoded = decodeHtmlEntities(text)
  const plainText = decoded.replace(/<[^>]*>/g, '')
  const cleaned = plainText.replace(/\s+/g, ' ').trim()
  
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength) + '...'
}

// Helper to get featured image URL
const getFeaturedImageUrl = (article: NewsArticle) => {
  return article.featuredImage?.node?.sourceUrl || null
}

// Helper to get event type display
function getEventTypeDisplay(type: string | null): { label: string; color: string } {
  const types: Record<string, { label: string; color: string }> = {
    workshop: { label: 'Workshop', color: 'bg-purple-600' },
    seminar: { label: 'Seminar', color: 'bg-blue-600' },
    conference: { label: 'Conference', color: 'bg-orange-600' },
    webinar: { label: 'Webinar', color: 'bg-green-600' },
    training: { label: 'Training', color: 'bg-red-600' },
    lecture: { label: 'Lecture', color: 'bg-indigo-600' },
    panel: { label: 'Panel Discussion', color: 'bg-pink-600' },
    networking: { label: 'Networking Event', color: 'bg-teal-600' },
    summit: { label: 'Summit', color: 'bg-amber-600' },
    retreat: { label: 'Retreat', color: 'bg-violet-600' },
    other: { label: 'Event', color: 'bg-gray-600' },
  };
  return types[type || 'other'] || types.other;
}

export default async function WorkshopsPage() {
  const allArticles = await getAllNews()

  // Filter only event-type news posts (workshops)
  const workshops = allArticles.filter(article => 
    article.newsMetadata?.newsType?.includes('event')
  )

  // Featured workshop (first one)
  const featuredWorkshop = workshops[0]
  const remainingWorkshops = workshops.slice(1)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/workshop.webp"
            alt="Workshops & Events"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-orange-500/60 z-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in-up">
              Workshops & Events
            </h1>
            <p className="text-lg md:text-xl mb-5 animate-fade-in-up animation-delay-200">
              Professional development workshops and training programs designed for educators and professionals
            </p>
            <div className="animate-fade-in-up animation-delay-400">
              <Link
                href="/verify"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-lg inline-flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workshop */}
      {featuredWorkshop && (
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-8 border-purple-600">
            <div className="md:flex">
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
                {getFeaturedImageUrl(featuredWorkshop) ? (
                  <Image
                    src={getFeaturedImageUrl(featuredWorkshop)!}
                    alt={featuredWorkshop.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
                    <span className="text-purple-500 text-6xl">🎓</span>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-purple-600 text-sm font-semibold uppercase tracking-wide">
                    Featured Workshop
                  </span>
                  {featuredWorkshop.newsMetadata?.eventType && (
                    <span className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${getEventTypeDisplay(featuredWorkshop.newsMetadata.eventType).color}`}>
                      {getEventTypeDisplay(featuredWorkshop.newsMetadata.eventType).label}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-3">
                  {featuredWorkshop.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {cleanExcerpt(featuredWorkshop.excerpt) || cleanExcerpt(featuredWorkshop.newsMetadata?.body || '', 150)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {formatDate(featuredWorkshop.date)}
                  </span>
                  <Link
                    href={`/workshops/${featuredWorkshop.slug}`}
                    className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Workshops Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            All <span className="text-purple-600">Workshops</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 rounded"></div>
        </div>

        {remainingWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingWorkshops.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">More workshops coming soon. Stay tuned!</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-700 to-orange-600 text-white py-16 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Verify Your Certificate
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Already attended a workshop? Verify your certificate instantly.
          </p>
          <Link
            href="/verify"
            className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            Verify Certificate
          </Link>
        </div>
      </section>
    </main>
  )
}