# Registry YAML Specification

`potctl` allows users to manage a Controller's list of registries. To learn more about registries, please see [microservice registry documentation](../applications/microservice-registry-catalog).

The registry has a very simple definition

```yaml
apiVersion: datasance.com/v3
kind: Registry
spec:
  url: registry.hub.docker.com # This will create a registry that can download your private docker hub images
  username: john
  password: q1u45ic9kst563art
  email: user@domain.com
  requiresCert: false
  certificate: ''
```

| Field        | Description                                           |
| ------------ | ----------------------------------------------------- |
| url          | Registry url                                          |
| username     | Username                                              |
| password     | Password                                              |
| email        | Email                                                 |
| certificate  | (Optional) Certificate to be used by the registry     |
| requiresCert | (Optional) Does the repository requires a certificate |

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/Datasance/docs.datasance.com/edit/main/docs/reference-potctl/reference-registry.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
