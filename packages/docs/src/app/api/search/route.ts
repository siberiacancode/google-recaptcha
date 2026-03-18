import { createFromSource } from 'fumadocs-core/search/server';

import { docsSource } from '@/lib/source';

export const revalidate = false;
export const { staticGET: GET } = createFromSource(docsSource);
