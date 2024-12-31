# ioFog SDK

The ioFog SDK is an _optional_ library. It provides an easy way for your edge nodes to communicate with each other without needing to handle the complex discovery process yourself.

- [C#](https://github.com/eclipse-iofog/iofog-csharp-sdk)
- [C/C++](https://github.com/eclipse-iofog/iofog-c-sdk)
- [Go](https://github.com/Datasance/iofog-go-sdk)
- [Java](https://github.com/eclipse-iofog/iofog-java-sdk)
- [JavaScript (Node.js)](https://github.com/Datasance/iofog-nodejs-sdk)
- [Python](https://github.com/eclipse-iofog/iofog-python-sdk)

<aside class="notifications info">
  <h3><img src="/images/icos/ico-note.svg" alt=""/> Don't see your language?</h3>
  <p>If you don't need to communicate directly between your fog nodes, you might not need the SDK. But if you do, you still have options!</p>
  <p>Under the hood, the SDK uses the <a href="..//reference-agent/local-api">Agent Local API</a> which, while more low-level, is considered a public API you can call directly too.</p>
  <p>Many languages (like Rust, Haskell, etc) have a Foreign Function Interface (FFI) that will allow you to use the <a href="https://github.com/eclipse-iofog/iofog-c-sdk">C SDK</a>.</p>
  <p>Alternatively, you might be able to abstract your node-to-node communication into a purpose-built microservice in one of the languages above.</p>
  <p>For example, let's say you wanted to use Ruby for most of your service development. You could write a small microservice in JavaScript using the SDK and have it make requests on behalf of your Ruby microservice.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/Datasance/docs.datasance.com/edit/main/docs/developing-microservices/sdk.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
