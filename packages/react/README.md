<div align="center">
  <a href="https://siberiacancode.github.io/google-recaptcha/docs/react">
    <picture>
      <img alt="React Use logo" src="https://siberiacancode.github.io/google-recaptcha/logo/gr-dark.png" height="60">
    </picture>
  </a>
  <h1>React Google reCAPTCHA</h1>

<a href="https://www.npmjs.com/package/@google-recaptcha/react"><img alt="NPM version" src="https://img.shields.io/npm/v/@google-recaptcha/react.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/siberiacancode/google-recaptcha/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/@google-recaptcha/react.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://siberiacancode.github.io/reactuse/"><img alt="reactuse" src="https://img.shields.io/badge/reactuse-blueviolet.svg?style=for-the-badge&logo=npm&labelColor=000000&logoWidth=20"></a>
<a href="https://github.com/siberiacancode/google-recaptcha/discussions"><img alt="Join the community on GitHub" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=React&labelColor=000000&logoWidth=20"></a>

</div>

Google reCAPTCHA is a powerful library that provides easy integration of Google reCAPTCHA into your React applications. Built with **TypeScript-first** approach, **SSR compatibility**, and **tree-shaking optimization** - everything you need to protect your forms and applications from spam and abuse.

## Supported reCAPTCHA Versions

- **V3** - Invisible protection that returns a risk score (0.0-1.0) for each request
- **V2 Invisible** - Background analysis without user interaction
- **V2 Checkbox** - Interactive "I'm not a robot" checkbox with optional challenges
- **Enterprise mode** - support [enterprise](https://cloud.google.com/recaptcha/docs/overview)

## Documentation

Visit https://siberiacancode.github.io/google-recaptcha/docs/react to view the full documentation.

## Getting Started

```bash
npm install @google-recaptcha/react
```

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleReCaptchaProvider } from "@google-recaptcha/react";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider type="v3" siteKey="your_site_key">
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);
```

Create a component to use reCAPTCHA:

```tsx
import type { FormEvent } from 'react';
import { useGoogleReCaptcha } from '@google-recaptcha/react';

export const Form = () => {
  const googleReCaptcha = useGoogleReCaptcha();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const token = await googleReCaptcha.executeV3('action');
    ...
  };

  return (
    <form onSubmit={onSubmit}>
      ...
      <button type="submit">Submit</button>
    </form>
  );
}
```
