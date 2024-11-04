# Connecting To Existing Edge Compute Networks

Instead of deploying our own ECN, we can connect to an existing one.

Note that we must always specify an empty or non-existent namespace when we use the connect command. This is because each cluster should be in its own namespace. Don't forget that not specifying the namespace means potctl will use the `default` namespace.

```bash
echo "---
apiVersion: datasance.com/v1
kind: ControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    email: user@domain.com
    password: h9g84q
  controllers:
  - name: alpaca-1
    host: 30.40.50.1" > /tmp/remote-controlplane.yaml
```

After editing the email, password, and host fields, we can go ahead and connect.

```bash
potctl connect -f /tmp/remote-controlplane.yaml
```

Or for Kubernetes Control Planes, we can use Kube Config to connect. Keep in mind that the `potctl --namespace` flag must match the Kubernetes namespace where the Control Plane is deployed, otherwise `potctl` will be unable to find the deployment.

```bash
echo "---
apiVersion: datasance.com/v1
kind: KubernetesControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    email: user@domain.com
    password: h9g84q
  config: ~/.kube/config" > /tmp/k8s-controlplane.yaml
```

After editing the email, password, and kube config fields, we can go ahead and connect.

```bash
potctl connect -f /tmp/k8s-controlplane.yaml
```

We can also connect to an ECN without providing a YAML file (and without configuring SSH details automatically).

For Remote Control Planes (i.e. not on Kubernetes) we can run the following command and connect via the Controller endpoint.

```bash
potctl connect --ecn-addr 40.50.60.70 --name albatros --email user@domain.com --pass h9g84q
```

For Kubernetes Control Planes we can run the same command but provide the Kubernetes config file instead of a Controller endpoint.

```bash
potctl connect --kube ~/.kube/config --email user@domain.com --pass h9g84q
```

After using these commands, we can manually add SSH details where necessary using the `configure` command. The `configure` command lets us configure a single component or a group of components or all components at once.

```plain
potctl configure controlplane --kube KUBECONFIG
potctl configure controller NAME --user USER --key KEYFILE --port PORTNUM
potctl configure agent NAME --user USER --key KEYFILE --port PORTNUM

potctl configure current-namespace NAMESPACE

potctl configure controllers --user USER --key KEYFILE --port PORTNUM
potctl configure agents --user USER --key KEYFILE --port PORTNUM
```

## Disconnect From Edge Compute Network

When we are finished working with the cluster, we can disconnect from it and release the corresponding namespace from `potctl`.

```bash
potctl disconnect
```

<aside class="notifications note">
  <h3><img src="/static/images/icos/ico-note.svg" alt=""/>Next steps?</h3>
  <ul>
    <li><a href="../potctl/legacy">Legacy commands.</a></li>
    <li><a href="../reference-potctl/reference-kinds">potctl reference.</a></li>
  </ul>
</aside>

<aside class="notifications contribute">
  <h3><img src="/static/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/potctl/connect-disconnect.md"
    target="_blank">
    
  </a>
</aside>
