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
import { onMounted, onUnmounted, provide, reactive, readonly, ref, watch } from 'vue';

import type { GoogleReCaptchaState } from '../plugins/google-recaptcha-plugin';

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

const props = defineProps<GoogleReCaptchaProviderProps>();

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
  return googleReCaptchaInstance.value.execute(props.siteKey, { action });
};

const executeV2Invisible = (optWidgetId?: GoogleReCaptcha.OptWidgetId) => {
  if (!googleReCaptchaInstance.value?.execute)
    throw new Error('Google ReCaptcha has not been loaded');
  return googleReCaptchaInstance.value.execute(optWidgetId);
};

const state = reactive<GoogleReCaptchaState>({
  get instance() {
    return googleReCaptchaInstance.value;
  },
  siteKey: props.siteKey,
  isLoading: isLoading.value,
  language: props.language,
  executeV3,
  executeV2Invisible,
  reset: googleReCaptchaInstance.value?.reset,
  getResponse: googleReCaptchaInstance.value?.getResponse,
  render: googleReCaptchaInstance.value?.render
});

const renderCaptcha = () => {
  const scriptId = props.scriptProps?.id ?? `google-recaptcha-${props.type}-script`;
  const isGoogleReCaptchaInjected = checkGoogleReCaptchaInjected();

  const onload = () => {
    isLoading.value = true;
    const googleReCaptcha: GoogleReCaptcha.Instance = props.isEnterprise
      ? (window as any).grecaptcha?.enterprise
      : (window as any).grecaptcha;

    if (!googleReCaptcha) {
      emit('error');
      return;
    }

    if (!props.explicit) {
      googleReCaptcha.ready(async () => {
        googleReCaptchaInstance.value = googleReCaptcha;
        state.reset = googleReCaptcha.reset;
        state.getResponse = googleReCaptcha.getResponse;
        state.render = googleReCaptcha.render;

        emit('load', googleReCaptcha);
        isLoading.value = false;
      });
    }

    if (props.explicit) {
      const params = {
        size: props.type === 'v3' || props.type === 'v2-invisible' ? 'invisible' : 'normal',
        ...((props.type === 'v3' || props.type === 'v2-invisible') &&
          ({ badge: 'bottomright' } as const)),
        sitekey: props.siteKey,
        ...props.explicit,
        'expired-callback': props.explicit.expiredCallback,
        'error-callback': props.explicit.errorCallback
      } as const;

      if (!isGoogleReCaptchaInjected) {
        const isV3AndV2OptWidgetHidden =
          (props.type === 'v3' || props.type === 'v2-invisible') &&
          props.explicit?.badge === 'hidden';

        if (isV3AndV2OptWidgetHidden) hideGoogleReCaptchaBadge();
      }

      googleReCaptcha.ready(async () => {
        if (props.explicit!.container)
          googleReCaptcha.render(props.explicit!.container, params, !!props.explicit!.inherit);

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
      isEnterprise: props.isEnterprise,
      host: props.host,
      ...((props.type === 'v3' || props.type === 'v2-invisible') &&
        props.explicit?.badge && {
          badge: props.explicit?.badge === 'hidden' ? 'bottomright' : props.explicit?.badge
        }),
      ...(props.language && { hl: props.language }),
      render:
        ((props.type === 'v3' || props.type === 'v2-invisible') && props.explicit?.container) ||
        props.type === 'v2-checkbox'
          ? 'explicit'
          : props.siteKey,
      ...props.scriptProps,
      onload,
      id: scriptId
    });
  }
};

onMounted(renderCaptcha);

watch(
  () => [props.siteKey, props.type, props.isEnterprise, props.language, props.host],
  renderCaptcha
);

onUnmounted(() => {
  if (checkGoogleReCaptchaInjected()) removeGoogleReCaptchaScript();
  if (
    (props.type === 'v3' || props.type === 'v2-invisible') &&
    !props.explicit?.container &&
    props.explicit?.badge
  ) {
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
