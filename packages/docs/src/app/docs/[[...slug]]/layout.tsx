import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

import { Banner } from 'fumadocs-ui/components/banner';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { Logo } from '@/app/(components)/logo';
import { DEFAULT_LINKS, DEFAULT_SIDEBAR, REACTUSE_LINK } from '@/app/(constants)';
import { LINKS } from '@/app/(constants)/links';
import { baseOptions } from '@/app/layout.config';
import { docsSource } from '@/lib/source';

interface DocLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string[] }>;
}

const DocLayout = async ({ children, params }: DocLayoutProps) => {
  const isReact = (await params).slug.includes('react');

  const docsLayoutProps: DocsLayoutProps = {
    ...baseOptions,
    tree: docsSource.pageTree,
    nav: {
      title: (
        <div className='flex items-center gap-2'>
          <Logo className='h-8' />
        </div>
      ),
      transparentMode: 'always'
    },
    sidebar: DEFAULT_SIDEBAR,
    githubUrl: 'https://github.com/siberiacancode/google-recaptcha',
    links: isReact ? [REACTUSE_LINK, ...DEFAULT_LINKS] : DEFAULT_LINKS
  };

  return (
    <>
      {isReact && (
        <Banner className='flex items-center gap-2 text-md' id='reactuse-banner'>
          <img alt='reactuse' className='size-5' src={`${LINKS.REACTUSE}/logo.svg`} />
          <div>
            reactuse for everything <span>&nbsp;</span>
            <a href={LINKS.REACTUSE} className='underline'>
              read the documentation
            </a>{' '}
          </div>
        </Banner>
      )}
      <DocsLayout {...docsLayoutProps}>{children}</DocsLayout>
    </>
  );
};

export default DocLayout;
