"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var azureResource_1 = require("./azureResource");
var SQLDatabase = /** @class */ (function (_super) {
    __extends(SQLDatabase, _super);
    function SQLDatabase(mackerelHost) {
        return _super.call(this, mackerelHost, "Microsoft.Sql/servers/databases") || this;
    }
    SQLDatabase.of = function (mackerelHost) {
        return new SQLDatabase(mackerelHost);
    };
    SQLDatabase.creds = null;
    return SQLDatabase;
}(azureResource_1.AAzureRecource));
exports.SQLDatabase = SQLDatabase;
