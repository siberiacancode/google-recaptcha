import type { Container, GoogleReCaptcha } from '@google-recaptcha/core';
import {
  checkGoogleReCaptchaInjected,
  hideGoogleReCaptchaBadge,
  injectGoogleReCaptchaScript,
  removeGoogleReCaptchaBadge,
  removeGoogleReCaptchaContainer,
  removeGoogleReCaptchaScript
} from '@google-recaptcha/core';
import { onMounted, onUnmounted, reactive, readonly, ref, watch } from 'vue';

export interface GoogleReCaptchaDefaultOptions {
  host?: GoogleReCaptcha.Host;
  isEnterprise?: boolean;
  language?: string;
  scriptProps?: GoogleReCaptcha.Script;
  siteKey: string;
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

export const useGoogleReCaptchaProvider = (options: GoogleReCaptchaOptions) => {
  const { type, siteKey, language, scriptProps, isEnterprise = false, host, explicit } = options;

  const onLoadCallbackName = 'onGoogleReCaptchaLoad';
  const containerId = 'google-recaptcha-container';

  const isLoading = ref(true);
  const googleReCaptchaInstance = ref<GoogleReCaptcha.Instance>();

  const executeV3 = (action: GoogleReCaptcha.Action['action']) => {
    if (!googleReCaptchaInstance.value?.execute)
      throw new Error('Google ReCaptcha has not been loaded');
    return googleReCaptchaInstance.value.execute(siteKey, { action });
  };

  const executeV2Invisible = (optWidgetId?: GoogleReCaptcha.OptWidgetId) => {
    if (!googleReCaptchaInstance.value?.execute)
      throw new Error('Google ReCaptcha has not been loaded');
    return googleReCaptchaInstance.value.execute(optWidgetId);
  };

  const state = reactive({
    get instance() {
      return googleReCaptchaInstance.value;
    },
    siteKey,
    isLoading,
    language: language as GoogleReCaptcha.Language,
    executeV3,
    executeV2Invisible,
    reset: googleReCaptchaInstance.value?.reset,
    getResponse: googleReCaptchaInstance.value?.getResponse,
    render: googleReCaptchaInstance.value?.render
  });

  const renderCaptcha = () => {
    const scriptId = scriptProps?.id ?? `google-recaptcha-${type}-script`;
    const isGoogleReCaptchaInjected = checkGoogleReCaptchaInjected();

    const onload = () => {
      isLoading.value = true;
      const googleReCaptcha: GoogleReCaptcha.Instance = isEnterprise
        ? (window as any).grecaptcha?.enterprise
        : (window as any).grecaptcha;

      if (!explicit) {
        googleReCaptcha.ready(async () => {
          googleReCaptchaInstance.value = googleReCaptcha;
          state.reset = googleReCaptcha.reset;
          state.getResponse = googleReCaptcha.getResponse;
          state.render = googleReCaptcha.render;

          isLoading.value = false;
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

          googleReCaptchaInstance.value = googleReCaptcha;
          state.reset = googleReCaptcha.reset;
          state.getResponse = googleReCaptcha.getResponse;
          state.render = googleReCaptcha.render;

          isLoading.value = false;
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
  };

  onMounted(renderCaptcha);

  watch(() => [siteKey, type, isEnterprise, language, host], renderCaptcha);

  onUnmounted(() => {
    if (checkGoogleReCaptchaInjected()) removeGoogleReCaptchaScript();
    if ((type === 'v3' || type === 'v2-invisible') && !explicit?.container && explicit?.badge) {
      removeGoogleReCaptchaContainer(containerId);
    } else {
      removeGoogleReCaptchaBadge();
    }
  });

  return readonly(state);
};
