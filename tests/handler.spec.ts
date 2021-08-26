import { deepEqual } from 'assert';
import handler from '../src/handler';
import { Inputs } from '../src/inputs';
import { Outputs } from '../src/outputs';
import { createContext, jsonPath } from './mocks';

describe('Handler flow suite', () => {
  it('should be able to proccess', async () => {
    process.env.GITHUB_WORKSPACE = '/';
    const context = createContext();
    const inputs: Inputs = {
      containerRegistry: 'registry.hub.docker.com',
      environment: 'stg',
      versionFile: jsonPath,
      versionKey: 'version',
    };
    const expected: Outputs = {
      containerRegistry: 'registry.hub.docker.com',
      environment: 'stg',
      versionFile: jsonPath,
      versionKey: 'version',
      version: '1.2.3',
      shortSha: '1157b612',
      projectName: 'action-conventional-standards',
      containerRepository: 'action-conventional-standards-stg',
      containerUrl: 'registry.hub.docker.com/action-conventional-standards-stg',
      containerTag: `1.2.3-${context.runId}-1157b612`,
      containerImage: `registry.hub.docker.com/action-conventional-standards-stg:1.2.3-${context.runId}-1157b612`,
    };

    const data = await handler(context, inputs);
    deepEqual(data, expected);
  });
});