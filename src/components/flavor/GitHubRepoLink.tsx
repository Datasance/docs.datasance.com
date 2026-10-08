import React from 'react';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

type Props = {
  /** Repository name under the flavor GitHub org (for example Controller, edgelet). */
  repo: string;
  /** Optional label; defaults to org/repo. */
  children?: React.ReactNode;
};

export default function GitHubRepoLink({repo, children}: Props): React.JSX.Element {
  const {githubOrgUrl} = useSiteFlavor();
  const href = `${githubOrgUrl}/${repo}`;
  const label = children ?? repo;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
