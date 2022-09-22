import { registerPlugin } from '@capacitor/core';
const FirebaseDynamicLinks = registerPlugin('CapacitorFirebaseDynamicLinks', {
    web: () => import('./web').then((m) => new m.CapacitorFirebaseDynamicLinksWeb()),
});
export * from './definitions';
export { FirebaseDynamicLinks };
//# sourceMappingURL=index.js.map