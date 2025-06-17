import { GithubIcon, ReactIcon } from '../(components)/icons';
import { LINKS } from './links';

export const DEFAULT_SIDEBAR = {
  collapsible: false,
  tabs: [
    {
      title: 'Framework',
      description: 'The google recaptcha',
      url: '/docs/framework'
    },
    {
      icon: <ReactIcon className='size-6' fill='var(--color-react-primary)' />,
      title: 'React',
      description: 'The adapted version for react',
      url: '/docs/react'
    }
    // {
    //   title: "Vue",
    //   description: "In maintenance mode",
    //   url: "/docs/vue/getting-started",
    // },
    // {
    //   title: "Core",
    //   description: "In maintenance mode",
    //   url: "/docs/core/getting-started",
    // },
  ]
};

export const DEFAULT_LINKS = [
  {
    url: LINKS.REACTUSE,
    text: 'reactuse',
    label: 'reactuse',
    external: true,
    icon: <img alt='reactuse' className='size-4' src={`${LINKS.REACTUSE}/logo.svg`} />
  },
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
