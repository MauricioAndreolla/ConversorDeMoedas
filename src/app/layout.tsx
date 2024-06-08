import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conversor de moedas",
  description: "Converte a cotação entre diferentes moedas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex h-screen justify-center items-center bg-zinc-950`}>
        <div className="text-center">
          {children}
        </div>
      </body>
    </html>
  );
}
