import React from 'react';

import type { GoogleReCaptchaContextProps } from './GoogleReCaptchaContext';
import { GoogleReCaptchaContextConsumer } from './GoogleReCaptchaContext';

export interface WithGoogleReCaptchaParams {
  googleReCaptcha: GoogleReCaptchaContextProps;
}

export const withGoogleReCaptcha = <OwnProps,>(
  Component: React.ComponentType<OwnProps & WithGoogleReCaptchaParams>
) => {
  const WithGoogleReCaptchaComponent = (props: OwnProps & Partial<WithGoogleReCaptchaParams>) => (
    <GoogleReCaptchaContextConsumer>
      {(value) => <Component {...props} googleReCaptcha={value} />}
    </GoogleReCaptchaContextConsumer>
  );

  WithGoogleReCaptchaComponent.displayName = `withGoogleReCaptcha(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WithGoogleReCaptchaComponent;
};
