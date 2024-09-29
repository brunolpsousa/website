import { lightThemeIcon } from "@data/icon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bruno Sousa",
  description: "Personal Website",

  // Basic metadata
  applicationName: "Bruno Sousa",
  authors: [{ name: "Bruno Sousa", url: "https://brunolpsousa.github.com" }],
  generator: "Next.js",
  keywords: [
    "portfolio",
    "next.js",
    "react",
    "javascript",
    "typescript",
    "node.js",
  ],
  referrer: "origin-when-cross-origin",
  // themeColor: "#4285f4",
  colorScheme: "dark",
  viewport: "width=device-width, initial-scale=1",
  creator: "Bruno Sousa",
  publisher: "Bruno Sousa",

  // Open Graph metadata
  openGraph: {
    title: "Bruno Sousa",
    description: "Personal Website",
    url: "https://brunolpsousa.vercel.app",
    siteName: "Bruno Sousa",
    images: [
      {
        url: "https://brunolpsousa.vercel.app/assets/share_link.png",
        width: 1200, // This is the recommended size in pixels
        height: 630,
        alt: "Bruno Sousa",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Bruno Sousa",
    description: "Personal Website",
    creator: "@brunolpsousa",
    images: ["https://brunolpsousa.vercel.app/assets/share_link.png"],
  },

  // Verification for search engines
  // You can get these values from the respective
  // search engines when you submit your site for
  // indexing
  // verification: {
  //   google: "google-site-verification=1234567890",
  //   yandex: "yandex-verification=1234567890",
  //   yahoo: "yahoo-site-verification=1234567890",
  // },

  // Alternate languages
  alternates: {
    canonical: "https://brunolpsousa.vercel.app",
    languages: {
      "en-US": "https://brunolpsousa.vercel.app/en-US",
      "pt-BR": "https://brunolpsousa.vercel.app/pt-BR",
    },
  },

  // Icons
  icons: {
    icon: lightThemeIcon,
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
    // other: [
    //   {
    //     rel: "apple-touch-icon-precomposed",
    //     url: "/apple-touch-icon-precomposed.png",
    //   },
    // ],
  },

  // Manifest
  // manifest: "/site.webmanifest",

  // App-specific metadata
  appleWebApp: {
    capable: true,
    title: "Bruno Sousa",
    statusBarStyle: "black-translucent",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
