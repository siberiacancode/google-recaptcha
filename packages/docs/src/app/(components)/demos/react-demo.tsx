'use client';

import type { GoogleReCaptcha } from '@google-recaptcha/core';
import type { ComponentProps } from 'react';

import { GoogleReCaptchaCheckbox, GoogleReCaptchaProvider } from '@google-recaptcha/react';
import { useTheme } from 'next-themes';

export type ReactDemoProps = Omit<ComponentProps<typeof GoogleReCaptchaProvider>, 'siteKey'>;

export const ReactDemo = (props: ReactDemoProps) => {
  const { theme } = useTheme();

  return (
    <div className='flex border border-color-[var(--color-fd-card)] rounded-[var(--radius-lg)] outline-[var(--tw-border-style)] justify-center items-center min-h-[200px] bg-[var(--color-fd-card)]'>
      {/* @ts-ignore */}
      <GoogleReCaptchaProvider
        siteKey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
        {...((props.type === 'v3' || props.type === 'v2-invisible') && {
          explicit: {
            container: 'recaptcha-container',
            badge: 'inline',
            theme: theme as GoogleReCaptcha.Theme
          }
        })}
        {...props}
      >
        {props.type === 'v2-checkbox' && (
          <GoogleReCaptchaCheckbox theme={theme as GoogleReCaptcha.Theme} />
        )}
        {(props.type === 'v2-invisible' || props.type === 'v3') && <div id='recaptcha-container' />}
      </GoogleReCaptchaProvider>
    </div>
  );
};
