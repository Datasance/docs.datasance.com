import React from 'react';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

export default function GettingSupport(): React.JSX.Element {
  const {distribution, githubOrgUrl} = useSiteFlavor();

  if (distribution === 'iofog') {
    return (
      <ul>
        <li>
          <strong>General inquiries</strong>:{' '}
          <a href="mailto:iofog-dev@eclipse.org">iofog-dev@eclipse.org</a>
        </li>
        <li>
          <strong>Technical support</strong>: open an issue in the relevant{' '}
          <a href={githubOrgUrl} target="_blank" rel="noopener noreferrer">
            eclipse-iofog GitHub
          </a>{' '}
          component repository.
        </li>
      </ul>
    );
  }

  return (
    <ul>
      <li>
        <strong>General inquiries</strong>:{' '}
        <a href="mailto:contact@datasance.com">contact@datasance.com</a>
      </li>
      <li>
        <strong>Technical support</strong>:{' '}
        <a href="mailto:support@datasance.com">support@datasance.com</a>
      </li>
      <li>
        <strong>Service requests</strong>:{' '}
        <a href="mailto:service@datasance.com">service@datasance.com</a>
      </li>
      <li>
        <strong>Sales</strong>: <a href="mailto:sales@datasance.com">sales@datasance.com</a>
      </li>
      <li>
        <strong>Partnerships</strong>:{' '}
        <a href="mailto:partners@datasance.com">partners@datasance.com</a>
      </li>
    </ul>
  );
}
