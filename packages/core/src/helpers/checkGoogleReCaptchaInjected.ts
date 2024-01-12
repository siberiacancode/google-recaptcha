/**
 * Checks if the Google reCAPTCHA script is injected in the document.
 *
 * @param {string} scriptId - The ID of the script element to check.
 * @return {boolean} Returns true if the Google reCAPTCHA script is injected, false otherwise.
 */
export const checkGoogleReCaptchaInjected = (scriptId: string) =>
  !!document.querySelector(`#${scriptId}`) ||
  !!document.querySelector('script[src*="/recaptcha/"]:not([src*="gstatic"])');
