import path from 'path';
import type {Plugin} from '@docusaurus/types';

/** Preprocesses .mdx so FlavorYaml template literals become nested yaml fences. */
export default function flavorYamlMdxPlugin(): Plugin {
  return {
    name: 'docusaurus-flavor-yaml-mdx',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.mdx$/,
              include: [path.resolve(__dirname, '../../docs'), path.resolve(__dirname, '../../versioned_docs')],
              enforce: 'pre',
              use: [path.resolve(__dirname, '../loaders/flavorYamlMdxLoader.js')],
            },
          ],
        },
      };
    },
  };
}
