import { LINKS } from '../(constants)';
import { GithubIcon, NpmIcon } from './icons';
import { Button } from './ui';

export const ReactUseBanner = () => (
  <div className='rounded-lg border border-2 px-8 py-4'>
    <div className='flex flex-col items-start gap-8 relative'>
      <div className='flex items-center gap-4'>
        <img alt='reactuse' className='size-16 m-0!' src={`${LINKS.REACTUSE}/logo.svg`} />

        <div>
          <div className='text-4xl font-bold tracking-tight text-foreground/80'>reactuse</div>
          <div className='text-xl text-muted-foreground'>
            the largest and most useful hook library
          </div>
        </div>
      </div>

      <div className='flex w-full justify-between items-center'>
        <div className='max-w-md text-sm text-muted-foreground'>
          Improve your react applications with our library 📦 designed for comfort and speed
        </div>

        <Button asChild variant='secondary'>
          <a href={LINKS.REACTUSE}>Get Started</a>
        </Button>

        <div className='absolute top-0 right-0 flex gap-1'>
          <Button asChild className='rounded-full' size='icon' variant='ghost'>
            <a href={LINKS.REACTUSE}>
              <GithubIcon />
            </a>
          </Button>

          <Button asChild className='rounded-full' size='icon' variant='ghost'>
            <a href={LINKS.REACTUSE_NPM}>
              <NpmIcon />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
