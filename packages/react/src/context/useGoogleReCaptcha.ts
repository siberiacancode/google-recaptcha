import { useContext } from 'react';

import { GoogleReCaptchaContext } from './GoogleReCaptchaContext';

/**
 * The useGoogleReCaptcha hook is used to access the GoogleReCaptchaContext
 *
 * @returns The context value containing the GoogleReCaptcha instance and related methods
 */
export const useGoogleReCaptcha = () => useContext(GoogleReCaptchaContext);
