import React from 'react';
import { render } from '@testing-library/react';

import type { GoogleReCaptchaProviderProps } from './GoogleReCaptchaProvider';
import { GoogleReCaptchaProvider } from './GoogleReCaptchaProvider';

const googleReCaptchaProviderProps = {
  children: 'children',
  type: 'v3',
  siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
} satisfies GoogleReCaptchaProviderProps;

describe('Google ReCaptcha', () => {
  it('Should inject google recatcha script', () => {
    render(<GoogleReCaptchaProvider {...googleReCaptchaProviderProps} />);

    const script = document.querySelector('#google-recaptcha-script');

    expect(script).toHaveAttribute(
      'src',
      'https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    );
    expect(script).toBeInTheDocument();
  });

  it('Should not inject new script of google recatcha if script already exist', () => {
    render(
      <>
        <script src='https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' />
        <GoogleReCaptchaProvider {...googleReCaptchaProviderProps} />
      </>
    );

    const script = document.querySelectorAll('script[src*="/recaptcha/"]:not([src*="gstatic"])');

    expect(script).toHaveLength(1);
  });

  it('Should inject google recatcha enterprise script', () => {
    render(<GoogleReCaptchaProvider {...googleReCaptchaProviderProps} isEnterprise />);

    const script = document.querySelector('#google-recaptcha-script');

    expect(script).toHaveAttribute(
      'src',
      'https://www.google.com/recaptcha/enterprise.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    );
    expect(script).toBeInTheDocument();
  });

  it('Should inject google recatcha script with host', () => {
    render(<GoogleReCaptchaProvider {...googleReCaptchaProviderProps} host='recaptcha.net' />);

    const script = document.querySelector('#google-recaptcha-script');

    expect(script).toHaveAttribute(
      'src',
      'https://www.recaptcha.net/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    );
    expect(script).toBeInTheDocument();
  });
});

describe('Google ReCaptcha v3', () => {
  it('Should inject google recatcha script with language', () => {
    render(<GoogleReCaptchaProvider {...googleReCaptchaProviderProps} language='ru' />);

    const script = document.querySelector('#google-recaptcha-script');

    expect(script).toHaveAttribute(
      'src',
      'https://www.google.com/recaptcha/api.js?hl=ru&render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    );
    expect(script).toBeInTheDocument();
  });

  it('Should inject google recatcha script explicit', () => {
    render(
      <>
        <div id='container' />
        <GoogleReCaptchaProvider
          {...googleReCaptchaProviderProps}
          explicit={{ container: 'container' }}
        />
      </>
    );

    const script = document.querySelector('#google-recaptcha-script');

    expect(script).toHaveAttribute(
      'src',
      'https://www.google.com/recaptcha/api.js?render=explicit'
    );
    expect(script).toBeInTheDocument();
  });
});

describe('Google ReCaptcha v2', () => {
  it('Should inject google recatcha script with language', () => {
    render(
      <GoogleReCaptchaProvider
        {...googleReCaptchaProviderProps}
        type='v2-invisible'
        language='ru'
      />
    );

    const script = document.querySelector('#google-recaptcha-script');

    expect(script).toHaveAttribute(
      'src',
      'https://www.google.com/recaptcha/api.js?hl=ru&render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    );
    expect(script).toBeInTheDocument();
  });

  it('Should inject google recatcha script explicit', () => {
    render(
      <>
        <div id='container' />
        <GoogleReCaptchaProvider
          {...googleReCaptchaProviderProps}
          type='v2-invisible'
          explicit={{ container: 'container' }}
        />
      </>
    );

    const script = document.querySelector('#google-recaptcha-script');

    expect(script).toHaveAttribute(
      'src',
      'https://www.google.com/recaptcha/api.js?render=explicit'
    );
    expect(script).toBeInTheDocument();
  });
});
