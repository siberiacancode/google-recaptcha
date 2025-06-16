# 🔑 React Google ReCaptcha

tool that easily and quickly add Google ReCaptcha for your website or application

## Install

Install with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

```bash
$ npm i @google-recaptcha/react
# or
$ yarn add @google-recaptcha/react
```

## 🦉 Philosophy

**🔑 React Google ReCaptcha** this is a library that will allow you to easily and quickly add Google ReCaptcha for your website or application. The main difference from other libraries is that all current versions of Google ReCaptcha are supported here.

## Features

- **Support all recaptcha versions** - support v3, v2-checkbox, v2-invisible
- **Enterprise mode** - support [enterprise](https://cloud.google.com/recaptcha-enterprise/docs/overview)
- **TypeScript support out of the box** - full typed package
- **SSR** - package work with server side render

## Usage

Install **🔑 React Google ReCaptcha** with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

```bash
$ npm i @google-recaptcha/react
# or
$ yarn add @google-recaptcha/react
```

### V3

[Google ReCaptcha v3](https://developers.google.com/recaptcha/docs/v3) returns a score for each request without user friction. The score is based on interactions with your site and enables you to take an appropriate action for your site.

```typescript jsx
import { GoogleReCaptchaProvider } from '@google-recaptcha/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleReCaptchaProvider
    type="v3"
    siteKey="Your recaptcha sitekey"
  >
    <App />
  </GoogleReCaptchaProvider>
);
```

### V2 invisible

[Google ReCaptcha v2 invisible](https://developers.google.com/recaptcha/docs/display) does not require users to solve any puzzles or enter any codes. Instead, it runs in the background and analyzes user behavior on the web page to determine if they are genuine users or potential bots.

```typescript jsx
import { GoogleReCaptchaProvider } from '@google-recaptcha/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleReCaptchaProvider
    type="v2-invisible"
    siteKey="Your recaptcha key"
  >
    <App />
  </GoogleReCaptchaProvider>
);
```

### V2 checkbox

When a user interacts with the [Google ReCaptcha v2 checkbox](https://developers.google.com/recaptcha/docs/display), advanced algorithms analyze their behavior to distinguish between humans and bots. If the system suspects suspicious activity, additional challenges may be presented, such as image selections or puzzle-solving tasks.

```typescript jsx
import { GoogleReCaptchaProvider, GoogleReCaptchaCheckbox } from '@google-recaptcha/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleReCaptchaProvider
    type="v2-checkbox"
    siteKey="Your recaptcha key"
  >
    <GoogleReCaptchaCheckbox
      onChange={(token) => {
        console.log(token);
      }}
    />
  </GoogleReCaptchaProvider>
);
```

### Checkbox component

<!-- prettier-ignore -->
| **Props**       |        **Type**         | **Default** | **Required?** | **Note**                                                                                                                                                                                                                                                                            |
|-----------------|:-----------------------:|------------:|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id              |         String          |             | No            | Id of component                                                                                                                                                                                                                                                                     |
| action          |         String          |             | No            | An action name is used to describe user-initiated events. [More info](https://cloud.google.com/recaptcha-enterprise/docs/actions)                                                                                                                                                   |
| className       |         String          |             | No            | Styles for component                                                                                                                                                                                                                                                                |
| container       |  String or HTMLElement  |             | No            | Container ID where the recaptcha badge will be rendered                                                                                                                                                                                                                             |
| callback        |       (token: string) => void        |             | No            | The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback.                                                                                                                                |
| errorCallback   |       () => void        |             | No            | The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry.               |
| expiredCallback |       () => void        |             | No            | The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.                                                                                                                                                                   |
| language        |         String          |             | No            | optional prop to support different languages that is supported by Google Recaptcha. [See](https://developers.google.com/recaptcha/docs/language)                                                                                                                                    |
| theme           |    `dark` or `light`    |     `light` | No            | The color theme of the widget.                                                                                                                                                                                                                                                      |
| size            |  `compact` or `normal`  |    `normal` | No            | The size of the widget.                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                        |
| onChange        | (token: string) => void |             | No            | When called with string (token), it means token retrieved. When called with false as an argument, it means the response expired and the user needs to re-verify. When called with Error, it means an error occurred and the widget cannot continue (usually network disconnection)  |                                                                                                                                                                                                                                        |

## Enterprise

[Google ReCaptcha Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/overview) is built on the existing reCAPTCHA API and it uses advanced risk analysis techniques to distinguish between humans and bots.
In order to enable enterprise mode, you need to set the flag `isEnterprise` in `GoogleReCaptchaProvider`. Also in this mode you can pass specials `actions`.

### Examples

#### v2 checkbox

```typescript jsx
import { GoogleReCaptchaProvider, GoogleReCaptchaCheckbox } from '@google-recaptcha/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleReCaptchaProvider
    type="v2-checkbox"
    siteKey="Your recaptcha key"
    isEnterprise
  >
    <GoogleReCaptchaCheckbox
      action="Your action name"
      onChange={(token: string) => {
          console.log(token);
      }}
    />
  </GoogleReCaptchaProvider>
);
```

#### v3 or v2 invisible

```typescript jsx
import { GoogleReCaptchaProvider } from '@google-recaptcha/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleReCaptchaProvider
    type="Your type of recaptcha"
    siteKey="Your recaptcha key"
    isEnterprise
  >
    <App />
  </GoogleReCaptchaProvider>
);
```

## API

### GoogleReCaptchaProvider

`@google-recaptcha/react` provides a `GoogleReCaptchaProvider` provider component that should be used to wrap around your components.

`GoogleReCaptchaProvider`'s responsibility is to load the necessary reCaptcha script and provide access to reCaptcha to the rest of your application.

Usually, your application only needs one provider. You should place it as high as possible in your React tree. It's to make sure you only have one instance of Google Recaptcha per page, and it doesn't reload unnecessarily when your components re-rendered.

Same thing applied when you use this library with framework such as Next.js or React Router and only want to include the script on a single page. Try to make sure you only have one instance of the provider on a React tree and to place it as high (on the tree) as possible.

#### GoogleReCaptchaProvider for v3 and v2-invisible

All the props that can be passed in provider for v2-invisible and v3:

<!-- prettier-ignore -->
| **Props**                |                       **Type**                        | **Default**   | **Required** | **Note**                                                                                                                                                                                                                                                              |
| ------------------------ | :---------------------------------------------------: | ------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                     |                `v3` or `v2-invisible`                 |               | Yes          | Your recaptcha version                                                                                                                                                                                                                                                |
| siteKey                  |                        String                         |               | Yes          | Your recaptcha key, get one from [here](https://www.google.com/recaptcha/admin)                                                                                                                                                                                       |
| language                 |                        String                         |               | No           | Optional prop to support different [languages](https://developers.google.com/recaptcha/docs/language) that is supported by Google Recaptcha                                                                                                                           |
| isEnterprise             |                        Boolean                        |               | No           | When you enable to use the enterprise version, **you must create new keys**. These keys will replace any Site Keys you created in reCAPTCHA. Check the [migration guide](https://cloud.google.com/recaptcha-enterprise/docs/migrate-recaptcha).                       |
| onLoad                   |                      () => void                       |               | No           | Callback function to load reCAPTCHA                                                                                                                                                                                                                                   |
| onError                  |                      () => void                       |               | No           | Callback function to error reCAPTCHA                                                                                                                                                                                                                                  |
| host                     |            `recaptcha.net` or `google.com`            |               | No           | Load script from `recaptcha.net` or `google.com`                                                                                                                                                                                                                      |
| scriptProps              |                        Object                         |               | No           | All props used by `<script>` tag                                                                                                                                                                                                                                      |
| explicit.container       |                 String or HTMLElement                 |               | No           | Container ID where the recaptcha badge will be rendered                                                                                                                                                                                                               |
| explicit.tabIndex        |                        Number                         | 0             | No           | The tabindex of the widget and challenge. If other elements in your page use tabindex, it should be set to make user navigation easier.                                                                                                                               |
| explicit.inherit         |                        Boolean                        |               | No           | Use existing data-\* attributes on the element if the corresponding parameter is not specified. The parameters will take precedence over the attributes.                                                                                                              |
| explicit.callback        |                (token: string) => void                |               | No           | The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback.                                                                                                                  |
| explicit.errorCallback   |                      () => void                       |               | No           | The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. |
| explicit.expiredCallback |                      () => void                       |               | No           | The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.                                                                                                                                                     |
| explicit.badge           | `inline` or `bottomleft` or `bottomright` or `hidden` | `bottomright` | No           | Reposition the reCAPTCHA badge.                                                                                                                                                                                                                                       |

#### GoogleReCaptchaProvider for v2-checkbox

All the props that can be passed in provider for v2-checkbox. We also recommend using the checkbox component rather than explicitly loading the recaptcha checkbox.

<!-- prettier-ignore -->
| **Props**                |            **Type**             | **Default**  | **Required** | **Note**                                                                                                                                                                                                                                                              |
| ------------------------ | :-----------------------------: | ------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                     |          `v2-checkbox`          |              | Yes          | Your recaptcha version                                                                                                                                                                                                                                                |
| siteKey                  |             String              |              | Yes          | Your recaptcha key, get one from [here](https://www.google.com/recaptcha/admin)                                                                                                                                                                                       |
| language                 |             String              |              | No           | Optional prop to support different [languages](https://developers.google.com/recaptcha/docs/language) that is supported by Google Recaptcha                                                                                                                           |
| isEnterprise             |             Boolean             |              | No           | When you enable to use the enterprise version, **you must create new keys**. These keys will replace any Site Keys you created in reCAPTCHA. Check the [migration guide](https://cloud.google.com/recaptcha-enterprise/docs/migrate-recaptcha).                       |
| onLoad                   |           () => void            |              | No           | Callback function to load reCAPTCHA                                                                                                                                                                                                                                   |
| onError                  |           () => void            |              | No           | Callback function to error reCAPTCHA                                                                                                                                                                                                                                  |
| host                     | `recaptcha.net` or `google.com` | `google.com` | No           | Load script from `recaptcha.net` or `google.com`                                                                                                                                                                                                                      |
| scriptProps              |             Object              |              | No           | All props used by `<script>` tag                                                                                                                                                                                                                                      |
| explicit.container       |      String or HTMLElement      |              | No           | Container ID where the recaptcha badge will be rendered                                                                                                                                                                                                               |
| explicit.tabIndex        |             Number              | 0            | No           | The tabindex of the widget and challenge. If other elements in your page use tabindex, it should be set to make user navigation easier.                                                                                                                               |
| explicit.inherit         |             Boolean             |              | No           | Use existing data-\* attributes on the element if the corresponding parameter is not specified. The parameters will take precedence over the attributes.                                                                                                              |
| explicit.callback        |           () => void            |              | No           | The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback.                                                                                                                  |
| explicit.errorCallback   |           () => void            |              | No           | The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. |
| explicit.expiredCallback |           () => void            |              | No           | The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.                                                                                                                                                     |
| explicit.action          |             String              |              | No           | An action name is used to describe user-initiated events corresponding                                                                                                                                                                                                |
| explicit.theme           |        `dark` or `light`        | `light`      | No           | The color theme of the widget. Depends on type of reCaptcha                                                                                                                                                                                                           |
| explicit.size            |      `compact` or `normal`      | `normal`     | No           | The size of the widget. Depends on type of reCaptcha                                                                                                                                                                                                                  |

### Checkbox component

<!-- prettier-ignore -->
| **Props**       |        **Type**         | **Default** | **Required?** | **Note**                                                                                                                                                                                                                                                                            |
|-----------------|:-----------------------:|------------:|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id              |         String          |             | No            | Id of component                                                                                                                                                                                                                                                                     |
| action          |         String          |             | No            | An action name is used to describe user-initiated events. [More info](https://cloud.google.com/recaptcha-enterprise/docs/actions)                                                                                                                                                   |
| className       |         String          |             | No            | Styles for component                                                                                                                                                                                                                                                                |
| container       |  String or HTMLElement  |             | No            | Container ID where the recaptcha badge will be rendered                                                                                                                                                                                                                             |
| callback        |       () => void        |             | No            | The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback.                                                                                                                                |
| errorCallback   |       () => void        |             | No            | The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry.               |
| expiredCallback |       () => void        |             | No            | The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.                                                                                                                                                                   |
| language        |         String          |             | No            | optional prop to support different languages that is supported by Google Recaptcha. [See](https://developers.google.com/recaptcha/docs/language)                                                                                                                                    |
| theme           |    `dark` or `light`    |     `light` | No            | The color theme of the widget.                                                                                                                                                                                                                                                      |
| size            |  `compact` or `normal`  |    `normal` | No            | The size of the widget.                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                        |
| onChange        | (token: string) => void |             | No            | When called with string (token), it means token retrieved. When called with false as an argument, it means the response expired and the user needs to re-verify. When called with Error, it means an error occurred and the widget cannot continue (usually network disconnection)  |                                                                                                                                                                                                                                        |

### useGoogleReCaptcha hook

If you prefer a React Hook approach, you can choose to use the custom hook `useGoogleReCaptcha`.
We recommend using this hook for v2 invisible and v3 to trigger recaptcha execution.

The `executeV3` and `executeV2Invisible` function returned from the hook can be undefined when the recaptcha script has not been successfully loaded.

```typescript jsx
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from '@google-recaptcha/react';

const App = () => {
  const { executeV3 } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeV3) {
      console.log('Execute recaptcha not available');
      return;
    }

    const token = await executeV3();
  }, [executeV3]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return <button onClick={handleReCaptchaVerify}>verify</button>;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleReCaptchaProvider siteKey="Your recaptcha key">
    <App />
  </GoogleReCaptchaProvider>
);
```

### withGoogleReCaptcha HOC

`withGoogleReCaptcha` is a HOC (higher order component) that can be used to integrate reCaptcha validation with your component and trigger the validation programmatically. It injects the wrapped component with `googleReCaptcha` object.

The object contains the `executeV3` and `executeV2Invisible` function that can be called to validate the user action.

You are recommended to use the custom hook `useGoogleReCaptcha` over the HOC whenever you can. The HOC can be removed in future version.

```typescript jsx
import {
  GoogleReCaptchaProvider,
  withGoogleReCaptcha,
  WithGoogleReCaptchaParams
} from '@google-recaptcha/react';

const App = (props) => {
    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
        if (!props.executeV3) {
            console.log('Execute recaptcha not available');
            return;
        }

        const token = await props.executeV3();
    }, [props.executeV3]);

    // You can use useEffect to trigger the verification as soon as the component being loaded
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return <button onClick={handleReCaptchaVerify}>verify</button>;
};

export const WithGoogleRecaptchaApp = withGoogleReCaptcha(App);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleReCaptchaProvider siteKey="Your recaptcha key">
    <WithGoogleRecaptchaApp />
  </GoogleReCaptchaProvider>
);
```

### generateGoogleReCaptchaScriptSrc

The function `generateGoogleReCaptchaScriptSrc` function may be needed for applications with ssr to get a link for the recaptcha script and load it before rendering the UI.

<!-- prettier-ignore -->
| **Parameters** |                 **Type**                  | **Required** | **Note**                                                                                     |
| -------------- | :---------------------------------------: | ------------ | -------------------------------------------------------------------------------------------- |
| host           |      `recaptcha.net` or `google.com`      | No           | Load script from `recaptcha.net` or `google.com`                                             |
| isEnterprise   |                  Boolean                  | Yes          |                                                                                              |
| render         |                  String                   | Yes          | siteKey of reCaptcha                                                                         |
| hl             |                  String                   | No           | Prop to support different languages that is supported by Google Recaptcha                    |
| badge          | `inline` or `bottomleft` or `bottomright` | No           | Reposition the reCAPTCHA badge. Depends on type of reCaptcha. If not provide badge is hidden |

### generateGoogleReCaptchaHiddenBadgeStyles

The function `generateGoogleReCaptchaHiddenBadgeStyles` function returns [hidden styles](https://developers.google.com/recaptcha/docs/faq) for Google ReCaptcha badge.
