/**
 * @module Action
 */

import { Context } from './../context';

/**
 * Interface for testing `action` handlers
 * @Telegraf https://telegraf.js.org/#/?id=action
 */
export interface Action {
  action(trigger: string): Context;
}
