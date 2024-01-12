/**
 * Removes the Google reCAPTCHA badge.
 *
 * @return {void} This function does not return a value.
 */
export const removeGoogleReCaptchaBadge = () => {
  const nodeBadge = document.querySelector('.grecaptcha-badge');
  if (nodeBadge && nodeBadge.parentNode) {
    document.body.removeChild(nodeBadge.parentNode);
  }
};
