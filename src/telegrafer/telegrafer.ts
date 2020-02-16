import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Telegrafer } from './../interfaces';
import { makeActionApi } from './methods/action';
import { makeCommandApi } from './methods/command';
import { makeMessageApi } from './methods/message';

export function update(bot: ITelegraf<ContextMessageUpdate>): Telegrafer {
  return {
    ...makeActionApi(bot),
    ...makeCommandApi(bot),
    ...makeMessageApi(bot),
  };
}
