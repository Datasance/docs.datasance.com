# Control Plane YAML Specification

`potctl` allows users to deploy Edge Compute Networks ('ECNs'). The various resources which constitute an ECN are specified within YAML files for potctl to consume.

<aside class="notifications info">
  <h3><img src="/images/icos/ico-note.svg" alt=""/>Trying to use potctl 1.0 with an older ECN?</h3>
  <p>You can connect to an older ECN with potctl 1.0 for view-only purposes. If you would like full control over the ECN with potctl 1.0, you should delete the ECN with your older potctl and then redeploy with potctl 1.0.</p>
</aside>

## Kubernetes Control Plane

The Kubernetes Control Plane specifies all the resources required to deploy the ioFog Control Plane on a Kubernetes cluster.

```yaml
apiVersion: datasance.com/v3
kind: KubernetesControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: g9hr823rhuoi
  config: ~/.kube/config
  replicas:
    controller: 2
  database:
    provider: mysql/postgres
    user: 
    host: 
    port: 
    password: 
    databaseName: pot
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey:
    ssl: external
    controllerClient: pot-controller
    controllerSecret: 
    viewerClient: ecn-viewer
  images:
    pullSecret: pull-srect
    operator: ghcr.io/datasance//operator:3.4.12
    controller: ghcr.io/datasance/controller:3.4.6
    portManager: ghcr.io/datasance/port-manager:3.1.5
    proxy: ghcr.io/datasance/proxy:3.1.0
    router: ghcr.io/datasance/router:3.2.4
  services:
    controller:
      type:  LoadBalancer/ClusterIP
      # annotations:
      #  service.beta.kubernetes.io/azure-load-balancer-internal: "true"
    proxy:
      type:  LoadBalancer/oadBalancer
      annotations:
        service.beta.kubernetes.io/azure-load-balancer-internal: "true"
    router:
      type:  LoadBalancer/ClusterIP
      # annotations:
      #  service.beta.kubernetes.io/azure-load-balancer-internal: "true"
  controller:
    ecnViewerUrl: https://
    https: true
    secretName:
    ecnViewerPort: 8008
  router:
    internalSecret: 
    amqpsSecret: 
    requireSsl: "yes"
    saslMechanisms: EXTERNAL
    authenticatePeer: "yes"
  proxy:
    serverName: 
    transport: tls
  ingresses:
    controller:
      annotations:
        # cert-manager.io/cluster-issuer: letsencrypt
        # nginx.ingress.kubernetes.io/proxy-buffer-size: "128k"
        # nginx.ingress.kubernetes.io/backend-protocol: "https"
      ingressClassName: nginx
      host: 
      secretName:
    router:
      address: 
      messagePort: 5672
      interiorPort: 55672
      edgePort: 45672
```

| Field     | Description                                                                                                                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iofogUser | Credentials registered against ioFog Controller REST API.                                                                                                                                                                         |
| config    | Path to Kubernetes configuration file that potctl uses to install Controller service to Kubernetes cluster. (Note: The namespace used with potctl will be the kubernetes namespace to which your components will be deployed) |

## Remote Control Plane

The Remote Control Plane component specifies all the resources required to deploy the ioFog Control Plane on a set of remote hosts.

```yaml
apiVersion: datasance.com/v3
kind: ControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: g9hr823rhuoi
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: exter
    controllerClient: pot-controller
    controllerSecret:
    viewerClient: ecn-viewer
  controllers:
    - name: vanilla
      host: 30.40.50.3
      ssh:
        user: foo
        keyFile: ~/.ssh/id_rsa
        port: 22
```

| Field                  | Description                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iofogUser              | Credentials registered against ioFog Controller REST API.                                                                                                                |
| controllers            | List of Controller instances.                                                                                                                                            |
| controller.name        | User-defined unique identifier of Controller instance within an potctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| controller.host        | Hostname of remote host that potctl must SSH into to install Controller service.                                                                                       |
| controller.ssh.user    | Username of remote host that potctl must SSH into to install Controller service.                                                                                       |
| controller.ssh.keyFile | Path to private SSH key that potctl must use to SSH into remote host to install Controller service.                                                                    |
| controller.ssh.port    | Port to use with SSH. Optional (default: 22).                                                                                                                            |

## Local Control Plane

The Local Control Plane component specifies all the resources required to deploy the ioFog Control Plane as a local docker container.

```yaml
apiVersion: datasance.com/v3
kind: LocalControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: g9hr823rhuoi
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: exter
    controllerClient: pot-controller
    controllerSecret:
    viewerClient: ecn-viewer
  controller:
    container:
      image: ghcr.io/datasance/controller:3.0.0
```

| Field            | Description                                               |
| ---------------- | --------------------------------------------------------- |
| iofogUser        | Credentials registered against ioFog Controller REST API. |
| controller       | Controller specification.                                 |
| controller.image | Docker image to use as the Controller.                    |

## Remote Controller

We can expand a Remote Control Plane by deploying a new Controller.

```yaml
apiVersion: datasance.com/v3
kind: Controller
metadata:
  name: alpaca
  namespace: default
spec:
  host: 30.40.50.5
  ssh:
    user: foo
    keyFile: ~/.ssh/id_rsa
    port: 22
```

| Field       | Description                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | User-defined unique identifier of Controller instance within an potctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| host        | Hostname of remote host that potctl must SSH into to install Controller service.                                                                                       |
| ssh.user    | Username of remote host that potctl must SSH into to install Controller service.                                                                                       |
| ssh.keyFile | Path to private SSH key that potctl must use to SSH into remote host to install Controller service.                                                                    |
| ssh.port    | Port to use with SSH. Optional (default: 22)                                                                                                                             |

## Edge Compute Network

An entire ECN can be specified within a single YAML file.

Multiple resources can be incorporated into a single YAML file using `---` as a separator.

```yaml
---
apiVersion: datasance.com/v3
kind: ControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: John
    surname: Doe
    email: user@example.com
    password: mysecretpw
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: exter
    controllerClient: pot-controller
    controllerSecret:
    viewerClient: ecn-viewer
  controllers:
    - name: alpaca-1
      host: 30.40.50.3
      ssh:
        user: john
        keyFile: ~/.ssh/id_rsa
    - name: alpaca-2
      host: 30.40.50.4
      ssh:
        user: john
        keyFile: ~/.ssh/id_rsa
---
apiVersion: datasance.com/v3
kind: Agent
metadata:
  name: hippo-1
  namespace: default
spec:
  host: 30.40.50.6
  ssh:
    user: john
    keyFile: ~/.ssh/id_rsa
---
apiVersion: datasance.com/v3
kind: Agent
metadata:
  name: hippo-2
  namespace: default
spec:
  host: 30.40.50.7
  ssh:
    user: john
    keyFile: ~/.ssh/id_rsa
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/Datasance/docs.datasance.com/edit/main/docs/reference-potctl/reference-control-plane.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
