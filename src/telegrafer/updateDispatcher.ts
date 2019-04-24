// @ts-ignore
import * as TelegrafContext from 'telegraf/core/context';
import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Update } from 'telegraf/typings/telegram-types';

export function handleUpdateDispatcher(bot: ITelegraf<ContextMessageUpdate>, update: Update) {
  let ctx: ContextMessageUpdate = null;

  function useHandleUpdate(): { ctx: ContextMessageUpdate } {
    if (ctx) { return { ctx }; }

    ctx = Object.assign(
      (new TelegrafContext(update, bot.telegram, bot.options)),
      bot.context,
    );

    // @ts-ignore
    bot.middleware()(ctx);

    return { ctx };
  }

  return useHandleUpdate;
}
