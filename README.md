# 🔑 Google ReCaptcha

tool that easily and quickly add Google ReCaptcha for your website or application

## 📦 Packages

- [core](https://github.com/siberiacancode/google-recaptcha/tree/main/packages/core)
- [react](https://github.com/siberiacancode/google-recaptcha/tree/main/packages/react)

## 🦉 Philosophy

**🔑 Google ReCaptcha** this is a library that will allow you to easily and quickly add Google ReCaptcha for your website or application. The main difference from other libraries is that all current versions of Google ReCaptcha are supported here.

## Features

- **Support all recaptcha versions** - support v3, v2-checkbox, v2-invisible
- **Enterprise mode** - support [enterprise](https://cloud.google.com/recaptcha-enterprise/docs/overview)
- **TypeScript support out of the box** - full typed package
- **SSR** - package work with server side render

### V3

[Google ReCaptcha v3](https://developers.google.com/recaptcha/docs/v3) returns a score for each request without user friction. The score is based on interactions with your site and enables you to take an appropriate action for your site.

### V2 invisible

[Google ReCaptcha v2 invisible](https://developers.google.com/recaptcha/docs/display) does not require users to solve any puzzles or enter any codes. Instead, it runs in the background and analyzes user behavior on the web page to determine if they are genuine users or potential bots.

### V2 checkbox

When a user interacts with the [Google ReCaptcha v2 checkbox](https://developers.google.com/recaptcha/docs/display), advanced algorithms analyze their behavior to distinguish between humans and bots. If the system suspects suspicious activity, additional challenges may be presented, such as image selections or puzzle-solving tasks.
|

## Enterprise

[Google ReCaptcha Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/overview) is built on the existing reCAPTCHA API and it uses advanced risk analysis techniques to distinguish between humans and bots.
In order to enable enterprise mode, you need to set the flag `isEnterprise` in `GoogleReCaptchaProvider`. Also in this mode you can pass specials `actions`.

## ✨ Contributors

<table>
  <tr>
    <td align="center" style="word-wrap: break-word; width: 100; height: 100">
        <a href="https://github.com/debabin">
            <img src="https://avatars.githubusercontent.com/u/45297354?v=4"
            width="100;"  
            alt="debabin" />
            <br />
            <sub style="font-size:13px"><b>☄️ debabin</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 100.0; height: 100.0">
        <a href="https://github.com/anv296">
            <img src="https://avatars.githubusercontent.com/u/39154399?s=400&u=7c4fcc6d120f4b13ccbd03a9a384622b6523c376&v=4"
            width="100;"  
            alt="anv296" />
            <br />
            <sub style="font-size:13px"><b>🎱️ anv296</b></sub>
        </a>
    </td>
  </tr>
</table>
