// app/become-an-author/page.tsx
import { Metadata } from 'next';
import BecomeAuthor from './BecomeAuthor';

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Become an Author | Africana College of Professionals',
  description: 'Join our community of professional writers and educators. Share your expertise, inspire others, and grow your professional network with Africana College of Professionals.',
  keywords: 'become an author, write for us, guest post, contribute, education writer, Kenya, ACOP author',
  openGraph: {
    title: 'Become an Author | Africana College of Professionals',
    description: 'Join our community of professional writers and educators. Share your expertise and grow your network.',
    url: 'https://www.acop.co.ke/become-an-author',
    siteName: 'Africana College of Professionals',
    type: 'website',
    images: [
      {
        url: 'https://www.acop.co.ke/authorpage.png',
        width: 1200,
        height: 630,
        alt: 'Become an Author at Africana College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Become an Author | Africana College of Professionals',
    description: 'Join our community of professional writers and educators.',
    images: ['https://www.acop.co.ke/authorpage.png'],
    creator: '@acop_kenya',
    site: '@acop_kenya',
  },
  alternates: {
    canonical: 'https://www.acop.co.ke/become-an-author',
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
};

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default function BecomeAuthorPage() {
  return <BecomeAuthor />;
}