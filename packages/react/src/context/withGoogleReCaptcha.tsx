import type { ComponentType } from 'react';

import React from 'react';

import type { GoogleReCaptchaContextParams } from './GoogleReCaptchaContext';

import { GoogleReCaptchaContext } from './GoogleReCaptchaContext';

export interface WithGoogleReCaptchaParams {
  googleReCaptcha: GoogleReCaptchaContextParams;
}

/**
 * Higher-order component that provides the GoogleReCaptchaContext to a component
 *
 * @param {ComponentType<Props>} Component - The component to wrap with GoogleReCaptchaContext
 * @returns A new component that passes the GoogleReCaptchaContext to the wrapped component
 */
export const withGoogleReCaptcha = <Props extends object>(Component: ComponentType<Props>) => {
  const WithGoogleReCaptchaComponent = (props: Props & Partial<WithGoogleReCaptchaParams>) => (
    <GoogleReCaptchaContext.Consumer>
      {(value) => <Component {...props} googleReCaptcha={value} />}
    </GoogleReCaptchaContext.Consumer>
  );

  WithGoogleReCaptchaComponent.displayName = `withGoogleReCaptcha(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WithGoogleReCaptchaComponent;
};
