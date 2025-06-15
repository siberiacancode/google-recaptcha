import type { ReactNode } from 'react';

import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

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
  githubUrl: 'https://github.com/siberiacancode/google-recaptcha',
  links: [
    {
      url: 'https://github.com/siberiacancode/google-recaptcha',
      text: 'GitHub',
      external: true
    }
  ]
};

export const DocLayout = ({ children }: DocLayoutProps) => (
  <DocsLayout {...docsLayoutProps}>{children}</DocsLayout>
);

export default DocLayout;
