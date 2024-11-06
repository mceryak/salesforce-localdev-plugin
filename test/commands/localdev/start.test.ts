import { TestContext } from '@salesforce/core/testSetup';
import { expect } from 'chai';
import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
import LocaldevStart from '../../../src/commands/localdev/start.js';

describe('localdev start', () => {
  const $$ = new TestContext();
  let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(() => {
    sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  });

  afterEach(() => {
    $$.restore();
  });

  it('runs hello', async () => {
    await LocaldevStart.run([]);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello world');
  });

  it('runs hello with --json and no provided name', async () => {
    const result = await LocaldevStart.run([]);
    expect(result.path).to.equal('src/commands/localdev/start.ts');
  });

  it('runs hello world --name Astro', async () => {
    await LocaldevStart.run(['--name', 'Astro']);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello Astro');
  });
});
