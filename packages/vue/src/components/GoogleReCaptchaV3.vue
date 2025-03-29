<script setup lang="ts">
import { useGoogleReCaptcha } from '../composables/useGoogleReCaptcha';

export interface GoogleReCaptchaV3Props {
  action: string;
}

const props = defineProps<GoogleReCaptchaV3Props>();

const emit = defineEmits<{
  (event: 'update:modelValue', token: string): void;
}>();

const googleReCaptcha = useGoogleReCaptcha();

const onClick = async () => {
  const token = await googleReCaptcha.executeV3(props.action);
  emit('update:modelValue', token);
};
</script>

<template>
  <slot @click="onClick" />
</template>
