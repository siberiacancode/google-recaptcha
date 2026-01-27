<script setup lang="ts">
import type { GoogleReCaptcha } from '@google-recaptcha/core';

import { provide, readonly } from 'vue';

import type { GoogleReCaptchaOptions } from '../composables/useGoogleReCaptchaProvider';

import { useGoogleReCaptchaProvider } from '../composables/useGoogleReCaptchaProvider';
import { RECAPTCHA_KEY } from '../plugins/google-recaptcha-plugin';

const props = defineProps<GoogleReCaptchaOptions>();

const emit = defineEmits<{
  (e: 'load', googleReCaptcha: GoogleReCaptcha.Instance): void;
  (e: 'error'): void;
}>();

const googleReCaptcha = useGoogleReCaptchaProvider({
  ...props,
  onLoad: (googleReCaptcha) => {
    emit('load', googleReCaptcha);
  },
  onError: async () => {
    emit('error');
  }
});

provide(RECAPTCHA_KEY, readonly(googleReCaptcha));
</script>

<template>
  <slot />
</template>
