import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { IReplyApi } from './../interfaces';
import { makeCommand } from './../utils';
import { reply } from './../reply';

export function makeCommandApi(bot: ITelegraf<ContextMessageUpdate>) {
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

function command(bot: ITelegraf<ContextMessageUpdate>, commandName: string): IReplyApi {
  return {
    reply() {
      const replyApi = reply(bot);
      bot.handleUpdate(makeCommand(commandName));
      return replyApi;
    },
  };
}
