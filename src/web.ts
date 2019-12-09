import { WebPlugin } from '@capacitor/core';
import { CapacitorFirebaseDynamicLinksPlugin } from './definitions';

export class CapacitorFirebaseDynamicLinksWeb extends WebPlugin implements CapacitorFirebaseDynamicLinksPlugin {
  constructor() {
    super({
      name: 'CapacitorFirebaseDynamicLinks',
      platforms: ['web']
    });
  }
}

const CapacitorFirebaseDynamicLinks = new CapacitorFirebaseDynamicLinksWeb();

export { CapacitorFirebaseDynamicLinks };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapacitorFirebaseDynamicLinks);
