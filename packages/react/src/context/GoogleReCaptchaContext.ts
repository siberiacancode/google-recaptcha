import { createContext } from 'react';
import type { Container, GoogleReCaptcha } from '@google-recaptcha/core';

export interface GoogleReCaptchaContextProps {
  googleReCaptcha: any;
  siteKey: string;
  isLoading: boolean;
  language?: GoogleReCaptcha.Language;
  executeV3?: (action: GoogleReCaptcha.Action['action']) => Promise<string>;
  executeV2Invisible?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => Promise<void>;
  reset?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => void;
  getResponse?: (optWidgetId?: GoogleReCaptcha.OptWidgetId) => void;
  render?: (
    container: Container,
    parameters?: GoogleReCaptcha.Parameters,
    inherit?: boolean
  ) => void;
}

const contextError =
  'GoogleReCaptcha Context has not yet been implemented, if you are using useGoogleReCaptcha hook, make sure the hook is called inside component wrapped by GoogleRecaptchaProvider';

export const GoogleReCaptchaContext = createContext<GoogleReCaptchaContextProps>({
  googleReCaptcha: {},
  siteKey: '',
  language: '',
  isLoading: true,
  executeV3: () => {
    throw new Error(contextError);
  },
  executeV2Invisible: () => {
    throw new Error(contextError);
  },
  reset: () => {
    throw new Error(contextError);
  },
  getResponse: () => {
    throw new Error(contextError);
  },
  render: () => {
    throw new Error(contextError);
  }
});

export const {
  Provider: GoogleReCaptchaContextProvider,
  Consumer: GoogleReCaptchaContextConsumer
} = GoogleReCaptchaContext;
