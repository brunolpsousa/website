import '@style/global.css';

import Layout from '@app/layout/layout';
import Footer from '@components/Footer';
import { metadata as appMetadata } from '@data';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = appMetadata;

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body
        className={`flex flex-col items-center m-auto h-screen max-w-5xl w-11/12 font-sans ${inter.className}`}
      >
        <Layout>{children}</Layout>
        <Footer />
      </body>
    </html>
  );
}
