import { loader } from 'fumadocs-core/source';

import { docs, react } from '@/.source';

export const frameworkSource = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource()
});

export const reactSource = loader({
  baseUrl: '/docs/react',
  source: react.toFumadocsSource()
});
