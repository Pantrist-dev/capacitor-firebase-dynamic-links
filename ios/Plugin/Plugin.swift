import Foundation
import Capacitor
import FirebaseCore
import FirebaseDynamicLinks

typealias JSObject = [String:Any]

@objc(CapacitorFirebaseDynamicLinks)
public class CapacitorFirebaseDynamicLinks: CAPPlugin {
    
    public override func load() {
        if (FirebaseApp.app() == nil) {
            FirebaseApp.configure()
        }

        NotificationCenter.default.addObserver(self, selector: #selector(self.handleUrlOpened(notification:)), name: Notification.Name(CAPNotifications.URLOpen.name()), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.handleUniversalLink(notification:)), name: Notification.Name(CAPNotifications.UniversalLinkOpen.name()), object: nil)
    }
    
    
    @objc func handleUrlOpened(notification: NSNotification) {
        guard let object = notification.object as? [String:Any?] else {
            return
        }

        if DynamicLinks.dynamicLinks().dynamicLink(fromCustomSchemeURL: object["url"] as! URL) != nil {
            self.notifyListeners("deepLinkOpen", data: makeUrlOpenObject(object), retainUntilConsumed: true)
        }
    }
    
    @objc func handleUniversalLink(notification: NSNotification) {
        guard let object = notification.object as? [String:Any?] else {
            return
        }
        
        DynamicLinks.dynamicLinks().handleUniversalLink(object["url"] as! URL) { (dynamiclink, error) in
            let url = dynamiclink?.url?.absoluteString ?? ""
            
            self.notifyListeners("deepLinkOpen", data: ["url": url], retainUntilConsumed: true)
        }
    }
    
    func makeUrlOpenObject(_ object: [String:Any?]) -> JSObject {
        guard let url = object["url"] as? NSURL else {
            return [:]
        }
        
        return [
            "url": url.absoluteString ?? ""
        ]
    }
}
