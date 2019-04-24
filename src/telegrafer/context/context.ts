import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import { Update } from 'telegraf/typings/telegram-types';
import { Context, ContextMiddleware } from 'interfaces';
import { handleUpdateDispatcher } from './../updateDispatcher';
import { reply } from './../context';

export function contextApi(bot: ITelegraf<ContextMessageUpdate>, update: Update): Context {
  const useHandleUpdate = handleUpdateDispatcher(bot, update);

  return {
    ctx(this: Context, middleware: ContextMiddleware) {
      const { ctx } = useHandleUpdate();

      const promises: Array<Promise<any>> = [];

      setTimeout(() => middleware(ctx), 0);

      return {
        ...this,
        end: (cb: () => any = () => null) => {
          Promise
            .all(promises)
            .then(() => cb());
        },
      };
    },
    reply() {
      const replyApi = reply(bot);
      useHandleUpdate();
      return replyApi;
    },
  };
}
