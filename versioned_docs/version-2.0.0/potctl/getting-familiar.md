# Getting Familiar With potctl

To list all available commands, just run `potctl` without any arguments. The available commands should look something like this:

```console
$ potctl
██████╗  ██████╗ ████████╗ ██████╗████████╗██╗     
██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝╚══██╔══╝██║     
██████╔╝██║   ██║   ██║   ██║        ██║   ██║     
██╔═══╝ ██║   ██║   ██║   ██║        ██║   ██║     
██║     ╚██████╔╝   ██║   ╚██████╗   ██║   ███████╗
╚═╝      ╚═════╝    ╚═╝    ╚═════╝   ╚═╝   ╚══════╝
                                                   


Welcome to the cool new potctl Cli!

Use `potctl version` to display the current version.


Usage:
  potctl [flags]
  potctl [command]

Available Commands:
  attach        Attach an existing ioFog resource to Control Plane
  configure     Configure potctl or ioFog resources
  connect       Connect to an existing Control Plane
  create        Create a resource
  delete        Delete an existing ioFog resource
  deploy        Deploy Edge Compute Network components on existing infrastructure
  describe      Get detailed information of existing resources
  detach        Detach an existing ioFog resource from its ECN
  disconnect    Disconnect from an ioFog cluster
  get           Get information of existing resources
  help          Help about any command
  legacy        Execute commands using legacy CLI
  logs          Get log contents of deployed resource
  move          Move an existing resources inside the current Namespace
  prune         prune ioFog resources
  rename        Rename the iofog resources that are currently deployed
  start         Starts a resource
  stop          Stops a resource
  version       Get CLI application version
  view          Open ECN Viewer

Flags:
      --detached           Use/Show detached resources
  -h, --help               help for potctl
      --http-verbose       Toggle for displaying verbose output of API client
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of potctl

Use "potctl [command] --help" for more information about a command.

```

You can also find all available commands, and a detailled documentation of their usage on [our github repository](https://github.com/eclipse-iofog/potctl/blob/release/3.0/docs/md/potctl.md).

You can use the `--help` flag on every command to learn more. Go ahead and try some of the following:

```bash
potctl deploy --help
potctl create --help
potctl connect --help
potctl get --help
potctl attach --help
```

## Working with Namespaces

All actions performed with `potctl` are scoped to a single namespace. The default namespace ('default') is used if the user does not specify a namespace explicitly in the command. Note that namespaces in `potctl` map to a Kubernetes namespace when `potctl` is used to deploy an Edge Compute Network's ('ECN') Control Plane on Kubernetes.

Try creating, listing, and deleting namespaces now with the following commands.

```bash
potctl create namespace zoo-1
potctl get namespaces
potctl delete namespace zoo-1
```

### Configuring your current namespace

It is possible to specify the namespace to use as current namespace by using the `potctl configure` command.

```bash
potctl configure current-namespace NAMESPACE
```

To revert to the default configuration, you can always run `potctl configure current-namespace default`.

## View Edge Compute Network Details

Once we are connected to a live ECN, we can go ahead and do some introspection.

Try to display individual resources or all resources within a namespace with the get command:

```bash
potctl get controllers
potctl get agents
potctl get applications
potctl get microservices
potctl get all
```

To get more detailed information, we can use the describe command:

```bash
potctl describe controlplane
potctl describe controller alpaca-1
potctl describe agent kiwi-1
potctl describe application health-care-app
potctl describe microservice health-care-ui
```

## Check the log output of components

Note: You will need ssh access to any remote resources to use this feature.

To check the log output of any resource, use `logs` e.g.

```bash
potctl logs controller NAME
potctl logs agent NAME
potctl logs microservice NAME
```

This will return either the log file from the machine, or the docker logs output of the running microservice.

## Move microservices to another Agent

```bash
potctl move microservice NAME AGENT_NAME
potctl move microservice health-case-ui zebra-1
```

## Prune Docker on an Agent

We can now manually prune the docker images on our Agents, if our Agent is running out of diskspace.

```bash
potctl prune agent AGENT_NAME
```

## Detach / Attach an Agent

We can transfer an Agent from one ECN to another by detaching the agent and attaching it to another ECN.
Note: detaching an agent will delete its connection with the Controller, and all microservices will be shut down.

```bash
potctl detach agent AGENT_NAME
```

Switch to another ECN / namespace

```bash
potctl attach agent AGENT_NAME
```

To display all resources in dettached state with the get command

```bash
potctl get all --detached
```

We can also move Agents between Namespaces with a single command. The following command will move agent-1 from namespace-1 to namespace-2:

```bash
potctl move agent agent-1 namespace-2 -n namespace-1
```

<aside class="notifications note">
  <h3><img src="/static/images/icos/ico-note.svg" alt=""/>Next steps?</h3>
  <ul>
    <li><a href="../potctl/resource-management">Resources management with potctl.</a></li>
    <li><a href="../reference-potctl/reference-kinds">potctl reference.</a></li>
  </ul>
</aside>

<aside class="notifications contribute">
  <h3><img src="/static/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/potctl/getting-familiar.md"
    target="_blank">
    
  </a>
</aside>
