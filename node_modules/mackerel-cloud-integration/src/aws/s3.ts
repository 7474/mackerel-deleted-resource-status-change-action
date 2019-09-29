import { ACloudRecource } from "../cloudResruce";
import * as mackerelModel from "../mackerel/api/model/models";
import AWS from "aws-sdk";

export class S3 extends ACloudRecource {
  constructor(mackerelHost: mackerelModel.Host) {
    super(mackerelHost, "AWS::S3::Bucket");
  }
  public static of(mackerelHost: mackerelModel.Host): S3 {
    return new S3(mackerelHost);
  }
  async fetchInternal(): Promise<any> {
    const awsS3 = new AWS.S3();
    // Host.name is S3 Bucket name.
    // Host.customIdentifier is ARN.
    try {
      const req = await awsS3
        .headBucket({ Bucket: this.mackerelHost.name })
        .promise();
      return req.$response.data;
    } catch (err) {
      // If statusCode is 404, it is assuming no resource exists.
      if (err.statusCode == 404) {
        return undefined;
      }
      throw err;
    }
  }
}
