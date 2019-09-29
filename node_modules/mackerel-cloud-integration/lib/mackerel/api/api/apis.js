"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./alertApi"));
var alertApi_1 = require("./alertApi");
__export(require("./hostApi"));
var hostApi_1 = require("./hostApi");
__export(require("./hostMetricApi"));
var hostMetricApi_1 = require("./hostMetricApi");
__export(require("./serviceMetricApi"));
var serviceMetricApi_1 = require("./serviceMetricApi");
exports.APIS = [alertApi_1.AlertApi, hostApi_1.HostApi, hostMetricApi_1.HostMetricApi, serviceMetricApi_1.ServiceMetricApi];
