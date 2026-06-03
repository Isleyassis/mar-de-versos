import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Mar de Versos | Entre poemas, orações e paixões',
  description: 'Um mar de versos onde sentimentos, memórias e paixões encontram as palavras.',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://mar-de-versos.vercel.app'),
  openGraph: {
    title: 'Mar de Versos | Entre poemas, orações e paixões',
    description:
      'Um mar de versos onde sentimentos, memórias e paixões encontram as palavras.',
    images: [
      {
        url: '/mar-de-versos-og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mar de Versos',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f9fc' },
    { media: '(prefers-color-scheme: dark)', color: '#1a2332' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
