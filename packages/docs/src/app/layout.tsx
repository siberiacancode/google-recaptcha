import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider';
import { Mulish } from 'next/font/google';

import {
  GoogleAnalyticsScript,
  GoogleTagManagerScript,
  YandexMetricaScript
} from './(components)/scripts';
import { SearchDialog } from './(components)/search';

import './global.css';

const mulish = Mulish({
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <html className={mulish.className} lang='en' suppressHydrationWarning>
    <head>
      <link href='/google-recaptcha/metadata/favicon.ico' rel='icon' sizes='any' />
      <GoogleAnalyticsScript />
      <GoogleTagManagerScript />
      <YandexMetricaScript />
    </head>
    <body className='flex flex-col min-h-screen'>
      <RootProvider
        search={{
          SearchDialog
        }}
      >
        {children}
      </RootProvider>
    </body>
  </html>
);

export default Layout;
