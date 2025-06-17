import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { docsSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

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
    description: page.data.description,
  };
};

const DocPage = async (props: DocPageProps) => {
  const params = await props.params;
  const page = docsSource.getPage(params.slug);
  console.log(page);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(docsSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default DocPage;
