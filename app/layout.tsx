// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Jj Mcdal Nabong | Full-Stack Developer",
  description: "Portfolio of Jj Mcdal Nabong, a Computer Science graduate and full-stack developer.",
};

// Runs before paint so the saved theme is applied without a flash.
// Only "dark" and "light" are accepted from localStorage, anything else falls back to the system theme.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior tells Next.js the page uses smooth scrolling, so route transitions can handle it properly
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Browser extensions like Grammarly add attributes to <body> before React loads, which causes a hydration warning */}
      <body suppressHydrationWarning>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}