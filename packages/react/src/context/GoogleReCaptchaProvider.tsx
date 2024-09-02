import type { FC, ReactNode } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ContainerId, GoogleReCaptcha } from '@google-recaptcha/core';
import {
  checkGoogleReCaptchaInjected,
  hideGoogleReCaptchaBadge,
  injectGoogleReCaptchaScript,
  removeGoogleReCaptchaBadge,
  removeGoogleReCaptchaContainer,
  removeGoogleReCaptchaScript
} from '@google-recaptcha/core';

import { GoogleReCaptchaContextProvider } from './GoogleReCaptchaContext';

interface GoogleReCaptchaDefaultProviderProps {
  siteKey: string;
  language?: string;
  isEnterprise?: boolean;
  onLoad?: (googleReCaptcha: GoogleReCaptcha.Instance) => Promise<void> | void;
  onError?: () => Promise<void>;
  host?: GoogleReCaptcha.Host;
  children?: ReactNode;
  scriptProps?: GoogleReCaptcha.Script;
}

interface Explicit {
  container?: ContainerId | HTMLElement;
  tabIndex?: number;
  inherit?: boolean;
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
    container: ContainerId | HTMLElement;
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
  | GoogleReCaptchaV3ProviderProps
  | GoogleReCaptchaV2InvisibleProviderProps
  | GoogleReCaptchaV2CheckBoxProviderProps;

const onLoadCallbackName = 'onGoogleReCaptchaLoad';
const containerId = 'google-recaptcha-container';

/**
 * Renders the Google ReCaptcha component and handles the loading and initialization of the ReCaptcha script.
 *
 * @param {GoogleReCaptchaProviderProps} props - The props for the GoogleReCaptchaProvider component.
 * @return {ReactElement} The rendered GoogleReCaptchaProvider component.
 */
export const GoogleReCaptchaProvider: FC<GoogleReCaptchaProviderProps> = ({
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
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [googleReCaptchaInstance, setGoogleReCaptchaInstance] =
    useState<GoogleReCaptcha.Instance>();

  useEffect(() => {
    if (!siteKey) {
      throw new Error('Google ReCaptcha site key not provided');
    }

    const scriptId = scriptProps?.id ?? 'google-recaptcha-script';
    const isGoogleReCaptchaInjected = checkGoogleReCaptchaInjected(scriptId);

    const onload = () => {
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
          setIsLoading(true);
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

          if (isV3AndV2OptWidgetHidden) {
            hideGoogleReCaptchaBadge();
          }
        }

        googleReCaptcha.ready(async () => {
          if (explicit.container) {
            googleReCaptcha.render(explicit.container, params, !!explicit.inherit);
          }

          setGoogleReCaptchaInstance(googleReCaptcha);

          if (onLoad) await onLoad(googleReCaptcha);
          setIsLoading(true);
        });
      }
    };
    (window as unknown as { [key: string]: () => void })[onLoadCallbackName] = onload;

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
      googleReCaptchaInstance?.reset();
      if (!checkGoogleReCaptchaInjected(scriptId)) removeGoogleReCaptchaScript(scriptId);
      if ((type === 'v3' || type === 'v2-invisible') && !explicit?.container && explicit?.badge) {
        removeGoogleReCaptchaContainer(containerId);
      } else {
        removeGoogleReCaptchaBadge();
      }
    };
  }, [isEnterprise, language, host]);

  const executeV3 = useCallback(
    (action: GoogleReCaptcha.Action['action']) => {
      if (!googleReCaptchaInstance?.execute) {
        throw new Error('Google ReCaptcha has not been loaded');
      }

      return googleReCaptchaInstance.execute(siteKey, { action });
    },
    [googleReCaptchaInstance]
  );

  const executeV2Invisible = useCallback(
    (optWidgetId?: GoogleReCaptcha.OptWidgetId) => {
      if (!googleReCaptchaInstance?.execute) {
        throw new Error('Google ReCaptcha has not been loaded');
      }

      return googleReCaptchaInstance.execute(optWidgetId);
    },
    [googleReCaptchaInstance]
  );

  const value = useMemo(
    () => ({
      googleReCaptcha: googleReCaptchaInstance,
      siteKey,
      isLoading,
      executeV2Invisible,
      executeV3,
      reset: googleReCaptchaInstance?.reset,
      getResponse: googleReCaptchaInstance?.getResponse,
      render: googleReCaptchaInstance?.render,
      ...(language && { language })
    }),
    [siteKey, googleReCaptchaInstance, isLoading, language]
  );

  return <GoogleReCaptchaContextProvider value={value}>{children}</GoogleReCaptchaContextProvider>;
};
