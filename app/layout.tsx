import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Kartik\'s Journey',
  description: 'A 4-year timeline of building, failing, learning, and growing.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-[#030712]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
