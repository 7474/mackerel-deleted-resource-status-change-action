import * as mackerelModel from "./mackerel/api/model/models";

export interface ICloudResource {
  fetch(): Promise<void>;
  exists(): boolean;
  /** Type of Cloud. */
  type: string;
  /** Provider of Mackerel Integration. */
  mackerelProvider: string;
}

export abstract class ACloudRecource implements ICloudResource {
  type: string;
  mackerelProvider: string;
  protected isFetched: boolean = false;
  protected cloudResource: any;
  protected mackerelHost: any;

  // https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html
  constructor(mackerelHost: mackerelModel.Host, cloudResourceType: string) {
    this.mackerelProvider = mackerelHost.meta["cloud"]["provider"];
    this.type = cloudResourceType;
    this.mackerelHost = mackerelHost;
  }

  async fetch(): Promise<void> {
    if (!this.isFetched) {
      this.cloudResource = await this.fetchInternal();
      this.isFetched = true;
    }
  }

  exists(): boolean {
    // this.fetch();
    if (!this.isFetched) {
      throw "this is not fetched.";
    }
    return !!this.cloudResource;
  }

  abstract fetchInternal(): Promise<any>;
}
