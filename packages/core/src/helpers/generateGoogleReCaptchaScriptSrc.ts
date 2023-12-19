import type { GoogleReCaptcha } from '../types';

interface GenerateGoogleReCaptchaSrcParams {
  host?: GoogleReCaptcha.Host;
  isEnterprise?: boolean;
  render: string;
  hl?: string;
  badge?: Exclude<GoogleReCaptcha.Badge, 'hidden'>;
}

/**
 * Function to generate a script link src for google recaptcha.
 *
 * @category Function
 * @params object The link params.
 * @returns Script link src.
 */

export const generateGoogleReCaptchaScriptSrc = ({
  host = 'google.com',
  isEnterprise = false,
  render,
  hl,
  badge
}: GenerateGoogleReCaptchaSrcParams) => {
  const queries = new URLSearchParams({
    ...(hl && { hl }),
    ...(badge && { badge }),
    render
  });

  const file = isEnterprise ? 'enterprise.js' : 'api.js';

  return `https://www.${host}/recaptcha/${file}?${queries}`;
};
