import { WebPlugin } from '@capacitor/core';

import { CapacitorFirebaseDynamicLinksPlugin, LinkConfig } from './definitions';

export class CapacitorFirebaseDynamicLinksWeb extends WebPlugin implements CapacitorFirebaseDynamicLinksPlugin {
  createDynamicLink(_: LinkConfig): Promise<{ value: string; }> {
    throw new Error('Method not implemented.');
  }

  createDynamicShortLink(_: LinkConfig): Promise<{ value: string; }> {
    throw new Error('Method not implemented.');
  }
}

const CapacitorFirebaseDynamicLinks = new CapacitorFirebaseDynamicLinksWeb();

export { CapacitorFirebaseDynamicLinks };