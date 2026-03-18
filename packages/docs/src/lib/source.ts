import { loader } from 'fumadocs-core/source';
import { docs } from 'fumadocs-mdx:collections/server';

export const docsSource = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource()
});
