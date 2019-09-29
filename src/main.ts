import * as core from "@actions/core";
// XXX モジュールにする？
import { MackerelIntegration } from "mackerel-cloud-integration/lib/mackerelIntegration";
// XXX 操作もラップするか
import {
  HostApi,
  HostApiApiKeys
} from "mackerel-cloud-integration/lib/mackerel/api/api/apis";
import { HostStatusRequest } from "mackerel-cloud-integration/lib/mackerel/api/model/models";

async function run() {
  try {
    if (!process.env.MACKEREL_APIKEY) {
      throw "env.MACKEREL_APIKEY is requred.";
    }
    const integration = new MackerelIntegration({
      apiKey: process.env.MACKEREL_APIKEY
    });
    // XXX 何かいい未定義フィルタ無いだろうか
    let hostCondition = {};
    if (core.getInput("HOST_SERVICE")) {
      hostCondition["service"] = core.getInput("HOST_SERVICE");
    }
    if (core.getInput("HOST_ROLE")) {
      hostCondition["role"] = core.getInput("HOST_ROLE");
    }
    if (core.getInput("HOST_STATUS")) {
      hostCondition["status"] = core.getInput("HOST_STATUS");
    }
    if (core.getInput("HOST_TYPES")) {
      hostCondition["types"] = core
        .getInput("HOST_TYPES")
        .split(",")
        .map(x => x.trim());
    }
    console.log("hostCondition", hostCondition);
    const hosts = await integration.getHosts(hostCondition);
    console.log("hosts", hosts);

    const hostApi = new HostApi();
    hostApi.setApiKey(HostApiApiKeys.apiKey, process.env.MACKEREL_APIKEY);
    for (const host of hosts) {
      await host.cloudResource.fetch();
      console.log(
        host.mackerelHost.id,
        host.mackerelHost.name,
        host.cloudResource.mackerelProvider,
        host.cloudResource.exists()
      );
      // XXX インタフェースでなくクラス＆Enumのマッピングが厳しいのでは。。。
      if (!host.cloudResource.exists()) {
        let hostStatusRequest = new HostStatusRequest();
        hostStatusRequest.status = HostStatusRequest.StatusEnum.Poweroff;
        console.log(
          "Update Host Status",
          host.mackerelHost.id,
          hostStatusRequest.status
        );
        const response = await hostApi.postHostStatus(
          host.mackerelHost.id,
          hostStatusRequest
        );
        console.log(response.body);
      }
    }
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}

run();
