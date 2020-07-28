# capacitor-firebase-dynamic-links

Capacitor plugin for [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links)

## Installation

```
npm i @turnoutt/capacitor-firebase-dynamic-links
```

### Android Configuration

In file `android/app/src/main/java/**/**/MainActivity.java`, add the plugin to the initialization list:

```java
import com.turnoutt.firebase.dynamiclinks.CapacitorFirebaseDynamicLinks;

this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{

  add(CapacitorFirebaseDynamicLinks.class);

}});
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
