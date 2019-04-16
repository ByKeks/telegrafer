import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { ICommandApi } from './interfaces';
import { makeActionApi } from './methods/action';
import { makeCommandApi } from './methods/command';

export function update(bot: ITelegraf<ContextMessageUpdate>): ICommandApi {
  return {
    ...makeActionApi(bot),
    ...makeCommandApi(bot),
  };
}
