/* eslint-disable @typescript-eslint/no-explicit-any */
// app/courses/tag/[tag]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCourses, formatDate, getCourseTypeDisplayName, decodeHtmlEntities } from '@/lib/wordpress';
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

// Generate static params for all course tags
export async function generateStaticParams() {
  const allCourses = await getAllCourses();
  const tagsSet = new Set<string>();
  
  allCourses.forEach((course: any) => {
    if (course.courseTags?.nodes) {
      course.courseTags.nodes.forEach((tag: any) => {
        tagsSet.add(tag.slug);
      });
    }
  });
  
  return Array.from(tagsSet).map((tag) => ({ tag }));
}

export default async function CourseTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const allCourses = await getAllCourses();
  
  // Filter courses that have the matching tag
  const filteredCourses = allCourses.filter((course: any) => 
    course.courseTags?.nodes?.some((tagNode: any) => tagNode.slug === tag)
  );
  
  if (filteredCourses.length === 0) {
    notFound();
  }
  
  // Get the tag name from the first course for display
  const tagName = filteredCourses[0]?.courseTags?.nodes?.find((t: any) => t.slug === tag)?.name || tag;
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Courses Tagged: #{tagName}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} with this tag
          </p>
        </div>
      </section>
      
      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: any) => {
            const featuredImage = course.featuredImage?.node?.sourceUrl || null;
            const courseType = getCourseTypeDisplayName(course.courseDetails?.courseType || []);
            const excerpt = cleanExcerpt(course.excerpt) || cleanExcerpt(course.courseDetails?.careerPathways, 120) || 'Professional course designed for career success';
            
            return (
              <article key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                {featuredImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={featuredImage}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-orange-600 uppercase">{courseType}</span>
                    <span className="text-xs text-gray-400">{formatDate(course.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    <Link href={`/courses/${course.slug}`} className="hover:text-orange-600 transition-colors">
                      {course.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{excerpt}</p>
                  <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-orange-600 font-semibold text-sm hover:text-purple-700 transition-colors">
                    View Course <ChevronRight className="w-4 h-4 ml-1" />
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