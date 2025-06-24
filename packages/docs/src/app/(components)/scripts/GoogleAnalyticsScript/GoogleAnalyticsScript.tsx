import Script from 'next/script';

export const GoogleAnalyticsScript = () => (
  <>
    <Script
      async
      id='google-analytics'
      src='https://www.googletagmanager.com/gtag/js?id=G-P8B92MT7W1'
      strategy='afterInteractive'
    />
    <Script
      id='google-analytics-config'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-P8B92MT7W1');
        `
      }}
    />
  </>
);
