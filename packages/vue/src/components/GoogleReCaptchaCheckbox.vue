<script setup lang="ts">
import type { GoogleReCaptcha } from '@google-recaptcha/core';

import { removeGoogleReCaptchaContainer } from '@google-recaptcha/core';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import { useGoogleReCaptcha } from '../composables/useGoogleReCaptcha';

const props = defineProps<GoogleReCaptchaCheckboxProps>();

const emit = defineEmits<{
  (event: 'change', token: string): void;
  (event: 'error'): void;
  (event: 'expired'): void;
  (event: 'update:token', token: string): void;
}>();

const CHECKBOX_CONTAINER_ID = 'google-recaptcha-checkbox-container';

export interface GoogleReCaptchaCheckboxProps {
  action?: string;
  id: string;
  language?: GoogleReCaptcha.Language;
  size?: GoogleReCaptcha.Size['v2-checkbox'];
  theme?: GoogleReCaptcha.Theme;
}

const id = props.id ?? CHECKBOX_CONTAINER_ID;
const googleReCaptchaCheckboxContainerRef = ref<HTMLDivElement | null>(null);
const googleReCaptcha = useGoogleReCaptcha();
const hl = computed(() => props.language ?? googleReCaptcha.language);

const renderCaptcha = () => {
  if (!googleReCaptcha.render) return;
  const checkbox = document.createElement('div');

  const params = {
    sitekey: googleReCaptcha.siteKey,
    callback: (token: string) => {
      emit('change', token);
      emit('update:token', token);
    },
    ...((props.language ?? googleReCaptcha.language) && {
      hl: props.language ?? googleReCaptcha.language
    }),
    ...(props.action && { action: props.action }),
    'expired-callback': () => emit('expired'),
    'error-callback': () => emit('error'),
    size: props.size,
    theme: props.theme
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
    hl,
    props.size,
    props.action,
    props.theme,
    props.id
  ],
  renderCaptcha
);
</script>

<template>
  <div :id="id" ref="googleReCaptchaCheckboxContainerRef" v-bind="$attrs" />
</template>
