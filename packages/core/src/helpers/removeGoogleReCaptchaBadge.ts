/**
 * Function to remove google recaptcha badge after container unmount
 *
 * @category Function
 */

export const removeGoogleReCaptchaBadge = () => {
  const nodeBadge = document.querySelector('.grecaptcha-badge');
  if (nodeBadge && nodeBadge.parentNode) {
    document.body.removeChild(nodeBadge.parentNode);
  }
};
