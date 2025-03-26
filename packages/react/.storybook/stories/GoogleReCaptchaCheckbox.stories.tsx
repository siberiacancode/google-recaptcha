import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { GoogleReCaptchaCheckbox } from '../../src/components';
import { GoogleReCaptchaProvider } from '../../src/context';

type Story = StoryObj<typeof GoogleReCaptchaCheckbox>;
const GoogleReCaptchaCheckboxTemplate: Story = {
  render: (args) => <GoogleReCaptchaCheckbox {...args} />
};

export const Playground = {
  ...GoogleReCaptchaCheckboxTemplate,
  decorators: [
    (Story: any) => (
      <GoogleReCaptchaProvider
        siteKey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
        type='v2-checkbox'
      >
        <Story />
      </GoogleReCaptchaProvider>
    )
  ]
};

export default {
  component: GoogleReCaptchaCheckbox,
  title: 'google recaptcha checkbox'
} as Meta<typeof GoogleReCaptchaCheckbox>;
