import type { Metadata } from "next";
import "./global.css"
import { Montserrat } from 'next/font/google';
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "BankSystem",
};

const font = Montserrat({subsets: ['cyrillic']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${font.className} bg-[#556573] max-w-7xl mx-auto px-5`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
