import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {CLI_NAME, FLAVOR} from './src/config/distribution';
import {
  buildGetStartedSidebarV39,
  buildLearnSidebarV39,
  buildReferenceSidebarV39,
  buildReleaseNotesSidebarV39,
  buildTutorialsSidebarV39,
} from './sidebarsShared';

const cliSection = FLAVOR === 'datasance' ? 'potctl' : 'iofogctl';

const sidebars = {
  getStartedSidebar: buildGetStartedSidebarV39(CLI_NAME),
  learnSidebar: buildLearnSidebarV39(),
  releaseNotesSidebar: buildReleaseNotesSidebarV39(),
  tutorialsSidebar: buildTutorialsSidebarV39(),
  referenceSidebar: buildReferenceSidebarV39(CLI_NAME, cliSection),
} as SidebarsConfig;

export default sidebars;
