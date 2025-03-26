import type { DefaultTheme } from 'vitepress';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';

export default async () => {
  const reactSidebarItems: DefaultTheme.SidebarItem[] = [
    {
      text: 'Guides',
      items: [
        { text: 'Inject recaptcha script', link: '/react/inject-recaptcha-script' },
        { text: 'Hide badge', link: '/react/hide-badge' }
      ]
    },
    {
      text: 'References',
      items: [
        { text: 'GoogleReCaptchaProvider', link: '/react/reference/GoogleReCaptchaProvider' },
        { text: 'useGoogleReCaptcha', link: '/react/reference/useGoogleReCaptcha' },
        { text: 'withGoogleReCaptcha', link: '/react/reference/withGoogleReCaptcha' },
        { text: 'GoogleReCaptchaCheckbox', link: '/react/reference/GoogleReCaptchaCheckbox' }
      ]
    }
  ];

  return defineConfig({
    base: '/google-recaptcha/',
    title: 'Google ReCaptcha',
    description: 'Google ReCaptcha integration for web applications',
    vite: {
      plugins: [tailwindcss()]
    },
    head: [
      ['link', { rel: 'icon', href: '/google-recaptcha/favicon.ico' }],
      ['link', { rel: 'manifest', href: '/google-recaptcha/manifest.json' }]
    ],
    locales: {
      root: {
        label: 'English',
        lang: 'en',
        themeConfig: {
          logo: {
            src: '/logo.svg',
            alt: 'google-recaptcha'
          },
          footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025 siberiacancode'
          },
          editLink: {
            pattern: ({ filePath }) => {
              return `https://github.com/siberiacancode/google-recaptcha/blob/main/packages/docs/app/${filePath}`;
            },
            text: 'Suggest changes to this page'
          },
          nav: [
            {
              text: 'Home',
              link: '/'
            },
            {
              text: 'Functions',
              items: [
                { text: 'Get started', link: '/introduction' },
                { text: 'React', link: '/react/introduction' },
                { text: 'Vue', link: '/vue/introduction' },
                { text: 'Core', link: '/core/introduction' }
              ]
            }
          ],
          sidebar: {
            '/react/': [
              { text: 'Introduction', link: '/react/introduction' },
              ...reactSidebarItems
            ],
            '/vue/': [{ text: 'Introduction', link: '/core/introduction' }],
            '/core/': [{ text: 'Introduction', link: '/core/introduction' }],
            '/': [
              { text: 'Introduction', link: '/introduction' },
              {
                text: 'Frameworks',
                items: [
                  { text: 'Core', link: '/core/introduction' },
                  { text: 'React', link: '/react/introduction' },
                  { text: 'Vue', link: '/vue/introduction' }
                ]
              }
            ]
          }
        }
      }
    },
    themeConfig: {
      // search: {
      //   provider: 'algolia',
      //   options: {
      //     appId: '62LROXAB1F',
      //     apiKey: 'c1ff07348583383446ca32068eb1300f',
      //     indexName: 'siberiacancodeio'
      //   }
      // },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/siberiacancode/google-recaptcha' },
        { icon: 'npm', link: 'https://www.npmjs.com/package/@google-recaptcha/core' },
        { icon: 'youtube', link: 'https://www.youtube.com/@siberiacancode' }
      ]
    }
  });
};
