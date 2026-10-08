export type ApiDocVersionKey = 'current' | 'v3.8.0';

export type ApiDocPair = {
  controllerRoute: string;
  edgeletRoute: string;
  controllerLabel: string;
  edgeletLabel: string;
};

export const API_DOC_PAIRS: Record<ApiDocVersionKey, ApiDocPair> = {
  current: {
    controllerRoute: '/api/v3.9.0/controller',
    edgeletRoute: '/api/v1.1.0/edgelet',
    controllerLabel: 'Controller API (v3.9.0)',
    edgeletLabel: 'Edgelet API (v1.1.0)',
  },
  'v3.8.0': {
    controllerRoute: '/api/v3.8.0/controller',
    edgeletRoute: '/api/v1.0.0/edgelet',
    controllerLabel: 'Controller API (v3.8.0)',
    edgeletLabel: 'Edgelet API (v1.0.0)',
  },
};

export function resolveApiDocPair(versionName: string | undefined): ApiDocPair {
  if (versionName === 'v3.8.0') {
    return API_DOC_PAIRS['v3.8.0'];
  }
  return API_DOC_PAIRS.current;
}
