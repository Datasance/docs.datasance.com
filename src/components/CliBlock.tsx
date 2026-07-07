import CodeBlock from '@theme/CodeBlock';
import { API_VERSION, CLI_NAME, REGISTRY } from '@site/src/config/distribution';

type CliBlockProps = {
  children: string;
  title?: string;
};

export default function CliBlock({ children, title }: CliBlockProps): JSX.Element {
  const cmd = children
    .replace(/\{\{CLI_NAME\}\}/g, CLI_NAME)
    .replace(/\{\{REGISTRY\}\}/g, REGISTRY)
    .replace(/\{\{API_VERSION\}\}/g, API_VERSION);

  return <CodeBlock language="bash" title={title}>{cmd}</CodeBlock>;
}
