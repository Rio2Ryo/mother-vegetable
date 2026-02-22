import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instructor Program',
  description: 'Join the Mother Vegetable Certified Instructor program. Earn commissions by sharing premium health supplements.',
  robots: { index: false, follow: false },
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
