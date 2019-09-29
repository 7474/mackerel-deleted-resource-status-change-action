"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apis = __importStar(require("./api/api/apis"));
var MackerelApiClient = /** @class */ (function () {
    function MackerelApiClient(config) {
        this.hostApi = new apis.HostApi();
        this.hostApi.setApiKey(apis.HostApiApiKeys.apiKey, config.apiKey);
    }
    Object.defineProperty(MackerelApiClient.prototype, "host", {
        get: function () {
            return this.hostApi;
        },
        enumerable: true,
        configurable: true
    });
    return MackerelApiClient;
}());
exports.MackerelApiClient = MackerelApiClient;
