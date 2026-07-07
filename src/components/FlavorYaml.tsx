import CodeBlock from '@theme/CodeBlock';
import { API_VERSION, REGISTRY } from '@site/src/config/distribution';

type FlavorYamlProps = {
  children: string;
  title?: string;
};

export default function FlavorYaml({ children, title }: FlavorYamlProps): JSX.Element {
  const yaml = children
    .replace(/\{\{API_VERSION\}\}/g, API_VERSION)
    .replace(/\{\{REGISTRY\}\}/g, REGISTRY);

  return <CodeBlock language="yaml" title={title}>{yaml}</CodeBlock>;
}
