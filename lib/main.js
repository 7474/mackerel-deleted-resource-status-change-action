"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
// XXX モジュールにする？
const mackerelIntegration_1 = require("mackerel-cloud-integration/lib/mackerelIntegration");
// XXX 操作もラップするか
const apis_1 = require("mackerel-cloud-integration/lib/mackerel/api/api/apis");
const models_1 = require("mackerel-cloud-integration/lib/mackerel/api/model/models");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.MACKEREL_APIKEY) {
                throw "env.MACKEREL_APIKEY is requred.";
            }
            const integration = new mackerelIntegration_1.MackerelIntegration({
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
            const hosts = yield integration.getHosts(hostCondition);
            console.log("hosts", hosts);
            const hostApi = new apis_1.HostApi();
            hostApi.setApiKey(apis_1.HostApiApiKeys.apiKey, process.env.MACKEREL_APIKEY);
            for (const host of hosts) {
                yield host.cloudResource.fetch();
                console.log(host.mackerelHost.id, host.mackerelHost.name, host.cloudResource.mackerelProvider, host.cloudResource.exists());
                // XXX インタフェースでなくクラス＆Enumのマッピングが厳しいのでは。。。
                if (!host.cloudResource.exists()) {
                    let hostStatusRequest = new models_1.HostStatusRequest();
                    hostStatusRequest.status = models_1.HostStatusRequest.StatusEnum.Poweroff;
                    console.log("Update Host Status", host.mackerelHost.id, hostStatusRequest.status);
                    const response = yield hostApi.postHostStatus(host.mackerelHost.id, hostStatusRequest);
                    console.log(response.body);
                }
            }
        }
        catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    });
}
run();
