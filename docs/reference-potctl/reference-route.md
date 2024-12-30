# Route YAML Specification

`potctl` allows users to manage a Controller's Routes between Microservices.

The route has a very simple definition

```yaml
apiVersion: datasance.com/v3
kind: Route
metadata:
  name: my-route
spec:
  from: src-msvc-name
  to: dest-msvc-name
```

| Field | Description                     |
| ----- | ------------------------------- |
| name  | Unique identifier for the route |
| from  | Source microservice name        |
| to    | Destination microservice name   |

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/Datasance/docs.datasance.com/edit/main/docs/reference-potctl/reference-route.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
