import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login Authentication App",
  description: "Next.js App Router Login Page with Client-side Validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}