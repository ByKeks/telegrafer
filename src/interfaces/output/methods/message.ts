/**
 * @module Command
 */

import { Context } from './../context';

/**
 * Interface for testing `hears` handlers
 * @Telegraf https://telegraf.js.org/#/?id=hears
 */

export interface Message {
  message(text: string): Context;
}
