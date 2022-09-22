import { WebPlugin } from '@capacitor/core';
import { CapacitorFirebaseDynamicLinksPlugin, LinkConfig } from './definitions';
export declare class CapacitorFirebaseDynamicLinksWeb extends WebPlugin implements CapacitorFirebaseDynamicLinksPlugin {
    createDynamicLink(linkConfig: LinkConfig): Promise<{
        value: string;
    }>;
    createDynamicShortLink(linkConfig: LinkConfig): Promise<{
        value: string;
    }>;
}
declare const CapacitorFirebaseDynamicLinks: CapacitorFirebaseDynamicLinksWeb;
export { CapacitorFirebaseDynamicLinks };
