import type { Meta, StoryObj } from '@storybook/vue3';

import { GoogleReCaptchaProvider } from '../../src/components';

const meta: Meta<typeof GoogleReCaptchaProvider> = {
  title: 'google recaptcha v2 checkbox',
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
    components: { GoogleReCaptchaProvider },
    setup() {
      return { args };
    },
    template: `
      <GoogleReCaptchaProvider v-bind="args" />
    `
  }),
  args: {
    type: 'v2-checkbox',
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  }
};

export const Explicit: Story = {
  render: (args) => ({
    components: { GoogleReCaptchaProvider },
    setup() {
      return { args };
    },
    template: `
      <div id="container">
        <GoogleReCaptchaProvider v-bind="args" />
      </div>
    `
  }),
  args: {
    type: 'v2-checkbox',
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    explicit: { container: 'container', action: 'action', size: 'normal' }
  }
};
