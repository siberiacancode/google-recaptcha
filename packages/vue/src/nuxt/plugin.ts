// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
import { defineNuxtPlugin } from '#imports';

import type { GoogleReCaptchaOptions } from '../plugins/google-recaptcha-plugin';

import { googleReCaptcha } from '../plugins/google-recaptcha-plugin';

export default defineNuxtPlugin({
  name: 'google-recaptcha',
  parallel: true,
  setup: async (nuxtApp: any) => {
    const options = nuxtApp.$config.public.googleReCaptcha as GoogleReCaptchaOptions;

    nuxtApp.vueApp.use(googleReCaptcha, options);
  }
});
