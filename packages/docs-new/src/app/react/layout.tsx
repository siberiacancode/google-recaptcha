import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { Banner } from 'fumadocs-ui/components/banner';

import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

interface DocLayoutProps {
  children: ReactNode;
}

const docsLayoutProps: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,

  nav: {
    title: 'google recaptcha',
    transparentMode: 'top'
  },
  sidebar: {
    collapsible: false,
    tabs: [
      {
        title: 'Framework',
        description: 'The google recaptcha',
        url: '/'
      },
      {
        title: 'React',
        description: 'In maintenance mode',
        url: '/react'
      },
      {
        title: 'Vue',
        description: 'In maintenance mode',
        url: '/vue'
      },
      {
        title: 'Core',
        description: 'In maintenance mode',
        url: '/core'
      }
    ]
  },
  githubUrl: 'https://github.com/siberiacancode/google-recaptcha/packages/react',
  links: [
    {
      url: 'https://github.com/siberiacancode/google-recaptcha',
      text: 'GitHub',
      external: true
    }
  ]
};

export const DocLayout = ({ children }: DocLayoutProps) => (
  <>
    <Banner id='reactuse-banner'>
      💎 Zod 4 is now stable! <span>&nbsp;</span>
      <a className='underline'>Read the announcement.</a>
    </Banner>
    <DocsLayout {...docsLayoutProps}>{children}</DocsLayout>
  </>
);

export default DocLayout;
