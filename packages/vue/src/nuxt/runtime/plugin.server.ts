import { generateGoogleReCaptchaScriptSrc } from '@google-recaptcha/core';
import { defineNuxtPlugin, useHead } from 'nuxt/app';
import { readonly } from 'vue';

import type { GoogleReCaptchaOptions } from '../../plugins/google-recaptcha-plugin';

import { RECAPTCHA_KEY } from '../../plugins/google-recaptcha-plugin';

const pluginServer = defineNuxtPlugin({
  name: 'google-recaptcha',
  parallel: true,
  setup: async (nuxtApp: any) => {
    const options = nuxtApp.$config.public.googleReCaptcha as GoogleReCaptchaOptions;
    const {
      type,
      theme,
      siteKey,
      language,
      scriptProps,
      isEnterprise = false,
      host,
      explicit
    } = options;

    const { appendTo: _appendTo, id: scriptPropId } = scriptProps ?? {};
    const scriptId = scriptPropId ?? `google-recaptcha-${type}-script`;

    const badge =
      typeof explicit === 'object' &&
      (type === 'v3' || type === 'v2-invisible') &&
      explicit?.badge &&
      explicit.badge !== 'hidden'
        ? explicit.badge
        : undefined;

    const render =
      ((type === 'v3' || type === 'v2-invisible') &&
        typeof explicit === 'object' &&
        explicit?.container) ||
      type === 'v2-checkbox'
        ? 'explicit'
        : siteKey;

    const src = generateGoogleReCaptchaScriptSrc({
      host,
      isEnterprise,
      render,
      ...(language && { hl: language }),
      ...(badge && { badge })
    });

    useHead({
      script: [
        {
          key: scriptId,
          id: scriptId,
          src
        }
      ]
    });

    nuxtApp.vueApp.provide(
      RECAPTCHA_KEY,
      readonly({
        instance: undefined,
        siteKey,
        isLoading: true,
        theme,
        executeV2Invisible: undefined,
        executeV3: undefined,
        reset: undefined,
        getResponse: undefined,
        render: undefined,
        ...(language && { language })
      })
    );
  }
});

export default pluginServer;
