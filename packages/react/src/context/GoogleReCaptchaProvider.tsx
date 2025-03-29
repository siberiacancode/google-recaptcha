import type { Container, GoogleReCaptcha } from '@google-recaptcha/core';
import type { ReactNode } from 'react';

import {
  checkGoogleReCaptchaInjected,
  hideGoogleReCaptchaBadge,
  injectGoogleReCaptchaScript,
  removeGoogleReCaptchaBadge,
  removeGoogleReCaptchaContainer,
  removeGoogleReCaptchaScript
} from '@google-recaptcha/core';
import React, { useEffect, useMemo, useState } from 'react';

import { GoogleReCaptchaContext } from './GoogleReCaptchaContext';

export interface GoogleReCaptchaDefaultProviderProps {
  children?: ReactNode;
  host?: GoogleReCaptcha.Host;
  isEnterprise?: boolean;
  language?: string;
  scriptProps?: GoogleReCaptcha.Script;
  siteKey: string;
  onError?: () => Promise<void>;
  onLoad?: (googleReCaptcha: GoogleReCaptcha.Instance) => Promise<void> | void;
}

export interface Explicit {
  container?: Container;
  inherit?: boolean;
  tabIndex?: number;
  callback?: (token: string) => void;
  errorCallback?: () => void;
  expiredCallback?: () => void;
}

export interface GoogleReCaptchaV2InvisibleProviderProps
  extends GoogleReCaptchaDefaultProviderProps {
  type: Extract<GoogleReCaptcha.Type, 'v2-invisible'>;
  explicit?: Explicit & {
    badge?: GoogleReCaptcha.Badge;
  };
}
export interface GoogleReCaptchaV2CheckBoxProviderProps
  extends GoogleReCaptchaDefaultProviderProps {
  type: Extract<GoogleReCaptcha.Type, 'v2-checkbox'>;
  explicit?: Explicit & {
    container: Container;
    action?: GoogleReCaptcha.Action['action'];
    theme?: GoogleReCaptcha.Theme;
    size?: GoogleReCaptcha.Size['v2-checkbox'];
  };
}
export interface GoogleReCaptchaV3ProviderProps extends GoogleReCaptchaDefaultProviderProps {
  type: Extract<GoogleReCaptcha.Type, 'v3'>;
  explicit?: Explicit & {
    badge?: GoogleReCaptcha.Badge;
  };
}

export type GoogleReCaptchaProviderProps =
  | GoogleReCaptchaV2CheckBoxProviderProps
  | GoogleReCaptchaV2InvisibleProviderProps
  | GoogleReCaptchaV3ProviderProps;

const onLoadCallbackName = 'onGoogleReCaptchaLoad';
const containerId = 'google-recaptcha-container';

/**
/**
 * Google reCAPTCHA provider component
 *
 * @param {GoogleReCaptcha.Type} props.type - The reCAPTCHA type (v2-checkbox, v2-invisible, or v3)
 * @param {string} props.siteKey - The site key for Google reCAPTCHA
 * @param {string} [props.language] - The language for the reCAPTCHA widget
 * @param {GoogleReCaptcha.Script} [props.scriptProps] - Additional script properties
 * @param {boolean} [props.isEnterprise] - Whether to use reCAPTCHA Enterprise
 * @param {string} [props.host] - Custom host for the reCAPTCHA script
 * @param {object} [props.explicit] - Configuration for explicit rendering
 * @param {Function} [props.onLoad] - Callback function when reCAPTCHA is loaded
 * @param {Function} [props.onError] - Callback function when an error occurs
 * 
 * @returns The provider component with its children
 */
