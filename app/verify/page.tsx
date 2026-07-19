import type { Metadata } from 'next';
import VerifyClient from '@/components/verify/VerifyClient';

export const metadata: Metadata = {
  title: 'Certificate Verification | Africana College of Professionals',
  description:
    'Verify the authenticity of certificates issued by Africana College of Professionals. Employers and institutions can instantly confirm the validity of ACOP credentials.',
  keywords: [
    'verify certificate',
    'certificate validation',
    'ACOP certificate',
    'Africana College certificate verification',
    'check certificate authenticity',
    'digital certificate verification',
    'employer certificate verification',
    'credential validation',
    'ACOP verification portal',
  ].join(', '),
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.acop.co.ke/verify',
  },
  openGraph: {
    title: 'Certificate Verification Portal | Africana College of Professionals',
    description:
      'Quickly verify the authenticity of any certificate issued by Africana College of Professionals. Trusted by employers and institutions.',
    url: 'https://www.acop.co.ke/verify',
    siteName: 'Africana College of Professionals',
    type: 'website',
    images: [
      {
        url: 'https://www.acop.co.ke/verify-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Verify ACOP Certificates',
      },
    ],
  },
};

export default function VerifyPage() {
  return <VerifyClient />;
}