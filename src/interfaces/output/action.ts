/**
 * @module Telegrafer
 */

import { Reply } from './reply';

/**
 * Interface for testing `action` handlers
 * @Telegraf https://telegraf.js.org/#/?id=action
 */
export interface Action {
  action(trigger: string): Reply;
}
