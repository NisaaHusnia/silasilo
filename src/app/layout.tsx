import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderLayout from "@/components/layouts/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silasilo App",
  description: "Silasilo adalah aplikasi yang membantu para peternak di Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
