import { generateGoogleReCaptchaHiddenBadgeStyles } from './generateGoogleReCaptchaHiddenBadgeStyles';

/**
 * Hides the Google reCAPTCHA badge by injecting a style tag into the document's body.
 *
 * @param {none} - This function does not take any parameters.
 * @return {void} This function does not return a value.
 */
export const hideGoogleReCaptchaBadge = () => {
  const style = document.createElement('style');
  style.innerHTML = generateGoogleReCaptchaHiddenBadgeStyles();
  document.body.appendChild(style);
};
