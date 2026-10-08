import React from 'react';
import Link from '@docusaurus/Link';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

type Props = {
  /** Path after the CLI docs dir (for example `/introduction`). */
  path: string;
  children: React.ReactNode;
};

export default function CliDocsLink({path, children}: Props): React.JSX.Element {
  const {cliGuidesDir} = useSiteFlavor();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return <Link to={`/${cliGuidesDir}${normalized}`}>{children}</Link>;
}
