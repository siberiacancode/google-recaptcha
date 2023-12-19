export const GSTATIC_URL = 'https://www.gstatic.com/recaptcha/releases';

/**
 * Function to remove google recaptcha script after container unmount.
 * This function is called if it was not created independently.
 *
 * @category Function
 * @param scriptId Script id of google recaptcha.
 */

export const removeGoogleReCaptchaScript = (scriptId: string) => {
  // eslint-disable-next-line no-underscore-dangle
  (window as any).___grecaptcha_cfg = undefined;

  const googleReCaptchaScript = document.querySelector(`#${scriptId}`);
  if (googleReCaptchaScript) {
    googleReCaptchaScript.remove();
  }

  const gStaticScript = document.querySelector(`script[src^="${GSTATIC_URL}"]`);

  if (gStaticScript) {
    gStaticScript.remove();
  }
};
