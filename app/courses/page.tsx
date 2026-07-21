import { getAllCourses } from '@/lib/wordpress';
import { CoursesGridWrapper } from '@/components/courses/CoursesGridWrapper';
import { FeaturedCoursesWrapper } from '@/components/courses/FeaturedCoursesWrapper';
import { WhyChoose } from '@/components/courses/WhyChooseUs';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarFilter } from '@/components/SidebarFilter';
import { ShareButtons } from '@/components/ShareButtons';

export const revalidate = 604800; // 1 week

export const metadata: Metadata = {
  title: "Professional Courses in Kenya | Africana College of Professionals",
  description:
    "Explore diploma, certificate, and short courses at Africana College of Professionals. Join now to develop professional skills, earn certifications, and grow your career.",
  keywords: [
    "Africana College",
    "professional courses",
    "diploma courses Kenya",
    "certificate courses Kenya",
    "short courses",
    "career development",
    "online learning",
  ].join(", "),
  robots: "index, follow",
  alternates: {
    canonical: "https://www.acop.co.ke/courses",
  },
  openGraph: {
    title: "Professional Courses at Africana College of Professionals",
    description:
      "Join Africana College of Professionals to access top-tier diploma, certificate, and short courses for career advancement in Kenya.",
    url: "https://www.acop.co.ke/courses",
    siteName: "Africana College of Professionals",
    type: "website",
    images: [
      {
        url: "https://www.acop.co.ke/courses.png",
        width: 1200,
        height: 630,
        alt: "Africana College Courses",
      },
    ],
  },
};

export default async function CoursesPage() {
  const allCourses = await getAllCourses();

  // Get course levels (Diploma, Certificate, Short Course)
  const courseLevels = [
    { id: 'diploma', label: 'Diploma', count: allCourses.filter(c => c.courseDetails?.courseType?.includes('diploma')).length },
    { id: 'certificate', label: 'Certificate', count: allCourses.filter(c => c.courseDetails?.courseType?.includes('certificate')).length },
    { id: 'short-course', label: 'Short Course', count: allCourses.filter(c => c.courseDetails?.courseType?.includes('short-course')).length },
  ];

  // Create JSON-LD structured data for all courses
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Africana College Courses",
    itemListElement: allCourses.map((course, index) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      description: course.excerpt || course.courseDetails?.careerPathways?.substring(0, 200),
      provider: {
        "@type": "Organization",
        name: "Africana College of Professionals",
        sameAs: "https://www.acop.co.ke",
      },
    })),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-white">
        <main>
          {/* Hero Section with Background Image and Animations */}
          <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/courses.png"
                alt="Africana College Courses"
                fill
                priority
                unoptimized
                className="object-cover object-top scale-105 transition-transform duration-700 group-hover:scale-100"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-orange-500/60 z-10"></div>
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 relative z-20">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                  Our Courses
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-200">
                  Explore our accredited diploma, certificate, and professional development programs designed for your career success
                </p>
                <div className="animate-fade-in-up animation-delay-400">
                  <a
                    href="https://form.jotform.com/253171134791556"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg inline-block"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Share Buttons - Just below hero */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
              <ShareButtons title="Professional Courses at Africana College" shareText='Share this page'/>
            </div>
          </div>
          
          {/* Two Column Layout */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Sidebar Filter - Desktop */}
              <div className="lg:w-1/4">
                <SidebarFilter 
                  courseLevels={courseLevels}
                />
              </div>

              {/* Courses Grid */}
              <div className="lg:w-3/4">
                <CoursesGridWrapper 
                  allCourses={allCourses} 
                  activeCategory="all"
                />
              </div>
            </div>
          </div>
          
          <FeaturedCoursesWrapper />
          <WhyChoose />

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-purple-700 to-orange-600 text-white py-16 mt-8">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
                Take the first step towards a rewarding career. Apply for May 2026 intake today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://form.jotform.com/253171134791556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </a>
                <Link
                  href="/request-info"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}