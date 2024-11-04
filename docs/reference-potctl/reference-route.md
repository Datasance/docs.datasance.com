# Route YAML Specification

`potctl` allows users to manage a Controller's Routes between Microservices.

The route has a very simple definition

```yaml
apiVersion: datasance.com/v1
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
  <h3><img src="/static/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/reference-potctl/reference-route.md"
    target="_blank">
    
  </a>
</aside>
