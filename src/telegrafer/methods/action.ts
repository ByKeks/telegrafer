import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Reply, Action } from './../../interfaces';
import { makeAction } from './../utils';
import { reply } from './../reply';

export function makeActionApi(bot: ITelegraf<ContextMessageUpdate>): Action {
  return {
    action(trigger: string) {
      return action(bot, trigger);
    },
  };
}

function action(bot: ITelegraf<ContextMessageUpdate>, trigger: string): Reply {
  return {
    reply() {
      const replyApi = reply(bot);
      bot.handleUpdate(makeAction(trigger));
      return replyApi;
    },
  };
}
