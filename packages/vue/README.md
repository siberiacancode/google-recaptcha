<div align="center">
  <a href="https://siberiacancode.github.io/google-recaptcha/docs/vue">
    <picture>
      <img alt="Google Recaptcha" src="https://siberiacancode.github.io/google-recaptcha/logo/gr-dark.png" height="60">
    </picture>
  </a>
  <h1>Vue Google reCAPTCHA</h1>

<a href="https://www.npmjs.com/package/@google-recaptcha/vue"><img alt="NPM version" src="https://img.shields.io/npm/v/@google-recaptcha/vue.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/siberiacancode/google-recaptcha/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/@google-recaptcha/vue.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/siberiacancode/google-recaptcha/discussions"><img alt="Join the community on GitHub" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=Vue.js&labelColor=000000&logoWidth=20"></a>

</div>

Google reCAPTCHA is a powerful library that provides easy integration of Google reCAPTCHA into your Vue applications. Built with **TypeScript-first** approach, **SSR compatibility**, and **tree-shaking optimization** - everything you need to protect your forms and applications from spam and abuse.

## Supported reCAPTCHA Versions

- **V3** - Invisible protection that returns a risk score (0.0-1.0) for each request
- **V2 Invisible** - Background analysis without user interaction
- **V2 Checkbox** - Interactive "I'm not a robot" checkbox with optional challenges
- **Enterprise mode** - support [enterprise](https://cloud.google.com/recaptcha/docs/overview)

## Documentation

Visit https://siberiacancode.github.io/google-recaptcha/docs/vue to view the full documentation.

## Getting Started

```bash
npm install @google-recaptcha/vue
```

### Basic Setup

```vue
<template>
  <GoogleReCaptchaProvider type="v3" site-key="your_site_key">
    <App />
  </GoogleReCaptchaProvider>
</template>

<script setup lang="ts">
import { GoogleReCaptchaProvider } from "@google-recaptcha/vue";
import App from "./App.vue";
</script>
```

### Using reCAPTCHA in Components

```vue
<template>
  <form @submit="onSubmit">
    ...
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useGoogleReCaptcha } from "@google-recaptcha/vue";

const googleReCaptcha = useGoogleReCaptcha();

const onSubmit = async (event: Event) => {
  event.preventDefault();

  const token = await googleReCaptcha.executeV3('action');
  ...
};
</script>
```
