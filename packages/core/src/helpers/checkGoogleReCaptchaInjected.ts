/**
 * Checks if the Google reCAPTCHA script is injected in the document.
 *
 * @return {boolean} Returns true if the Google reCAPTCHA script is injected, false otherwise.
 */
export const checkGoogleReCaptchaInjected = () =>
  !!document.querySelector('script[src*="/recaptcha/"]:not([src*="gstatic"])');
