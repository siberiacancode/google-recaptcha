import { defineNuxtPlugin } from 'nuxt/app';

import type { GoogleReCaptchaOptions } from '../../plugins/google-recaptcha-plugin';

import { googleReCaptcha } from '../../plugins/google-recaptcha-plugin';

const pluginClient = defineNuxtPlugin({
  name: 'google-recaptcha',
  parallel: true,
  setup: async (nuxtApp: any) => {
    const options = nuxtApp.$config.public.googleReCaptcha as GoogleReCaptchaOptions;
    nuxtApp.vueApp.use(googleReCaptcha, options);
  }
});

export default pluginClient;
