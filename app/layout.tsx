import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import icon from "./favicon.ico"
import "./globals.css";


export const metadata: Metadata = {
  title: "DeVolt simulation",
  description: "Test our car screen simulation!",
  openGraph: {
    images: "https://www.devolt.xyz/ogimage.png",
    type: "website",
    url: "https://simulation.devolt.xyz",
    locale: "en",
  }
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700",],
  display: "swap",
  style: ["italic", "normal"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
