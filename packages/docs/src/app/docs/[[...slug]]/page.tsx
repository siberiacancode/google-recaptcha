import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

import { GithubIcon } from '@/app/(components)/icons';
import { Button } from '@/app/(components)/ui';
import { docsSource } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

interface DocPageProps {
  params: Promise<{ slug?: string[] }>;
}

export const generateStaticParams = () => docsSource.generateParams();

export const generateMetadata = async (props: DocPageProps) => {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description
  };
};

const DocPage = async (props: DocPageProps) => {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);

  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage full={page.data.full} lastUpdate={page.data.lastModified} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className='mb-0'>{page.data.description}</DocsDescription>
      <div className='flex gap-4'>
        <Button asChild className='w-fit' variant='secondary'>
          <a
            href={`https://github.com/siberiacancode/google-recaptcha/blob/main/packages/docs/content/docs/${page.path}`}
            rel='noreferrer'
            target='_blank'
          >
            <GithubIcon />
            View on GitHub
          </a>
        </Button>
      </div>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(docsSource, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default DocPage;
