# mackerel-deleted-resource-status-change-action

This action power off the host created by Mackerel's cloud integration and the cloud resource has been deleted.

Please refer to [mackerel-cloud-integration](https://github.com/7474/mackerel-cloud-integration) for supported resources.
# Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
- name: Poweroff not exist cloud integration host.
  uses: 7474/mackerel-deleted-resource-status-change-action@releases/v0
  env:
    MACKEREL_APIKEY: {Mackerel API Key}
    AWS_ACCESS_KEY_ID: {Access Key ID}
    AWS_SECRET_ACCESS_KEY: {Secret Access Key}
    AWS_DEFAULT_REGION: {Region Name}
    AZURE_ID: {Service Principal ID}
    AZURE_PASS: {password}
    AZURE_TENANT: {Tenant ID}
    AZURE_SUB: {Subscription ID}
  with:
    HOST_SERVICE: service-name(optional)
    HOST_ROLE: role-name(optional)
    HOST_STATUS: status-name(optional)
    HOST_TYPES: conma-separated-tag-names(optional)
```

By default, the branch or tag ref that triggered the workflow will be checked out. If you wish to check out a different branch, specify that using `with.ref`:

```yaml
- uses: actions/checkout@master
  with:
    ref: some-branch
```

For more details, see [Contexts and expression syntax for GitHub Actions](https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions)

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

----

The following is a template.

# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a JavaScript action.:rocket:

This template includes compilication support, tests, a validation workflow, publishing, and versioning guidance.

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Master

Install the dependencies
```bash
$ npm install
```

Build the typescript
```bash
$ npm run build
```

Run the tests :heavy_check_mark:
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml contains defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos.  We will create a releases branch and only checkin production modules (core in this case).

Comment out node_modules in .gitignore and create a releases/v1 branch
```bash
# comment out in distribution branches
# node_modules/
```

```bash
$ git checkout -b releases/v1
$ git commit -a -m "prod dependencies"
```

```bash
$ npm prune --production
$ git add node_modules
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing the releases/v1 branch

```yaml
uses: actions/typescript-action@releases/v1
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and tested action

```yaml
uses: actions/typescript-action@v1
with:
  milliseconds: 1000
```
