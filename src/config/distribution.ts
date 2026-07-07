export type Distribution = 'datasance' | 'iofog';

export const FLAVOR: Distribution =
  (process.env.DOCUSAURUS_DISTRIBUTION as Distribution) ?? 'datasance';

export const PRODUCT_NAME =
  FLAVOR === 'datasance' ? 'Datasance PoT' : 'Eclipse ioFog';

export const API_VERSION =
  FLAVOR === 'datasance' ? 'datasance.com/v3' : 'iofog.org/v3';

export const REGISTRY = `ghcr.io/${FLAVOR === 'datasance' ? 'datasance' : 'eclipse-iofog'}`;

export const CLI_NAME = FLAVOR === 'datasance' ? 'potctl' : 'iofogctl';
