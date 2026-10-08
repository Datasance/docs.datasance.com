import {
  API_VERSION,
  EDGELET_VERSION,
  PLATFORM_TRAIN,
  REGISTRY,
} from '../config/distribution';

/** Replace {{API_VERSION}}, {{REGISTRY}}, etc. in YAML or CLI snippets. */
export function substituteFlavorPlaceholders(text: string): string {
  return text
    .replace(/\{\{API_VERSION\}\}/g, API_VERSION)
    .replace(/\{\{REGISTRY\}\}/g, REGISTRY)
    .replace(/\{\{PLATFORM_TRAIN\}\}/g, PLATFORM_TRAIN)
    .replace(/\{\{EDGELET_VERSION\}\}/g, EDGELET_VERSION);
}
