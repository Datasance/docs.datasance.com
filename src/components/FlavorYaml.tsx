import React, {isValidElement, type ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import {substituteFlavorPlaceholders} from '@site/src/utils/substituteFlavorPlaceholders';

type FlavorYamlProps = {
  /** Nested ```yaml fence (preferred). Legacy string children are dedented by MDX and should be avoided. */
  children?: ReactNode;
  title?: string;
};

function classNameIncludesYaml(className: unknown): boolean {
  return typeof className === 'string' && /\blanguage-yaml\b/.test(className);
}

/** MDX passes nested fences as pre > code (or code) with preserved indentation. */
function extractYamlFromChildren(children: ReactNode): string | undefined {
  if (children === null || children === undefined || typeof children === 'boolean') {
    return undefined;
  }
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    const parts = children.map(extractYamlFromChildren).filter((s): s is string => s !== undefined);
    return parts.length > 0 ? parts.join('') : undefined;
  }
  if (isValidElement(children)) {
    const props = children.props as {className?: string; children?: ReactNode};
    if (children.type === 'code' && classNameIncludesYaml(props.className)) {
      const inner = extractYamlFromChildren(props.children);
      return inner !== undefined ? inner.replace(/\n$/, '') : undefined;
    }
    if (children.type === 'pre') {
      return extractYamlFromChildren(props.children);
    }
    if (props.children !== undefined) {
      return extractYamlFromChildren(props.children);
    }
  }
  return undefined;
}

/**
 * Flavor-aware YAML blocks. Author with a nested markdown fence (loader rewrites legacy `{`...`}` templates).
 */
export default function FlavorYaml({children, title}: FlavorYamlProps): JSX.Element {
  const raw = extractYamlFromChildren(children);
  if (raw === undefined) {
    throw new Error(
      'FlavorYaml: expected a nested ```yaml fence. Use <FlavorYaml title="...">\\n\\n```yaml\\n...\\n```\\n\\n</FlavorYaml>',
    );
  }
  const yaml = substituteFlavorPlaceholders(raw);
  const metastring = title ? `title="${title.replace(/"/g, '\\"')}"` : undefined;

  return (
    <CodeBlock className="language-yaml" metastring={metastring}>
      {yaml}
    </CodeBlock>
  );
}
