import type { GoogleReCaptcha } from '@google-recaptcha/core';
import type { ComponentProps } from 'react';

import { removeGoogleReCaptchaContainer } from '@google-recaptcha/core';
import React, { useEffect, useRef } from 'react';

import { useGoogleReCaptcha } from '../context/useGoogleReCaptcha';

export interface GoogleReCaptchaBadgeProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  badge?: GoogleReCaptcha.Badge;
  language?: GoogleReCaptcha.Language;
  theme?: GoogleReCaptcha.Theme;
  onChange?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
}

const BADGE_CONTAINER_ID = 'google-recaptcha-badge-container';

/**
 * Google reCAPTCHA badge component
 *
 * @param {string} [props.id] - The ID of the badge container
 * @param {(token: string) => void} [props.onChange] - Callback function when verification is successful
 * @param {GoogleReCaptcha.Badge} [props.badge] - The position of the badge
 * @param {GoogleReCaptcha.Language} [props.language] - The language for the reCAPTCHA widget
 * @param {GoogleReCaptcha.Theme} [props.theme] - The color theme of the widget
 * @param {() => void} [props.onError] - Callback function when reCAPTCHA encounters an error
 * @param {() => void} [props.onExpired] - Callback function when the reCAPTCHA response expires
 *
 * @returns The rendered Google reCAPTCHA badge component
 */
export const GoogleReCaptchaBadge = ({
  id = BADGE_CONTAINER_ID,
  theme: externalTheme,
  language,
  badge = 'bottomright',
  onChange,
  onError,
  onExpired
}: GoogleReCaptchaBadgeProps) => {
  const googleReCaptchaBadgeContainerRef = useRef<HTMLDivElement>(null);

  const googleReCaptcha = useGoogleReCaptcha();

  const theme = externalTheme ?? googleReCaptcha.theme;
  const hl = language ?? googleReCaptcha.language;

  useEffect(() => {
    if (!googleReCaptcha.render) return;
    const container = document.createElement('div');

    const params = {
      sitekey: googleReCaptcha.siteKey,
      badge,
      size: 'invisible',
      callback: onChange,
      'expired-callback': onExpired,
      'error-callback': onError,
      theme,
      ...(hl && { hl })
    } satisfies GoogleReCaptcha.Parameters;

    googleReCaptcha.render(container, params);

    if (googleReCaptchaBadgeContainerRef.current) {
      googleReCaptchaBadgeContainerRef.current.appendChild(container);
    }

    return () => {
      removeGoogleReCaptchaContainer(id);
    };
  }, [
    googleReCaptcha.render,
    googleReCaptcha.siteKey,
    badge,
    onChange,
    onError,
    onExpired,
    theme,
    hl
  ]);

  if (!googleReCaptcha.render || !googleReCaptcha.siteKey) return null;

  // @ts-ignore
  return <g-recaptcha ref={googleReCaptchaBadgeContainerRef} />;
};
