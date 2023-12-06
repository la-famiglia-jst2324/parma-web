import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { UserCheckComponent } from '@/components/Authentication/UserCheck'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ParmaUI',
  description: 'Frontend for interaction with ParmaAI, a vc monitoring system'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserCheckComponent children={children} />
      </body>
    </html>
  )
}
