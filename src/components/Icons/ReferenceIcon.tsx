import React from 'react';
import BaseIcon from './BaseIcon';
import type {IconProps} from './types';

export default function ReferenceIcon(props: IconProps): React.JSX.Element {
  return (
    <BaseIcon {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </BaseIcon>
  );
}
