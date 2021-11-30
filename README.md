# capacitor-firebase-dynamic-links

[![npm version](https://badge.fury.io/js/%40pantrist%2Fcapacitor-firebase-dynamic-links.svg)](https://badge.fury.io/js/%40pantrist%2Fcapacitor-firebase-dynamic-links)

Capacitor plugin for [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links)

## Installation

```
npm i @pantrist/capacitor-firebase-dynamic-links
```

### Android Configuration

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

### iOS Configuration

1. Configure your app to use dynamic links
   https://firebase.google.com/docs/dynamic-links/ios/receive

### Web

None

## Methods

### addListener('deepLinkOpen', (data: { url: string })

Add this method when the app starts to listen for the dynamic link.

```
CapacitorFirebaseDynamicLinks.addListener('deepLinkOpen', (data: { url: string }) => {
      Implement your navigation handler
    })
```

### createDynamicLink(linkConfiguration: LinkConfig)

This method is used to create a new dynamic link.

### createDynamicShortLink(linkConfiguration: LinkConfig)

This method is used to create a new dynamic short link.
