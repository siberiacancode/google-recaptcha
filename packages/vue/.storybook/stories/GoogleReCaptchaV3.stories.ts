import type { Meta, StoryObj } from '@storybook/vue3';

import { GoogleReCaptchaProvider, GoogleReCaptchaV3 } from '../../src/components';
import { ref } from 'vue';

const meta: Meta<typeof GoogleReCaptchaProvider> = {
  title: 'google recaptcha v3',
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
    template: `<GoogleReCaptchaProvider v-bind="args" />`
  }),
  args: {
    type: 'v3',
    siteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs'
  }
};

export const Explicit: Story = {
  render: (args) => ({
    components: { GoogleReCaptchaProvider, GoogleReCaptchaV3 },
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
    type: 'v3',
    siteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs',
    explicit: { container: 'container', badge: 'inline' }
  }
};

export const WithComponent: Story = {
  render: (args) => ({
    components: { GoogleReCaptchaProvider, GoogleReCaptchaV3 },
    setup() {
      const token = ref('');
      return { args, token };
    },
    template: `
      <div>
        <GoogleReCaptchaProvider v-bind="args">
          <GoogleReCaptchaV3
            action="homepage"
            v-model="token"
          >
            <div>
              <button>Execute reCAPTCHA</button>
              <p v-if="token">Token: {{ token.substring(0, 15) }}...</p>
            </div>
          </GoogleReCaptchaV3>
        </GoogleReCaptchaProvider>
      </div>
    `
  }),
  args: {
    type: 'v3',
    siteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs'
  }
};
