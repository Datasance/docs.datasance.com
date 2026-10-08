import webpack from 'webpack';
import type {Plugin} from '@docusaurus/types';

/** Inlines DOCUSAURUS_DISTRIBUTION so client bundles resolve flavor constants correctly. */
export default function flavorEnvPlugin(): Plugin {
  const flavor = process.env.DOCUSAURUS_DISTRIBUTION ?? 'datasance';
  return {
    name: 'docusaurus-flavor-env',
    configureWebpack() {
      return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.DOCUSAURUS_DISTRIBUTION': JSON.stringify(flavor),
          }),
        ],
      };
    },
  };
}
