import React, {useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type SiteCustomFields = {
  distribution: 'datasance' | 'iofog';
};

export default function Root({children}: {children: React.ReactNode}): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const {distribution} = siteConfig.customFields as SiteCustomFields;

  useEffect(() => {
    document.documentElement.setAttribute('data-distribution', distribution);
  }, [distribution]);

  return <>{children}</>;
}
