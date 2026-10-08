import type {ComponentType, CSSProperties, ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import {
  RocketIcon,
  LearnIcon,
  TutorialsIcon,
  ReferenceIcon,
  ReleaseNotesIcon,
} from '@site/src/components/Icons';
import type {IconProps} from '@site/src/components/Icons';
import styles from './styles.module.css';

type DocSection = {
  title: string;
  Icon: ComponentType<IconProps>;
  description: ReactNode;
  link: string;
  accent: string;
};

const DocSections: DocSection[] = [
  {
    title: 'Get Started',
    Icon: RocketIcon,
    accent: '#644A92',
    description: (
      <>Core concepts, architecture, local quick start, and production deployment.</>
    ),
    link: '/get-started/welcome',
  },
  {
    title: 'Learn',
    Icon: LearnIcon,
    accent: '#6ABEC1',
    description: (
      <>
        The deep dive: control plane, Edgelet nodes, the engine, workloads, and day-2 diagnosis.
        Field tables are in Reference.
      </>
    ),
    link: '/learn',
  },
  {
    title: 'Tutorials',
    Icon: TutorialsIcon,
    accent: '#E76467',
    description: (
      <>Learn by example. Edge AI wafer defect, then Acme Smart Plant.</>
    ),
    link: '/tutorials',
  },
  {
    title: 'Reference',
    Icon: ReferenceIcon,
    accent: '#10253D',
    description: (
      <>YAML for every kind, the fleet CLI, the Edgelet CLI, and the documentation archive.</>
    ),
    link: '/reference',
  },
  {
    title: 'Release Notes',
    Icon: ReleaseNotesIcon,
    accent: '#4668fd',
    description: (
      <>What changed in each platform train, and how to upgrade between releases.</>
    ),
    link: '/release-notes',
  },
];

function DocSectionCard({title, Icon, description, link, accent}: DocSection): ReactNode {
  return (
    <div className={clsx('col col--4', styles.docSection)}>
      <Link to={link} className={styles.docSectionLink}>
        <div
          className={styles.docSectionCard}
          style={{['--card-accent' as string]: accent} as CSSProperties}>
          <div className={styles.docSectionIcon}>
            <Icon width={28} height={28} />
          </div>
          <Heading as="h3" className={styles.docSectionTitle}>
            {title}
          </Heading>
          <p className={styles.docSectionDescription}>{description}</p>
          <div className={styles.docSectionArrow}>→</div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Explore the documentation</Heading>
          <p>Find guides, reference material, and release information for your platform train.</p>
        </div>
        <div className="row">
          {DocSections.map((props, idx) => (
            <DocSectionCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
