[![npm version](https://badge.fury.io/js/capacitor-firebase-dynamic-links.svg)](https://badge.fury.io/js/capacitor-firebase-dynamic-links)


# capacitor-firebase-dynamic-links

Capacitor plugin for [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links)

## Installation

```
npm i @clipboardhealth/capacitor-firebase-dynamic-links
```

### Android Configuration

In file `android/app/src/main/java/**/**/MainActivity.java`, add the plugin to the initialization list:

```
this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
  [...]
  add(health.clipboard.links.dynamic.firebase.capacitor.CapacitorFirebaseDynamicLinks.class);
  [...]
}});
```
For advanced options please refer https://firebase.google.com/docs/dynamic-links/android/create



### iOS Configuration

1. Import the Firebase module in your `UIApplicationDelegate`:

```
import Firebase
```

2. Configure a FirebaseApp shared instance, typically in your app's `application:didFinishLaunchingWithOptions:` method:

```
FirebaseApp.configure()
```

For advanced options please refer https://firebase.google.com/docs/dynamic-links/ios/create


### Web

None

## Methods

### CapacitorFirebaseDynamicLinks.addListener('deepLinkOpen', (data: { url: string })

Add this method when the app starts to listen for the dynamic link.

```
CapacitorFirebaseDynamicLinks.addListener('deepLinkOpen', (data: { url: string }) => {
      Implement your navigation handler
    })
```
