import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getNewsBySlug, getAllNews, formatDate, decodeHtmlEntities, formatEventDateRange } from '@/lib/wordpress'
import type { Metadata } from 'next'
import { 
  Calendar, MapPin, Link as LinkIcon, AlertTriangle, Download, ChevronRight, Clock, 
  Eye, MessageCircle, TrendingUp, Mail, Phone, Map, Award, Sparkles, FolderOpen, 
  FileText, Tag, Twitter, Facebook, Linkedin, Instagram, Youtube, Globe, User,
  ShieldCheck, ArrowRight, LogIn, CalendarCheck
} from 'lucide-react'
import { ShareButtons } from '@/components/ShareButtons'

// TikTok icon component
const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// X (Twitter) icon component
const XIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const dynamicParams = true
export const revalidate = 2592000 // 1 month

// Generate static paths at build time
export async function generateStaticParams() {
  const articles = await getAllNews()
  return articles
    .filter(article => article.newsMetadata?.newsType?.includes('event'))
    .map((article) => ({ slug: article.slug }))
}

// Helper to get category display name
function getCategoryDisplayName(categories: { name: string; slug: string }[] | undefined): string {
  if (!categories || categories.length === 0) return 'Workshop'
  const categoryName = categories[0].name
  const displayNames: Record<string, string> = {
    admissions: 'Admissions',
    events: 'Workshop',
    blog: 'Blog',
    news: 'News',
  }
  return displayNames[categoryName.toLowerCase()] || categoryName
}

// Helper to get category badge color
function getCategoryColor(categories: { name: string; slug: string }[] | undefined): string {
  if (!categories || categories.length === 0) return 'bg-purple-600'
  const categorySlug = categories[0].slug.toLowerCase()
  const colors: Record<string, string> = {
    admissions: 'bg-green-600',
    events: 'bg-purple-600',
    blog: 'bg-blue-600',
    news: 'bg-orange-600',
  }
  return colors[categorySlug] || 'bg-purple-600'
}

