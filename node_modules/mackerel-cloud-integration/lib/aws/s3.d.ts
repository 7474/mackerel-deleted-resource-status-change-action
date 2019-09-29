import { ACloudRecource } from "../cloudResruce";
import * as mackerelModel from "../mackerel/api/model/models";
export declare class S3 extends ACloudRecource {
    constructor(mackerelHost: mackerelModel.Host);
    static of(mackerelHost: mackerelModel.Host): S3;
    fetchInternal(): Promise<any>;
}
