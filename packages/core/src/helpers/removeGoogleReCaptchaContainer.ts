import type { ContainerId } from '../types';

/**
 * Function to remove google recaptcha container after container unmount.
 * This function is used if the user has not specified a container in an explicit.
 *
 * @category Function
 * @param containerId Container id for google recaptcha.
 */

export const removeGoogleReCaptchaContainer = (containerId: ContainerId) => {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  while (container.lastChild) {
    container.lastChild.remove();
  }
};
