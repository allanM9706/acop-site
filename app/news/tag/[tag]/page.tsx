/* eslint-disable @typescript-eslint/no-explicit-any */
// app/news/tag/[tag]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllNews, formatDate, getNewsTypeDisplayName, decodeHtmlEntities } from '@/lib/wordpress';
import { ChevronRight } from 'lucide-react';

// Enable ISR - revalidate every 1 week
export const revalidate = 604800;

// Helper to clean excerpt (strip HTML tags and decode entities)
const cleanExcerpt = (text: string | null | undefined, maxLength: number = 120): string => {
  if (!text) return '';
  const decoded = decodeHtmlEntities(text);
  const plainText = decoded.replace(/<[^>]*>/g, '');
  const cleaned = plainText.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength) + '...';
};

// Generate static params for all tags to make them static at build time
export async function generateStaticParams() {
  const allNews = await getAllNews();
  const tagsSet = new Set<string>();
  
  allNews.forEach((article: any) => {
    if (article.newsTags?.nodes) {
      article.newsTags.nodes.forEach((tag: any) => {
        tagsSet.add(tag.slug);
      });
    }
  });
  
  return Array.from(tagsSet).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const allNews = await getAllNews();
  
  // Filter articles that have the matching tag
  const filteredArticles = allNews.filter((article: any) => 
    article.newsTags?.nodes?.some((tagNode: any) => tagNode.slug === tag)
  );
  
  if (filteredArticles.length === 0) {
    notFound();
  }
  
  // Get the tag name from the first article for display
  const tagName = filteredArticles[0]?.newsTags?.nodes?.find((t: any) => t.slug === tag)?.name || tag;
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Articles Tagged: #{tagName}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} with this tag
          </p>
        </div>
      </section>
      
      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article: any) => {
            // Use built-in WordPress fields (not ACF)
            const featuredImage = article.featuredImage?.node?.sourceUrl || null;
            const newsType = getNewsTypeDisplayName(article.newsMetadata?.newsType || []);
            
            // Use built-in excerpt or clean from body
            const excerpt = article.excerpt 
              ? cleanExcerpt(article.excerpt, 120)
              : cleanExcerpt(article.newsMetadata?.body || '', 120);
            
            return (
              <article key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                {featuredImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-orange-600 uppercase">{newsType}</span>
                    <span className="text-xs text-gray-400">{formatDate(article.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    <Link href={`/news/${article.slug}`} className="hover:text-orange-600 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{excerpt}</p>
                  <Link href={`/news/${article.slug}`} className="inline-flex items-center text-orange-600 font-semibold text-sm hover:text-purple-700 transition-colors">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}