/**
 * @module Command
 */

import { Reply } from './reply';

/**
 * Interface for testing `command` handlers
 * @Telegraf https://telegraf.js.org/#/?id=command
 */
export interface Command {
  command(commandName: string): Reply;
  start(): Reply;
  help(): Reply;
  settings(): Reply;
}
