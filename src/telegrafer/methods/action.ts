import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Action } from './../../interfaces';
import { contextApi } from './../context';
import { makeAction } from './../utils';

export function makeActionApi(bot: ITelegraf<ContextMessageUpdate>): Action {
  return {
    action(trigger: string) {
      return contextApi(bot, makeAction(trigger));
    },
  };
}
