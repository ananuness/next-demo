import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Demo',
  description: 'A Next project demo',
};

// default export is required
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-center text-6xl bg-slate-400`}>
        <h2 className="text-4xl bg-slate-300">
          Root layout: compartilhado por toda aplicação
        </h2>

        <main className="bg-slate-200">
          {children}
        </main>

        <footer className="mt-4 text-2xl">
          <p>
            rotas disponiveis: /login, /signin e /dashboard
          </p>
        </footer>
      </body>
    </html>
  );
}
