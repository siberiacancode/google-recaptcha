import type { GoogleReCaptcha } from '../types';

import { generateGoogleReCaptchaScriptSrc } from './generateGoogleReCaptchaScriptSrc';

interface InjectGoogleReCaptchaScriptParams extends GoogleReCaptcha.Script {
  isEnterprise?: boolean;
  onload: () => void;
  hl?: string;
  host?: GoogleReCaptcha.Host;
  badge?: Exclude<GoogleReCaptcha.Badge, 'hidden'>;
  render: string;
}

/**
 * Injects the Google ReCaptcha script into the DOM.
 *
 * @param {InjectGoogleReCaptchaScriptParams} params - The parameters for injecting the script.
 * @param {Function} params.onload - The callback function to execute when the script has finished loading.
 * @param {string} [params.appendTo='head'] - The element to which the script should be appended.
 * @param {boolean} [params.isEnterprise=false] - Indicates whether the ReCaptcha is an enterprise version.
 * @param {string} [params.host] - The host URL for the ReCaptcha.
 * @param {string} [params.render] - The rendering method for the ReCaptcha.
 * @param {string} [params.badge] - The badge position for the ReCaptcha.
 * @param {string} [params.hl] - The language code for the ReCaptcha.
 * @return {void} This function does not return a value.
 */
export const injectGoogleReCaptchaScript = ({
  onload,
  appendTo = 'head',
  isEnterprise = false,
  host,
  render,
  badge,
  hl,
  ...params
}: InjectGoogleReCaptchaScriptParams) => {
  const googleReCaptchaSrc = generateGoogleReCaptchaScriptSrc({
    host,
    isEnterprise,
    render,
    hl,
    badge
  });

  const script = document.createElement('script');

  Object.entries(params).forEach(([key, value]) => {
    script.setAttribute(key, value?.toString() ?? '');
  });

  script.src = googleReCaptchaSrc;
  script.onload = onload;

  document[appendTo].appendChild(script);
};
