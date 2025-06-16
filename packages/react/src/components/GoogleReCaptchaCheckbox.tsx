import type { GoogleReCaptcha } from '@google-recaptcha/core';
import type { ComponentProps } from 'react';

import { removeGoogleReCaptchaContainer } from '@google-recaptcha/core';
import React, { useEffect, useRef } from 'react';

import { useGoogleReCaptcha } from '../context/useGoogleReCaptcha';

export interface GoogleReCaptchaCheckboxProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  action?: string;
  language?: GoogleReCaptcha.Language;
  size?: GoogleReCaptcha.Size['v2-checkbox'];
  theme?: GoogleReCaptcha.Theme;
  onChange?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
}

const CHECKBOX_CONTAINER_ID = 'google-recaptcha-checkbox-container';

/**
 * Google reCAPTCHA checkbox component
 *
 * @param {string} [props.id] - The ID of the checkbox container
 * @param {(token: string) => void} [props.onChange] - Callback function when verification is successful
 * @param {string} [props.action] - The action name for analytics
 * @param {GoogleReCaptcha.Language} [props.language] - The language for the reCAPTCHA widget
 * @param {GoogleReCaptcha.Theme} [props.theme] - The color theme of the widget
 * @param {GoogleReCaptcha.Size['v2-checkbox']} [props.size] - The size of the widget
 * @param {() => void} [props.onError] - Callback function when reCAPTCHA encounters an error
 * @param {() => void} [props.onExpired] - Callback function when the reCAPTCHA response expires
 *
 * @returns The rendered Google reCAPTCHA checkbox component
 */
export const GoogleReCaptchaCheckbox = ({
  id = CHECKBOX_CONTAINER_ID,
  onChange,
  action,
  onError,
  onExpired,
  size,
  theme: externalTheme,
  language,
  ...props
}: GoogleReCaptchaCheckboxProps) => {
  const googleReCaptcha = useGoogleReCaptcha();
  const googleReCaptchaCheckboxContainerRef = useRef<HTMLDivElement>(null);

  const theme = externalTheme ?? googleReCaptcha.theme;
  const hl = language ?? googleReCaptcha.language;

  useEffect(() => {
    if (!googleReCaptcha.render) return;
    const checkbox = document.createElement('div');

    const params = {
      sitekey: googleReCaptcha.siteKey,
      callback: onChange,
      ...(hl && { hl }),
      ...(action && { action }),
      'expired-callback': onExpired,
      'error-callback': onError,
      size,
      theme
    } satisfies GoogleReCaptcha.Parameters;

    googleReCaptcha.render(checkbox, params);

    if (googleReCaptchaCheckboxContainerRef.current) {
      googleReCaptchaCheckboxContainerRef.current.appendChild(checkbox);
    }

    return () => {
      removeGoogleReCaptchaContainer(id);
    };
  }, [googleReCaptcha.siteKey, googleReCaptcha.render, hl, onChange, id, size, action, theme]);

  return <div ref={googleReCaptchaCheckboxContainerRef} id={id} {...props} />;
};

export default GoogleReCaptchaCheckbox;
