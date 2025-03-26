import type { Container, GoogleReCaptcha } from '@google-recaptcha/core';

import { createContext } from 'react';

export interface GoogleReCaptchaContextProps {
  googleReCaptcha: any;
  isLoading: boolean;
  language?: GoogleReCaptcha.Language;
  siteKey: string;
  executeV2Invisible?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => Promise<void>;
  executeV3?: (action: GoogleReCaptcha.Action['action']) => Promise<string>;
  getResponse?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => void;
  render?: (
    container: Container,
    parameters?: GoogleReCaptcha.Parameters,
    inherit?: boolean
  ) => void;
  reset?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => void;
}

const CONTEXT_ERROR =
  'GoogleReCaptcha Context has not yet been implemented, if you are using useGoogleReCaptcha hook, make sure the hook is called inside component wrapped by GoogleRecaptchaProvider';

export const GoogleReCaptchaContext = createContext<GoogleReCaptchaContextProps>({
  googleReCaptcha: {},
  siteKey: '',
  language: '',
  isLoading: true,
  executeV3: () => {
    throw new Error(CONTEXT_ERROR);
  },
  executeV2Invisible: () => {
    throw new Error(CONTEXT_ERROR);
  },
  reset: () => {
    throw new Error(CONTEXT_ERROR);
  },
  getResponse: () => {
    throw new Error(CONTEXT_ERROR);
  },
  render: () => {
    throw new Error(CONTEXT_ERROR);
  }
});
