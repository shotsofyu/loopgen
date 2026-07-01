import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Loop Generator — Write Claude Code Loop Charters Instantly',
    template: '%s | Loop Generator'
  },
  description: 'Stop prompting Claude. Start looping. Describe your goal and get a ready-to-paste Claude Code loop charter in seconds. Free to use.',
  keywords: ['Claude Code', 'loop charter', 'loop engineering', 'AI loops', 'Claude Code loops', 'agentic AI', 'Boris Cherny', 'AI automation'],
  authors: [{ name: 'Loop Generator' }],
  creator: 'Loop Generator',
  metadataBase: new URL('https://ailoopgen.netlify.app'),
  openGraph: {
    title: 'Loop Generator — Write Claude Code Loop Charters Instantly',
    description: 'Stop prompting Claude. Start looping. Get a ready-to-paste loop charter in seconds.',
    url: 'https://ailoopgen.netlify.app',
    siteName: 'Loop Generator',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Loop Generator — Stop prompting. Start looping.',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loop Generator — Write Claude Code Loop Charters Instantly',
    description: 'Stop prompting Claude. Start looping.',
    images: ['/og-image.png'],
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="google-site-verification" content="1mZPchSl3eSUSouy4LvgiopgUJrt6HZw85F_E-iAc6w" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Loop Generator",
                "url": "https://ailoopgen.netlify.app",
                "description": "Generate Claude Code loop charters instantly. Stop prompting, start looping.",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              })
            }}
          />
        </head>
        <body className="bg-[#0a0a0f] text-white antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}
