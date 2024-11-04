# Legacy Commands in potctl

We can use legacy CLI of each component i.e Controller and Agent.

## Using Legacy Commands

To use legacy commands from potctl, preface any legacy command you want with:

```bash
potctl legacy <component> <component-name> command -n <namespace of component>
```

e.g.

```bash
potctl legacy agent iofog-agent config -n default
```

where I want to get the output of the config command from my agent, named iofog-agent

To determine what legacy commands you wish to use, please see the legacy cli documentation for each component at the following links:

[Agent](../reference-agent/cli-usage)

[Controller](../reference-controller/cli-usage)

<aside class="notifications note">
  <h3><img src="/static/images/icos/ico-note.svg" alt=""/>Next steps?</h3>
  <ul>
    <li><a href="../reference-potctl/reference-kinds">potctl reference.</a></li>
  </ul>
</aside>

<aside class="notifications contribute">
  <h3><img src="/static/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/potctl/legacy.md"
    target="_blank">
    
  </a>
</aside>
