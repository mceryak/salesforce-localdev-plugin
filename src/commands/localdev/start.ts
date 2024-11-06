import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, SfProject } from '@salesforce/core';
import JSZip from 'jszip';
import { getFileTemplates } from '../../utils/getFileTemplates.js';
import { deployAndAwaitResult } from '../../utils/awaitDeployResult.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('localdev', 'localdev.start');

export type LocaldevStartResult = {
  path: string;
};

export default class LocaldevStart extends SfCommand<LocaldevStartResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    'target-org': Flags.requiredOrg({
      summary: messages.getMessage('flags.target-org.summary'),
      // description: messages.getMessage('flags.name.description'),
      char: 'o',
    }),
    lwc: Flags.string({
      summary: messages.getMessage('flags.lwc.summary'),
      char: 'l',
      required: true,
    }),
    'device-type': Flags.string({
      summary: messages.getMessage('flags.device-type.summary'),
      char: 't',
      default: 'desktop',
      options: ['desktop', 'ios', 'android'],
    }),
  };

  public async run(): Promise<LocaldevStartResult> {
    const { flags } = await this.parse(LocaldevStart);

    const org = flags['target-org'];
    const deviceType = flags['device-type'];
    const lwcName = flags['lwc'];
    const tabName = lwcName + '_TestTab';
    const appName = `${lwcName}_TestApp`;

    const conn = org.getConnection();

    this.log('Building Deployment Zip File');
    const fileTemplates = getFileTemplates(appName, lwcName, tabName);
    const zip = new JSZip();
    const pkg = zip.folder('package');
    pkg?.folder('applications')?.file(appName + '.app-meta.xml', fileTemplates.appTemplate);
    pkg?.folder('tabs')?.file(tabName + '.tab-meta.xml', fileTemplates.tabTemplate);
    pkg?.folder('profiles')?.file('Admin.profile-meta.xml', fileTemplates.profileTemplate);
    const zipLwc = pkg?.folder('lwc')?.folder(lwcName);
    // read existing lwc file from local project
    const lwcPath = SfProject.getInstance().getDefaultPackage().path + '/main/default/lwc/' + lwcName;
    for (const file of readdirSync(lwcPath)) {
      const fullFilePath = path.resolve(lwcPath, file);
      zipLwc?.file(file, readFileSync(fullFilePath));
    }
    // manifest file at root
    pkg?.file('package.xml', fileTemplates.manifestTemplate);
    const buffer = await zip.generateAsync({ type: 'nodebuffer' });

    this.log(`Deploying... Application: ${appName}, CustomTab: ${tabName}, LWC: ${lwcName} and Admin permissions`);
    await deployAndAwaitResult(conn, buffer);
    this.log('Deployment finished');
    this.log('Starting local development');
    exec(`sf lightning dev app -o ${conn.getUsername()} -n ${appName} -t ${deviceType}`, (err, stdout, stderr) => {
      if (err) {
        this.log(messages.getMessage('info.error', [JSON.stringify(err)]));
      }
      if (stdout) {
        this.log(messages.getMessage('info.error', [JSON.stringify(stdout)]));
      }
      if (stderr) {
        this.log(messages.getMessage('info.error', [JSON.stringify(stderr)]));
      }
    });

    return {
      path: 'src/commands/start.ts',
    };
  }
}
