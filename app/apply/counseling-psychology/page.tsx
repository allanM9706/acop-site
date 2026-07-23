/* eslint-disable react/no-unescaped-entities */

import { Calendar, CheckCircle, Clock, Award, GraduationCap, MessageCircle, Phone, Mail, MapPin, Users, Star, BookOpen, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CounselingPsychologyForm } from "@/components/CounselingPsychologyForm";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Apply for Diploma in Counseling Psychology | September 2026 Intake | Africana College",
  description: "Apply now for the Diploma in Counseling Psychology at Africana College of Professionals. September 2026 intake. Start your purpose-driven career in counseling and psychology.",
  keywords: [
    "counseling psychology diploma",
    "apply counseling psychology",
    "psychology courses Kenya",
    "counseling courses Kenya",
    "Africana College psychology",
    "September 2026 intake counseling",
    "diploma in counseling",
    "mental health courses Kenya",
  ].join(", "),
  robots: "index, follow",
  alternates: {
    canonical: "https://www.acop.co.ke/apply/counseling-psychology",
  },
  openGraph: {
    title: "Apply for Diploma in Counseling Psychology | Africana College",
    description: "Start your career in mental health and counseling. Apply for the Diploma in Counseling Psychology at Africana College. September 2026 intake now open.",
    url: "https://www.acop.co.ke/apply/counseling-psychology",
    siteName: "Africana College of Professionals",
    type: "website",
    images: [
      {
        url: "https://cms.acop.co.ke/wp-content/uploads/2026/04/pexels-shkrabaanthony-7579115-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Diploma in Counseling Psychology - Africana College",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Diploma in Counseling Psychology | Africana College",
    description: "September 2026 intake. Apply now for the Diploma in Counseling Psychology at Africana College.",
    images: ["https://cms.acop.co.ke/wp-content/uploads/2026/04/pexels-shkrabaanthony-7579115-scaled.jpg"],
  },
};

export default function CounselingPsychologyApplyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cms.acop.co.ke/wp-content/uploads/2026/04/pexels-shkrabaanthony-7579115-scaled.jpg"
            alt="Diploma in Counseling Psychology - Africana College"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-orange-500/60 z-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              September 2026 Intake
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Apply for Diploma in Counseling Psychology
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Start your purpose-driven career in mental health and counseling
            </p>
          </div>
        </div>
      </section>

      {/* Course Overview Bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Duration: <strong className="text-gray-800">2 Years</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-500" />
              <span>Credential: <strong className="text-gray-800">Diploma</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" />
              <span>Mode: <strong className="text-gray-800">Virtual & Physical</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Intake: <strong className="text-gray-800">September 2026</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Application Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-purple-700 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Apply for Diploma in Counseling Psychology
                </h2>
                <p className="text-white/80 text-sm">
                  Complete the form below to apply for the September 2026 intake
                </p>
              </div>
              <div className="p-6">
                <CounselingPsychologyForm />
              </div>
            </div>
          </div>

          {/* Right Column - Course Information */}
          <div className="lg:w-1/3 space-y-6">
            {/* Why This Course */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                Why Study Counseling Psychology?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Growing demand for mental health professionals</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Make a meaningful impact on people's lives</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Multiple career paths: private practice, schools, hospitals, NGOs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Practical skills combined with theoretical knowledge</span>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
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

            {/* Other Courses */}
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl p-6 border border-orange-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                Explore Other Courses
              </h3>
              <div className="space-y-2">
                <Link href="/courses" className="block text-sm text-gray-700 hover:text-orange-600 transition-colors">
                  • View All Programs
                </Link>
                <Link href="/get-started" className="block text-sm text-gray-700 hover:text-orange-600 transition-colors">
                  • September 2026 Intake
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 p-8 bg-gradient-to-r from-orange-600 to-purple-700 rounded-2xl text-center text-white shadow-xl mx-4">
        <h3 className="text-2xl font-bold mb-3">Ready to Start Your Journey?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Join Africana College of Professionals and become a qualified counseling psychologist
        </p>
        <Link href="/get-started" className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          View All Programs
        </Link>
      </div>
    </main>
  );
}