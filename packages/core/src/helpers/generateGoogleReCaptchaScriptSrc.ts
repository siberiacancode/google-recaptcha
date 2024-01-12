import type { GoogleReCaptcha } from '../types';

interface GenerateGoogleReCaptchaSrcParams {
  host?: GoogleReCaptcha.Host;
  isEnterprise?: boolean;
  render: string;
  hl?: string;
  badge?: Exclude<GoogleReCaptcha.Badge, 'hidden'>;
}

/**
 * Generates the script source URL for the Google reCAPTCHA.
 *
 * @param {GenerateGoogleReCaptchaSrcParams} params - The parameters for generating the script source URL.
 * @param {string} params.host - The host for the script source URL.
 * @param {boolean} params.isEnterprise - Indicates if the enterprise version of reCAPTCHA should be used.
 * @param {string} params.render - The render parameter for the script source URL.
 * @param {string} params.hl - The hl parameter for the script source URL.
 * @param {string} params.badge - The badge parameter for the script source URL.
 * @return {string} The script source URL for the Google reCAPTCHA.
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
