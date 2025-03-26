import { inject } from 'vue';

import type { GoogleReCaptchaState } from '../plugins/google-recaptcha-plugin';

import { RECAPTCHA_KEY } from '../plugins/google-recaptcha-plugin';

const PROVIDER_ERROR =
  'GoogleReCaptcha has not yet been provided, if you are using useGoogleReCaptcha composable, make sure you have provided the GoogleReCaptcha';

/**
 * Composable to access Google ReCaptcha functionality
 *
 * @returns The Google ReCaptcha state and methods
 */
export const useGoogleReCaptcha = () => {
  const googleReCaptchaState = inject<GoogleReCaptchaState>(RECAPTCHA_KEY);
  console.log(googleReCaptchaState, googleReCaptchaState);
  if (!googleReCaptchaState) throw new Error(PROVIDER_ERROR);
  return googleReCaptchaState;
};
