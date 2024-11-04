# What's New in ioFog 3.0.0?

- [Template parametric expressions](../reference-potctl/reference-template-engine) are now available.
- [Application Templates](../applications/application-templates) which simplify and improve management of your microservices.
- [Edge Resources](../agent-management/edge-resources), let your microservices know what their Agent is capable of.
- [Agent Installation Plugins](../platform-deployment/setup-your-agents) added to `potctl` .
- [Commands for upgrade and rollback of Agents](../agent-management/upgrade-rollback) added to `potctl`.
- [ECN Viewer](../reference-controller/ecn-viewer) added to `Controller`.

## Template parametric expressions

Variables, filter and template "queries" can now be used as values for any field in your deployment YAMLs (And therefore, any value of the JSON body of most PUT/POST/PATCH Controller REST API requests).

Those variables allow you to reference the same document, or any resource preexisting on your Controller, adding a lot of flexibility in your deployments.

[Find out more](../reference-potctl/reference-template-engine)!

## Application Templates

What if we need to deploy the same code on a lot of Agents? We would need to details all the microservices and routes in a separate YAML document for every instance of your Application. This is tedious and error prone, as often only a few values would change from one Agent to another.

Wouldn't it be nice to have a way to specify the skeleton (template) of an Application and then reuse the same template over an over again, only modifying a few variables? That's where the Controller Application Template catalog comes into play!

[Find out more!](../applications/application-templates) and check out the [YAML specification](../reference-potctl/reference-application-template)!

## Edge Resources

The Edge is where the virtual meets the physical. Most if not all Edge applications are built to interact in some way with entities or resources that exist in the physical world.

Edge Resources are Digital Twins that allow you to define an interface for your microservices to communicate with resources available on your ioFog Agents.

[Find out more!](../agent-management/edge-resources)

## Agent Installation Plugins

`potctl` can install ioFog Agent on a number of Linux distributions out of the box. However, the list of supported distributions is finite; in order to allow the community to add support for any host environment, `potctl` has been updated with the ability to run user-defined installation scripts for Agent and its dependancies.

[Find out more!](../platform-deployment/setup-your-agents) and check out the [YAML specification](../reference-potctl/reference-agent)!

## ECN Viewer

The Edge Compute Network Viewer lets you visualise and manage your entire ECN from your favorite browser!
It is available by default on the standard HTTP port of `Controller` (80).

[Find out more!](../reference-controller/ecn-viewer)

[Find out more](../platform-deployment/setup-your-agents) and check out the [YAML specification](../reference-potctl/reference-agent)!

<aside class="notifications contribute">
  <h3><img src="/static/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/getting-started/whats-new.md"
    target="_blank">
    
  </a>
</aside>
