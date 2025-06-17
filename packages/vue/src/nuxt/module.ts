import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';

import type { GoogleReCaptchaOptions } from '../plugins/google-recaptcha-plugin';

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    googleReCaptcha: GoogleReCaptchaOptions;
  }
}

export default defineNuxtModule({
  meta: {
    name: 'google-recaptcha',
    configKey: 'googleReCaptcha',
    compatibility: {
      nuxt: '^3'
    }
  },
  setup(options, nuxtApp) {
    const resolver = createResolver(import.meta.url);

    if (!options.siteKey) {
      console.warn('[google-recaptcha] Module siteKey is not provided in the configuration');
    }

    if (!options.type) {
      console.warn('[google-recaptcha] Module type is not provided in the configuration');
    }

    addImports([
      {
        from: resolver.resolve('../components/GoogleReCaptchaCheckbox.vue'),
        name: 'GoogleReCaptchaCheckbox'
      },
      {
        from: resolver.resolve('../components/GoogleReCaptchaBadge.vue'),
        name: 'GoogleReCaptchaBadge'
      },
      {
        from: resolver.resolve('../components/GoogleReCaptchaInvisible.vue'),
        name: 'GoogleReCaptchaInvisible'
      },
      {
        from: resolver.resolve('../components/GoogleReCaptchaV3.vue'),
        name: 'GoogleReCaptchaV3'
      },
      {
        from: resolver.resolve('../composables/useGoogleReCaptcha.ts'),
        name: 'useGoogleReCaptcha'
      },
      {
        from: resolver.resolve('../composables/useGoogleReCaptchaProvider.ts'),
        name: 'useGoogleReCaptchaProvider'
      }
    ]);

    nuxtApp.options.runtimeConfig.public.googleReCaptcha = options as GoogleReCaptchaOptions;

    addPlugin(resolver.resolve('./plugin'));
  }
});
