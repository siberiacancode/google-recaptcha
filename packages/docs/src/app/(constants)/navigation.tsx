import { LayersIcon, PackageIcon } from 'lucide-react';

import { GithubIcon, ReactIcon, VueIcon } from '../(components)/icons';
import { LINKS } from './links';

export const DEFAULT_SIDEBAR = {
  collapsible: false,
  tabs: [
    {
      icon: <LayersIcon className='size-5' />,
      title: 'Framework',
      description: 'The google recaptcha',
      url: '/docs/framework'
    },
    {
      icon: <PackageIcon className='size-5' />,
      title: 'Core',
      description: 'The core package',
      url: '/docs/core'
    },
    {
      icon: <ReactIcon className='size-5' />,
      title: 'React',
      description: 'The adapted version for react',
      url: '/docs/react'
    },
    {
      icon: <VueIcon className='size-5' />,
      title: 'Vue',
      description: 'In maintenance mode',
      url: '/docs/vue'
    }
  ]
};

export const REACTUSE_LINK = {
  url: LINKS.REACTUSE,
  text: 'reactuse',
  label: 'reactuse',
  external: true,
  icon: <img alt='reactuse' className='size-4' src={`${LINKS.REACTUSE}/logo.svg`} />
};

export const DEFAULT_LINKS = [
  {
    url: 'https://github.com/siberiacancode/google-recaptcha',
    text: 'GitHub',
    external: true,
    icon: <GithubIcon className='size-4' />
  },
  {
    url: 'https://www.npmjs.com/package/@google-recaptcha/react',
    text: 'npm',
    label: 'npm',
    external: true
  }
];
