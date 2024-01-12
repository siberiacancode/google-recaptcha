import type { ComponentProps } from 'react';
import React from 'react';
import type { ContainerId, GoogleReCaptcha } from '@google-recaptcha/core';
import { removeGoogleReCaptchaContainer } from '@google-recaptcha/core';

import { useGoogleReCaptcha } from '../context/useGoogleReCaptcha';
import { useIsomorphicLayoutEffect } from '../utils';

export interface GoogleReCaptchaCheckboxProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  id?: string;
  action?: string;
  className?: string;
  container?: ContainerId | HTMLElement;
  callback?: (token: string) => void;
  errorCallback?: () => void;
  expiredCallback?: () => void;
  language?: GoogleReCaptcha.Language;
  theme?: GoogleReCaptcha.Theme;
  size?: GoogleReCaptcha.Size['v2-checkbox'];
  onChange?: (token: string) => void;
}

const CHECKBOX_CONTAINER_ID = 'google-recaptcha-checkbox-container';

/**
 * Renders a Google reCAPTCHA checkbox component.
 *
 * @param {GoogleReCaptchaCheckboxProps} props - The props for the component.
 * @param {string} props.id - The ID of the checkbox container.
 * @param {function} props.onChange - The callback function triggered when the checkbox value changes.
 * @param {string} props.action - The action to be performed when the checkbox is clicked.
 * @param {string} props.language - The language for the reCAPTCHA widget.
 * @return {ReactElement} The rendered Google reCAPTCHA checkbox component.
 */

export const GoogleReCaptchaCheckbox: React.FC<GoogleReCaptchaCheckboxProps> = ({
  id = CHECKBOX_CONTAINER_ID,
  onChange,
  action,
  language,
  ...props
}) => {
  const { siteKey, render, language: hl } = useGoogleReCaptcha();
  const googleReCaptchaCheckboxContainerRef = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!render) return;
    const checkbox = document.createElement('div');

    const params = {
      sitekey: siteKey,
      callback: onChange,
      ...((language ?? hl) && { hl: language ?? hl }),
      ...props
    } as GoogleReCaptcha.Parameters;

    if (action) {
      render(checkbox, { ...params, action });
    } else render(checkbox, params);

    if (googleReCaptchaCheckboxContainerRef.current) {
      googleReCaptchaCheckboxContainerRef.current.appendChild(checkbox);
    }

    return () => {
      removeGoogleReCaptchaContainer(id);
    };
  }, [render, language, onChange, id, siteKey, props.size, action, props.theme]);

  return <div id={id} ref={googleReCaptchaCheckboxContainerRef} {...props} />;
};

export default GoogleReCaptchaCheckbox;
