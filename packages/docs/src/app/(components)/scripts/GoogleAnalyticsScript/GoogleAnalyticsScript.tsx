import Script from 'next/script';

export const GoogleAnalyticsScript = () => (
  <>
    <Script
      async
      id='google-analytics'
      src='https://www.googletagmanager.com/gtag/js?id=G-RRECQP6XBW'
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
          gtag('config', 'G-RRECQP6XBW', {
            anonymize_ip: true,
            client_storage: 'none',
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `
      }}
    />
  </>
);
