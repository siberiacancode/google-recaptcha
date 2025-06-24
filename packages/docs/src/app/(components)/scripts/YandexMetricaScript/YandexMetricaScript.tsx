import Script from 'next/script';

export const YandexMetricaScript = () => (
  <>
    <Script
      id='yandex-metrika'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],
              k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
          ym(102972492, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
          });
        `
      }}
    />
    <noscript>
      <div>
        <img
          alt=''
          src='https://mc.yandex.ru/watch/102972492'
          style={{ position: 'absolute', left: '-9999px' }}
        />
      </div>
    </noscript>
  </>
);
