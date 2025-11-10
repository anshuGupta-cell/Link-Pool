import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider
} from "@clerk/nextjs"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Link Pool - All in one link in bio",
  description: "Create your link pool. All your links at one place",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` antialiased dark:text-white/80 dark:bg-slate-800`}>

          <ToastContainer />
          <Navbar />
          {children}
          
        </body>
      </html>
    </ClerkProvider>
  )
}
