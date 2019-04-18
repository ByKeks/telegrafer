import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Reply, Command } from './../../interfaces';
import { makeCommand } from './../utils';
import { reply } from './../reply';

export function makeCommandApi(bot: ITelegraf<ContextMessageUpdate>): Command {
  return {
    command(commandName: string) {
      return command(bot, commandName);
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

function command(bot: ITelegraf<ContextMessageUpdate>, commandName: string): Reply {
  return {
    reply() {
      const replyApi = reply(bot);
      bot.handleUpdate(makeCommand(commandName));
      return replyApi;
    },
  };
}
