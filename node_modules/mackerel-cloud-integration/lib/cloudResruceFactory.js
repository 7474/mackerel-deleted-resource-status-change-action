"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CloudResourceFactory = /** @class */ (function () {
    function CloudResourceFactory() {
        this.factoryMap = {};
    }
    CloudResourceFactory.prototype.register = function (mackerelProvider, factory) {
        this.factoryMap[mackerelProvider] = factory;
    };
    CloudResourceFactory.prototype.of = function (mackerelHost) {
        // XXX 全般にObjectへの安全なアクセスをどうにかしたい
        var metaCloud = mackerelHost.meta["cloud"];
        if (!metaCloud) {
            throw "meta.cloud is not defined.";
        }
        var provider = metaCloud["provider"];
        if (!provider) {
            throw "meta.cloud.provider is not defined.";
        }
        var factoryMethod = this.factoryMap[provider];
        if (!factoryMethod) {
            throw "provider " + provider + " is not supported.";
        }
        return factoryMethod(mackerelHost);
    };
    return CloudResourceFactory;
}());
exports.CloudResourceFactory = CloudResourceFactory;
