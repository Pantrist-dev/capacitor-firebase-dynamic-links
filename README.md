# @pantrist/capacitor-firebase-dynamic-links

[![npm version](https://badge.fury.io/js/%40pantrist%2Fcapacitor-firebase-dynamic-links.svg)](https://badge.fury.io/js/%40pantrist%2Fcapacitor-firebase-dynamic-links)

Capacitor plugin for [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links)

## Configuration 

### Android

In file `android/app/src/main/java/**/**/MainActivity.java`, add the plugin to the initialization list:

```java
import com.pantrist.firebase.dynamiclinks.CapacitorFirebaseDynamicLinks;

public class MainActivity extends BridgeActivity {
   @Override
   public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      ...
      registerPlugin(CapacitorFirebaseDynamicLinks.class);
   }
}
```

For advanced options please refer https://firebase.google.com/docs/dynamic-links/android/create

### iOS

1. Configure your app to use dynamic links
   https://firebase.google.com/docs/dynamic-links/ios/receive

### Web

None

## API

<docgen-index>

* [`addListener('deepLinkOpen', ...)`](#addlistenerdeeplinkopen-)
* [`createDynamicLink(...)`](#createdynamiclink)
* [`createDynamicShortLink(...)`](#createdynamicshortlink)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### addListener('deepLinkOpen', ...)

```typescript
addListener(eventName: 'deepLinkOpen', listenerFunc: (data: DeepLinkOpen) => void) => PluginListenerHandle
```

Adds a listener to the opening of a dynamic link

| Param              | Type                                                                     | Description                                            |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------ |
| **`eventName`**    | <code>'deepLinkOpen'</code>                                              | 'deepLinkOpen' for listening to open links             |
| **`listenerFunc`** | <code>(data: <a href="#deeplinkopen">DeepLinkOpen</a>) =&gt; void</code> | Callback function to be called when the event is fired |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### createDynamicLink(...)

```typescript
createDynamicLink(linkConfiguration: LinkConfig) => Promise<{ value: string; }>
```

Creates a new dynamic Link based on the configuration

| Param                   | Type                                              | Description                |
| ----------------------- | ------------------------------------------------- | -------------------------- |
| **`linkConfiguration`** | <code><a href="#linkconfig">LinkConfig</a></code> | configuration for the link |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### createDynamicShortLink(...)

```typescript
createDynamicShortLink(linkConfiguration: LinkConfig) => Promise<{ value: string; }>
```

Creates a new short dynamic link based on the configuration.
Its basically a shortened version of the dynamic link.   *

| Param                   | Type                                              | Description                |
| ----------------------- | ------------------------------------------------- | -------------------------- |
| **`linkConfiguration`** | <code><a href="#linkconfig">LinkConfig</a></code> | configuration for the link |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### DeepLinkOpen

| Prop      | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| **`url`** | <code>string</code> | The URL that was opened |


#### LinkConfig

| Prop                         | Type                                                                                          | Description                                                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`uri`**                    | <code>string</code>                                                                           | The link your app will open.                                                                                                                           |
| **`domainUriPrefix`**        | <code>string</code>                                                                           | Your Dynamic Link URL prefix, which you can find in the Firebase console. A Dynamic Link domain looks like the following: `https://example.page.link`. |
| **`androidParameters`**      | <code><a href="#androidparameters">AndroidParameters</a></code>                               | Android specific configuration                                                                                                                         |
| **`iosParameters`**          | <code><a href="#iosparameters">IOSParameters</a></code>                                       | iOS specific configuration                                                                                                                             |
| **`navigationInfo`**         | <code><a href="#navigationinfoparameters">NavigationInfoParameters</a></code>                 | Additional parameters for the navigation of the app.                                                                                                   |
| **`socialMeta`**             | <code><a href="#socialmetatagparameters">SocialMetaTagParameters</a></code>                   | Configuration for showed data when sharing the link with social media.                                                                                 |
| **`googleAnalytics`**        | <code><a href="#googleanalyticsparameters">GoogleAnalyticsParameters</a></code>               | Google Play analytics paremeters                                                                                                                       |
| **`iTunesConnectAnalytics`** | <code><a href="#itunesconnectanalyticsparameters">ItunesConnectAnalyticsParameters</a></code> | iTunes Connect analytics parameters                                                                                                                    |
| **`webApiKey`**              | <code>string</code>                                                                           | Firebase Web Api key                                                                                                                                   |


#### AndroidParameters

| Prop                 | Type                | Description                                                                                                                                                                                                                                               |
| -------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`packageName`**    | <code>string</code> | Your bundle ID (e.g. com.example.android)                                                                                                                                                                                                                 |
| **`fallbackUrl`**    | <code>string</code> | The link to open when the app isn't installed. Specify this to do something other than install your app from the Play Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app. |
| **`minimumVersion`** | <code>number</code> | The versionCode of the minimum version of your app that can open the link. If the installed app is an older version, the user is taken to the Play Store to upgrade the app.                                                                              |


#### IOSParameters

| Prop                  | Type                | Description                                                                                                                                                                                                                                                |
| --------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`bundleId`**        | <code>string</code> | Your bundle ID (e.g. com.example.android)                                                                                                                                                                                                                  |
| **`appStoreId`**      | <code>string</code> | Your app's App Store ID, used to send users to the App Store when the app isn't installed                                                                                                                                                                  |
| **`fallbackUrl`**     | <code>string</code> | The link to open when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app.   |
| **`customScheme`**    | <code>string</code> | Your app's custom URL scheme, if defined to be something other than your app's bundle ID                                                                                                                                                                   |
| **`ipadFallbackUrl`** | <code>string</code> | The link to open on iPads when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the web version of the content, or display a promotional page for your app. |
| **`ipadBundleId`**    | <code>string</code> | The bundle ID of the iOS app to use on iPads to open the link. The app must be connected to your project from the Overview page of the Firebase console.                                                                                                   |
| **`minimumVersion`**  | <code>string</code> | The version number of the minimum version of your app that can open the link. This flag is passed to your app when it is opened, and your app must decide what to do with it.                                                                              |


#### NavigationInfoParameters

| Prop                        | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`forcedRedirectEnabled`** | <code>boolean</code> | If set to '1', skip the app preview page when the Dynamic Link is opened, and instead redirect to the app or store. The app preview page (enabled by default) can more reliably send users to the most appropriate destination when they open Dynamic Links in apps; however, if you expect a Dynamic Link to be opened only in apps that can open Dynamic Links reliably without this page, you can disable it with this parameter. This parameter will affect the behavior of the Dynamic Link only on iOS. |


#### SocialMetaTagParameters

| Prop              | Type                | Description                                                                                              |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| **`title`**       | <code>string</code> | The title to use when the Dynamic Link is shared in a social post.                                       |
| **`description`** | <code>string</code> | The description to use when the Dynamic Link is shared in a social post.                                 |
| **`imageUrl`**    | <code>string</code> | The URL to an image related to this link. The image should be at least 300x200 px, and less than 300 KB. |


#### GoogleAnalyticsParameters

| Prop           | Type                | Description         |
| -------------- | ------------------- | ------------------- |
| **`source`**   | <code>string</code> | Sets `utm_source`   |
| **`medium`**   | <code>string</code> | Sets `utm_medium`   |
| **`campaign`** | <code>string</code> | Sets `utm_campaign` |
| **`term`**     | <code>string</code> | Sets `utm_term`     |
| **`content`**  | <code>string</code> | Sets `utm_content`  |


#### ItunesConnectAnalyticsParameters

| Prop                 | Type                | Description |
| -------------------- | ------------------- | ----------- |
| **`providerToken`**  | <code>string</code> | Sets `pt`   |
| **`affiliateToken`** | <code>string</code> | Sets `at`   |
| **`campaignToken`**  | <code>string</code> | Sets `ct`   |

</docgen-api>
