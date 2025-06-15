import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';

import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
