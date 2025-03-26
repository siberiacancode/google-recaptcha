import type { DefaultTheme } from 'vitepress';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';

export default async () => {
  const reactSidebarItems: DefaultTheme.SidebarItem[] = [
    {
      text: 'React Google ReCaptcha',
      items: [
        { text: 'Introduction', link: '/react/introduction' },
        { text: 'V2 Checkbox', link: '/react/v2-checkbox' },
        { text: 'V2 Invisible', link: '/react/v2-invisible' },
        { text: 'V3', link: '/react/v3' }
      ]
    }
  ];

  const vueSidebarItems: DefaultTheme.SidebarItem[] = [
    {
      text: 'Vue Google ReCaptcha',
      items: [
        { text: 'Introduction', link: '/vue/introduction' },
        { text: 'V2 Checkbox', link: '/vue/v2-checkbox' },
        { text: 'V2 Invisible', link: '/vue/v2-invisible' },
        { text: 'V3', link: '/vue/v3' }
      ]
    }
  ];

  const coreSidebarItems: DefaultTheme.SidebarItem[] = [
    {
      text: 'Core Google ReCaptcha',
      items: [
        { text: 'Introduction', link: '/core/introduction' },
        { text: 'API Reference', link: '/core/api-reference' }
      ]
    }
  ];

  const homePageFeatures = [
    {
      title: 'React Google ReCaptcha',
      details: 'Implement Google ReCaptcha in your React applications',
      link: '/react/introduction'
    },
    {
      title: 'Vue Google ReCaptcha',
      details: 'Implement Google ReCaptcha in your Vue applications',
      link: '/vue/introduction'
    },
    {
      title: 'Core Google ReCaptcha',
      details: 'Core functionality for Google ReCaptcha integration',
      link: '/core/introduction'
    }
  ];

  return defineConfig({
    base: '/google-recaptcha/',
    title: 'Google ReCaptcha',
    description: 'Google ReCaptcha integration for web applications',
    vite: {
      css: {
        postcss: {
          plugins: [tailwindcss]
        }
      }
    },
    transformPageData: (pageData) => {
      pageData.frontmatter.head ??= [];
      pageData.frontmatter.head.push([
        'meta',
        {
          name: 'og:image',
          content: 'https://www.gstatic.com/recaptcha/api2/logo_48.png'
        }
      ]);

      if (pageData.relativePath === 'index.md') {
        pageData.frontmatter.features = homePageFeatures;
      }
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
          editLink: {
            pattern: ({ filePath }) => {
              return `https://github.com/siberiacancode/react-google-recaptcha/blob/main/packages/docs/app/${filePath}`;
            },
            text: 'Suggest changes to this page'
          },
          nav: [
            { text: 'Home', link: '/' },
            {
              text: 'React',
              items: [
                { text: 'Introduction', link: '/react/introduction' },
                { text: 'V2 Checkbox', link: '/react/v2-checkbox' },
                { text: 'V2 Invisible', link: '/react/v2-invisible' },
                { text: 'V3', link: '/react/v3' }
              ]
            },
            {
              text: 'Vue',
              items: [
                { text: 'Introduction', link: '/vue/introduction' },
                { text: 'V2 Checkbox', link: '/vue/v2-checkbox' },
                { text: 'V2 Invisible', link: '/vue/v2-invisible' },
                { text: 'V3', link: '/vue/v3' }
              ]
            },
            {
              text: 'Core',
              items: [
                { text: 'Introduction', link: '/core/introduction' },
                { text: 'API Reference', link: '/core/api-reference' }
              ]
            }
          ],
          sidebar: {
            '/react/': [
              {
                text: 'Getting started',
                items: [
                  { text: 'Introduction', link: '/react/introduction' },
                  { text: 'Installation', link: '/react/installation' }
                ]
              },
              ...reactSidebarItems
            ],
            '/vue/': [
              {
                text: 'Getting started',
                items: [
                  { text: 'Introduction', link: '/vue/introduction' },
                  { text: 'Installation', link: '/vue/installation' }
                ]
              },
              ...vueSidebarItems
            ],
            '/core/': [
              {
                text: 'Getting started',
                items: [
                  { text: 'Introduction', link: '/core/introduction' },
                  { text: 'Installation', link: '/core/installation' }
                ]
              },
              ...coreSidebarItems
            ],
            '/': [
              {
                text: 'Getting started',
                items: [
                  { text: 'Introduction', link: '/introduction' },
                  { text: 'Installation', link: '/installation' }
                ]
              },
              {
                text: 'Installation',
                items: [
                  { text: 'Vite', link: '/installation/vite' },
                  { text: 'Next.js', link: '/installation/nextjs' }
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
