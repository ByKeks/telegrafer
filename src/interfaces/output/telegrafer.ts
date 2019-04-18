/**
 * @module Telegrafer
 */

import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { Action } from './action';
import { Command } from './command';

export type Telegrafer = Action & Command;

export type Update = (bot: Telegraf<ContextMessageUpdate>) => Telegrafer;
