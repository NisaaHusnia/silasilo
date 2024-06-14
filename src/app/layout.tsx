import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import ProviderLayout from "@/components/layouts/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silasilo App",
  description: "Silasilo adalah aplikasi yang membantu para peternak di Indonesia.",
  keywords: "silasilo, suhu, temperature, ph, grade, farm, peternak, indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="xGGnvZf-GYtDjEnCsym8dh2NKx-wKgrbxrn-5d6w140" />
      </Head>
      <body className={inter.className}>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
