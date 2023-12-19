import type { StoryObj, Meta } from '@storybook/react';
import React from 'react';

import { GoogleReCaptchaCheckbox } from '../../src/components/GoogleReCaptchaCheckbox';
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
        type='v2-checkbox'
        siteKey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
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
