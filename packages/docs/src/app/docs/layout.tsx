import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { DEFAULT_LINKS, DEFAULT_SIDEBAR } from "@/app/(constants)";
import { baseOptions } from "@/app/layout.config";
import { docsSource } from "@/lib/source";

interface DocLayoutProps {
  children: ReactNode;
}

const docsLayoutProps: DocsLayoutProps = {
  ...baseOptions,
  tree: docsSource.pageTree,

  nav: {
    title: "google recaptcha",
    transparentMode: "top",
  },
  sidebar: DEFAULT_SIDEBAR,
  githubUrl: "https://github.com/siberiacancode/google-recaptcha",
  links: DEFAULT_LINKS,
};

const DocLayout = ({ children }: DocLayoutProps) => (
  <DocsLayout {...docsLayoutProps}>{children}</DocsLayout>
);

export default DocLayout;
