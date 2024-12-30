# Download And Install potctl

## Install potctl on Mac

Mac users can use Homebrew:

```bash
brew tap datasance/potctl
brew install potctl
```

## Install potctl on Windows

The Windows binary can be downloaded from [Datasance Packages](https://github.com/Datasance/potctl/releases/download/v1.3.3/potctl.exe).

#### Prepare Windows

In order to use `potctl` to deploy an ECN locally on Windows we will need to configure Docker to run Linux containers:

- Install [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- Follow the guidelines for using WSL2 or Hyper-V backend [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install)
- Ensure that docker is running with [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install)

## Install potctl on Linux

The Debian package can be installed like so:

```bash
wget -qO- https://downloads.datasance.com/datasance.gpg | sudo tee /etc/apt/trusted.gpg.d/datasance.gpg >/dev/null
echo "deb [arch=all signed-by=/etc/apt/trusted.gpg.d/datasance.gpg] https://downloads.datasance.com/deb stable main" | sudo tee /etc/apt/sources.list.d/datansance.list >/dev/null
sudo apt update
sudo apt install potctl -y

```

And similarly, the RPM package can be installed like so:

```bash
cd /etc/yum.repos.d ; curl https://downloads.datasance.com/datasance.repo -LO
sudo yum update
sudo yum install potctl
```

## Verify potctl Installation

Run `potctl version` to verify you have successfully installed the CLI.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""/> Next steps?</h3>
  <ul>
    <li><a href="../getting-familiar.html">Getting familiar with potctl.</a></li>
    <li><a href="../reference-potctl/reference-kinds">potctl reference.</a></li>
  </ul>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt=""/>See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/Datasance/docs.datasance.com/edit/main/docs/potctl/download.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
