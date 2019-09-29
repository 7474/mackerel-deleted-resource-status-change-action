import * as apis from "./api/api/apis";
export interface IMackerelApiConfig {
    apiKey: string;
    baseBaph?: string;
}
export interface IMackerelApiClient {
    host: apis.HostApi;
}
export declare class MackerelApiClient implements IMackerelApiClient {
    private hostApi;
    constructor(config: IMackerelApiConfig);
    readonly host: apis.HostApi;
}
