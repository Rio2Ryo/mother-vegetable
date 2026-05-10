import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Not Found — Mother Vegetable',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewsListingPage() {
  notFound();
}
