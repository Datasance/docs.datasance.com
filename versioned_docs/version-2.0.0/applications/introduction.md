# Distributed Applications

ioFog is a platform for running distributed applications on Edge Compute Networks. A distributed application is made up of some number of microservices.

We can specify distributed applications in YAML through potctl's [Application kind](../reference-potctl/reference-application). We can then deploy an entire distributed application through potctl by using this specification:

```bash
potctl deploy -f application.yaml
```

We can also deploy individual microservices if we wish. The potctl [Microservice kind](../reference-potctl/reference-application) allows us to do this.

```bash
potctl deploy -f microservice.yaml
```

The rest of this section will cover how we can manage our distributed applications and microservices after we have deployed them.

<aside class="notifications contribute">
  <h3><img src="/static/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/applications/introduction.md"
    target="_blank">
    
  </a>
</aside>
