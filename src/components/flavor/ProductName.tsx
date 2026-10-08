import React from 'react';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

export default function ProductName(): React.JSX.Element {
  const {productName} = useSiteFlavor();
  return <>{productName}</>;
}
