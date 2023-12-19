import type { ComponentProps } from 'react';
import React from 'react';
import type { ContainerId, GoogleReCaptcha } from '@google-recaptcha-ultimate/core';
import { removeGoogleReCaptchaContainer } from '@google-recaptcha-ultimate/core';

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
