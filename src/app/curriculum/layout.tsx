import '@style/global.css'
import Footer from '@components/Footer'
import { Inter } from 'next/font/google'
import Layout from '@app/layout/layout'
import { metadata as appMetadata } from '@data/metadata'
import { Metadata } from 'next'
import Navbar from '@components/navbar/Navbar'

export const metadata: Metadata = appMetadata

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'flex flex-col items-center m-auto h-screen max-w-5xl w-11/12 font-sans ' + inter.className}>
        <Navbar path='/curriculum' />
        <Layout >
          {children}
        </Layout>
        <Footer />
      </body>
    </html>
  );
}
