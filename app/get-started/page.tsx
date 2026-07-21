// app/get-started/page.tsx
import { StudentConversionForm } from "@/components/StudentConversionForm";
import { getAllCourses, getCourseTypeDisplayName, Course, decodeHtmlEntities } from "@/lib/wordpress";
import { Calendar, Clock, Award, BookOpen, Users, MessageCircle, Mail, Phone, MapPin, CheckCircle, GraduationCap, Sparkles, Target, Briefcase, Heart, TrendingUp, Eye, Share2, Facebook, Twitter, Linkedin, LinkIcon, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShareButtons } from "@/components/ShareButtons";

export const revalidate = 604800; // 1 week

export const metadata: Metadata = {
  title: "September 2026 Intake | Apply Now | Africana College of Professionals",
  description: "Join the September 2026 intake at Africana College of Professionals. Start your purpose-driven journey with our accredited programs. Apply now for diploma, certificate, and professional courses.",
  keywords: [
    "September 2026 intake",
    "college application Kenya",
    "Africana College enrollment",
    "purpose-driven education",
    "professional courses Kenya",
    "diploma programs 2026",
    "certificate courses Kenya",
    "start your journey",
    "college admissions 2026",
    "TVET accredited college",
  ].join(", "),
  robots: "index, follow",
  alternates: {
    canonical: "https://www.acop.co.ke/Septemberintake2026",
  },
  openGraph: {
    title: "September 2026 Intake | Apply to Africana College of Professionals",
    description: "Start your purpose-driven journey with Africana College. September 2026 intake now open. Apply today for diploma, certificate, and professional courses.",
    url: "https://www.acop.co.ke/get-started",
    siteName: "Africana College of Professionals",
    type: "website",
    images: [
      {
        url: "https://www.acop.co.ke/Septemberintake2026.webp",
        width: 1200,
        height: 630,
        alt: "September 2026 Intake - Africana College of Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "September 2026 Intake | Africana College of Professionals",
    description: "Join the September 2026 intake. Start your purpose-driven journey with Africana College.",
    images: ["https://www.acop.co.ke/Septemberintake2026.webp"],
  },
};

// Helper to clean excerpt
const cleanExcerpt = (text: string | null | undefined, maxLength: number = 100): string => {
  if (!text) return '';
  const decoded = decodeHtmlEntities(text);
  const plainText = decoded.replace(/<[^>]*>/g, '');
  const cleaned = plainText.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength) + '...';
};

export default async function GetStartedPage() {
  const allCourses = await getAllCourses();
  
  // Get diploma courses (first 4)
  const diplomaCourses = allCourses
    .filter(course => course.courseDetails?.courseType?.includes('diploma'))
    .slice(0, 4);
  
  // Get certificate courses (first 4)
  const certificateCourses = allCourses
    .filter(course => course.courseDetails?.courseType?.includes('certificate'))
    .slice(0, 4);
  
  // Get popular short courses
  const shortCourses = allCourses
    .filter(course => course.courseDetails?.courseType?.includes('short-course'))
    .slice(0, 4);

  // Get featured course for testimonial
  const featuredCourse = allCourses[0];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Background Image and Animations */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Septemberintake2026.webp"
            alt="September 2026 Intake - Africana College of Professionals"
            fill
            priority
            className="object-cover object-top"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-orange-500/60 z-10"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in-up">
              September 2026 Intake Now Open
            </h1>
            <p className="text-lg md:text-xl mb-3 animate-fade-in-up animation-delay-200">
              Start Your Purpose-Driven Journey at Africana College of Professionals
            </p>
            <p className="text-sm text-white/80 animate-fade-in-up animation-delay-400">
              Fill out the form below to receive course information, fee structure, and admission updates
            </p>
          </div>
        </div>
      </section>

      {/* Share Buttons - Just below hero (consistent with other pages) */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <ShareButtons title="September 2026 Intake - Africana College of Professionals" shareText="Share this page" />
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Form with Intake Banner */}
          <div className="lg:w-2/3 space-y-6">
            
            {/* September Intake Card with Image - Using Brand Colors */}
            <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row">
                {/* Image Side */}
                <div className="md:w-2/5 relative min-h-[200px] md:min-h-full">
                  <Image
                    src="/Septemberintake2026.webp"
                    alt="September 2026 Intake - Apply Now at Africana College"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 to-purple-900/40 md:hidden"></div>
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Limited Seats
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="md:w-3/5 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-orange-200" />
                    <h3 className="font-bold text-lg">September 2026 Intake</h3>
                  </div>
                  <p className="text-2xl font-bold mb-1">Applications Now Open!</p>
                  <p className="text-orange-100 text-sm mb-4">Start your purpose-driven journey today</p>
                  
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <Clock className="w-4 h-4" />
                      <span>Application Deadline: August 31, 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <CheckCircle className="w-4 h-4" />
                      <span>Early bird discounts available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <CheckCircle className="w-4 h-4" />
                      <span>Flexible payment plans available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <CheckCircle className="w-4 h-4" />
                      <span>Accredited diploma & certificate programs</span>
                    </div>
                  </div>
                  
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all group"
                  >
                    Our Courses
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form with ID for scrolling */}
            <div id="application-form" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden scroll-mt-20">
              <div className="bg-gradient-to-r from-orange-600 to-purple-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Start Your Application</h2>
                <p className="text-white/80 text-sm">Fill out the form below to get started</p>
              </div>
              <div className="p-6">
                <StudentConversionForm />
              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Sidebar from WordPress (NO ShareButtons here anymore) */}
          <aside className="lg:w-1/3 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                Quick Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-orange-600" />
                  </div>
                  <a href="tel:+254756234165" className="hover:text-orange-600 transition-colors">
                    +254 756 234 165
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <a href="mailto:info@acop.co.ke" className="hover:text-orange-600 transition-colors">
                    info@acop.co.ke
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <span>Kyanjau House, 4th Floor, Thika, Kenya</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us Card */}
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl p-6 border border-orange-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Why Choose Africana College?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">TVET-accredited institution</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Purpose-driven education & mentorship</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Flexible learning (Virtual & Physical)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Experienced lecturers & mentors</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Internship & job placement support</span>
                </div>
              </div>
            </div>

            {/* Diploma Programs Card - Clickable */}
            {diplomaCourses.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  Diploma Programs
                </h3>
                <div className="space-y-3">
                  {diplomaCourses.map((course) => (
                    <Link 
                      key={course.id} 
                      href={`/courses/${course.slug}`}
                      className="block group hover:bg-orange-50 p-2 -mx-2 rounded-lg transition-all duration-200"
                    >
                      <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                        {course.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {course.courseDetails?.duration || 'Contact us'} • {course.courseDetails?.studyMode?.join(', ') || 'Flexible'}
                      </p>
                    </Link>
                  ))}
                  <Link href="/courses" className="inline-flex items-center text-orange-600 text-sm font-medium mt-3 hover:text-purple-700 transition-colors">
                    View All Diploma Courses →
                  </Link>
                </div>
              </div>
            )}

            {/* Certificate Programs Card - Clickable */}
            {certificateCourses.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Certificate Programs
                </h3>
                <div className="space-y-3">
                  {certificateCourses.map((course) => (
                    <Link 
                      key={course.id} 
                      href={`/courses/${course.slug}`}
                      className="block group hover:bg-orange-50 p-2 -mx-2 rounded-lg transition-all duration-200"
                    >
                      <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                        {course.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {course.courseDetails?.duration || 'Contact us'} • Hands-on training
                      </p>
                    </Link>
                  ))}
                  <Link href="/courses" className="inline-flex items-center text-orange-600 text-sm font-medium mt-3 hover:text-purple-700 transition-colors">
                    View All Certificate Courses →
                  </Link>
                </div>
              </div>
            )}

            {/* Short Courses Card - Clickable */}
            {shortCourses.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  Short Courses
                </h3>
                <div className="space-y-3">
                  {shortCourses.map((course) => (
                    <Link 
                      key={course.id} 
                      href={`/courses/${course.slug}`}
                      className="block group hover:bg-orange-50 p-2 -mx-2 rounded-lg transition-all duration-200"
                    >
                      <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                        {course.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {course.courseDetails?.duration || 'Flexible duration'} • Certificate awarded
                      </p>
                    </Link>
                  ))}
                  <Link href="/courses" className="inline-flex items-center text-orange-600 text-sm font-medium mt-3 hover:text-purple-700 transition-colors">
                    View All Short Courses →
                  </Link>
                </div>
              </div>
            )}

            {/* Testimonial Card */}
            {featuredCourse && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Student Testimonials
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <p className="text-sm text-gray-600 italic">
                      &quot;The {cleanExcerpt(featuredCourse.title, 50)} program gave me the skills and confidence to excel in my career. The lecturers were very supportive and the purpose-driven approach made all the difference.&quot;
                    </p>
                    <p className="text-xs font-semibold text-gray-800 mt-2">— Successful Graduate, Class of 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 italic">
                      &quot;Flexible learning allowed me to work while studying. I highly recommend Africana College for quality, purpose-driven education that prepares you for the real world.&quot;
                    </p>
                    <p className="text-xs font-semibold text-gray-800 mt-2">— Working Professional, Current Student</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats Card */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Courses</span>
                  <span className="font-semibold text-gray-800">{allCourses.length}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Qualified Instructors</span>
                  <span className="font-semibold text-gray-800">15+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Successful Graduates</span>
                  <span className="font-semibold text-gray-800">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Years of Excellence</span>
                  <span className="font-semibold text-gray-800">10+</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="text-center pt-4">
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  TVET Accredited
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Industry Recognized
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Quality Assurance
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-12 p-8 bg-gradient-to-r from-orange-600 to-purple-700 rounded-2xl text-center text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-3">Start Your Purpose-Driven Journey Today</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Join Africana College of Professionals for the September 2026 intake and take the first step towards a rewarding career
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#application-form" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </a>
          <Link href="/courses" className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Our Courses
          </Link>
        </div>
      </div>
    </main>
  );
}