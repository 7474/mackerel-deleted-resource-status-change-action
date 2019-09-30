import * as msRest from "@azure/ms-rest-js";
import * as mackerelModel from "../mackerel/api/model/models";
import { AAzureRecource } from "./azureResource";

export class SQLDatabase extends AAzureRecource {
  protected static creds: msRest.ServiceClientCredentials | null = null;
  constructor(mackerelHost: mackerelModel.Host) {
    super(mackerelHost, "Microsoft.Sql/servers/databases");
  }
  public static of(mackerelHost: mackerelModel.Host): SQLDatabase {
    return new SQLDatabase(mackerelHost);
  }
}
