import { generateGoogleReCaptchaHiddenBadgeStyles } from './generateGoogleReCaptchaHiddenBadgeStyles';

/**
 * A function that hides the google recaptcha badge from the page.
 * This function is executed if the script was implicitly integrated.
 *
 * @category Function
 */

export const hideGoogleReCaptchaBadge = () => {
  const style = document.createElement('style');
  style.innerHTML = generateGoogleReCaptchaHiddenBadgeStyles();
  document.body.appendChild(style);
};
