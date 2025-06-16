import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

import { Banner } from 'fumadocs-ui/components/banner';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { DEFAULT_LINKS, DEFAULT_SIDEBAR, LINKS } from '@/app/(constants)';
import { baseOptions } from '@/app/layout.config';
import { reactSource } from '@/lib/source';

import './react.css';

interface DocReactLayoutProps {
  children: ReactNode;
}

const docsLayoutProps: DocsLayoutProps = {
  ...baseOptions,
  tree: reactSource.pageTree,

  nav: {
    title: 'react google recaptcha',
    transparentMode: 'top'
  },
  sidebar: DEFAULT_SIDEBAR,
  links: DEFAULT_LINKS,
  githubUrl: 'https://github.com/siberiacancode/google-recaptcha/packages/react'
};

const DocReactLayout = ({ children }: DocReactLayoutProps) => (
  <>
    <Banner className='flex items-center gap-2 text-md' id='reactuse-banner'>
      <img alt='reactuse' className='size-5' src={`${LINKS.REACTUSE}/logo.svg`} />
      <div>
        reactuse for everything <span>&nbsp;</span>
        <a href={LINKS.REACTUSE} className='underline'>
          read the documentation
        </a>{' '}
      </div>
    </Banner>
    <DocsLayout {...docsLayoutProps}>{children}</DocsLayout>
  </>
);

export default DocReactLayout;
