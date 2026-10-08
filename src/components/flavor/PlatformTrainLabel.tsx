import React from 'react';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

/** First column label in the platform version table on Welcome. */
export default function PlatformTrainLabel(): React.JSX.Element {
  const {platformTrainLabel} = useSiteFlavor();
  return <>{platformTrainLabel}</>;
}
