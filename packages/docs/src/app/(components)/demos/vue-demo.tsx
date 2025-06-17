"use client";

import { createApp, ref } from "vue";
import { useEffect, useRef } from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptchaV3,
} from "@google-recaptcha/vue";
import { useTheme } from "next-themes";

interface VueDemoProps {
  type: "v3" | "v2-invisible" | "v2-checkbox" | "v3-component";
}

const VueDemo = ({ type, ...props }: VueDemoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const app = createApp({
      template: `
        <GoogleReCaptchaProvider
          siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          :explicit="type === 'v3' || type === 'v2-invisible' ? {
            container: 'recaptcha-container',
            badge: 'inline',
            theme: theme
          } : undefined"
          ${Object.entries(props)
            .map(([key, value]) => `:${key}="${value}"`)
            .join(" ")}
        >
          <div class="demo-container">
            ${
              type === "v2-checkbox"
                ? "<GoogleReCaptchaCheckbox :theme='theme' />"
                : ""
            }
            ${
              type === "v3-component"
                ? `
              <GoogleReCaptchaV3
                action="demo_action"
                @verify="onVerify"
                @error="onError"
                @expired="onExpired"
              />
              <button @click="onClick">Verify</button>
              <div v-if="token" class="token">
                Token: {{ token }}
              </div>
            `
                : ""
            }
            ${
              type === "v2-invisible" || type === "v3"
                ? "<div id='recaptcha-container' />"
                : ""
            }
          </div>
        </GoogleReCaptchaProvider>
      `,
      setup() {
        const token = ref("");

        const onVerify = (newToken: string) => {
          token.value = newToken;
        };

        const onError = () => {
          console.error("reCAPTCHA error");
        };

        const onExpired = () => {
          token.value = "";
        };

        const onClick = () => {
          token.value = "";
        };

        return {
          token,
          onVerify,
          onError,
          onExpired,
          onClick,
          theme,
          type,
        };
      },
    });

    app.component("GoogleReCaptchaProvider", GoogleReCaptchaProvider);
    app.component("GoogleReCaptchaV3", GoogleReCaptchaV3);

    app.mount(containerRef.current);

    return () => {
      app.unmount();
    };
  }, [type, props, theme]);

  return (
    <div
      ref={containerRef}
      className="flex border border-color-[var(--color-fd-card)] rounded-[var(--radius-lg)] outline-[var(--tw-border-style)] justify-center items-center min-h-[200px] bg-[var(--color-fd-card)]"
    />
  );
};

export default VueDemo;
