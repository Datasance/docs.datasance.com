import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useSiteFlavor} from '@site/src/components/flavor/useSiteFlavor';

export type ArchitectureDiagramName =
  | 'Controller'
  | 'Edgelet'
  | 'Remote_ControlPlane'
  | 'K8S_ControlPlane';

type Props = {
  /** Platform train folder segment: pot-3.9, iofog-3.8, etc. */
  train: '3.8' | '3.9';
  name: ArchitectureDiagramName;
  alt: string;
  caption?: React.ReactNode;
};

function imageFolder(distribution: 'datasance' | 'iofog', train: '3.8' | '3.9'): string {
  const prefix = distribution === 'datasance' ? 'pot' : 'iofog';
  return `${prefix}-${train}`;
}

export default function ArchitectureDiagram({
  train,
  name,
  alt,
  caption,
}: Props): React.JSX.Element {
  const {distribution} = useSiteFlavor();
  const file = `${name}.png`;
  const relative = `/images/docs/${imageFolder(distribution, train)}/${file}`;
  const src = useBaseUrl(relative);

  return (
    <figure className="arch-diagram">
      <a href={src} target="_blank" rel="noopener noreferrer" title="Click to view full size">
        <img src={src} alt={alt} />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
