import React from 'react';
import GitHubRepoLink from '@site/src/components/flavor/GitHubRepoLink';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

/** GitHub link to the flavor CLI repository (potctl or iofogctl). */
export default function CliGitHubRepoLink(): React.JSX.Element {
  const {cliName} = useSiteFlavor();
  return <GitHubRepoLink repo={cliName}>{cliName}</GitHubRepoLink>;
}
