import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderLayout from "@/components/layouts/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silasilo Monitor",
  description: "Solusi cerdas untuk memantau dan mengelola aktivitas online Anda dengan mudah dan efektif. Dengan pembaruan real-time, analisis data mendalam, dan antarmuka yang ramah pengguna.",
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
