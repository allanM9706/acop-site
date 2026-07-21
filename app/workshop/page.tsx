import { notFound } from 'next/navigation';
import WorkshopWrapper from '@/components/workshop/WorkshopWrapper';
import type { Metadata } from 'next';

interface WorkshopPageProps {
  searchParams?: Promise<{
    title?: string;
    date?: string;
    time?: string;
    facilitator?: string;
    coordinator?: string;
  }>;
}

// Default workshop details - easily updateable
const DEFAULT_WORKSHOP = {
  title: "Teachers' Mindful Self-Compassion Online Workshop",
  date: '20th - 22nd July 2026',
  time: '6:00 p.m. - 8:00 p.m. (EAT)',
  facilitator: 'Dr. Susan Gitau',
  coordinator: 'Alice Songok',
};

export async function generateMetadata({
  searchParams,
}: WorkshopPageProps): Promise<Metadata> {
  const params = await searchParams;

  const workshopTitle = params?.title || DEFAULT_WORKSHOP.title;
  const workshopDate = params?.date || DEFAULT_WORKSHOP.date;
  const facilitator = params?.facilitator || DEFAULT_WORKSHOP.facilitator;

  const websiteUrl = 'https://www.acop.co.ke';
  const pageUrl = `${websiteUrl}/workshop`;
  const ogImageUrl = `${websiteUrl}/workshop.webp`;

  return {
    title: `${workshopTitle} | Workshop Access | Africana College of Professionals`,
    description: `Access the ${workshopTitle} workshop session. Join us on ${workshopDate} with facilitator ${facilitator}.`,
    keywords: [
      'workshop access',
      'online workshop',
      'mindful self-compassion',
      'teacher wellness',
      'Africana College',
      'professional development',
      workshopTitle,
    ].join(', '),
    robots: 'index, follow',
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${workshopTitle} | Africana College of Professionals`,
      description: `Access your workshop session. ${workshopTitle} with facilitator ${facilitator} on ${workshopDate}.`,
      url: pageUrl,
      siteName: 'Africana College of Professionals',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${workshopTitle} - Workshop Access`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${workshopTitle} | Africana College of Professionals`,
      description: `Access your workshop session. ${workshopTitle} with facilitator ${facilitator} on ${workshopDate}.`,
      images: [ogImageUrl],
      site: '@acop_kenya',
      creator: '@acop_kenya',
    },
  };
}

export default async function WorkshopPage({ searchParams }: WorkshopPageProps) {
  const params = await searchParams;

  const meetingLink = process.env.WORKSHOP_LINK || '';

  // Use URL params or fallback to defaults
  const workshopTitle = params?.title || DEFAULT_WORKSHOP.title;
  const workshopDate = params?.date || DEFAULT_WORKSHOP.date;
  const workshopTime = params?.time || DEFAULT_WORKSHOP.time;
  const facilitator = params?.facilitator || DEFAULT_WORKSHOP.facilitator;
  const coordinator = params?.coordinator || DEFAULT_WORKSHOP.coordinator;

  if (!meetingLink) {
    return notFound();
  }

  // JSON-LD structured data for the workshop
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalEvent',
    name: workshopTitle,
    description: `Access the ${workshopTitle} workshop session for registered participants.`,
    startDate: workshopDate,
    organizer: {
      '@type': 'CollegeOrUniversity',
      name: 'Africana College of Professionals',
      url: 'https://www.acop.co.ke',
    },
    facilitator: {
      '@type': 'Person',
      name: facilitator,
    },
    location: {
      '@type': 'VirtualLocation',
      url: meetingLink,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="min-h-screen">
        <WorkshopWrapper
          meetingLink={meetingLink}
          workshopTitle={workshopTitle}
          workshopDate={workshopDate}
          workshopTime={workshopTime}
          facilitator={facilitator}
          coordinator={coordinator}
        />
      </main>
    </>
  );
}