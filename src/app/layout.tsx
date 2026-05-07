import ConditionalLayout from '@/components/common/ConditionalLayout';
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
        className={`${hanken.variable} scroll-smooth scroll-pt-24`}
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LenisProvider>
              <div className="relative flex min-h-screen flex-col">
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-primary focus:font-bold focus:shadow-md focus:rounded-br-md left-0 top-0"
                >
                  Skip to main content
                </a>
                <ConditionalLayout hideOnPaths={['/resume']}>
                  <Navbar />
                </ConditionalLayout>

                <main id="main-content" className="flex-1">
                  {children}
                </main>

                <ConditionalLayout hideOnPaths={['/resume']}>
                  <OnekoCat />
                  <Quote />
                  <Footer />
                </ConditionalLayout>
              </div>
            </LenisProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
