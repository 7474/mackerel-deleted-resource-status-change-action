import * as mackerelModel from "./mackerel/api/model/models";
export interface ICloudResource {
    fetch(): Promise<void>;
    exists(): boolean;
    /** Type of Cloud. */
    type: string;
    /** Provider of Mackerel Integration. */
    mackerelProvider: string;
}
export declare abstract class ACloudRecource implements ICloudResource {
    type: string;
    mackerelProvider: string;
    protected isFetched: boolean;
    protected cloudResource: any;
    protected mackerelHost: any;
    constructor(mackerelHost: mackerelModel.Host, cloudResourceType: string);
    fetch(): Promise<void>;
    exists(): boolean;
    abstract fetchInternal(): Promise<any>;
}
