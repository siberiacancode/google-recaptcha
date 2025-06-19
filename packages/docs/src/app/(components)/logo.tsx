import type { ComponentProps } from 'react';

export type LogoProps = ComponentProps<'img'>;

export const Logo = ({ className = '', ...props }: LogoProps) => (
  <>
    <img
      className={`hidden object-contain dark:block ${className}`}
      src='/google-recaptcha/logo/gr-dark.png'
      {...props}
    />
    <img
      className={`object-contain dark:hidden ${className}`}
      src='/google-recaptcha/logo/gr-light.png'
      {...props}
    />
  </>
);
