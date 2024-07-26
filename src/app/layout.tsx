import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientWrapper from "@/components/common/ClientWrapper";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Stack Nextjs Link Sharing App", 
  description: "Share your social media links with ease", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <ClientWrapper>{children}</ClientWrapper>
        <Toaster /> 
      </body>
    </html>
  );
}
