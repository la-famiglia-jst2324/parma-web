import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Head from 'next/head'
import { UserCheckComponent } from '@/components/Authentication/UserCheck'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ParmaUI',
  description: 'Frontend for interaction with ParmaAI, a vc monitoring system'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <UserCheckComponent children={children} />
      </body>
    </html>
  )
}
