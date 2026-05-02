// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
    title: 'Zipply — Free Online Image Compressor',
    description: 'Compress images online for free. Fast, private, and processed in your browser.',
    icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased bg-[#F9FAFB]`}>
        {children}
        </body>
        </html>
    );
}