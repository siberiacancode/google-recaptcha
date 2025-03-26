import type { Meta, StoryObj } from '@storybook/vue3';

import { GoogleReCaptchaProvider } from '../../src/components';

const meta: Meta<typeof GoogleReCaptchaProvider> = {
  title: 'google recaptcha v2-invisible',
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
      <GoogleReCaptchaProvider
        type="v2-invisible"
        siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      />
    `,
    args: {
      type: 'v2-invisible',
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    }
  })
};

export const Explicit: Story = {
  render: (args) => ({
    components: { GoogleReCaptchaProvider },
    setup() {
      return { args };
    },
    template: `
      <div id="container">
        <GoogleReCaptchaProvider
          type="v2-invisible"
          siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          :explicit="{ container: 'container', badge: 'inline' }"
        />
      </div>
    `,
    args: {
      type: 'v2-invisible',
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
      explicit: { container: 'container', badge: 'inline' }
    }
  })
};