// Helper to get event type display
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

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article || !article.newsMetadata?.newsType?.includes('event')) {
    return {
      title: 'Workshop Not Found | Africana College of Professionals',
      description: 'The requested workshop could not be found.',
    }
  }

  const websiteUrl = 'https://www.acop.co.ke'
  const articleUrl = `${websiteUrl}/workshops/${article.slug}`
  
  let ogImageUrl = `${websiteUrl}/acoplogo.jpg`
  
  if (article.featuredImage?.node?.sourceUrl) {
    ogImageUrl = article.featuredImage.node.sourceUrl
    if (ogImageUrl.startsWith('/')) {
      ogImageUrl = `https://cms.acop.co.ke${ogImageUrl}`
    }
  }
  
  const description = article.excerpt 
    ? decodeHtmlEntities(article.excerpt).replace(/<[^>]*>/g, '').substring(0, 160)
    : article.newsMetadata?.body 
      ? decodeHtmlEntities(article.newsMetadata.body).replace(/<[^>]*>/g, '').substring(0, 160)
      : article.title

  const eventType = article.newsMetadata?.eventType || 'workshop'
  const eventTypeDisplay = getEventTypeDisplay(eventType)

  return {
    title: `${article.title} | ${eventTypeDisplay.label} | Africana College of Professionals`,
    description: description,
    openGraph: {
      title: `${article.title} | ${eventTypeDisplay.label} | Africana College of Professionals`,
      description: description,
      url: articleUrl,
      siteName: 'Africana College of Professionals',
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | ${eventTypeDisplay.label} | Africana College of Professionals`,
      description: description,
      images: [ogImageUrl],
    },
    alternates: { canonical: articleUrl },
  }
}

// Get related workshops (by WordPress category)
async function getRelatedWorkshops(currentSlug: string, currentCategories: { slug: string }[] | undefined) {
  const allNews = await getAllNews()
  const currentCategorySlug = currentCategories?.[0]?.slug
  
  if (!currentCategorySlug) return []
  
  return allNews
    .filter(article => 
      article.slug !== currentSlug && 
      article.newsMetadata?.newsType?.includes('event') &&
      article.newsCategories?.nodes?.some(cat => cat.slug === currentCategorySlug)
    )
    .slice(0, 3)
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article || !article.newsMetadata?.newsType?.includes('event')) {
    notFound()
  }

  const metadata = article.newsMetadata
  const isEvent = true
  const isAlert = metadata?.newsType?.[0] === 'alert'
  const isDeadline = metadata?.newsType?.[0] === 'deadline'
  const isAdmissions = metadata?.newsType?.[0] === 'admissions'
  
  const categoryName = getCategoryDisplayName(article.newsCategories?.nodes)
  const categoryColor = getCategoryColor(article.newsCategories?.nodes)
  
  const formattedDate = formatDate(article.date)
  const decodedBody = decodeHtmlEntities(metadata?.body || '')
  
  const readingTime = Math.ceil(decodedBody.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)
  const wordCount = decodedBody.replace(/<[^>]*>/g, '').split(/\s+/).length
  
  const relatedWorkshops = await getRelatedWorkshops(slug, article.newsCategories?.nodes)

  const eventType = metadata?.eventType || 'workshop'
  const eventTypeDisplay = getEventTypeDisplay(eventType)

  // Get the access slug for the workshop link
  const accessSlug = article.slug

  // Get the registration link from eventLink or use default
  const registrationLink = metadata?.eventLink || '#'

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/workshops" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm group">
              <ChevronRight className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Workshops
            </Link>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-5 text-white ${eventTypeDisplay.color}`}>
              {eventTypeDisplay.label}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <ShareButtons 
            title={article.title} 
            shareText="Share this workshop"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Left Column */}
            <article className="lg:w-2/3">
              <div className="bg-white rounded-2xl">
                {/* Alert Banner */}
                {isAlert && metadata?.severityLevel && (
                  <div className={`mb-8 p-5 rounded-xl border-l-4 ${
                    metadata.severityLevel === 'critical' ? 'bg-red-50 border-red-500 text-red-800' : 'bg-yellow-50 border-yellow-500 text-yellow-800'
                  } flex items-start gap-3`}>
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold">Important Announcement</h3>
                      <p className="text-sm">Please read this carefully for important information.</p>
                    </div>
                  </div>
                )}

                {/* Featured Image */}
                {article.featuredImage?.node?.sourceUrl && (
                  <div className="mb-10">
                    <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={article.featuredImage.node.sourceUrl}
                        alt={article.featuredImage.node.altText || article.title}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-3 italic">
                      {article.featuredImage.node.altText || article.title}
                    </p>
                  </div>
                )}

                {/* Event Details Card */}
                {isEvent && (metadata?.eventDate || metadata?.eventVenue || metadata?.eventLink) && (
                  <div className="bg-purple-50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-700">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      Workshop Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {metadata?.eventDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>
                            {formatEventDateRange(metadata.eventDate, metadata.eventenddate || null)}
                          </span>
                        </div>
                      )}
                      {metadata?.eventTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>{metadata.eventTime}</span>
                        </div>
                      )}
                      {metadata?.eventVenue && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>{metadata.eventVenue}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons - Below Event Details (Visible on ALL devices) */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-purple-200">
                      <Link
                        href={`/access-workshop/${accessSlug}`}
                        className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm"
                      >
                        <LogIn className="w-4 h-4" />
                        Access Workshop
                      </Link>
                      <a
                        href={registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Register Workshop
                      </a>
                    </div>
                  </div>
                )}

                {/* Deadline Banner */}
                {isDeadline && (metadata?.deadlineDate || metadata?.submissionLink) && (
                  <div className="bg-orange-50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-orange-700">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      Application Deadline
                    </h3>
                    {metadata?.deadlineDate && <p className="text-2xl font-bold text-orange-600 mb-3">{metadata.deadlineDate}</p>}
                    {metadata?.submissionLink && (
                      <a href="/get-started" className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">Apply Now →</a>
                    )}
                  </div>
                )}

                {/* Admissions Banner */}
                {isAdmissions && (
                  <div className="bg-green-50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-green-700">
                      <Award className="w-5 h-5 text-green-600" />
                      {metadata?.intakeSemester || 'Admissions Open'}
                    </h3>
                    <p className="text-gray-600 mb-3">Take the first step towards your professional career</p>
                    {metadata?.masomoPortalLink && (
                      <a href={metadata.masomoPortalLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">Apply via Portal →</a>
                    )}
                  </div>
                )}

                {/* Main Content */}
                <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-orange-600 prose-ul:text-gray-600 prose-ul:list-disc prose-ul:pl-5 prose-strong:text-gray-800 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:italic prose-img:rounded-xl prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: decodedBody }}
                />
              </div>
            </article>

            {/* Right Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block lg:w-1/3 space-y-6">
              {/* Attachment Card */}
              {metadata?.attachment?.node?.mediaItemUrl && (
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">Download Resource</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Download the attached document for more information about this workshop.
                  </p>
                  <a
                    href={metadata.attachment.node.mediaItemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    <Download className="w-4 h-4" />
                    {metadata.attachment.node.title || 'Download Attachment'}
                  </a>
                </div>
              )}

              {/* Tags Section */}
              {article.newsTags?.nodes?.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-purple-500" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.newsTags.nodes.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/workshops/tag/${tag.slug}`}
                        className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm hover:bg-purple-100 hover:text-purple-600 transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Section */}
              {article.newsCategories?.nodes?.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-purple-500" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.newsCategories.nodes.map((cat) => (
                      <Link key={cat.slug} href={`/workshops?category=${cat.slug}`} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-purple-100 hover:text-purple-600 transition-colors">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Stats Card */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Reading Time</span>
                    <span className="font-semibold text-gray-800">{readingTime} minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Word Count</span>
                    <span className="font-semibold text-gray-800">{wordCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Category</span>
                    <span className="font-semibold text-purple-600">{categoryName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Last Updated</span>
                    <span className="font-semibold text-gray-800">{formattedDate}</span>
                  </div>
                </div>
              </div>

              {/* Access Workshop - Sidebar CTA */}
              <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-xl p-6 text-white text-center">
                <LogIn className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold mb-2">Access Workshop</h3>
                <p className="text-white/80 text-sm mb-4">Join the live workshop session</p>
                <Link
                  href={`/workshop/${accessSlug}`}
                  className="inline-block bg-white text-purple-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full"
                >
                  Access Now
                </Link>
              </div>

              {/* Register Workshop - Sidebar CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white text-center">
                <CalendarCheck className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold mb-2">Register Workshop</h3>
                <p className="text-white/80 text-sm mb-4">Secure your spot for this workshop</p>
                <a
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-green-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full"
                >
                  Register Now
                </a>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  Need More Info?
                </h3>
                <div className="space-y-3">
                  <Link href="/contact" className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Mail className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Email Us</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Phone className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Call Us</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Map className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Visit Campus</span>
                  </Link>
                </div>
              </div>

              {/* Related Workshops */}
              {relatedWorkshops.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-500" />
                    Related Workshops
                  </h3>
                  <div className="space-y-4">
                    {relatedWorkshops.map((related) => (
                      <Link key={related.id} href={`/workshops/${related.slug}`} className="group flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-300">
                        {related.featuredImage?.node?.sourceUrl && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={related.featuredImage.node.sourceUrl} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 text-sm">{related.title}</h4>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(related.date)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/workshops" className="inline-flex items-center text-purple-600 text-sm font-medium mt-4 hover:text-orange-600 transition-colors">
                    Browse All Workshops
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-white/80 text-sm mb-4">Get the latest updates and news directly in your inbox.</p>
                <div className="flex flex-col gap-2">
                  <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white" />
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">Subscribe</button>
                </div>
                <p className="text-white/60 text-xs mt-3">No spam, unsubscribe anytime.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}