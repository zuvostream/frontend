import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import UserHeader from "@/components/ui/userheader";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export let metadata: Metadata = {
  title: "catpics",
  description: "Track your music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body
        className={cn(
          "min-h-screen bg-background dark font-sans antialiased",
          fontSans.variable
        )}
      >
        <UserHeader />
        {children}</body>
    </html>
  );
}
