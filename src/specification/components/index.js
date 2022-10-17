import { schemas } from './schemas/index.js';
import { parameters } from './parameters/index.js';
import { requestBodies } from './request-bodies/index.js';
import { responses } from './responses/index.js';

export const components = {
  parameters,
  requestBodies,
  responses,
  schemas
};
