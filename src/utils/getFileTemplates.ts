import { getAppTemplate } from './fileTemplates/appTemplate.js';
import { getManifestTemplate } from './fileTemplates/manifestTemplate.js';
import { getProfileTemplate } from './fileTemplates/profileTemplate.js';
import { getTabTemplate } from './fileTemplates/tabTemplate.js';

export type GetFileTemplatesResult = {
  appTemplate: string;
  tabTemplate: string;
  manifestTemplate: string;
  profileTemplate: string;
};

const getFileTemplates = function (appName: string, lwcName: string, tabName: string): GetFileTemplatesResult {
  return {
    appTemplate: getAppTemplate(appName, tabName),
    tabTemplate: getTabTemplate(tabName, lwcName),
    manifestTemplate: getManifestTemplate(appName, lwcName, tabName),
    profileTemplate: getProfileTemplate(appName, tabName),
  };
};

export { getFileTemplates };
