import { WebPlugin } from '@capacitor/core';
export class CapacitorFirebaseDynamicLinksWeb extends WebPlugin {
    createDynamicLink(linkConfig) {
        const dynamicLink = new URL(`${linkConfig.domainUriPrefix}/`);
        dynamicLink.searchParams.append('link', linkConfig.uri);
        if (linkConfig.androidParameters) {
            dynamicLink.searchParams.append('apn', linkConfig.androidParameters.packageName);
            if (linkConfig.androidParameters.fallbackUrl) {
                dynamicLink.searchParams.append('afl', linkConfig.androidParameters.fallbackUrl);
            }
            if (linkConfig.androidParameters.minimumVersion) {
                dynamicLink.searchParams.append('amv', linkConfig.androidParameters.minimumVersion.toString());
            }
        }
        if (linkConfig.iosParameters) {
            dynamicLink.searchParams.append('ibi', linkConfig.iosParameters.bundleId);
            if (linkConfig.iosParameters.fallbackUrl) {
                dynamicLink.searchParams.append('ifl', linkConfig.iosParameters.fallbackUrl);
            }
            if (linkConfig.iosParameters.customScheme) {
                dynamicLink.searchParams.append('ius', linkConfig.iosParameters.customScheme);
            }
            if (linkConfig.iosParameters.ipadFallbackUrl) {
                dynamicLink.searchParams.append('ipfl', linkConfig.iosParameters.ipadFallbackUrl);
            }
            if (linkConfig.iosParameters.ipadBundleId) {
                dynamicLink.searchParams.append('ipbi', linkConfig.iosParameters.ipadBundleId);
            }
            if (linkConfig.iosParameters.appStoreId) {
                dynamicLink.searchParams.append('isi', linkConfig.iosParameters.appStoreId);
            }
            if (linkConfig.iosParameters.minimumVersion) {
                dynamicLink.searchParams.append('imv', linkConfig.iosParameters.minimumVersion);
            }
        }
        if (linkConfig.navigationInfo) {
            if (linkConfig.navigationInfo.forcedRedirectEnabled) {
                dynamicLink.searchParams.append('efr', '1');
            }
        }
        if (linkConfig.socialMeta) {
            if (linkConfig.socialMeta.title) {
                dynamicLink.searchParams.append('st', linkConfig.socialMeta.title);
            }
            if (linkConfig.socialMeta.description) {
                dynamicLink.searchParams.append('sd', linkConfig.socialMeta.description);
            }
            if (linkConfig.socialMeta.imageUrl) {
                dynamicLink.searchParams.append('si', linkConfig.socialMeta.imageUrl);
            }
        }
        if (linkConfig.googleAnalytics) {
            if (linkConfig.googleAnalytics.source) {
                dynamicLink.searchParams.append('utm_source', linkConfig.googleAnalytics.source);
            }
            if (linkConfig.googleAnalytics.medium) {
                dynamicLink.searchParams.append('utm_medium', linkConfig.googleAnalytics.medium);
            }
            if (linkConfig.googleAnalytics.campaign) {
                dynamicLink.searchParams.append('utm_campaign', linkConfig.googleAnalytics.campaign);
            }
            if (linkConfig.googleAnalytics.term) {
                dynamicLink.searchParams.append('utm_term', linkConfig.googleAnalytics.term);
            }
            if (linkConfig.googleAnalytics.content) {
                dynamicLink.searchParams.append('utm_content', linkConfig.googleAnalytics.content);
            }
        }
        if (linkConfig.iTunesConnectAnalytics) {
            if (linkConfig.iTunesConnectAnalytics.affiliateToken) {
                dynamicLink.searchParams.append('at', linkConfig.iTunesConnectAnalytics.affiliateToken);
            }
            if (linkConfig.iTunesConnectAnalytics.campaignToken) {
                dynamicLink.searchParams.append('ct', linkConfig.iTunesConnectAnalytics.campaignToken);
            }
            if (linkConfig.iTunesConnectAnalytics.providerToken) {
                dynamicLink.searchParams.append('pt', linkConfig.iTunesConnectAnalytics.providerToken);
            }
        }
        return Promise.resolve({ value: dynamicLink.toString() });
    }
    createDynamicShortLink(linkConfig) {
        if (!linkConfig.webApiKey) {
            throw new Error('Unable to get firebase api key from default app');
        }
        return this.createDynamicLink(linkConfig)
            .then((result) => ({
            longDynamicLink: result.value,
        }))
            .then((dynamicLinkInfo) => fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${linkConfig.webApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dynamicLinkInfo),
        }))
            .then((response) => response.json())
            .then((data) => ({
            value: data.shortLink,
        }));
    }
}
const CapacitorFirebaseDynamicLinks = new CapacitorFirebaseDynamicLinksWeb();
export { CapacitorFirebaseDynamicLinks };
//# sourceMappingURL=web.js.map