import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { GoogleReCaptchaBadge } from '../../src/components';
import { GoogleReCaptchaProvider } from '../../src/context';

type Story = StoryObj<typeof GoogleReCaptchaBadge>;
const GoogleReCaptchaBadgeTemplate: Story = {
  render: (args) => <GoogleReCaptchaBadge {...args} badge='inline' />
};

export const Playground = {
  ...GoogleReCaptchaBadgeTemplate,
  decorators: [
    (Story: any) => (
      <GoogleReCaptchaProvider
        explicit
        siteKey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
        type='v3'
      >
        <Story />
      </GoogleReCaptchaProvider>
    )
  ]
};

export default {
  component: GoogleReCaptchaBadge,
  title: 'google recaptcha badge'
} as Meta<typeof GoogleReCaptchaBadge>;
