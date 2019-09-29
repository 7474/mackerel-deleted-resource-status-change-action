import * as mackerelModel from "./mackerel/api/model/models";
import * as mackerel from "./mackerel/client";
import { ICloudResource } from "./cloudResruce";
export interface IMackerelIntegration {
    getHosts(condition: IHostCondition): Promise<IIntegratedHost[]>;
}
export interface IHostCondition {
    service?: string;
    role?: string;
    status?: string;
    types?: string[];
}
export interface IIntegratedHost {
    mackerelHost: mackerelModel.Host;
    cloudResource: ICloudResource;
}
export declare class IntegratedHost implements IIntegratedHost {
    mackerelHost: mackerelModel.Host;
    cloudResource: ICloudResource;
    private integration;
    constructor(integration: IMackerelIntegration, mackerelHost: mackerelModel.Host, cloudResource: ICloudResource);
}
export declare class MackerelIntegration implements IMackerelIntegration {
    private mackerel;
    private cloudResourceFactory;
    constructor(mackerelConfig: mackerel.IMackerelApiConfig);
    getHosts(condition: IHostCondition): Promise<IIntegratedHost[]>;
}
