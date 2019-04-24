/**
 * @module Context
 */

import { CallApi } from './callApi';
import { ContextMessageUpdate } from 'telegraf';

export type ContextMiddleware = ((ctx: ContextMessageUpdate) => void);

export interface Context {
  ctx(middleware: ContextMiddleware): Context;
  reply(): CallApi;
}
