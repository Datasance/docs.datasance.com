# potctl Resource Management

## Deploying New Edge Compute Networks

`potctl` allows you to deploy an entire ECN from a single command and YAML file.

```bash
potctl deploy -f ecn.yaml
```

`potctl` also allows you to deploy indvidiual components of an ECN using the same command but different YAML files.

```bash
potctl deploy -f controlplane.yaml
potctl deploy -f controller.yaml
potctl deploy -f agent.yaml
potctl deploy -f agentConfig.yaml
potctl deploy -f application.yaml
```

`potctl` deploy commands are designed to be idempotent. Feel free to spam these commands as much as you like - the end result will always be the same. If anything goes wrong with your deployment, run the relevant deploy commands again and you should be good to go.

Specifications of the ioFog platform YAML types can be found [here](../reference-potctl/reference-control-plane).

Specifications of the ioFog application YAML types can be found [here](../reference-potctl/reference-application).

## Delete Components of Edge Compute Networks

We can delete resources that we have deployed to free up any associated infrastructure. Deleting resources like Control Planes, Controllers and Agents will cause any corresponding daemons to be terminated on the remote hosts.

```bash
potctl delete controller alpaca-1
potctl delete agent kiwi-1
potctl delete application health-care-app
potctl delete microservice health-case-ui
```

To undo a deletion, we can simply re-run the corresponding deploy command for the deleted resource.

If we want to wipe an entire ECN, we can run:

```bash
potctl delete all
```

or, if we also want to delete the namespace, we can run:

```bash
potctl delete namespace zoo-1 --force
```

<aside class="notifications note">
  <h3><img src="/static/images/icos/ico-note.svg" alt=""/>Next steps?</h3>
  <ul>
    <li><a href="../potctl/connect-disconnect">Connecting to an existing ECN.</a></li>
    <li><a href="../reference-potctl/reference-kinds">potctl reference.</a></li>
  </ul>
</aside>

<aside class="notifications contribute">
  <h3><img src="/static/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/potctl/resource-management.md"
    target="_blank">
    
  </a>
</aside>
