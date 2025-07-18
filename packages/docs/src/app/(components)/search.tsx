'use client';

import type { SharedProps } from 'fumadocs-ui/components/dialog/search';

import { create } from '@orama/orama';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog as _SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay
} from 'fumadocs-ui/components/dialog/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';

const initOrama = () =>
  create({
    schema: { _: 'string' },
    language: 'english'
  });

export const SearchDialog = (props: SharedProps) => {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
    locale
  });

  return (
    <_SearchDialog
      search={search}
      isLoading={query.isLoading}
      onSearchChange={setSearch}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? (query.data as any[]) : []} />
      </SearchDialogContent>
    </_SearchDialog>
  );
};
