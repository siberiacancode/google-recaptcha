<script setup lang="ts">
import type { Container, GoogleReCaptcha } from '@google-recaptcha/core';

import {
  checkGoogleReCaptchaInjected,
  hideGoogleReCaptchaBadge,
  injectGoogleReCaptchaScript,
  removeGoogleReCaptchaBadge,
  removeGoogleReCaptchaContainer,
  removeGoogleReCaptchaScript
} from '@google-recaptcha/core';
import { onMounted, onUnmounted, provide, reactive, readonly, ref } from 'vue';

import { RECAPTCHA_KEY } from '../plugins/google-recaptcha-plugin';

export interface GoogleReCaptchaDefaultProviderProps {
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

const { type, siteKey, language, scriptProps, isEnterprise, host, explicit } =
  defineProps<GoogleReCaptchaProviderProps>();

const emit = defineEmits<{
  (e: 'load', googleReCaptcha: GoogleReCaptcha.Instance): void;
  (e: 'error'): void;
}>();

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
  googleReCaptcha: googleReCaptchaInstance,
  siteKey,
  isLoading,
  language,
  executeV3,
  executeV2Invisible,
  reset: googleReCaptchaInstance.value?.reset,
  getResponse: googleReCaptchaInstance.value?.getResponse,
  render: googleReCaptchaInstance.value?.render
});

onMounted(() => {
  const scriptId = scriptProps?.id ?? `google-recaptcha-${type}-script`;
  const isGoogleReCaptchaInjected = checkGoogleReCaptchaInjected();

  const onload = () => {
    const googleReCaptcha: GoogleReCaptcha.Instance = isEnterprise
      ? (window as any).grecaptcha?.enterprise
      : (window as any).grecaptcha;

    if (!googleReCaptcha) {
      emit('error');
      return;
    }

    if (!explicit) {
      googleReCaptcha.ready(async () => {
        googleReCaptchaInstance.value = googleReCaptcha;
        state.reset = googleReCaptcha.reset;
        state.getResponse = googleReCaptcha.getResponse;
        state.render = googleReCaptcha.render;

        emit('load', googleReCaptcha);
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

        emit('load', googleReCaptcha);
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
});

onUnmounted(() => {
  if (checkGoogleReCaptchaInjected()) removeGoogleReCaptchaScript();
  if ((type === 'v3' || type === 'v2-invisible') && !explicit?.container && explicit?.badge) {
    removeGoogleReCaptchaContainer(containerId);
  } else {
    removeGoogleReCaptchaBadge();
  }
});

provide(RECAPTCHA_KEY, readonly(state));
</script>

<template>
  <slot />
</template>
