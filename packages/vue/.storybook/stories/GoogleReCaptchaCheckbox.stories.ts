import type { Meta, StoryObj } from '@storybook/vue3';

import { GoogleReCaptchaCheckbox, GoogleReCaptchaProvider } from '../../src/components';

const meta: Meta<typeof GoogleReCaptchaCheckbox> = {
  title: 'google recaptcha checkbox',
  component: GoogleReCaptchaCheckbox
};

export default meta;

type Story = StoryObj<typeof GoogleReCaptchaCheckbox>;

export const Playground: Story = {
  render: (args) => ({
    components: { GoogleReCaptchaCheckbox, GoogleReCaptchaProvider },
    setup() {
      return { args };
    },
    template: `
      <GoogleReCaptchaProvider
        siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        type="v2-checkbox"
      >
        <GoogleReCaptchaCheckbox />
      </GoogleReCaptchaProvider>
    `
  })
};
