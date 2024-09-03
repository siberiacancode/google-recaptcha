export const GSTATIC_URL = 'https://www.gstatic.com/recaptcha/releases';

/**
 * Removes the Google reCAPTCHA container element with the specified container ID.
 *
 * @param {string} [scriptId] - The ID of the script element to check.
 * @return {void} This function does not return a value.
 */
export const removeGoogleReCaptchaScript = (scriptId?: string) => {
  (window as any).___grecaptcha_cfg = undefined;

  const googleReCaptchaScript =
    document.querySelector(`#${scriptId}`) ??
    document.querySelector('script[src*="/recaptcha/"]:not([src*="gstatic"])');
  if (googleReCaptchaScript) googleReCaptchaScript.remove();

  const gStaticScript = document.querySelector(`script[src^="${GSTATIC_URL}"]`);
  if (gStaticScript) gStaticScript.remove();
};
