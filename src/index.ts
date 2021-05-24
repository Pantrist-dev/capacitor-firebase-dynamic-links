import { registerPlugin } from '@capacitor/core';
import type { CapacitorFirebaseDynamicLinksPlugin } from "./definitions";

const FirebaseDynamicLinks = registerPlugin<CapacitorFirebaseDynamicLinksPlugin>('CapacitorFirebaseDynamicLinks', {
    web: () => import('./web').then(m => new m.CapacitorFirebaseDynamicLinksWeb())
});

export * from './definitions';
export { FirebaseDynamicLinks }