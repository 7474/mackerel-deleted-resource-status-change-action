import * as apis from "./api/api/apis";

export interface IMackerelApiConfig {
  apiKey: string;
  baseBaph?: string;
}
export interface IMackerelApiClient {
  host: apis.HostApi;
}
export class MackerelApiClient implements IMackerelApiClient {
  private hostApi: apis.HostApi;
  constructor(config: IMackerelApiConfig) {
    this.hostApi = new apis.HostApi();
    this.hostApi.setApiKey(apis.HostApiApiKeys.apiKey, config.apiKey);
  }

  get host(): apis.HostApi {
    return this.hostApi;
  }
}
