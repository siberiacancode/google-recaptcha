export const GSTATIC_URL = 'https://www.gstatic.com/recaptcha/releases';

/**
 * Removes the Google reCAPTCHA container element.
 *
 * @return {void} This function does not return a value.
 */
export const removeGoogleReCaptchaScript = () => {
  (window as any).___grecaptcha_cfg = undefined;

  const googleReCaptchaScript = document.querySelector(
    'script[src*="/recaptcha/"]:not([src*="gstatic"])'
  );
  if (googleReCaptchaScript) googleReCaptchaScript.remove();

  const gStaticScript = document.querySelector(`script[src^="${GSTATIC_URL}"]`);
  if (gStaticScript) gStaticScript.remove();
};
