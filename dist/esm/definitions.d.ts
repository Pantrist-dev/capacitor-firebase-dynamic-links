import { PluginListenerHandle } from '@capacitor/core';
export interface CapacitorFirebaseDynamicLinksPlugin {
    /**
     * Adds a listener to the opening of a dynamic link
     * @param eventName 'deepLinkOpen' for listening to open links
     * @param listenerFunc Callback function to be called when the event is fired
     */
    addListener(eventName: 'deepLinkOpen', listenerFunc: (data: DeepLinkOpen) => void): PluginListenerHandle;
    /**
     * Remove all native listeners for this plugin
     */
    removeAllListeners(): Promise<void>;
    /**
     * Creates a new dynamic Link based on the configuration
     * @param linkConfiguration configuration for the link
     */
    createDynamicLink(linkConfiguration: LinkConfig): Promise<{
        value: string;
    }>;
    /**
     * Creates a new short dynamic link based on the configuration.
     * Its basically a shortened version of the dynamic link.   *
     * @param linkConfiguration configuration for the link
     */
    createDynamicShortLink(linkConfiguration: LinkConfig): Promise<{
        value: string;
    }>;
}
export interface DeepLinkOpen {
    /**
     * The URL that was opened
     */
    url: string;
}
export interface LinkConfig {
    /**
     * The link your app will open.
     */
    uri: string;
    /**
     * Your Dynamic Link URL prefix, which you can find in the Firebase console.
     * A Dynamic Link domain looks like the following: `https://example.page.link`.
     */
    domainUriPrefix: string;
    /**
     * Android specific configuration
     */
    androidParameters?: AndroidParameters;
    /**
     * iOS specific configuration
     */
    iosParameters?: IOSParameters;
    /**
     * Additional parameters for the navigation of the app.
     */
    navigationInfo?: NavigationInfoParameters;
    /**
     * Configuration for showed data when sharing the link with social media.
     */
    socialMeta?: SocialMetaTagParameters;
    /**
     * Google Play analytics paremeters
     */
    googleAnalytics?: GoogleAnalyticsParameters;
    /**
     * iTunes Connect analytics parameters
     */
    iTunesConnectAnalytics?: ItunesConnectAnalyticsParameters;
    /**
     * Firebase Web Api key
     * @see https://firebase.google.com/docs/dynamic-links/rest
     */
    webApiKey?: string;
}
export interface AndroidParameters {
    /**
     * Your bundle ID (e.g. com.example.android)
     */
    packageName: string;
    /**
     * The link to open when the app isn't installed. Specify this to do something other than install your app from the Play Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app.
     */
    fallbackUrl?: string;
    /**
     * The versionCode of the minimum version of your app that can open the link. If the installed app is an older version, the user is taken to the Play Store to upgrade the app.
     */
    minimumVersion?: number;
}
export interface IOSParameters {
    /**
     * Your bundle ID (e.g. com.example.android)
     */
    bundleId: string;
    /**
     * Your app's App Store ID, used to send users to the App Store when the app isn't installed
     */
    appStoreId?: string;
    /**
     * The link to open when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app.
     */
    fallbackUrl?: string;
    /**
     * Your app's custom URL scheme, if defined to be something other than your app's bundle ID
     */
    customScheme?: string;
    /**
     * The link to open on iPads when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the web version of the content, or display a promotional page for your app.
     */
    ipadFallbackUrl?: string;
    /**
     * The bundle ID of the iOS app to use on iPads to open the link. The app must be connected to your project from the Overview page of the Firebase console.
     */
    ipadBundleId?: string;
    /**
     * The version number of the minimum version of your app that can open the link. This flag is passed to your app when it is opened, and your app must decide what to do with it.
     */
    minimumVersion?: string;
}
export interface NavigationInfoParameters {
    /**
     * If set to true, skip the app preview page when the Dynamic Link is opened, and instead redirect to the app or store.
     * The app preview page (enabled by default) can more reliably send users to the most appropriate destination when they open Dynamic Links in apps;
     * however, if you expect a Dynamic Link to be opened only in apps that can open Dynamic Links reliably without this page, you can disable it with this parameter.
     * This parameter will affect the behavior of the Dynamic Link only on iOS.
     */
    forcedRedirectEnabled: boolean;
}
export interface SocialMetaTagParameters {
    /**
     * The title to use when the Dynamic Link is shared in a social post.
     */
    title?: string;
    /**
     * The description to use when the Dynamic Link is shared in a social post.
     */
    description?: string;
    /**
     * The URL to an image related to this link. The image should be at least 300x200 px, and less than 300 KB.
     */
    imageUrl?: string;
}
export interface GoogleAnalyticsParameters {
    /**
     * Sets `utm_source`
     */
    source?: string;
    /**
     * Sets `utm_medium`
     */
    medium?: string;
    /**
     * Sets `utm_campaign`
     */
    campaign?: string;
    /**
     * Sets `utm_term`
     */
    term?: string;
    /**
     * Sets `utm_content`
     */
    content?: string;
}
export interface ItunesConnectAnalyticsParameters {
    /**
     * Sets `pt`
     */
    providerToken?: string;
    /**
     * Sets `at`
     */
    affiliateToken?: string;
    /**
     * Sets `ct`
     */
    campaignToken?: string;
}
