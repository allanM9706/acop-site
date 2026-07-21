import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCourseBySlug, getAllCourseSlugs, formatDate, decodeHtmlEntities } from '@/lib/wordpress';
import type { Metadata } from 'next';
import { Calendar, Clock, Award, BookOpen, Briefcase, GraduationCap, ChevronRight, MapPin, Phone, Mail, Globe, CheckCircle, Users, Target, FolderOpen, Tag, PlayCircle } from 'lucide-react';
import { ShareButtons } from '@/components/ShareButtons';


export const dynamicParams = true; // Enable dynamic routing for new courses added after build time 
// Generate static paths at build time from WordPress
export async function generateStaticParams() {
  const courses = await getAllCourseSlugs();
  return courses.map((course) => ({ slug: course.slug }));
}

// Enable ISR - revalidate every  1 week
export const revalidate = 604800;

// Helper to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  if (url.includes('youtube.com/watch?v=')) {
    const match = url.match(/[?&]v=([^&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  return null;
};

// Helper to clean excerpt
const cleanExcerpt = (text: string | null | undefined, maxLength: number = 160): string => {
  if (!text) return '';
  const decoded = decodeHtmlEntities(text);
  const plainText = decoded.replace(/<[^>]*>/g, '');
  const cleaned = plainText.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength) + '...';
};

// Helper to get course type color
function getCourseTypeColor(courseType: string[]): string {
  const type = courseType[0] || 'course';
  const colors: Record<string, string> = {
    diploma: 'bg-green-100 text-green-800',
    certificate: 'bg-blue-100 text-blue-800',
    'short-course': 'bg-orange-100 text-orange-800',
    professional: 'bg-purple-100 text-purple-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
}

// Helper to get course type display name
function getCourseTypeDisplayName(courseType: string[]): string {
  const type = courseType[0] || 'course';
  const displayNames: Record<string, string> = {
    diploma: 'Diploma',
    certificate: 'Certificate',
    'short-course': 'Short Course',
    professional: 'Professional Development',
  };
  return displayNames[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

// Generate metadata with OG image
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found | Africana College of Professionals',
      description: 'The requested course could not be found.',
    };
  }

  const websiteUrl = 'https://www.acop.co.ke';
  const courseUrl = `${websiteUrl}/courses/${course.slug}`;
  
  let ogImageUrl = `${websiteUrl}/acop2026intake.jpg`;
  
  if (course.featuredImage?.node?.sourceUrl) {
    let imageUrl = course.featuredImage.node.sourceUrl;
    if (imageUrl.startsWith('/')) {
      imageUrl = `https://cms.acop.co.ke${imageUrl}`;
    }
    if (imageUrl.startsWith('http')) {
      ogImageUrl = imageUrl;
    }
  }
  
  const description = course.excerpt 
    ? decodeHtmlEntities(course.excerpt).replace(/<[^>]*>/g, '').substring(0, 160)
    : course.courseDetails?.careerPathways 
      ? decodeHtmlEntities(course.courseDetails.careerPathways).replace(/<[^>]*>/g, '').substring(0, 160)
      : course.title;

  return {
    title: `${course.title} | Africana College of Professionals`,
    description: description,
    openGraph: {
      title: course.title,
      description: description,
      url: courseUrl,
      siteName: 'Africana College of Professionals',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: description,
      images: [ogImageUrl],
    },
    alternates: { canonical: courseUrl },
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const details = course.courseDetails;
  const courseType = details?.courseType || [];
  const courseTypeColor = getCourseTypeColor(courseType);
  const courseTypeName = getCourseTypeDisplayName(courseType);
  const featuredImage = course.featuredImage?.node?.sourceUrl || null;
  const formattedDate = formatDate(course.date);
  const embedUrl = getYouTubeEmbedUrl(details?.videoUrl);
  const intakeMonths = details?.intakeMonths?.join(', ') || 'May, September, January';
  const studyModes = details?.studyMode?.join(', ') || 'Full-time, Part-time, Virtual';
  const cleanedCareerPathways = cleanExcerpt(details?.careerPathways || '', 300);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm group">
              <ChevronRight className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </Link>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-5 ${courseTypeColor}`}>
              {courseTypeName}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              {details?.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{details.duration}</span>
                </div>
              )}
              {details?.fee && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{details.fee}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Updated: {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Buttons - Just below hero (same positioning as courses page) */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <ShareButtons title={course.title} shareText="Share this course" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Left Column */}
            <article className="lg:w-2/3">
              {/* Featured Image */}
              {featuredImage && (
                <div className="mb-8">
                  <div className="relative w-full h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={featuredImage}
                      alt={course.title}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {/* Course Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                  Course Overview
                </h2>
                <div className="prose prose-lg max-w-none prose-p:text-gray-600">
                  <p>{cleanExcerpt(course.excerpt) || 'A comprehensive professional course designed to equip students with industry-relevant skills and knowledge.'}</p>
                </div>
              </div>

              {/* Career Pathways */}
              {details?.careerPathways && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    Career Pathways
                  </h2>
                  <p className="text-gray-700">{cleanedCareerPathways}</p>
                </div>
              )}

              {/* Entry Requirements */}
              {details?.entryRequirements && (
                <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                    Entry Requirements
                  </h2>
                  <div 
                    className="prose prose-sm max-w-none prose-p:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: details.entryRequirements }}
                  />
                </div>
              )}

              {/* Syllabus */}
              {details?.syllabus && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    Course Syllabus
                  </h2>
                  <div 
                    className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-800"
                    dangerouslySetInnerHTML={{ __html: details.syllabus }}
                  />
                </div>
              )}
            </article>

            {/* Right Sidebar */}
            <aside className="lg:w-1/3 space-y-6">
              {/* Video Card */}
              {embedUrl && (
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-orange-500" />
                    Course Introduction
                  </h3>
                  <div className="relative pb-[56.25%] rounded-lg overflow-hidden">
                    <iframe
                      src={embedUrl}
                      title="Course Introduction Video"
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">Watch this video to learn more</p>
                </div>
              )}

              {/* Course Info Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                  Course Information
                </h3>
                <div className="space-y-3">
                  {details?.courseCode && (
                    <div>
                      <p className="text-xs text-gray-400">Course Code</p>
                      <p className="font-medium text-gray-800">{details.courseCode}</p>
                    </div>
                  )}
                  {details?.duration && (
                    <div>
                      <p className="text-xs text-gray-400">Duration</p>
                      <p className="font-medium text-gray-800">{details.duration}</p>
                    </div>
                  )}
                  {details?.fee && (
                    <div>
                      <p className="text-xs text-gray-400">Fee Structure</p>
                      <p className="font-medium text-orange-600">{details.fee}</p>
                    </div>
                  )}
                  {intakeMonths && (
                    <div>
                      <p className="text-xs text-gray-400">Intake Months</p>
                      <p className="font-medium text-gray-800">{intakeMonths}</p>
                    </div>
                  )}
                  {studyModes && (
                    <div>
                      <p className="text-xs text-gray-400">Study Mode</p>
                      <p className="font-medium text-gray-800">{studyModes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              {course.courseCategories?.nodes?.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-orange-500" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.courseCategories.nodes.map((cat) => (
                      <Link key={cat.slug} href={`/courses?category=${cat.slug}`} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-orange-100 hover:text-orange-600 transition-colors">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {course.courseTags?.nodes?.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-orange-500" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.courseTags.nodes.map((tag) => (
                      <Link key={tag.slug} href={`/courses/tag/${tag.slug}`} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm hover:bg-orange-100 hover:text-orange-600 transition-colors">
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply Now */}
              <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-3">Ready to Enroll?</h3>
                <p className="text-white/80 text-sm mb-4">Take the first step towards your professional career</p>
                <Link href="/get-started" className="inline-block bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full">
                  Apply Now
                </Link>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <Link href="/contact" className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>info@acop.co.ke</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+254756234165</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors">
                    <MapPin className="w-4 h-4" />
                    <span>Kyanjau House, Thika, Kenya</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}