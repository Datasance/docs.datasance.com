import React from 'react';
import DocSidebarNavbarItem from '@theme/NavbarItem/DocSidebarNavbarItem';
import {
  RocketIcon,
  LearnIcon,
  TutorialsIcon,
  ReferenceIcon,
  ReleaseNotesIcon,
} from '@site/src/components/Icons';
import type {Props} from '@theme/NavbarItem/DocSidebarNavbarItem';

const iconMap: Record<string, React.ComponentType<{width?: number; height?: number}>> = {
  'Get Started': RocketIcon,
  Learn: LearnIcon,
  Tutorials: TutorialsIcon,
  Reference: ReferenceIcon,
  'Release Notes': ReleaseNotesIcon,
};

export default function CustomDocSidebarNavbarItem(props: Props): React.JSX.Element {
  const labelText = typeof props.label === 'string' ? props.label : '';
  const Icon = labelText ? iconMap[labelText] : null;

  const enhancedProps = {
    ...props,
    type: 'docSidebar' as const,
    label: Icon ? (
      <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Icon width={20} height={20} />
        <span>{labelText}</span>
      </span>
    ) : (
      props.label
    ),
  };

  return <DocSidebarNavbarItem {...enhancedProps} />;
}
