/**
 * @module Command
 */

import { Context } from './../context';

/**
 * Interface for testing `command` handlers
 * @Telegraf https://telegraf.js.org/#/?id=command
 */

export interface Command {
  command(commandName: string): Context;
  start(): Context;
  help(): Context;
  settings(): Context;
}
