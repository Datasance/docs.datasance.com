import React from 'react';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

export default function CliName(): React.JSX.Element {
  const {cliName} = useSiteFlavor();
  return <>{cliName}</>;
}
