<script setup lang="ts">
import type { GoogleReCaptcha } from '@google-recaptcha/core';

import { removeGoogleReCaptchaContainer } from '@google-recaptcha/core';
import { onMounted, onUnmounted, ref, useAttrs, watch } from 'vue';

import { useGoogleReCaptcha } from '../composables/useGoogleReCaptcha';

const { action, language, size, theme } = defineProps<GoogleReCaptchaCheckboxProps>();

const emit = defineEmits<{
  (event: 'change', token: string): void;
  (event: 'error'): void;
  (event: 'expired'): void;
}>();

const CHECKBOX_CONTAINER_ID = 'google-recaptcha-checkbox-container';

export interface GoogleReCaptchaCheckboxProps {
  action?: string;
  language?: GoogleReCaptcha.Language;
  size?: GoogleReCaptcha.Size['v2-checkbox'];
  theme?: GoogleReCaptcha.Theme;
}

const attrs = useAttrs();
const id = (attrs.id as string | undefined) ?? CHECKBOX_CONTAINER_ID;

const googleReCaptchaCheckboxContainerRef = ref<HTMLDivElement | null>(null);
const googleReCaptcha = useGoogleReCaptcha();

const renderCaptcha = () => {
  if (!googleReCaptcha.render) return;
  const checkbox = document.createElement('div');

  const params = {
    sitekey: googleReCaptcha.siteKey,
    callback: (token: string) => emit('change', token),
    ...((language ?? googleReCaptcha.language) && {
      hl: language ?? googleReCaptcha.language
    }),
    ...(action && { action }),
    'expired-callback': () => emit('expired'),
    'error-callback': () => emit('error'),
    size,
    theme
  } as GoogleReCaptcha.Parameters;

  googleReCaptcha.render(checkbox, params);

  if (googleReCaptchaCheckboxContainerRef.value) {
    googleReCaptchaCheckboxContainerRef.value.appendChild(checkbox);
  }
};

onMounted(renderCaptcha);
onUnmounted(() => {
  if (id) {
    removeGoogleReCaptchaContainer(id);
  }
});

watch(
  () => [
    googleReCaptcha.siteKey,
    googleReCaptcha.render,
    googleReCaptcha.language,
    id,
    size,
    action,
    theme
  ],
  renderCaptcha,
  { deep: true }
);
</script>

<template>
  <div :id="id" ref="googleReCaptchaCheckboxContainerRef" v-bind="$attrs" />
</template>
