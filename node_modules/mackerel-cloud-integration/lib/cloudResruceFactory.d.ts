import * as mackerelModel from "./mackerel/api/model/models";
import { ICloudResource } from "./cloudResruce";
export declare type FactoryMethod = (mackerelHost: mackerelModel.Host) => ICloudResource;
export interface ICloudResourceFactory {
    of(mackerelHost: mackerelModel.Host): ICloudResource;
    register(mackerelProvider: string, factory: FactoryMethod): void;
}
export declare class CloudResourceFactory implements ICloudResourceFactory {
    factoryMap: {
        [key: string]: FactoryMethod;
    };
    register(mackerelProvider: string, factory: FactoryMethod): void;
    of(mackerelHost: mackerelModel.Host): ICloudResource;
}
