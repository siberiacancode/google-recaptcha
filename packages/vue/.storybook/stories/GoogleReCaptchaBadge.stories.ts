import type { Meta, StoryObj } from '@storybook/vue3';

import { GoogleReCaptchaBadge, GoogleReCaptchaProvider } from '../../src/components';

const meta: Meta<typeof GoogleReCaptchaProvider> = {
  title: 'google recaptcha badge',
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
    components: { GoogleReCaptchaProvider, GoogleReCaptchaBadge },
    setup() {
      return { args };
    },
    template: `
      <GoogleReCaptchaProvider v-bind="args">
        <GoogleReCaptchaBadge badge="inline" />
      </GoogleReCaptchaProvider>
    `
  }),
  args: {
    type: 'v3',
    siteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs'
  }
};
