import React from 'react';
import type {Distribution} from '@site/src/config/distribution';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

type Props = {
  distribution: Distribution;
  children: React.ReactNode;
};

/** Renders children only for the active docs build flavor (datasance or iofog). */
export default function FlavorOnly({distribution, children}: Props): React.JSX.Element | null {
  const {distribution: active} = useSiteFlavor();
  if (active !== distribution) {
    return null;
  }
  return <>{children}</>;
}
