export type ContainerId = string;
export type Container = ContainerId | HTMLElement;

export namespace GoogleReCaptcha {
  export type Language = string;
  export type Type = 'v2-checkbox' | 'v2-invisible' | 'v3';
  export type Host = 'google.com' | 'recaptcha.net';
  export interface Script extends Omit<Partial<HTMLScriptElement>, 'src'> {
    appendTo?: 'body' | 'head';
  }

  export type OptWidgetId = number | string;
  export interface Action {
    action: string;
  }
  export type Badge = 'bottomleft' | 'bottomright' | 'hidden' | 'inline';
  export type Theme = 'dark' | 'light';
  export interface Size {
    'v2-checkbox': 'compact' | 'normal';
    'v2-invisible': 'invisible';
    v3: 'invisible';
  }

  export interface Parameters {
    action?: Action['action'];
    badge?: Badge;
    hl?: Language;
    sitekey?: string;
    size?: Size[keyof Size];
    tabindex?: number;
    theme?: Theme;
    type?: Type;
    callback?: (response: string) => void;
    'error-callback'?: () => void;
    'expired-callback'?: () => void;
  }

  export interface Instance {
    execute(opt_widget_id?: OptWidgetId): Promise<void>;
    execute(siteKey: string, action: Action): Promise<string>;
    getResponse: (opt_widget_id?: OptWidgetId) => string;
    ready: (callback: () => void) => void;
    render: (container: Container, parameters?: Parameters, inherit?: boolean) => number;
    reset: (opt_widget_id?: OptWidgetId) => void;
  }
}
