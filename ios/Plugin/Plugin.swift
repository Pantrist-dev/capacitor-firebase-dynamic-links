import Capacitor
import FirebaseCore
import FirebaseDynamicLinks
import Foundation

typealias JSObject = [String: Any]

@objc(CapacitorFirebaseDynamicLinks)
public class CapacitorFirebaseDynamicLinks: CAPPlugin {
    public override func load() {
        if FirebaseApp.app() == nil {
            FirebaseApp.configure()
        }
        
        NotificationCenter.default.addObserver(self, selector: #selector(handleUrlOpened(notification:)), name: Notification.Name(CAPNotifications.URLOpen.name()), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(handleUniversalLink(notification:)), name: Notification.Name(CAPNotifications.UniversalLinkOpen.name()), object: nil)
    }
    
    @objc func createDynamicLink(_ call: CAPPluginCall) {
        guard let link = URL(string: call.getString("uri")!) else { return }
        let dynamicLinksDomainURIPrefix = call.getString("domainUriPrefix")!
        
        guard let builder = DynamicLinkComponents(link: link, domainURIPrefix: dynamicLinksDomainURIPrefix) else { return }
        
        buildAndroidParameters(call: call, builder: builder)
        buildIOSParameters(call: call, builder: builder)
        buildGoogleAnalyticsParameters(call: call, builder: builder)
        buildITunesParameters(call: call, builder: builder)
        buildSocialMetaParameters(call: call, builder: builder)
        
        guard let longDynamicLink = builder.url else { return }
        print("The long URL is: \(longDynamicLink)")
        
        call.success([
            "value": longDynamicLink
        ])
    }
    
    @objc func createDynamicShortLink(_ call: CAPPluginCall) {
        guard let link = URL(string: call.getString("uri")!) else { return }
        let dynamicLinksDomainURIPrefix = call.getString("domainUriPrefix")!
        
        guard let builder = DynamicLinkComponents(link: link, domainURIPrefix: dynamicLinksDomainURIPrefix) else { return }
        
        buildAndroidParameters(call: call, builder: builder)
        buildIOSParameters(call: call, builder: builder)
        buildGoogleAnalyticsParameters(call: call, builder: builder)
        buildITunesParameters(call: call, builder: builder)
        buildSocialMetaParameters(call: call, builder: builder)
        
        builder.shorten() { url, warnings, error in
            print("The short URL is: \(url)")
            
            guard let url = url, error == nil else { return }
            
            call.success([
                "value": url.absoluteString
            ])
        }
        
    }
    
    @objc func handleUrlOpened(notification: NSNotification) {
        guard let object = notification.object as? [String: Any?] else {
            return
        }
        
        if DynamicLinks.dynamicLinks().dynamicLink(fromCustomSchemeURL: object["url"] as! URL) != nil {
            notifyListeners("deepLinkOpen", data: makeUrlOpenObject(object), retainUntilConsumed: true)
        }
    }
    
    @objc func handleUniversalLink(notification: NSNotification) {
        guard let object = notification.object as? [String: Any?] else {
            return
        }
        
        DynamicLinks.dynamicLinks().handleUniversalLink(object["url"] as! URL) { dynamiclink, _ in
            let url = dynamiclink?.url?.absoluteString ?? ""
            
            self.notifyListeners("deepLinkOpen", data: ["url": url], retainUntilConsumed: true)
        }
    }
    
    func makeUrlOpenObject(_ object: [String: Any?]) -> JSObject {
        guard let url = object["url"] as? NSURL else {
            return [:]
        }
        
        return [
            "url": url.absoluteString ?? "",
        ]
    }
    
    private func buildGoogleAnalyticsParameters(call: CAPPluginCall, builder: DynamicLinkComponents) {
        let googleAnalyticsParameters = call.getObject("googleAnalytics") ?? [:]
        
        let googleAnalyticsParametersBuilder = DynamicLinkGoogleAnalyticsParameters()
        
        if googleAnalyticsParameters["source"] != nil {
            googleAnalyticsParametersBuilder.source = googleAnalyticsParameters["source"] as? String
        }
        
        if googleAnalyticsParameters["medium"] != nil {
            googleAnalyticsParametersBuilder.medium = googleAnalyticsParameters["medium"] as? String
        }
        
        if googleAnalyticsParameters["campaign"] != nil {
            googleAnalyticsParametersBuilder.campaign = googleAnalyticsParameters["campaign"] as? String
        }
        
        if googleAnalyticsParameters["term"] != nil {
            googleAnalyticsParametersBuilder.term = googleAnalyticsParameters["term"] as? String
        }
        
        if googleAnalyticsParameters["source"] != nil {
            googleAnalyticsParametersBuilder.content = googleAnalyticsParameters["content"] as? String
        }
        
        builder.analyticsParameters = googleAnalyticsParametersBuilder
    }
    
    private func buildIOSParameters(call: CAPPluginCall, builder: DynamicLinkComponents) {
        let iosParameters = call.getObject("iosParameters") ?? [:]
        
        
        let iosParameterBuilder = DynamicLinkIOSParameters(bundleID: (iosParameters["bundleId"] as? String)!)
        
        if iosParameters["appStoreId"] != nil {
            iosParameterBuilder.appStoreID = iosParameters["appStoreId"] as? String
        }
        
        if iosParameters["fallbackUrl"] != nil {
            iosParameterBuilder.fallbackURL = URL(string: (iosParameters["fallbackUrl"] as? String)!)
        }
        
        if iosParameters["customScheme"] != nil {
            iosParameterBuilder.customScheme = iosParameters["customScheme"] as? String
        }
        
        if iosParameters["ipadFallbackUrl"] != nil {
            iosParameterBuilder.iPadFallbackURL = URL(string: iosParameters["ipadFallbackUrl"] as! String)
        }
        
        if iosParameters["ipadBundleId"] != nil {
            iosParameterBuilder.iPadBundleID = iosParameters["ipadBundleId"] as? String
        }
        
        if iosParameters["minimumVersion"] != nil {
            iosParameterBuilder.minimumAppVersion = iosParameters["minimumVersion"] as? String
        }
        
        builder.iOSParameters = iosParameterBuilder
        
    }
    
    private func buildAndroidParameters(call: CAPPluginCall, builder: DynamicLinkComponents) {
        let androidParameters = call.getObject("androidParameters") ?? [:]
        
        let androidParameterBuilder = DynamicLinkAndroidParameters()
        
        if androidParameters["minimumVersion"] != nil {
            androidParameterBuilder.minimumVersion = androidParameters["minimumVersion"] as! Int
        }
        
        if androidParameters["fallbackUrl"] != nil {
            androidParameterBuilder.fallbackURL = URL(string: androidParameters["fallbackUrl"] as! String)
        }
        
        builder.androidParameters = androidParameterBuilder
        
    }
    
    private func buildITunesParameters(call: CAPPluginCall, builder: DynamicLinkComponents) {
        let iTunesConnectAnalyticsParameters = call.getObject("iTunesConnectAnalytics") ?? [:]
        
        let iTunesConnectAnalyticsParameterBuilder = DynamicLinkItunesConnectAnalyticsParameters()
        
        if iTunesConnectAnalyticsParameters["providerToken"] != nil {
            iTunesConnectAnalyticsParameterBuilder.providerToken = iTunesConnectAnalyticsParameters["providerToken"] as? String
        }
        
        if iTunesConnectAnalyticsParameters["affiliateToken"] != nil {
            iTunesConnectAnalyticsParameterBuilder.affiliateToken = iTunesConnectAnalyticsParameters["affiliateToken"] as? String
        }
        
        if iTunesConnectAnalyticsParameters["campaignToken"] != nil {
            iTunesConnectAnalyticsParameterBuilder.campaignToken = iTunesConnectAnalyticsParameters["campaignToken"] as? String
        }
        
        builder.iTunesConnectParameters = iTunesConnectAnalyticsParameterBuilder
        
    }
    
    private func buildSocialMetaParameters(call: CAPPluginCall, builder: DynamicLinkComponents) {
        let socialMetaParameters = call.getObject("socialMeta") ?? [:]
        
        let socialMetaParameterBuilder = DynamicLinkSocialMetaTagParameters()
        
        if socialMetaParameters["title"] != nil {
            socialMetaParameterBuilder.title = socialMetaParameters["title"] as? String
        }
        
        if socialMetaParameters["description"] != nil {
            socialMetaParameterBuilder.descriptionText = socialMetaParameters["description"] as? String
        }
        
        if socialMetaParameters["imageUrl"] != nil {
            socialMetaParameterBuilder.imageURL = URL(string: (socialMetaParameters["imageUrl"] as? String)!)
        }
        
        builder.socialMetaTagParameters = socialMetaParameterBuilder
        
    }
}
