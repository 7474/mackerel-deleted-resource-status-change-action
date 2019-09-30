import * as msRest from "@azure/ms-rest-js";
import { ACloudRecource } from "../cloudResruce";
import * as mackerelModel from "../mackerel/api/model/models";
export declare class AAzureRecource extends ACloudRecource {
    protected static creds: msRest.ServiceClientCredentials | null;
    constructor(mackerelHost: mackerelModel.Host, azureResourceType: string);
    fetchInternal(): Promise<any>;
}
