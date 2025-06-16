import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { GoogleReCaptchaProvider } from '../../src/context';

type Story = StoryObj<typeof GoogleReCaptchaProvider>;
const GoogleReCaptchaV2CheckboxTemplate: Story = {
  render: (args) => <GoogleReCaptchaProvider {...args} />
};

export const Playground = {
  ...GoogleReCaptchaV2CheckboxTemplate
};
Playground.args = {
  type: 'v2-checkbox',
  siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
};

export const Explicit = {
  ...GoogleReCaptchaV2CheckboxTemplate,
  decorators: [
    (Story: any) => (
      <div id='container'>
        <Story />
      </div>
    )
  ]
};
Explicit.args = {
  type: 'v2-checkbox',
  siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  explicit: { container: 'container', action: 'action', size: 'normal' }
};

export default {
  component: GoogleReCaptchaProvider,
  title: 'google recaptcha v2 checkbox',
  parameters: {
    docs: {
      story: {
        inlineStories: false,
        iframeHeight: 500
      }
    }
  }
} as Meta<typeof GoogleReCaptchaProvider>;
