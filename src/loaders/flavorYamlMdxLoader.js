/**
 * Runs before @docusaurus/mdx-loader. MDX dedents template literals in JSX; that strips
 * YAML indentation from <FlavorYaml>{`...`}</FlavorYaml>. Rewrite to a markdown fence
 * child so indentation matches ```yaml fences.
 */
const FLAVOR_YAML_TEMPLATE =
  /<FlavorYaml(\s[^>]*)?\>\{\`([\s\S]*?)\`\}<\/FlavorYaml>/g;

module.exports = function flavorYamlMdxLoader(source) {
  if (!source.includes('<FlavorYaml') || !source.includes('{`')) {
    return source;
  }
  return source.replace(
    FLAVOR_YAML_TEMPLATE,
    (_, attrs, yaml) => `<FlavorYaml${attrs ?? ''}>

\`\`\`yaml
${yaml.replace(/\n$/, '')}
\`\`\`

</FlavorYaml>`,
  );
};
