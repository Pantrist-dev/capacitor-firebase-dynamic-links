import { PluginListenerHandle } from "@capacitor/core";

declare module "@capacitor/core" {
  interface PluginRegistry {
    CapacitorFirebaseDynamicLinks: CapacitorFirebaseDynamicLinksPlugin;
  }
}

export interface CapacitorFirebaseDynamicLinksPlugin {
  addListener(eventName: 'deepLinkOpen', listenerFunc: (data: DeepLinkOpen) => void): PluginListenerHandle;

  /**
  Create a Firebase Dynamic Link.
  */
  createDynamicLink(linkConfiguration: LinkConfig): Promise<{ value: string }>;
  createDynamicShortLink(linkConfiguration: LinkConfig): Promise<{ value: string }>;
}

export interface DeepLinkOpen {
  url: string
}

export interface LinkConfig {
  uri: string;
  domainUriPrefix: string;
  androidParameters?: AndroidParameters;
  iosParameters?: IOSParameters;
  navigationInfo?: NavigationInfoParameters;
  socialMeta?: SocialMetaTagParameters;
  googleAnalytics?: GoogleAnalyticsParameters;
  iTunesConnectAnalytics?: ItunesConnectAnalyticsParameters;
}

export interface AndroidParameters {
  packageName: string;
  fallbackUrl?: string;
  minimumVersion?: number;
}

export interface IOSParameters {
  bundleId: string;
  appStoreId?: string;
  fallbackUrl?: string;
  customScheme?: string;
  ipadFallbackUrl?: string;
  ipadBundleId?: string;
  minimumVersion?: string;
}

export interface NavigationInfoParameters {
  forcedRedirectEnabled: boolean;
}

export interface SocialMetaTagParameters {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface GoogleAnalyticsParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface ItunesConnectAnalyticsParameters {
  providerToken?: string;
  affiliateToken?: string;
  campaignToken?: string;
}