import "./globals.css";
import { PHProvider, PostHogPageview } from "./providers";
import { Suspense } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Joke Tester",
  description: "Try out jokes on AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body className={inter.className}>{children}</body>
      </PHProvider>
    </html>
  );
}
