import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PHProvider } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowReconcile - Automate Your E-commerce Accounting",
  description: "Stop wasting 25 hours a week on e-commerce reconciliation. FlowReconcile automatically syncs Shopify, Stripe, and QuickBooks with 100% accuracy.",
  keywords: "shopify accounting, ecommerce reconciliation, stripe quickbooks sync, shopify bookkeeping, automated accounting",
  openGraph: {
    title: "FlowReconcile - Automate Your E-commerce Accounting",
    description: "Save 25 hours/week on financial reconciliation. Automatic sync between Shopify, Stripe, and QuickBooks.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowReconcile - Automate Your E-commerce Accounting",
    description: "Save 25 hours/week on financial reconciliation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={inter.className}>{children}</body>
      </PHProvider>
    </html>
  );
}