export const GoogleReCaptchaProvider = ({
  type,
  siteKey,
  language,
  scriptProps,
  isEnterprise = false,
  host,
  children,
  explicit,
  onLoad,
  onError
}: GoogleReCaptchaProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [googleReCaptchaInstance, setGoogleReCaptchaInstance] =
    useState<GoogleReCaptcha.Instance>();

  useEffect(() => {
    const scriptId = scriptProps?.id ?? `google-recaptcha-${type}-script`;
    const isGoogleReCaptchaInjected = checkGoogleReCaptchaInjected();

    const onload = () => {
      setIsLoading(true);
      const googleReCaptcha: GoogleReCaptcha.Instance = isEnterprise
        ? (window as any).grecaptcha?.enterprise
        : (window as any).grecaptcha;

      if (!googleReCaptcha) {
        if (onError) onError();
        return;
      }

      if (!explicit) {
        googleReCaptcha.ready(async () => {
          setGoogleReCaptchaInstance(googleReCaptcha);
          if (onLoad) await onLoad(googleReCaptcha);
          setIsLoading(false);
        });
      }

      if (explicit) {
        const params = {
          size: type === 'v3' || type === 'v2-invisible' ? 'invisible' : 'normal',
          ...((type === 'v3' || type === 'v2-invisible') && ({ badge: 'bottomright' } as const)),
          sitekey: siteKey,
          ...explicit,
          'expired-callback': explicit.expiredCallback,
          'error-callback': explicit.errorCallback
        } as const;

        if (!isGoogleReCaptchaInjected) {
          const isV3AndV2OptWidgetHidden =
            (type === 'v3' || type === 'v2-invisible') && explicit?.badge === 'hidden';

          if (isV3AndV2OptWidgetHidden) hideGoogleReCaptchaBadge();
        }

        googleReCaptcha.ready(async () => {
          if (explicit.container)
            googleReCaptcha.render(explicit.container, params, !!explicit.inherit);
          setGoogleReCaptchaInstance(googleReCaptcha);
          if (onLoad) await onLoad(googleReCaptcha);
          setIsLoading(false);
        });
      }
    };
    (window as any)[onLoadCallbackName] = onload;

    if (isGoogleReCaptchaInjected) {
      onload();
    } else {
      injectGoogleReCaptchaScript({
        isEnterprise,
        host,
        ...((type === 'v3' || type === 'v2-invisible') &&
          explicit?.badge && {
          badge: explicit?.badge === 'hidden' ? 'bottomright' : explicit?.badge
        }),
        ...(language && { hl: language }),
        render:
          ((type === 'v3' || type === 'v2-invisible') && explicit?.container) ||
            type === 'v2-checkbox'
            ? 'explicit'
            : siteKey,
        ...scriptProps,
        onload,
        id: scriptId
      });
    }

    return () => {
      if (checkGoogleReCaptchaInjected()) removeGoogleReCaptchaScript();
      if ((type === 'v3' || type === 'v2-invisible') && !explicit?.container && explicit?.badge) {
        removeGoogleReCaptchaContainer(containerId);
      } else {
        removeGoogleReCaptchaBadge();
      }
    };
  }, [isEnterprise, language, host, siteKey, type]);

  const executeV3 = (action: GoogleReCaptcha.Action['action']) => {
    if (!googleReCaptchaInstance?.execute) throw new Error('Google ReCaptcha has not been loaded');
    return googleReCaptchaInstance.execute(siteKey, { action });
  };

  const executeV2Invisible = (optWidgetId?: GoogleReCaptcha.OptWidgetId) => {
    if (!googleReCaptchaInstance?.execute) throw new Error('Google ReCaptcha has not been loaded');
    return googleReCaptchaInstance.execute(optWidgetId);
  };

  const value = useMemo(
    () => ({
      instance: googleReCaptchaInstance,
      siteKey,
      isLoading,
      executeV2Invisible,
      executeV3,
      reset: googleReCaptchaInstance?.reset,
      getResponse: googleReCaptchaInstance?.getResponse,
      render: googleReCaptchaInstance?.render,
      ...(language && { language })
    }),
    [googleReCaptchaInstance, siteKey, isLoading, language]
  );

  return <GoogleReCaptchaContext value={value}>{children}</GoogleReCaptchaContext>;
};
