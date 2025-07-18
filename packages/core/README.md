<div align="center">
  <a href="https://siberiacancode.github.io/google-recaptcha/docs/react">
    <picture>
      <img alt="Google Recaptcha" src="https://siberiacancode.github.io/google-recaptcha/logo/gr-dark.png" height="60">
    </picture>
  </a>
  <h1>Core Google reCAPTCHA</h1>

<a href="https://www.npmjs.com/package/@google-recaptcha/core"><img alt="NPM version" src="https://img.shields.io/npm/v/@google-recaptcha/core.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/siberiacancode/google-recaptcha/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/@google-recaptcha/core.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/siberiacancode/google-recaptcha/discussions"><img alt="Join the community on GitHub" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=React&labelColor=000000&logoWidth=20"></a>

</div>

Google reCAPTCHA is a powerful library that provides easy integration of Google reCAPTCHA into your applications. Built with **TypeScript-first** approach, **SSR compatibility**, and **tree-shaking optimization** - everything you need to protect your forms and applications from spam and abuse.

## Supported reCAPTCHA Versions

- **V3** - Invisible protection that returns a risk score (0.0-1.0) for each request
- **V2 Invisible** - Background analysis without user interaction
- **V2 Checkbox** - Interactive "I'm not a robot" checkbox with optional challenges
- **Enterprise mode** - support [enterprise](https://cloud.google.com/recaptcha/docs/overview)

## Documentation

Visit https://siberiacancode.github.io/google-recaptcha/docs/core to view the full documentation.

## Getting Started

```ts
import {
  checkGoogleReCaptchaInjected,
  injectGoogleReCaptchaScript,
} from "@google-recaptcha/core";

if (checkGoogleReCaptchaInjected()) return;

injectGoogleReCaptchaScript({
  render: "explicit",
  onload: () => console.log("reCAPTCHA loaded"),
  siteKey: "your_site_key",
});
```
