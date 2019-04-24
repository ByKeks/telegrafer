import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Command } from './../../interfaces';
import { contextApi } from './../context';
import { makeCommand } from './../utils';

export function makeCommandApi(bot: ITelegraf<ContextMessageUpdate>): Command {
  return {
    command(commandName: string) {
      return contextApi(bot, makeCommand(commandName));
    },
    start() {
      return this.command('start');
    },
    help() {
      return this.command('help');
    },
    settings() {
      return this.command('settings');
    },
  };
}
