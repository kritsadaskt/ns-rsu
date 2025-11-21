import type { Metadata } from 'next'
import { Noto_Sans_Thai_Looped } from 'next/font/google'
import React from 'react'
import './globals.css'

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-noto-sans-thai-looped',
})

export const metadata: Metadata = {
  title: 'NS RSU Database',
  description: 'View and edit data stored on Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={notoSansThaiLooped.variable}>
      <body className={notoSansThaiLooped.className}>{children}</body>
    </html>
  )
}
