/**
 * This function checks if the script already exists on the page
 *
 * @category Function
 * @param scriptId Script id of google recaptcha.
 * @returns Is script exist value.
 */

export const checkGoogleReCaptchaInjected = (scriptId: string) =>
  !!document.querySelector(`#${scriptId}`) ||
  !!document.querySelector('script[src*="/recaptcha/"]:not([src*="gstatic"])');
