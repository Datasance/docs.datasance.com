<!-- docs/_sidebar.md -->



* Datasance PoT
  * [Introduction to Datasance PoT](./)
* IoFog 3.0 Getting Started
  * [What's New In IoFog 3.0?](./ioFog_3.0/getting-started/whats-new)
  * [Core Concept](./ioFog_3.0/getting-started/core-concepts)
  * [Architecture](./ioFog_3.0/getting-started/architecture)
  * [Quick Start With Local Deployment](./ioFog_3.0/getting-started/quick-start-local)
  * [Quick Start On Minikube and Vagrant](./ioFog_3.0/getting-started/quick-start-minikube)

* iofogctl
  * [iofogctl - ioFog Unified Command Line Interface](./ioFog_3.0/iofogctl/introduction)
  * [Download And Install iofogctl](./ioFog_3.0/iofogctl/download)
  * [Getting Familiar With iofogctl](./ioFog_3.0/iofogctl/getting-familiar)
  * [iofogctl Resource Management](./ioFog_3.0/iofogctl/resource-management)
  * [Connecting To Existing Edge Compute Networks](./ioFog_3.0/iofogctl/connect-disconnect)
  * [Legacy Commands in iofogctl](./ioFog_3.0/iofogctl/legacy)

* Platform Deployment
  * [Introduction](./ioFog_3.0/platform-deployment/introduction)
  * [Prepare Network](./ioFog_3.0/platform-deployment/prepare-your-network)
  * [Prepare Remote Host](./ioFog_3.0/platform-deployment/prepare-your-remote-hosts)
  * [Remote Host - Deploy Control Plane Using iofogctl](./ioFog_3.0/platform-deployment/remote-control-plane)
  * [Kubernetes - Prepare A Cluster](./ioFog_3.0/platform-deployment/kubernetes-prepare-cluster)
  * [Kubernetes-Deploy Control Plane Using iofogctl](./ioFog_3.0/platform-deployment/kubernetes-iofogctl)
  * [Kubernetes - Deploy Control Plane Using Helm](./ioFog_3.0/platform-deployment/kubernetes-helm)
  * [Setup Agents](./ioFog_3.0/platform-deployment/setup-your-agents)

* Agent Management
  * [Introduction](./ioFog_3.0/agent-management/introduction)
  * [Configuration](./ioFog_3.0/agent-management/agent-configuration)
  * [Attach / Detach](./ioFog_3.0/agent-management/attach-detach)
  * [Volume Management](./ioFog_3.0/agent-management/volumes)
  * [Docker Image Pruning](./ioFog_3.0/agent-management/docker-image-pruning)
  * [Edge Resource](./ioFog_3.0/agent-management/edge-resources)
  * [Upgrade / Rollback](./ioFog_3.0/agent-management/upgrade-rollback)

* Developing Microservices
  * [Writing Microservices](./ioFog_3.0/developing-microservices/overview)
  * [ioFog SDK](./ioFog_3.0/developing-microservices/sdk)
  * [Debugging](./ioFog_3.0/developing-microservices/debugging)

* Tutorial - Our First Microservices
  * [Introduction](./ioFog_3.0/tutorial/introduction)
  * [Get to Know ioFog](./ioFog_3.0/tutorial/get-to-know-iofog)
  * [Manage Our Microservices](./ioFog_3.0/tutorial/manage-our-microservices)
  * [Create Our First Microservice - JavaScript](./ioFog_3.0/tutorial/create-our-first-microservice-javascript)
  * [Deploy Our Microservice](./ioFog_3.0/tutorial/deploy-our-microservice)

* Application Management
  * [Introduction](./ioFog_3.0/applications/introduction)
  * [Public Services](./ioFog_3.0/applications/microservice-exposing)
  * [Move and Rename Microservices](./ioFog_3.0/applications/microservice-move-rename)
  * [Microservice Updates and Lifecycle](./ioFog_3.0/applications/microservice-lifecycle-management)
  * [Microservice Registry And Catalog Management](./ioFog_3.0/applications/microservice-registry-catalog)
  * [Application Templates](./ioFog_3.0/applications/application-templates)
  * [Microservice Logs](./ioFog_3.0/applications/microservice-logs)

* Reference - iofogctl
  * [Kind of Resources](./ioFog_3.0/reference-iofogctl/reference-kinds)
  * [Control Plane YAML Specification](./ioFog_3.0/reference-iofogctl/reference-control-plane)
  * [Agent YAML Specification](./ioFog_3.0/reference-iofogctl/reference-agent)
  * [Application YAML Specification](./ioFog_3.0/reference-iofogctl/reference-application)
  * [Application Template YAML Specification](./ioFog_3.0/reference-iofogctl/reference-application-template)
  * [Route YAML Specification](./ioFog_3.0/reference-iofogctl/reference-route)
  * [Catalog Item YAML Specification](./ioFog_3.0/reference-iofogctl/reference-catalog)
  * [Registry YAML Specification](./ioFog_3.0/reference-iofogctl/reference-registry)
  * [Edge Resource YAML Specification](./ioFog_3.0/reference-iofogctl/reference-edge-resources)
  * [Template Engine for ioFog YAML Specification](./ioFog_3.0/reference-iofogctl/reference-template-engine)

* Reference - Controller
  * [Overview](./ioFog_3.0/reference-controller/overview)
  * [Legacy Controller CLI Usage](./ioFog_3.0/reference-controller/cli-usage)
  * [Controller REST API Reference](./ioFog_3.0/reference-controller/rest-api)
  * [ECN Viewer](./ioFog_3.0/reference-controller/ecn-viewer)

* Reference - Agent
  * [Overview](./ioFog_3.0/reference-agent/overview)
  * [Legacy Agent CLI Usage](./ioFog_3.0/reference-agent/cli-usage)
  * [Agent Local REST API Reference](./ioFog_3.0/reference-agent/rest-api)
  * [Agent Configuration](./ioFog_3.0/reference-agent/configuration)
  * [Agent Logs](./ioFog_3.0/reference-agent/agent-logs)
  * [Remote Debugging Using IntelliJ](./ioFog_3.0/reference-agent/debugging)

* Reference - Catalog Microservices
  * [System: Diagnostic Microservices](./ioFog_3.0/reference-microserivces-catalog/diagnostics)
  * [System: Hardware Abstraction Layer Microservice](./ioFog_3.0/reference-microserivces-catalog/hal)
  * [System: Bluetooth REST API Microservice](./ioFog_3.0/reference-microserivces-catalog/rest-blue)
  * [JSON REST API and Open Weather Map Microservices](./ioFog_3.0/reference-microserivces-catalog/jsonrestapi)

* Contributing
  * [Contributing Guidelines](./ioFog_3.0/contributing/guidelines)
  * [Code of Conduct](./ioFog_3.0/contributing/code-of-conduct)
