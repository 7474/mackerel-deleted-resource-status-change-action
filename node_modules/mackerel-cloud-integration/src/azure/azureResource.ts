import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import { ACloudRecource } from "../cloudResruce";
import * as mackerelModel from "../mackerel/api/model/models";

export class AAzureRecource extends ACloudRecource {
  protected static creds: msRest.ServiceClientCredentials | null = null;
  constructor(mackerelHost: mackerelModel.Host, azureResourceType: string) {
    super(mackerelHost, azureResourceType);
  }
  async fetchInternal(): Promise<any> {
    try {
      const appId = process.env["AZURE_ID"];
      const password = process.env["AZURE_PASS"];
      const tenant = process.env["AZURE_TENANT"];
      const subscriptionId = process.env["AZURE_SUB"];

      if (!appId) {
        throw "env.AZURE_ID is required.";
      }
      if (!password) {
        throw "env.AZURE_PASS is required.";
      }
      if (!tenant) {
        throw "env.AZURE_TENANT is required.";
      }
      if (!subscriptionId) {
        throw "env.AZURE_SUB is required.";
      }

      if (!AAzureRecource.creds) {
        AAzureRecource.creds = await msRestNodeAuth.loginWithServicePrincipalSecret(
          appId,
          password,
          tenant
        );
      }
      const client = new ResourceGraphClient(AAzureRecource.creds);
      // ARMのリソースタイプは大文字が含まれるが、Resource Graphは何故か小文字しか受け付けない。
      const query = `where type == '${this.type.toLowerCase()}' and name == '${this.mackerelHost.name}'`;
      const response = await client.resources({
        subscriptions: [subscriptionId],
        query: query
      });
      if (response.count === 1) {
        return response.data;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
