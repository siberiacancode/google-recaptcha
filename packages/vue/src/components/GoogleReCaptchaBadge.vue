<script setup lang="ts">
import type { GoogleReCaptcha } from '@google-recaptcha/core';

import { removeGoogleReCaptchaContainer } from '@google-recaptcha/core';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import { useGoogleReCaptcha } from '../composables/useGoogleReCaptcha';

const props = defineProps<GoogleReCaptchaBadgeProps>();

const emit = defineEmits<{
  (event: 'change', token: string): void;
  (event: 'error'): void;
  (event: 'expired'): void;
  (event: 'update:token', token: string): void;
}>();

const BADGE_CONTAINER_ID = 'google-recaptcha-badge-container';

export interface GoogleReCaptchaBadgeProps {
  badge?: GoogleReCaptcha.Badge;
  id?: string;
  language?: GoogleReCaptcha.Language;
  theme?: GoogleReCaptcha.Theme;
}

const id = props.id ?? BADGE_CONTAINER_ID;
const googleReCaptchaBadgeContainerRef = ref<HTMLDivElement | null>(null);
const googleReCaptcha = useGoogleReCaptcha();
const hl = computed(() => props.language ?? googleReCaptcha.language);

const renderCaptcha = () => {
  if (!googleReCaptcha.render) return;
  const container = document.createElement('div');

  const params = {
    sitekey: googleReCaptcha.siteKey,
    badge: props.badge ?? 'bottomright',
    size: 'invisible',
    callback: (token: string) => {
      emit('change', token);
      emit('update:token', token);
    },
    'expired-callback': () => emit('expired'),
    'error-callback': () => emit('error'),
    theme: props.theme ?? googleReCaptcha.theme,
    ...(hl.value && { hl: hl.value })
  } satisfies GoogleReCaptcha.Parameters;

  googleReCaptcha.render(container, params);

  if (googleReCaptchaBadgeContainerRef.value) {
    googleReCaptchaBadgeContainerRef.value.appendChild(container);
  }
};

onMounted(renderCaptcha);
onUnmounted(() => {
  if (id) {
    removeGoogleReCaptchaContainer(id);
  }
});

watch(
  () => [googleReCaptcha.siteKey, googleReCaptcha.render, hl, props.badge, props.theme, props.id],
  renderCaptcha
);
</script>

<template>
  <g-recaptcha :id="id" ref="googleReCaptchaBadgeContainerRef" v-bind="$attrs" />
</template>
