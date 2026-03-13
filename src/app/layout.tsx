import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import Footer from '@/components/common/Footer';
import LenisProvider from '@/components/common/LenisProvider';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { ViewTransitions } from 'next-view-transitions';
import { Hanken_Grotesk } from 'next/font/google';

import './globals.css';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken-grotesk',
});

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${hanken.variable} scroll-smooth`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Ibrahim Abdullaziz',
                url: 'https://sleek-portfolio.com', // Replace with real URL in production
                jobTitle: 'Software Engineer',
                sameAs: [
                  'https://github.com/ibrahimabdullaziz',
                  'https://linkedin.com/in/ibrahim-abdullaziz-894035339',
                ],
              }),
            }}
          />
        </head>
        <body className="font-hanken-grotesk bg-background text-foreground antialiased">
          <UmamiAnalytics />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LenisProvider>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />

                <main className="flex-1">{children}</main>

                <OnekoCat />
                <Quote />
                <Footer />
              </div>
            </LenisProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
