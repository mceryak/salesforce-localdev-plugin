import { Connection } from '@salesforce/core';

export type DeploymentResult = {
  deployResult?: {
    status: string;
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function deployAndAwaitResult(
  conn: Connection,
  data: Buffer,
  delay: number = 500
): Promise<DeploymentResult> {
  const deployResponse = await conn.deploy(data, { rest: true });
  let inProgress = true;
  let result: DeploymentResult = {};
  while (inProgress) {
    // eslint-disable-next-line no-await-in-loop
    await timeout(delay);
    // eslint-disable-next-line no-await-in-loop
    result = await conn.request<DeploymentResult>({
      method: 'GET',
      url: `${conn.baseUrl()}/metadata/deployRequest/${deployResponse.id}?includeDetails=true`,
    });
    inProgress = result.deployResult?.status === 'In Progress';
  }
  return result;
}
