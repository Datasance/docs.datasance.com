import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

type SiteCustomFields = {
  distribution: 'datasance' | 'iofog';
  productName: string;
  heroLogoSrc: string;
  siteTagline: string;
};

function HomepageHeader(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const fields = siteConfig.customFields as SiteCustomFields;
  const heroLogo = useBaseUrl(fields.heroLogoSrc);

  return (
    <header
      className={clsx(
        'hero',
        styles.heroBanner,
        styles[`heroBanner_${fields.distribution}`],
      )}>
      <div className="container">
        <img
          src={heroLogo}
          alt={fields.productName}
          className={clsx(
            styles.heroLogo,
            fields.distribution === 'datasance' && styles.heroLogo_datasance,
            fields.distribution === 'iofog' && styles.heroLogo_iofog,
          )}
        />
        <h1 className={clsx('hero__title', styles.heroTitle)}>
          {fields.productName} documentation
        </h1>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{fields.siteTagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.heroCta, styles.heroCtaPrimary)}
            to="/get-started/welcome">
            Get Started
          </Link>
          <Link className={clsx('button button--lg', styles.heroCta, styles.heroCtaSecondary)} to="/learn">
            Learn
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const fields = siteConfig.customFields as SiteCustomFields;

  return (
    <Layout title={`${fields.productName} documentation`} description={fields.siteTagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
