import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {CLI_NAME, FLAVOR} from '@site/src/config/distribution';

type Props = {
  /** Semver without v prefix, for example `3.9.0`. */
  cliVersion: string;
};

function windowsExeUrl(cliVersion: string): string {
  const tag = `v${cliVersion}`;
  if (FLAVOR === 'datasance') {
    return `https://github.com/Datasance/potctl/releases/download/${tag}/potctl_${cliVersion}_windows_amd64.exe`;
  }
  return `https://github.com/eclipse-iofog/iofogctl/releases/download/${tag}/iofogctl_${cliVersion}_windows_amd64.exe`;
}

function releasesTagUrl(cliVersion: string): string {
  const tag = `v${cliVersion}`;
  if (FLAVOR === 'datasance') {
    return `https://github.com/Datasance/potctl/releases/tag/${tag}`;
  }
  return `https://github.com/eclipse-iofog/iofogctl/releases/tag/${tag}`;
}

export default function CliDownloadWindowsSteps({cliVersion}: Props): React.JSX.Element {
  const installDir = CLI_NAME === 'potctl' ? 'C:\\potctl' : 'C:\\iofogctl';
  const exeUrl = windowsExeUrl(cliVersion);
  const tagUrl = releasesTagUrl(cliVersion);

  const runSysdm = useBaseUrl('/images/docs/cli/windows-path-setup/run-sysdm.jpeg');
  const systemProps = useBaseUrl('/images/docs/cli/windows-path-setup/system-properties-advanced.jpeg');
  const pathEdit = useBaseUrl('/images/docs/cli/windows-path-setup/environment-variables-path-edit.jpeg');

  return (
    <>
      <ol>
        <li>
          Create a folder in File Explorer, for example <code>{installDir}</code>.
        </li>
        <li>
          Download the Windows amd64 binary from{' '}
          <a href={exeUrl}>{CLI_NAME}_{cliVersion}_windows_amd64.exe</a> (release{' '}
          <a href={tagUrl}>{`v${cliVersion}`}</a>) and save it in that folder. You can rename the
          file to <code>{CLI_NAME}.exe</code> if you prefer.
        </li>
        <li>
          Press <kbd>Win</kbd> + <kbd>R</kbd>, type <code>sysdm.cpl</code>, and press Enter.
          <br />
          <img src={runSysdm} alt="Windows Run dialog with sysdm.cpl" width={520} />
        </li>
        <li>
          Open the <strong>Advanced</strong> tab and click <strong>Environment Variables</strong>.
          <br />
          <img
            src={systemProps}
            alt="System Properties Advanced tab with Environment Variables button"
            width={520}
          />
        </li>
        <li>
          Under <strong>User variables</strong>, select <strong>Path</strong>, then click{' '}
          <strong>Edit</strong>.
          <br />
          <img
            src={pathEdit}
            alt="Environment Variables dialog with Path selected under User variables"
            width={520}
          />
        </li>
        <li>
          Click <strong>New</strong>, enter <code>{installDir}</code> (case sensitive), then click{' '}
          <strong>OK</strong> three times to close all dialogs.
        </li>
        <li>
          Open a new Command Prompt or PowerShell window and run <code>{CLI_NAME} version</code>.
        </li>
      </ol>

      <h3>Prepare Windows</h3>
      <p>To deploy an ECN locally on Windows, configure Docker to run Linux containers:</p>
      <ul>
        <li>
          Install{' '}
          <a href="https://docs.docker.com/desktop/setup/install/windows-install/">
            Docker Desktop for Windows
          </a>
        </li>
        <li>Follow the WSL2 or Hyper-V backend guidelines in the Docker Desktop docs</li>
        <li>
          Ensure Docker is running before you use <code>{CLI_NAME}</code>
        </li>
      </ul>
    </>
  );
}
