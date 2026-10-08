import type {Root} from 'mdast';
import type {Plugin} from 'unified';
import {visit} from 'unist-util-visit';
import {substituteFlavorPlaceholders} from '../utils/substituteFlavorPlaceholders';

/** Substitute flavor placeholders in yaml/yml fenced code blocks (mdast). */
const remarkFlavorPlaceholders: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'code', (node) => {
    const lang = node.lang?.toLowerCase();
    if (lang !== 'yaml' && lang !== 'yml') {
      return;
    }
    if (!node.value.includes('{{')) {
      return;
    }
    node.value = substituteFlavorPlaceholders(node.value);
  });
};

export default remarkFlavorPlaceholders;
