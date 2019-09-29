import * as mackerelModel from "./mackerel/api/model/models";
import { ICloudResource } from "./cloudResruce";

export type FactoryMethod = (
  mackerelHost: mackerelModel.Host
) => ICloudResource;

export interface ICloudResourceFactory {
  of(mackerelHost: mackerelModel.Host): ICloudResource;
  register(mackerelProvider: string, factory: FactoryMethod): void;
}

export class CloudResourceFactory implements ICloudResourceFactory {
  factoryMap: { [key: string]: FactoryMethod } = {};

  register(mackerelProvider: string, factory: FactoryMethod): void {
    this.factoryMap[mackerelProvider] = factory;
  }
  of(mackerelHost: mackerelModel.Host): ICloudResource {
    // XXX 全般にObjectへの安全なアクセスをどうにかしたい
    const metaCloud: object = mackerelHost.meta["cloud"];
    if (!metaCloud) {
      throw "meta.cloud is not defined.";
    }
    const provider: string = metaCloud["provider"];
    if (!provider) {
      throw "meta.cloud.provider is not defined.";
    }
    const factoryMethod = this.factoryMap[provider];
    if (!factoryMethod) {
      throw `provider ${provider} is not supported.`;
    }
    return factoryMethod(mackerelHost);
  }
}
