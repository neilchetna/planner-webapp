import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Theme } from "@radix-ui/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Do-mosh",
  description: "Just Do more Shit",
};

export default function RootLayout({
  children,
  pageProps,
}: AppProps & { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <ClerkProvider {...pageProps}>{children}</ClerkProvider>
        </Theme>
      </body>
    </html>
  );
}
