import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';
import {resolveApiDocPair} from '@site/src/config/api-docs';
import type {Props} from '@theme/NavbarItem/DropdownNavbarItem';

export default function ApiNavbarDropdown(props: Props): React.JSX.Element {
  const preferred = useDocsPreferredVersion('default') as {
    preferredVersion?: {name?: string};
  };
  const pair = resolveApiDocPair(preferred.preferredVersion?.name);

  const otherPair =
    preferred.preferredVersion?.name === 'v3.8.0'
      ? resolveApiDocPair('current')
      : resolveApiDocPair('v3.8.0');

  return (
    <DropdownNavbarItem
      {...props}
      type="dropdown"
      label="API"
      items={[
        {
          label: pair.controllerLabel,
          to: pair.controllerRoute,
        },
        {
          label: pair.edgeletLabel,
          to: pair.edgeletRoute,
        },
        {
          label: otherPair.controllerLabel,
          to: otherPair.controllerRoute,
        },
        {
          label: otherPair.edgeletLabel,
          to: otherPair.edgeletRoute,
        },
      ]}
    />
  );
}
