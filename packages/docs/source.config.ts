import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { remarkInstall } from 'fumadocs-docgen';
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});

export const react = defineDocs({
  dir: 'content/react',
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInstall],
    rehypeCodeOptions: {
      langs: ['tsx', 'ts', 'js', 'jsx', 'json', 'html', 'css', 'md', 'bash', 'vue'],
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerTwoslash()]
    }
  },
  lastModifiedTime: 'git'
});
