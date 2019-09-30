import * as mackerelModel from "./mackerel/api/model/models";
import * as mackerel from "./mackerel/client";
import { ICloudResource } from "./cloudResruce";
import {
  ICloudResourceFactory,
  CloudResourceFactory
} from "./cloudResruceFactory";
import { S3 } from "./aws/s3";
import { SQLDatabase } from "./azure/sqlDatabase";

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
export class IntegratedHost implements IIntegratedHost {
  mackerelHost: mackerelModel.Host;
  cloudResource: ICloudResource;

  private integration: IMackerelIntegration;

  constructor(
    integration: IMackerelIntegration,
    mackerelHost: mackerelModel.Host,
    cloudResource: ICloudResource
  ) {
    this.integration = integration;
    this.mackerelHost = mackerelHost;
    this.cloudResource = cloudResource;
  }
}
export class MackerelIntegration implements IMackerelIntegration {
  private mackerel: mackerel.IMackerelApiClient;
  private cloudResourceFactory: ICloudResourceFactory;

  constructor(mackerelConfig: mackerel.IMackerelApiConfig) {
    this.mackerel = new mackerel.MackerelApiClient(mackerelConfig);
    this.cloudResourceFactory = new CloudResourceFactory();
    // XXX register
    this.cloudResourceFactory.register("s3", S3.of);
    this.cloudResourceFactory.register("SQLDatabase", SQLDatabase.of);
  }

  async getHosts(condition: IHostCondition): Promise<IIntegratedHost[]> {
    const response = await this.mackerel.host.getHosts(
      condition.service,
      condition.role,
      undefined,
      condition.status,
      undefined
    );

    const integratedHosts = response.body.hosts
      .filter(
        x =>
          !condition.types ||
          condition.types.length == 0 ||
          condition.types.includes(x.type)
      )
      .map(x => {
        try {
          return new IntegratedHost(this, x, this.cloudResourceFactory.of(x));
        } catch (err) {
          console.error(err);
          return undefined;
        }
      })
      .filter(x => !!x)
      // filter では | undefined がガードされなかった
      .map(x => x as IntegratedHost);

    return integratedHosts;
  }
}
