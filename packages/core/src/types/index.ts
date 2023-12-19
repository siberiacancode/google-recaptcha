export type ContainerId = string;
export type Container = ContainerId | HTMLElement;

export namespace GoogleReCaptcha {
  export type Language = string;
  export type Type = 'v3' | 'v2-invisible' | 'v2-checkbox';
  export type Host = 'recaptcha.net' | 'google.com';
  export interface Script extends Omit<Partial<HTMLScriptElement>, 'src'> {
    appendTo?: 'body' | 'head';
  }

  export type OptWidgetId = number | string;
  export interface Action {
    action: string;
  }
  export type Badge = 'inline' | 'bottomleft' | 'bottomright' | 'hidden';
  export type Theme = 'dark' | 'light';
  export interface Size {
    v3: 'invisible';
    'v2-invisible': 'invisible';
    'v2-checkbox': 'compact' | 'normal';
  }

  export interface Parameters {
    sitekey?: string;
    action?: Action['action'];
    theme?: Theme;
    type?: Type;
    size?: Size[keyof Size];
    tabindex?: number;
    badge?: Badge;
    hl?: Language;
    callback?: (response: string) => void;
    'expired-callback'?: () => void;
    'error-callback'?: () => void;
  }

  export interface Instance {
    render(container: Container, parameters?: Parameters, inherit?: boolean): number;
    reset(opt_widget_id?: OptWidgetId): void;
    getResponse(opt_widget_id?: OptWidgetId): string;
    execute(opt_widget_id?: OptWidgetId): Promise<void>;
    execute(siteKey: string, action: Action): Promise<string>;
    ready(callback: () => void): void;
  }
}
