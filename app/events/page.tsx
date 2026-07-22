import { NewsCard } from '@/components/cards/NewsCard'
import { getAllNews, NewsArticle, formatDate, decodeHtmlEntities } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, ShieldCheck, CalendarDays } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All Events | Africana College of Professionals',
  description: 'Explore all professional events including workshops, seminars, conferences, webinars, and training programs at Africana College of Professionals.',
  keywords: 'ACOP events, workshops, seminars, conferences, webinars, training, professional development Kenya',
  openGraph: {
    title: 'All Events | Africana College of Professionals',
    description: 'Explore all professional events at Africana College of Professionals.',
    url: 'https://www.acop.co.ke/events',
    siteName: 'Africana College of Professionals',
    type: 'website',
    images: [
      {
        url: 'https://www.acop.co.ke/events-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ACOP Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Events | Africana College of Professionals',
    description: 'Explore all professional events at ACOP.',
    images: ['https://www.acop.co.ke/events-og.jpg'],
    creator: '@acop_kenya',
    site: '@acop_kenya',
  },
  alternates: {
    canonical: 'https://www.acop.co.ke/events',
  },
}

export const revalidate = 2592000 // 1 month

// Helper function to clean excerpt
const cleanExcerpt = (text: string | null | undefined, maxLength: number = 150): string => {
  if (!text) return ''
  const decoded = decodeHtmlEntities(text)
  const plainText = decoded.replace(/<[^>]*>/g, '')
  const cleaned = plainText.replace(/\s+/g, ' ').trim()
  return cleaned.length <= maxLength ? cleaned : cleaned.substring(0, maxLength) + '...'
}

// Helper to get featured image URL
const getFeaturedImageUrl = (article: NewsArticle) => {
  return article.featuredImage?.node?.sourceUrl || null
}

// Helper to get event type label and color
function getEventTypeDisplay(type: string | null): { label: string; color: string } {
  const types: Record<string, { label: string; color: string }> = {
    workshop: { label: 'Workshop', color: 'bg-purple-600' },
    seminar: { label: 'Seminar', color: 'bg-blue-600' },
    conference: { label: 'Conference', color: 'bg-orange-600' },
    webinar: { label: 'Webinar', color: 'bg-green-600' },
    training: { label: 'Training', color: 'bg-red-600' },
    other: { label: 'Event', color: 'bg-gray-600' },
  }
  return types[type || 'other'] || types.other
}

// Get unique event types with counts
function getEventTypeCounts(articles: NewsArticle[]): Map<string, { label: string; color: string; count: number }> {
  const typeMap = new Map<string, { label: string; color: string; count: number }>()
  
  articles.forEach(article => {
    const type = article.newsMetadata?.eventType || 'other'
    const display = getEventTypeDisplay(type)
    if (typeMap.has(type)) {
      typeMap.get(type)!.count++
    } else {
      typeMap.set(type, { ...display, count: 1 })
    }
  })
  
  return typeMap
}

export default async function EventsPage() {
  const allArticles = await getAllNews()

  // Filter only event-type news posts
  const events = allArticles.filter(article => 
    article.newsMetadata?.newsType?.includes('event')
  )

  // Get event type counts for the filter chips
  const eventTypeCounts = getEventTypeCounts(events)

  // Featured event (first one)
  const featuredEvent = events[0]
  const remainingEvents = events.slice(1)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/events-hero.jpg"
            alt="All Events"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-orange-500/60 z-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in-up">
              All Events
            </h1>
            <p className="text-lg md:text-xl mb-5 animate-fade-in-up animation-delay-200">
              Professional events, workshops, and training programs designed for educators and professionals
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

      {/* Event Type Filter Chips */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Link
            href="/events"
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-purple-600 text-white"
          >
            All Events ({events.length})
          </Link>
          {Array.from(eventTypeCounts.entries()).map(([type, { label, color, count }]) => (
            <Link
              key={type}
              href={`/events/${type}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors text-white ${color}`}
            >
              {label} ({count})
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-8 border-purple-600">
            <div className="md:flex">
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
                {getFeaturedImageUrl(featuredEvent) ? (
                  <Image
                    src={getFeaturedImageUrl(featuredEvent)!}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
                    <CalendarDays className="text-purple-500 text-6xl" />
                  </div>
                )}
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-purple-600 text-sm font-semibold uppercase tracking-wide">
                    Featured Event
                  </span>
                  {featuredEvent.newsMetadata?.eventType && (
                    <span className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${getEventTypeDisplay(featuredEvent.newsMetadata.eventType).color}`}>
                      {getEventTypeDisplay(featuredEvent.newsMetadata.eventType).label}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-3">
                  {featuredEvent.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {cleanExcerpt(featuredEvent.excerpt) || cleanExcerpt(featuredEvent.newsMetadata?.body || '', 150)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {formatDate(featuredEvent.date)}
                  </span>
                  <Link
                    href={`/workshops/${featuredEvent.slug}`}
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

      {/* Events Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            All Events
          </h2>
          <div className="h-1 w-20 bg-orange-500 rounded"></div>
        </div>

        {remainingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingEvents.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">More events coming soon. Stay tuned!</p>
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
            Already attended an event? Verify your certificate instantly.
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