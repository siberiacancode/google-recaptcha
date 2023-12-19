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
 * Function to inject a script link src for google recaptcha.
 *
 * @category Function
 * @params object The link and script params.
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
