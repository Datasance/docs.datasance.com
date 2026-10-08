import React from 'react';
import BaseIcon from './BaseIcon';
import type {IconProps} from './types';

export default function ApiIcon(props: IconProps): React.JSX.Element {
  return (
    <BaseIcon {...props}>
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </BaseIcon>
  );
}
