import type { ContainerId } from '../types';

/**
 * Removes the Google reCAPTCHA container element with the specified container ID.
 *
 * @param {ContainerId} containerId - The ID of the container element to be removed.
 * @return {void} This function does not return a value.
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
