import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { GoogleReCaptchaProvider } from '../../src/context';

type Story = StoryObj<typeof GoogleReCaptchaProvider>;
const GoogleReCaptchaV3Template: Story = {
  render: (args) => <GoogleReCaptchaProvider {...args} />
};

export const Playground = {
  ...GoogleReCaptchaV3Template
};
Playground.args = { type: 'v2-invisible', siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' };

export const Explicit = {
  ...GoogleReCaptchaV3Template,
  decorators: [
    (Story: any) => (
      <div id='container'>
        <Story />
      </div>
    )
  ]
};
Explicit.args = {
  type: 'v2-invisible',
  siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  explicit: { container: 'container', badge: 'inline' }
};

export default {
  component: GoogleReCaptchaProvider,
  title: 'google recaptcha v2-invisible',
  parameters: {
    docs: {
      story: {
        inlineStories: false,
        iframeHeight: 500
      }
    }
  }
} as Meta<typeof GoogleReCaptchaProvider>;
