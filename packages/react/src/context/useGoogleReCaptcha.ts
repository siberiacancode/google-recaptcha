import { useContext } from 'react';

import { GoogleReCaptchaContext } from './GoogleReCaptchaContext';

export const useGoogleReCaptcha = () => useContext(GoogleReCaptchaContext);
