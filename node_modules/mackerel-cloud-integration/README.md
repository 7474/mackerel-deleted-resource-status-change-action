# mackerel-cloud-integration

[Mackerel](https://mackerel.io/)'s utility for cloud integration.

You can search for a cloud-integrated host and check if the resource exists.

(Mackerel does not take any action on deleted resources. See: [AWSインテグレーションにより連携したホストの退役について](https://mackerel.io/ja/docs/entry/integrations/aws))

Currently supported resources are:

- Azure Integration
    - `SQLDatabase`
- AWS Integration
    - `s3`

## Install

```sh
$ npm install https://github.com/7474/mackerel-cloud-integration
```

## Configure

### Azure Integration

Set the following environment variables to handle [Azure Integration](https://mackerel.io/ja/docs/entry/integrations/azure) Resource.

Only password-based authentication is supported.

```
export AZURE_ID {Service Principal ID}
export AZURE_PASS {password}
export AZURE_TENANT {Tenant ID}
export AZURE_SUB {Subscription ID}
```

Please refer to the following page for setting.

- https://docs.microsoft.com/ja-jp/javascript/azure/node-sdk-azure-get-started?view=azure-node-latest
- https://docs.microsoft.com/ja-jp/cli/azure/create-an-azure-service-principal-azure-cli?view=azure-cli-latest

The language is "ja-jp" because I see it.

### AWS Integration

Set the following environment variables to handle [AWS Integration](https://mackerel.io/ja/docs/entry/integrations/aws) Resource.

Use default credentials for AWS. It works even if environment variables are not set.

```
export AWS_ACCESS_KEY_ID {Access Key ID}
export AWS_SECRET_ACCESS_KEY {Secret Access Key}
export AWS_DEFAULT_REGION {Region Name}
# e.g. ap-northeast-1
```

### Mackerel API Key

Mackerel API Key does not read environment variables. Specify it as an argument during construction.

```js
const integration = new MackerelIntegration({
  apiKey: "your_api_key"
});
```

## Example code snippet

```typescript
  const integration = new MackerelIntegration({
    apiKey: "your_api_key"
  });

  // Get integrated hosts.
  const hosts = await integration.getHosts({});
  for (const host of hosts) {
    console.log(
      "IntegratedHost",
      host.mackerelHost.id,
      host.mackerelHost.name,
      host.cloudResource.mackerelProvider,
      host.cloudResource.type
    );
  }
  // And check cloud rsource.
  for (const host of hosts) {
    await host.cloudResource.fetch();
    console.log(
      "IntegratedHost",
      host.mackerelHost.id,
      host.cloudResource.exists(),
      host
    );
  }
```