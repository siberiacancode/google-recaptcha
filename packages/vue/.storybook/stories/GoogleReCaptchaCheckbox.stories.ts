import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';

import { GoogleReCaptchaCheckbox, GoogleReCaptchaProvider } from '../../src/components';

const meta: Meta<typeof GoogleReCaptchaProvider> = {
  title: 'google recaptcha checkbox',
  component: GoogleReCaptchaProvider,
  parameters: {
    docs: {
      story: {
        inlineStories: false,
        iframeHeight: 500
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof GoogleReCaptchaProvider>;

export const Playground: Story = {
  render: (args) => ({
    components: { GoogleReCaptchaProvider, GoogleReCaptchaCheckbox },
    setup() {
      const token = ref('');
      return { args, token };
    },
    template: `
      <GoogleReCaptchaProvider v-bind="args">
        <GoogleReCaptchaCheckbox
          v-model="token"
          theme="light"
          size="normal"
        />
        <p v-if="token">Token: {{ token.substring(0, 15) }}...</p>
      </GoogleReCaptchaProvider>
    `
  }),
  args: {
    type: 'v2-checkbox',
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  }
};
