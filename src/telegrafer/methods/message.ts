import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Message } from './../../interfaces';
import { contextApi } from './../context';
import { makeMessage } from './../utils';

export function makeMessageApi(bot: ITelegraf<ContextMessageUpdate>): Message {
  return {
    message(text: string) {
      return contextApi(bot, makeMessage(text));
    }
  };
}
