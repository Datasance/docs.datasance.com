import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {Redirect} from '@docusaurus/router';
import styles from './index.module.css';
import { useEffect } from 'react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <Redirect to="/datasanceDocusaurus/3.0.0/getting-started/whats-new" />;
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    <Redirect to="/datasanceDocusaurus/3.0.0/getting-started/whats-new" />;
  }, [])
  
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Datasance Documents <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
