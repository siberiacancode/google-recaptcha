import type { Container, GoogleReCaptcha } from '@google-recaptcha/core';
import type { App, InjectionKey } from 'vue';

import {
  checkGoogleReCaptchaInjected,
  hideGoogleReCaptchaBadge,
  injectGoogleReCaptchaScript,
  removeGoogleReCaptchaBadge,
  removeGoogleReCaptchaContainer,
  removeGoogleReCaptchaScript
} from '@google-recaptcha/core';
import { reactive, readonly } from 'vue';

export interface GoogleReCaptchaState {
  googleReCaptcha?: GoogleReCaptcha.Instance;
  isLoading: boolean;
  language?: GoogleReCaptcha.Language;
  siteKey: string;
  executeV2Invisible: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => Promise<void>;
  executeV3: (action: GoogleReCaptcha.Action['action']) => Promise<string>;
  getResponse?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => string;
  render?: (
    container: Container,
    parameters?: GoogleReCaptcha.Parameters,
    inherit?: boolean
  ) => number;
  reset?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => void;
}

export interface GoogleReCaptchaDefaultOptions {
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

export interface GoogleReCaptchaV2InvisibleOptions extends GoogleReCaptchaDefaultOptions {
  type: Extract<GoogleReCaptcha.Type, 'v2-invisible'>;
  explicit?: Explicit & {
    badge?: GoogleReCaptcha.Badge;
  };
}
export interface GoogleReCaptchaV2CheckBoxOptions extends GoogleReCaptchaDefaultOptions {
  type: Extract<GoogleReCaptcha.Type, 'v2-checkbox'>;
  explicit?: Explicit & {
    container: Container;
    action?: GoogleReCaptcha.Action['action'];
    theme?: GoogleReCaptcha.Theme;
    size?: GoogleReCaptcha.Size['v2-checkbox'];
  };
}
export interface GoogleReCaptchaV3Options extends GoogleReCaptchaDefaultOptions {
  type: Extract<GoogleReCaptcha.Type, 'v3'>;
  explicit?: Explicit & {
    badge?: GoogleReCaptcha.Badge;
  };
}

export type GoogleReCaptchaOptions =
  | GoogleReCaptchaV2CheckBoxOptions
  | GoogleReCaptchaV2InvisibleOptions
  | GoogleReCaptchaV3Options;

export const RECAPTCHA_KEY: InjectionKey<Readonly<GoogleReCaptchaState>> =
  Symbol('google-recaptcha-plugin');

const onLoadCallbackName = 'onGoogleReCaptchaLoad';
const containerId = 'google-recaptcha-container';

export const GoogleReCaptchaPlugin = {
  install(app: App, options: GoogleReCaptchaOptions) {
    const {
      type,
      siteKey,
      language,
      scriptProps,
      isEnterprise = false,
      host,
      explicit,
      onLoad,
      onError
    } = options;

    let googleReCaptchaInstance: GoogleReCaptcha.Instance | undefined;

    const state = reactive<GoogleReCaptchaState>({
      googleReCaptcha: googleReCaptchaInstance,
      siteKey,
      isLoading: true,
      language: language as GoogleReCaptcha.Language,
      executeV3: (action: GoogleReCaptcha.Action['action']) => {
        if (!googleReCaptchaInstance?.execute)
          throw new Error('Google ReCaptcha has not been loaded');
        return googleReCaptchaInstance.execute(siteKey, { action });
      },
      executeV2Invisible: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => {
        if (!googleReCaptchaInstance?.execute)
          throw new Error('Google ReCaptcha has not been loaded');
        return googleReCaptchaInstance.execute(optWidgetId);
      }
    });

    const scriptId = scriptProps?.id ?? `google-recaptcha-${type}-script`;
    const isGoogleReCaptchaInjected = checkGoogleReCaptchaInjected();

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
          googleReCaptchaInstance = googleReCaptcha;
          state.googleReCaptcha = googleReCaptcha;
          state.reset = googleReCaptcha.reset;
          state.getResponse = googleReCaptcha.getResponse;
          state.render = googleReCaptcha.render;

          if (onLoad) await onLoad(googleReCaptcha);
          state.isLoading = false;
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

          googleReCaptchaInstance = googleReCaptcha;
          state.googleReCaptcha = googleReCaptcha;
          state.reset = googleReCaptcha.reset;
          state.getResponse = googleReCaptcha.getResponse;
          state.render = googleReCaptcha.render;

          if (onLoad) await onLoad(googleReCaptcha);
          state.isLoading = false;
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

    app.config.globalProperties.$onUnmounted = () => {
      if (checkGoogleReCaptchaInjected()) removeGoogleReCaptchaScript();
      if ((type === 'v3' || type === 'v2-invisible') && !explicit?.container && explicit?.badge) {
        removeGoogleReCaptchaContainer(containerId);
      } else {
        removeGoogleReCaptchaBadge();
      }
    };

    app.provide(RECAPTCHA_KEY, readonly(state));
  }
};

export default GoogleReCaptchaPlugin;
