import React from 'react';

import { GoogleReCaptchaContext } from './GoogleReCaptchaContext';

export const useGoogleReCaptcha = () => React.useContext(GoogleReCaptchaContext);
