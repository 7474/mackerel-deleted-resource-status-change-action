import * as msRest from "@azure/ms-rest-js";
import * as mackerelModel from "../mackerel/api/model/models";
import { AAzureRecource } from "./azureResource";
export declare class SQLDatabase extends AAzureRecource {
    protected static creds: msRest.ServiceClientCredentials | null;
    constructor(mackerelHost: mackerelModel.Host);
    static of(mackerelHost: mackerelModel.Host): SQLDatabase;
}
