import { wrap } from 'comlink';
// @ts-ignore
import Worker from './index.worker.js';

export const worker = new Worker();
export const state = wrap(worker);
