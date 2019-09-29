import { MackerelIntegration } from "../src/mackerelIntegration";

test("test integration", async () => {
  const integration = new MackerelIntegration({
    apiKey: "xxx"
  });

  const hosts = await integration.getHosts({});
  for (const host of hosts) {
    await host.cloudResource.fetch();
    console.log(
      "IntegratedHost",
      host.mackerelHost.id,
      host.cloudResource.exists(),
      host
    );
  }
});
